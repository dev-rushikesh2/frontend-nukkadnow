import { Routes } from '@angular/router';
import { CatalogueListPageComponent } from './pages/catalogue-list.page';
import { ProductFormPageComponent } from './pages/product-form.page';

export const CATALOGUE_ROUTES: Routes = [
  { path: '', component: CatalogueListPageComponent },
  { path: 'new', component: ProductFormPageComponent },
  { path: ':id/edit', component: ProductFormPageComponent }
];
