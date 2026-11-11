import { MerchantStaffRole } from '@nukkadnow/auth-client';

export type StaffStatus = 'ACTIVE' | 'SUSPENDED' | 'INVITED';

export interface StaffMemberViewModel {
  id: string;
  name: string;
  phoneMasked: string;
  phoneRaw: string;
  role: MerchantStaffRole;
  pin: string; // 4-digit numeric code
  assignedOutlets: string[];
  status: StaffStatus;
  lastActiveAt: string;
}

export type StaffAccessViewModel = StaffMemberViewModel;
