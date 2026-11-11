import { Routes } from '@angular/router';
import { DiscoveryListPageComponent } from './pages/discovery-list.page';
import { ShopsMapPageComponent } from './pages/shops-map.page';

export const DISCOVERY_ROUTES: Routes = [
  {
    path: '',
    component: DiscoveryListPageComponent
  },
  {
    path: 'map',
    component: ShopsMapPageComponent
  }
];
