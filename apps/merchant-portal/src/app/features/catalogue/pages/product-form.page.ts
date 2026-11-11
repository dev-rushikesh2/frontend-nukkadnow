import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueStore } from '../state/catalogue.store';
import { ProductItem } from '../models/catalogue-view.model';
import { ButtonComponent, InputComponent, ToggleComponent, DietaryTagComponent } from '@nukkadnow/ui';
import { parseRupeesToPaise } from '@nukkadnow/utilities';

@Component({
  selector: 'merchant-product-form-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, ToggleComponent, DietaryTagComponent],
  template: `
    <div class="form-container">
      <div class="header-nav">
        <button type="button" class="back-link" (click)="goBack()">â† Back to Catalogue</button>
        <h2>{{ isEditMode() ? 'Edit Product' : 'Add New Product' }}</h2>
      </div>

      <div class="form-card">
        <!-- 1. Basic Details -->
        <section class="form-section">
          <h3>Basic Details</h3>

          <ui-input
            label="Product Title"
            placeholder="e.g. Nagpur Tarri Poha"
            [required]="true"
            [value]="title()"
            (valueChanged)="title.set($event)">
          </ui-input>

          <div class="form-row">
            <div class="form-col">
              <label class="field-label">Category</label>
              <select class="custom-select" [value]="category()" (change)="category.set($any($event.target).value)">
                <option value="Sweets & Snacks">Sweets & Snacks</option>
                <option value="Fresh Meals & Tiffin">Fresh Meals & Tiffin</option>
                <option value="Bakery & Cakes">Bakery & Cakes</option>
                <option value="Grocery & Kirana">Grocery & Kirana</option>
              </select>
            </div>

            <div class="form-col">
              <ui-input
                label="Price (in Rupees â‚¹)"
                type="number"
                prefix="â‚¹"
                placeholder="25.00"
                [required]="true"
                [value]="priceRupees()"
                (valueChanged)="priceRupees.set($event)">
              </ui-input>
            </div>
          </div>

          <div class="dietary-selector">
            <label class="field-label">Dietary Classification:</label>
            <div class="dietary-opts">
              <label class="diet-opt">
                <input type="radio" name="diet" [checked]="isVeg()" (change)="isVeg.set(true)" />
                <ui-dietary-tag [isVeg]="true"></ui-dietary-tag>
                <span>Vegetarian</span>
              </label>
              <label class="diet-opt">
                <input type="radio" name="diet" [checked]="!isVeg()" (change)="isVeg.set(false)" />
                <ui-dietary-tag [isVeg]="false"></ui-dietary-tag>
                <span>Non-Vegetarian</span>
              </label>
            </div>
          </div>

          <ui-input
            label="Product Description"
            placeholder="Describe flavors, portion size, and ingredients..."
            [value]="description()"
            (valueChanged)="description.set($event)">
          </ui-input>
        </section>

        <!-- 2. Stock & Availability -->
        <section class="form-section">
          <h3>Stock & Inventory</h3>
          <div class="toggle-row">
            <div>
              <strong>Available for Order</strong>
              <p>Customers can order this product immediately.</p>
            </div>
            <ui-toggle [checked]="inStock()" (toggled)="inStock.set($event)"></ui-toggle>
          </div>

          <ui-input
            label="Current Physical Stock Count"
            type="number"
            placeholder="50"
            [value]="stockCount().toString()"
            (valueChanged)="stockCount.set(+$event || 0)">
          </ui-input>
        </section>

        <!-- 3. Made-to-order & Lead Time -->
        <section class="form-section">
          <h3>Made-to-Order & Preparation</h3>
          <div class="toggle-row">
            <div>
              <strong>Made-to-Order Product</strong>
              <p>Fresh preparation required before customer pickup (e.g. cakes, special meal orders).</p>
            </div>
            <ui-toggle [checked]="isMadeToOrder()" (toggled)="isMadeToOrder.set($event)"></ui-toggle>
          </div>

          @if (isMadeToOrder()) {
            <ui-input
              label="Lead Time (in minutes)"
              type="number"
              placeholder="120"
              hint="How much advance notice is required before pickup?"
              [value]="leadTimeMinutes().toString()"
              (valueChanged)="leadTimeMinutes.set(+$event || 60)">
            </ui-input>
          }
        </section>

        <footer class="form-footer">
          <ui-button variant="outline" (clicked)="goBack()">Cancel</ui-button>
          <ui-button variant="primary" [disabled]="!title().trim() || !priceRupees()" (clicked)="onSave()">
            {{ isEditMode() ? 'Save Changes' : 'Publish Product' }}
          </ui-button>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .form-container { max-width: 680px; display: flex; flex-direction: column; gap: 20px; }
    .back-link { background: none; border: none; color: #64748b; font-size: 13px; font-weight: 600; cursor: pointer; padding: 0; margin-bottom: 4px; }
    h2 { font-size: 24px; color: #0f172a; margin: 0; }
    .form-card { background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .form-section { padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid #f1f5f9; }
    .form-section h3 { font-size: 16px; color: #0f172a; margin: 0 0 16px; }
    .form-row { display: flex; gap: 16px; }
    .form-col { flex: 1; }
    .field-label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
    .custom-select { width: 100%; height: 48px; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 0 12px; font-size: 14px; background: #ffffff; }
    .dietary-selector { margin-bottom: 16px; }
    .dietary-opts { display: flex; gap: 24px; }
    .diet-opt { display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; }
    .toggle-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .toggle-row strong { display: block; font-size: 14px; color: #0f172a; }
    .toggle-row p { font-size: 12px; color: #64748b; margin: 2px 0 0; }
    .form-footer { display: flex; justify-content: flex-end; gap: 12px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(CatalogueStore);

  productId = signal<string | null>(this.route.snapshot.paramMap.get('id'));
  isEditMode = signal<boolean>(!!this.productId());

  title = signal<string>('');
  category = signal<string>('Sweets & Snacks');
  priceRupees = signal<string>('25');
  description = signal<string>('');
  isVeg = signal<boolean>(true);
  inStock = signal<boolean>(true);
  stockCount = signal<number>(50);
  isMadeToOrder = signal<boolean>(false);
  leadTimeMinutes = signal<number>(60);

  constructor() {
    const id = this.productId();
    if (id) {
      const existing = this.store.products().find((p) => p.id === id);
      if (existing) {
        this.title.set(existing.title);
        this.category.set(existing.category);
        this.priceRupees.set((existing.pricePaise / 100).toString());
        this.description.set(existing.description);
        this.isVeg.set(existing.isVeg);
        this.inStock.set(existing.inStock);
        this.stockCount.set(existing.stockCount);
        this.isMadeToOrder.set(existing.isMadeToOrder);
        this.leadTimeMinutes.set(existing.leadTimeMinutes || 60);
      }
    }
  }

  onSave() {
    const id = this.productId() || 'prod-' + Date.now();
    const paise = parseRupeesToPaise(+this.priceRupees() || 0);

    const product: ProductItem = {
      id,
      outletId: 'outlet-dharampeth-1',
      title: this.title().trim(),
      description: this.description().trim(),
      category: this.category(),
      pricePaise: paise,
      inStock: this.inStock(),
      stockCount: this.stockCount(),
      isVeg: this.isVeg(),
      isMadeToOrder: this.isMadeToOrder(),
      leadTimeMinutes: this.isMadeToOrder() ? this.leadTimeMinutes() : undefined,
      variants: []
    };

    this.store.saveProduct(product);
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/catalogue']);
  }
}
