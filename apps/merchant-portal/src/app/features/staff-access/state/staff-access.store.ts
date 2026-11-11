import { Injectable, signal, computed } from '@angular/core';
import { StaffMemberViewModel } from '../models/staff-access-view.model';
import { MerchantStaffRole } from '@nukkadnow/auth-client';

const INITIAL_STAFF: StaffMemberViewModel[] = [
  {
    id: 'staff-1',
    name: 'Ramesh Sharma',
    phoneMasked: '+91 98230 *****',
    phoneRaw: '9823012345',
    role: 'OWNER',
    pin: '1111',
    assignedOutlets: ['Dharampeth Main Store', 'Sadar Kitchen Hub'],
    status: 'ACTIVE',
    lastActiveAt: 'Just now'
  },
  {
    id: 'staff-2',
    name: 'Anand Verma',
    phoneMasked: '+91 94221 *****',
    phoneRaw: '9422156789',
    role: 'OUTLET_MANAGER',
    pin: '2222',
    assignedOutlets: ['Dharampeth Main Store'],
    status: 'ACTIVE',
    lastActiveAt: '15 mins ago'
  },
  {
    id: 'staff-3',
    name: 'Chef Manoj Patil',
    phoneMasked: '+91 97654 *****',
    phoneRaw: '9765432109',
    role: 'CHEF',
    pin: '3333',
    assignedOutlets: ['Dharampeth Main Store'],
    status: 'ACTIVE',
    lastActiveAt: '1 hour ago'
  },
  {
    id: 'staff-4',
    name: 'Kavita Joshi',
    phoneMasked: '+91 93700 *****',
    phoneRaw: '9370098765',
    role: 'CASHIER',
    pin: '4444',
    assignedOutlets: ['Dharampeth Main Store'],
    status: 'ACTIVE',
    lastActiveAt: '4 mins ago'
  }
];

@Injectable()
export class StaffAccessStore {
  readonly staffList = signal<StaffMemberViewModel[]>(INITIAL_STAFF);
  readonly activeStaffOnDevice = signal<StaffMemberViewModel>(INITIAL_STAFF[0]);
  readonly pinError = signal<string | null>(null);

  readonly totalActiveStaff = computed(() => {
    return this.staffList().filter(s => s.status === 'ACTIVE').length;
  });

  verifyAndSwitchPin(enteredPin: string): boolean {
    const match = this.staffList().find(s => s.pin === enteredPin && s.status === 'ACTIVE');
    if (match) {
      this.activeStaffOnDevice.set(match);
      this.pinError.set(null);
      return true;
    } else {
      this.pinError.set('Incorrect 4-digit PIN. Please try again.');
      return false;
    }
  }

  inviteStaff(member: { name: string; phoneRaw: string; role: MerchantStaffRole; assignedOutlets: string[] }): void {
    const masked = `+91 ${member.phoneRaw.substring(0, 5)} *****`;
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    const newStaff: StaffMemberViewModel = {
      id: `staff-${Date.now()}`,
      name: member.name,
      phoneRaw: member.phoneRaw,
      phoneMasked: masked,
      role: member.role,
      pin: randomPin,
      assignedOutlets: member.assignedOutlets,
      status: 'INVITED',
      lastActiveAt: 'Invite Sent'
    };
    this.staffList.update(list => [...list, newStaff]);
  }

  updateRole(id: string, newRole: MerchantStaffRole): void {
    this.staffList.update(list =>
      list.map(s => s.id === id ? { ...s, role: newRole } : s)
    );
  }

  toggleSuspend(id: string): void {
    this.staffList.update(list =>
      list.map(s => {
        if (s.id !== id) return s;
        const newStatus = s.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        return { ...s, status: newStatus };
      })
    );
  }

  resetPin(id: string): string {
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    this.staffList.update(list =>
      list.map(s => s.id === id ? { ...s, pin: newPin } : s)
    );
    return newPin;
  }

  removeStaff(id: string): void {
    this.staffList.update(list => list.filter(s => s.id !== id));
  }
}
