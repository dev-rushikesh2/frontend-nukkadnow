import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export type StaffRole = 'OWNER' | 'MANAGER' | 'CASHIER' | 'CHEF';

export interface StaffMember {
  id: string;
  name: string;
  phone: string;
  role: StaffRole;
  pin: string;
  outlet: string;
  isActive: boolean;
  lastActive: string;
}

@Component({
  selector: 'merchant-staff-access-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './staff-access-list.page.html',
  styleUrls: ['./staff-access-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffAccessListPageComponent {
  // Current active staff on this device
  readonly activeStaff = signal<StaffMember>({
    id: 'staff-1',
    name: 'Rushikesh Khawane',
    phone: '+91 98765 43210',
    role: 'OWNER',
    pin: '1234',
    outlet: 'Main Dharampeth Outlet',
    isActive: true,
    lastActive: 'Now'
  });

  // Staff Roster
  readonly staffList = signal<StaffMember[]>([
    {
      id: 'staff-1',
      name: 'Rushikesh Khawane',
      phone: '+91 98765 43210',
      role: 'OWNER',
      pin: '1234',
      outlet: 'Main Dharampeth Outlet',
      isActive: true,
      lastActive: 'Active Now'
    },
    {
      id: 'staff-2',
      name: 'Deepak Deshmukh',
      phone: '+91 98220 99887',
      role: 'MANAGER',
      pin: '4567',
      outlet: 'Main Dharampeth Outlet',
      isActive: true,
      lastActive: 'Today, 10:15 AM'
    },
    {
      id: 'staff-3',
      name: 'Pooja Sharma',
      phone: '+91 98221 44556',
      role: 'CASHIER',
      pin: '8910',
      outlet: 'Main Dharampeth Outlet',
      isActive: true,
      lastActive: 'Today, 09:30 AM'
    },
    {
      id: 'staff-4',
      name: 'Chef Anil Verma',
      phone: '+91 97654 33221',
      role: 'CHEF',
      pin: '2345',
      outlet: 'Main Dharampeth Outlet',
      isActive: true,
      lastActive: 'Yesterday'
    }
  ]);

  // Masked PINs toggle state
  readonly revealedPins = signal<Record<string, boolean>>({});

  // Modals
  readonly showPinSwitchModal = signal<boolean>(false);
  readonly showInviteModal = signal<boolean>(false);

  // Keypad PIN input
  readonly enteredPin = signal<string>('');
  readonly pinError = signal<string | null>(null);

  // Invite Form
  readonly newName = signal<string>('');
  readonly newPhone = signal<string>('');
  readonly newRole = signal<StaffRole>('CASHIER');
  readonly newPin = signal<string>('');

  // Toast
  readonly toast = signal<string | null>(null);

  togglePinReveal(id: string) {
    this.revealedPins.update(map => ({
      ...map,
      [id]: !map[id]
    }));
  }

  toggleStaffActive(id: string) {
    this.staffList.update(list =>
      list.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s)
    );
    this.showToast('Staff status updated.');
  }

  openPinModal() {
    this.enteredPin.set('');
    this.pinError.set(null);
    this.showPinSwitchModal.set(true);
  }

  appendPinDigit(digit: string) {
    if (this.enteredPin().length < 4) {
      const next = this.enteredPin() + digit;
      this.enteredPin.set(next);
      if (next.length === 4) {
        this.verifyAndSwitch();
      }
    }
  }

  clearPin() {
    this.enteredPin.set('');
    this.pinError.set(null);
  }

  verifyAndSwitch() {
    const pin = this.enteredPin();
    const matched = this.staffList().find(s => s.pin === pin && s.isActive);
    if (matched) {
      this.activeStaff.set(matched);
      this.showPinSwitchModal.set(false);
      this.showToast(`Device switched to ${matched.name} (${matched.role})!`);
    } else {
      this.pinError.set('Invalid PIN. Please try again.');
      setTimeout(() => this.enteredPin.set(''), 800);
    }
  }

  inviteStaffMember() {
    const name = this.newName().trim();
    const phone = this.newPhone().trim();
    const pin = this.newPin().trim() || Math.floor(1000 + Math.random() * 9000).toString();

    if (!name || !phone) {
      this.showToast('Please enter name and phone number.');
      return;
    }

    const newStaff: StaffMember = {
      id: `staff-${Date.now()}`,
      name,
      phone,
      role: this.newRole(),
      pin,
      outlet: 'Main Dharampeth Outlet',
      isActive: true,
      lastActive: 'Just invited'
    };

    this.staffList.update(list => [...list, newStaff]);
    this.showInviteModal.set(false);
    this.newName.set('');
    this.newPhone.set('');
    this.newPin.set('');
    this.showToast(`Team member "${name}" invited successfully! PIN: ${pin}`);
  }

  removeStaff(id: string, name: string) {
    if (confirm(`Remove staff access for ${name}?`)) {
      this.staffList.update(list => list.filter(s => s.id !== id));
      this.showToast(`${name} removed from store roster.`);
    }
  }

  private showToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2800);
  }
}
