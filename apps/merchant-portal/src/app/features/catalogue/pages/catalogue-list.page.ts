import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CatalogueStore } from '../state/catalogue.store';
import { ProductItem } from '../models/catalogue-view.model';
import { ButtonComponent, InputComponent, ToggleComponent, DietaryTagComponent, PriceDisplayComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-catalogue-list-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, ToggleComponent, DietaryTagComponent, PriceDisplayComponent],
  templateUrl: './catalogue-list.page.html',
  styleUrls: ['./catalogue-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogueListPageComponent {
  store = inject(CatalogueStore);
  router = inject(Router);

  onSearch(val: string) {
    this.store.setSearch(val);
  }

  createProduct() {
    this.router.navigate(['/catalogue/new']);
  }

  editProduct(p: ProductItem) {
    this.router.navigate(['/catalogue', p.id, 'edit']);
  }
}
