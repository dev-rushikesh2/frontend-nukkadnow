import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login.page';
import { VerifyOtpPageComponent } from './pages/verify-otp.page';

export const AUTHENTICATION_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'verify-otp', component: VerifyOtpPageComponent }
];
