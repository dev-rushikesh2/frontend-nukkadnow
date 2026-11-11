import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PincodeService {
  isServiceableNagpurPincode(pincode: string): boolean {
    return pincode.startsWith('440');
  }
}
