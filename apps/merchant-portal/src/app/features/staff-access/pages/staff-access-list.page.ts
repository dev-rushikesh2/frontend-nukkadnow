import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StaffAccessStore } from '../state/staff-access.store';
import { MerchantStaffRole, MerchantPermissionDirective } from '@nukkadnow/auth-client';
import { ButtonComponent, DialogComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-staff-access-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, DialogComponent, MerchantPermissionDirective],
  templateUrl: './staff-access-list.page.html',
  styleUrls: ['./staff-access-list.page.scss'],
  providers: [StaffAccessStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffAccessListPageComponent {
  readonly store = inject(StaffAccessStore);

  showPinModal = false;
  showInviteModal = false;
  revealedPins: Record<string, boolean> = {};

  enteredPin = '';

  newStaffName = '';
  newStaffPhone = '';
  newStaffRole: MerchantStaffRole = 'CASHIER';
  selectedOutlets = ['Dharampeth Main Store'];

  openPinModal(): void {
    this.enteredPin = '';
    this.store.pinError.set(null);
    this.showPinModal = true;
  }

  submitPin(): void {
    if (this.enteredPin.length === 4) {
      const ok = this.store.verifyAndSwitchPin(this.enteredPin);
      if (ok) {
        this.showPinModal = false;
        this.enteredPin = '';
      }
    }
  }

  appendPinDigit(digit: string): void {
    if (this.enteredPin.length < 4) {
      this.enteredPin += digit;
      if (this.enteredPin.length === 4) {
        this.submitPin();
      }
    }
  }

  clearPin(): void {
    this.enteredPin = '';
    this.store.pinError.set(null);
  }

  openInviteModal(): void {
    this.newStaffName = '';
    this.newStaffPhone = '';
    this.newStaffRole = 'CASHIER';
    this.showInviteModal = true;
  }

  sendInvite(): void {
    if (!this.newStaffName.trim() || this.newStaffPhone.length !== 10) return;

    this.store.inviteStaff({
      name: this.newStaffName.trim(),
      phoneRaw: this.newStaffPhone.trim(),
      role: this.newStaffRole,
      assignedOutlets: this.selectedOutlets
    });

    this.showInviteModal = false;
  }

  toggleRevealPin(staffId: string): void {
    this.revealedPins[staffId] = !this.revealedPins[staffId];
  }

  getRoleBadgeClass(role: MerchantStaffRole): string {
    switch (role) {
      case 'OWNER': return 'role-owner';
      case 'OUTLET_MANAGER': return 'role-manager';
      case 'CHEF': return 'role-chef';
      case 'CASHIER': return 'role-cashier';
      default: return '';
    }
  }
}
