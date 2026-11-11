import { Injectable, inject } from '@angular/core';
import { HttpClientAdapter } from '@nukkadnow/api-client';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface OtpRequestResponse {
  success: boolean;
  challengeId: string;
  cooldownSeconds: number;
}

export interface OtpVerifyResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    phoneNumber: string;
    roles: ('merchant_owner' | 'outlet_manager' | 'cashier')[];
    activeTenantId: string;
    activeOutletId: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthApi {
  private http = inject(HttpClientAdapter);

  requestOtp(phoneNumber: string): Observable<OtpRequestResponse> {
    // In local dev/mock or backend API:
    return of({
      success: true,
      challengeId: 'ch-' + Date.now(),
      cooldownSeconds: 60
    }).pipe(delay(600));
  }

  verifyOtp(challengeId: string, phoneNumber: string, otp: string): Observable<OtpVerifyResponse> {
    return of({
      accessToken: 'nk_mock_jwt_access_' + Date.now(),
      refreshToken: 'nk_mock_jwt_refresh_' + Date.now(),
      user: {
        id: 'usr-mer-01',
        phoneNumber,
        roles: ['merchant_owner' as const],
        activeTenantId: 'tenant-nagpur-1',
        activeOutletId: 'outlet-dharampeth-1'
      }
    }).pipe(delay(600));
  }
}
