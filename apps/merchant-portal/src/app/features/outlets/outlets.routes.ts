import { Routes } from '@angular/router';
import { OutletsListPageComponent } from './pages/outlets-list.page';
import { OutletSchedulePageComponent } from './pages/outlet-schedule.page';

export const OUTLETS_ROUTES: Routes = [
  { path: '', component: OutletsListPageComponent },
  { path: ':id/schedule', component: OutletSchedulePageComponent }
];
