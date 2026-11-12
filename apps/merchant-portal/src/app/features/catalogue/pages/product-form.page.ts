import { Component, inject, signal, computed, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CatalogueStore } from '../state/catalogue.store';
import { ProductItem, ProductVariant } from '../models/catalogue-view.model';

@Component({
  selector: 'merchant-product-form-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="product-form-viewport">
      <!-- Breadcrumb & Nav -->
      <nav class="form-nav">
        <a routerLink="/catalogue" class="back-link">
          <svg viewBox="0 0 24 24" class="back-svg" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          <span>Back to Products</span>
        </a>
      </nav>

      <!-- Page Header -->
      <header class="form-header">
        <div class="header-titles">
          <h1 class="page-title">{{ isEditMode() ? 'Edit Product' : 'Add New Product' }}</h1>
          <p class="page-subtitle">Configure item details, images, live pricing, stock, and variations.</p>
        </div>

        <div class="header-actions">
          <button type="button" class="btn-cancel" (click)="goBack()">Discard</button>
          <button type="button" class="btn-save-product" (click)="saveProduct()">
            {{ isEditMode() ? 'Update Product' : 'Save & Publish Product' }}
          </button>
        </div>
      </header>

      <!-- 2-Column Responsive Form Layout -->
      <div class="form-grid">
        <!-- LEFT COLUMN: Images, Basic Info, Pricing, Variants -->
        <main class="grid-main">
          <!-- 1. Product Images Gallery -->
          <section class="form-card">
            <h2 class="card-title">Product Media & Photos</h2>
            <p class="card-subtitle">Upload high-quality images. The first image will be shown as the primary listing photo.</p>

            <div class="images-gallery-row">
              @for (img of imagesList(); track img; let idx = $index) {
                <div class="image-preview-box" [class.primary]="idx === primaryImageIndex()">
                  <img [src]="img" alt="Product photo" class="preview-img" />
                  @if (idx === primaryImageIndex()) {
                    <span class="primary-badge">★ Primary</span>
                  } @else {
                    <button type="button" class="btn-set-primary" (click)="setPrimaryImage(idx)">Set Primary</button>
                  }
                  <button type="button" class="btn-remove-img" (click)="removeImage(idx)" title="Remove">×</button>
                </div>
              }

              <!-- Upload Dropzone -->
              <div class="upload-dropzone" (click)="triggerImageUpload()">
                <svg viewBox="0 0 24 24" class="upload-svg" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <span class="upload-text">+ Add Photo</span>
                <span class="upload-sub">JPG, PNG (Max 5MB)</span>
              </div>
            </div>
          </section>

          <!-- 2. Basic Information -->
          <section class="form-card">
            <h2 class="card-title">Basic Information</h2>

            <div class="form-fields">
              <div class="field-group">
                <label class="field-label">Product Name / Title <span class="required">*</span></label>
                <input 
                  type="text" 
                  class="field-input" 
                  placeholder="e.g. Fresh Paneer 500g / Nagpur Tarri Poha"
                  [ngModel]="title()"
                  (ngModelChange)="title.set($event)" />
              </div>

              <div class="field-row">
                <div class="field-group">
                  <label class="field-label">Category <span class="required">*</span></label>
                  <select 
                    class="field-select" 
                    [ngModel]="category()"
                    (ngModelChange)="category.set($event)">
                    <option value="Sweets & Snacks">Sweets & Snacks</option>
                    <option value="Fresh Meals & Tiffin">Fresh Meals & Tiffin</option>
                    <option value="Bakery & Cakes">Bakery & Cakes</option>
                    <option value="Dairy & Milk">Dairy & Milk</option>
                    <option value="Grocery & Kirana">Grocery & Kirana</option>
                    <option value="Beverages & Chai">Beverages & Chai</option>
                  </select>
                </div>

                <div class="field-group">
                  <label class="field-label">Unit / Packaging</label>
                  <select 
                    class="field-select" 
                    [ngModel]="unit()"
                    (ngModelChange)="unit.set($event)">
                    <option value="1 Piece / Plate">1 Piece / Plate</option>
                    <option value="100g">100g</option>
                    <option value="250g">250g</option>
                    <option value="500g">500g</option>
                    <option value="1 kg">1 kg</option>
                    <option value="500 ml">500 ml</option>
                    <option value="1 Litre">1 Litre</option>
                    <option value="Pack of 6">Pack of 6</option>
                  </select>
                </div>
              </div>

              <div class="field-group">
                <div class="label-with-count">
                  <label class="field-label">Product Description</label>
                  <span class="char-count">{{ description().length }}/300</span>
                </div>
                <textarea 
                  class="field-textarea" 
                  rows="3" 
                  maxlength="300"
                  placeholder="Describe freshness, key ingredients, preparation details, shelf life..."
                  [ngModel]="description()"
                  (ngModelChange)="description.set($event)">
                </textarea>
              </div>

              <!-- Dietary Classification -->
              <div class="field-group">
                <label class="field-label">Dietary Type</label>
                <div class="dietary-pills-selector">
                  <button 
                    type="button" 
                    class="dietary-opt-btn" 
                    [class.active]="dietaryType() === 'veg'"
                    (click)="dietaryType.set('veg')">
                    <span class="dot-veg"></span>
                    <span>Pure Vegetarian</span>
                  </button>
                  <button 
                    type="button" 
                    class="dietary-opt-btn" 
                    [class.active]="dietaryType() === 'non-veg'"
                    (click)="dietaryType.set('non-veg')">
                    <span class="dot-non-veg"></span>
                    <span>Non-Vegetarian</span>
                  </button>
                  <button 
                    type="button" 
                    class="dietary-opt-btn" 
                    [class.active]="dietaryType() === 'egg'"
                    (click)="dietaryType.set('egg')">
                    <span class="dot-egg"></span>
                    <span>Contains Egg</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- 3. Pricing & Discount Calculation -->
          <section class="form-card">
            <h2 class="card-title">Pricing & Customer Savings</h2>

            <div class="pricing-calc-grid">
              <div class="field-group">
                <label class="field-label">MRP (Maximum Retail Price)</label>
                <div class="input-with-prefix">
                  <span class="currency-prefix">₹</span>
                  <input 
                    type="number" 
                    class="field-input with-prefix" 
                    placeholder="e.g. 50"
                    [ngModel]="mrpPrice()"
                    (ngModelChange)="mrpPrice.set(+$event)" />
                </div>
              </div>

              <div class="field-group">
                <label class="field-label">Selling Price <span class="required">*</span></label>
                <div class="input-with-prefix">
                  <span class="currency-prefix">₹</span>
                  <input 
                    type="number" 
                    class="field-input with-prefix" 
                    placeholder="e.g. 40"
                    [ngModel]="sellingPrice()"
                    (ngModelChange)="sellingPrice.set(+$event)" />
                </div>
              </div>
            </div>

            <!-- Real-time savings badge -->
            @if (customerSavings() > 0) {
              <div class="savings-alert-box">
                <svg viewBox="0 0 24 24" class="savings-svg" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>
                  Customer gets <strong>₹{{ customerSavings() }} OFF ({{ discountPercent() }}% discount)</strong> on your shop!
                </span>
              </div>
            }
          </section>

          <!-- 4. Product Variants (e.g. 500g, 1kg) -->
          <section class="form-card">
            <div class="card-title-row">
              <h2 class="card-title">Pack Sizes & Variants</h2>
              <button type="button" class="btn-add-variant" (click)="addVariant()">+ Add Size</button>
            </div>

            <div class="variants-table-list">
              @for (v of variants(); track v.id; let idx = $index) {
                <div class="variant-row">
                  <input 
                    type="text" 
                    class="var-input" 
                    placeholder="e.g. 1 kg / Large" 
                    [ngModel]="v.name"
                    (ngModelChange)="updateVariantName(idx, $event)" />
                  <div class="input-with-prefix var-price">
                    <span class="currency-prefix">₹</span>
                    <input 
                      type="number" 
                      class="field-input with-prefix" 
                      placeholder="Price" 
                      [ngModel]="v.pricePaise / 100"
                      (ngModelChange)="updateVariantPrice(idx, +$event)" />
                  </div>
                  <input 
                    type="number" 
                    class="var-input var-stock" 
                    placeholder="Stock" 
                    [ngModel]="v.stockCount"
                    (ngModelChange)="updateVariantStock(idx, +$event)" />
                  <button type="button" class="btn-delete-var" (click)="removeVariant(idx)">×</button>
                </div>
              } @empty {
                <p class="no-variants-msg">No variants added. Single standard price applies.</p>
              }
            </div>
          </section>
        </main>

        <!-- RIGHT COLUMN: Stock Management, Prep Lead Time, Danger Zone -->
        <aside class="grid-side">
          <!-- 1. Inventory & Stock Status -->
          <div class="form-card">
            <h2 class="card-title">Inventory & Stock</h2>

            <div class="form-fields">
              <div class="field-group">
                <label class="field-label">Current Available Stock (Units)</label>
                <div class="stock-stepper-box">
                  <button type="button" class="step-btn" (click)="adjustStock(-5)">-5</button>
                  <button type="button" class="step-btn" (click)="adjustStock(-1)">-1</button>
                  <input 
                    type="number" 
                    class="stock-number-input" 
                    [ngModel]="stockCount()"
                    (ngModelChange)="stockCount.set(+$event)" />
                  <button type="button" class="step-btn" (click)="adjustStock(+1)">+1</button>
                  <button type="button" class="step-btn" (click)="adjustStock(+5)">+5</button>
                </div>
              </div>

              <div class="field-group">
                <label class="field-label">Low Stock Alert Threshold</label>
                <input 
                  type="number" 
                  class="field-input" 
                  placeholder="e.g. 5"
                  [ngModel]="lowStockThreshold()"
                  (ngModelChange)="lowStockThreshold.set(+$event)" />
                <span class="field-hint">You will receive a notification when stock drops below this.</span>
              </div>
            </div>
          </div>

          <!-- 2. Preparation & Made to Order -->
          <div class="form-card">
            <h2 class="card-title">Preparation Settings</h2>

            <div class="form-fields">
              <label class="toggle-row">
                <input 
                  type="checkbox" 
                  class="switch-input" 
                  [ngModel]="isMadeToOrder()"
                  (ngModelChange)="isMadeToOrder.set($event)" />
                <span class="switch-slider"></span>
                <span class="toggle-label">Freshly prepared / Made to Order</span>
              </label>

              @if (isMadeToOrder()) {
                <div class="field-group lead-time-group">
                  <label class="field-label">Kitchen Prep Time (Minutes)</label>
                  <div class="time-presets-row">
                    <button 
                      type="button" 
                      class="time-pill" 
                      [class.active]="leadTimeMinutes() === 10"
                      (click)="leadTimeMinutes.set(10)">
                      10m
                    </button>
                    <button 
                      type="button" 
                      class="time-pill" 
                      [class.active]="leadTimeMinutes() === 15"
                      (click)="leadTimeMinutes.set(15)">
                      15m
                    </button>
                    <button 
                      type="button" 
                      class="time-pill" 
                      [class.active]="leadTimeMinutes() === 25"
                      (click)="leadTimeMinutes.set(25)">
                      25m
                    </button>
                    <button 
                      type="button" 
                      class="time-pill" 
                      [class.active]="leadTimeMinutes() === 45"
                      (click)="leadTimeMinutes.set(45)">
                      45m
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- 3. Edit Mode Danger Zone -->
          @if (isEditMode()) {
            <div class="form-card danger-card">
              <h2 class="card-title danger">Danger Zone</h2>
              <p class="danger-msg">Permanently remove this product from your shop inventory.</p>
              <button type="button" class="btn-delete-product" (click)="deleteThisProduct()">
                Delete Product
              </button>
            </div>
          }
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .product-form-viewport {
      display: flex;
      flex-direction: column;
      gap: clamp(16px, 2.5vw, 24px);
      width: 100%;
    }

    .form-nav {
      padding-bottom: 4px;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #6D28D9;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;

      &:hover {
        color: #4C1D95;
      }
    }

    .back-svg {
      width: 16px;
      height: 16px;
    }

    /* Header */
    .form-header {
      display: flex;
      flex-direction: column;
      gap: 16px;

      @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }
    }

    .page-title {
      font-size: clamp(20px, 3.5vw, 28px);
      font-weight: 800;
      color: #1E1B4B;
      margin: 0;
      letter-spacing: -0.02em;
    }

    .page-subtitle {
      font-size: clamp(12px, 1.8vw, 14px);
      color: #64748B;
      margin: 4px 0 0;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-cancel {
      padding: 10px 18px;
      background: #FFFFFF;
      border: 1.5px solid #CBD5E1;
      border-radius: 12px;
      color: #475569;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        background: #F8FAFC;
      }
    }

    .btn-save-product {
      padding: 10px 22px;
      background: #6D28D9;
      color: #FFFFFF;
      border: none;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(109, 40, 217, 0.25);
      transition: all 0.2s;

      &:hover {
        background: #5B21B6;
        transform: translateY(-1px);
      }
    }

    /* Grid Layout */
    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(16px, 2.5vw, 24px);

      @media (min-width: 992px) {
        grid-template-columns: 1fr 380px;
      }
    }

    .grid-main,
    .grid-side {
      display: flex;
      flex-direction: column;
      gap: clamp(16px, 2.5vw, 20px);
    }

    .form-card {
      background: #FFFFFF;
      border: 1.5px solid #EDE9FE;
      border-radius: 16px;
      padding: clamp(16px, 2.5vw, 24px);
      box-shadow: 0 1px 4px rgba(109, 40, 217, 0.03);
    }

    .card-title {
      font-size: 16px;
      font-weight: 800;
      color: #1E1B4B;
      margin: 0 0 6px;

      &.danger {
        color: #DC2626;
      }
    }

    .card-subtitle {
      font-size: 12px;
      color: #64748B;
      margin: 0 0 16px;
    }

    .card-title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;

      .card-title {
        margin: 0;
      }
    }

    /* Images Gallery */
    .images-gallery-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .image-preview-box {
      width: 100px;
      height: 100px;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      border: 2px solid #E2E8F0;

      &.primary {
        border-color: #6D28D9;
      }
    }

    .preview-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .primary-badge {
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      background: #6D28D9;
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      text-align: center;
      padding: 2px;
      border-radius: 4px;
    }

    .btn-set-primary {
      position: absolute;
      bottom: 4px;
      left: 4px;
      right: 4px;
      background: rgba(15, 23, 42, 0.7);
      color: #FFFFFF;
      font-size: 9px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      padding: 2px;
    }

    .btn-remove-img {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(220, 38, 38, 0.85);
      color: #FFFFFF;
      border: none;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .upload-dropzone {
      width: 100px;
      height: 100px;
      border: 2px dashed #CBD5E1;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: #6D28D9;
        background: #FAF5FF;
      }
    }

    .upload-svg {
      width: 24px;
      height: 24px;
      color: #6D28D9;
    }

    .upload-text {
      font-size: 11px;
      font-weight: 700;
      color: #6D28D9;
    }

    .upload-sub {
      font-size: 8px;
      color: #94A3B8;
    }

    /* Form Fields */
    .form-fields {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .field-label {
      font-size: 13px;
      font-weight: 700;
      color: #334155;

      .required {
        color: #DC2626;
      }
    }

    .field-hint {
      font-size: 11px;
      color: #64748B;
    }

    .field-input,
    .field-select,
    .field-textarea {
      padding: 10px 14px;
      border: 1.5px solid #CBD5E1;
      border-radius: 10px;
      font-size: 14px;
      color: #1E293B;
      outline: none;
      background: #FFFFFF;
      transition: border-color 0.2s;

      &:focus {
        border-color: #6D28D9;
        box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.08);
      }
    }

    .field-row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;

      @media (min-width: 600px) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .label-with-count {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .char-count {
      font-size: 11px;
      color: #94A3B8;
    }

    /* Dietary Selector */
    .dietary-pills-selector {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .dietary-opt-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 10px;
      border: 1.5px solid #CBD5E1;
      background: #FFFFFF;
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      cursor: pointer;
      transition: all 0.2s;

      &.active {
        border-color: #6D28D9;
        background: #FAF5FF;
        color: #6D28D9;
      }
    }

    .dot-veg { width: 10px; height: 10px; border-radius: 50%; background: #16A34A; }
    .dot-non-veg { width: 10px; height: 10px; border-radius: 50%; background: #DC2626; }
    .dot-egg { width: 10px; height: 10px; border-radius: 50%; background: #EAB308; }

    /* Pricing */
    .pricing-calc-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
    }

    .input-with-prefix {
      display: flex;
      align-items: center;
      position: relative;
    }

    .currency-prefix {
      position: absolute;
      left: 12px;
      font-weight: 700;
      color: #64748B;
    }

    .field-input.with-prefix {
      padding-left: 28px;
      width: 100%;
    }

    .savings-alert-box {
      display: flex;
      align-items: center;
      gap: 8px;
      background: #ECFDF5;
      border: 1px solid #A7F3D0;
      color: #065F46;
      padding: 10px 14px;
      border-radius: 10px;
      margin-top: 14px;
      font-size: 13px;
    }

    .savings-svg {
      width: 16px;
      height: 16px;
      color: #10B981;
    }

    /* Variants */
    .btn-add-variant {
      padding: 6px 12px;
      background: #EDE9FE;
      color: #6D28D9;
      border: none;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }

    .variants-table-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .variant-row {
      display: grid;
      grid-template-columns: 2fr 1.2fr 1fr 32px;
      gap: 8px;
      align-items: center;
    }

    .var-input {
      padding: 8px 10px;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      font-size: 13px;
      outline: none;
    }

    .btn-delete-var {
      background: none;
      border: none;
      color: #DC2626;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
    }

    .no-variants-msg {
      font-size: 12px;
      color: #94A3B8;
      margin: 0;
    }

    /* Stock Stepper */
    .stock-stepper-box {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .step-btn {
      padding: 8px 12px;
      background: #F1F5F9;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        background: #E2E8F0;
      }
    }

    .stock-number-input {
      width: 80px;
      text-align: center;
      padding: 8px;
      border: 1.5px solid #CBD5E1;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 800;
      color: #1E1B4B;
    }

    /* Lead Time */
    .toggle-row {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }

    .toggle-label {
      font-size: 13px;
      font-weight: 700;
      color: #334155;
    }

    .lead-time-group {
      margin-top: 10px;
    }

    .time-presets-row {
      display: flex;
      gap: 8px;
    }

    .time-pill {
      flex: 1;
      padding: 8px;
      border-radius: 8px;
      border: 1px solid #CBD5E1;
      background: #FFFFFF;
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      cursor: pointer;

      &.active {
        background: #6D28D9;
        border-color: #6D28D9;
        color: #FFFFFF;
      }
    }

    /* Switch */
    .switch-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .switch-slider {
        background: #10B981;
        &:before {
          transform: translateX(18px);
        }
      }
    }

    .switch-slider {
      width: 38px;
      height: 20px;
      background: #CBD5E1;
      border-radius: 999px;
      position: relative;
      display: inline-block;
      transition: background 0.2s;

      &:before {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        left: 2px;
        bottom: 2px;
        background: #FFFFFF;
        border-radius: 50%;
        transition: transform 0.2s;
      }
    }

    /* Danger Card */
    .danger-card {
      border-color: #FCA5A5;
      background: #FFF5F5;
    }

    .danger-msg {
      font-size: 12px;
      color: #7F1D1D;
      margin: 0 0 12px;
    }

    .btn-delete-product {
      width: 100%;
      padding: 10px;
      border: 1.5px solid #DC2626;
      background: #FFFFFF;
      color: #DC2626;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        background: #DC2626;
        color: #FFFFFF;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(CatalogueStore);

  readonly productId = signal<string | null>(null);
  readonly isEditMode = computed(() => !!this.productId());

  // Form State Signals
  readonly title = signal<string>('');
  readonly category = signal<string>('Sweets & Snacks');
  readonly unit = signal<string>('1 Piece / Plate');
  readonly description = signal<string>('');
  readonly dietaryType = signal<'veg' | 'non-veg' | 'egg'>('veg');

  readonly mrpPrice = signal<number>(50);
  readonly sellingPrice = signal<number>(40);

  readonly stockCount = signal<number>(25);
  readonly lowStockThreshold = signal<number>(5);

  readonly isMadeToOrder = signal<boolean>(false);
  readonly leadTimeMinutes = signal<number>(15);

  readonly imagesList = signal<string[]>([
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400'
  ]);
  readonly primaryImageIndex = signal<number>(0);

  readonly variants = signal<ProductVariant[]>([]);

  // Calculations
  readonly customerSavings = computed(() => {
    const mrp = this.mrpPrice();
    const sell = this.sellingPrice();
    return mrp > sell ? mrp - sell : 0;
  });

  readonly discountPercent = computed(() => {
    const mrp = this.mrpPrice();
    const save = this.customerSavings();
    return mrp > 0 ? Math.round((save / mrp) * 100) : 0;
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId.set(id);
      const existing = this.store.products().find(p => p.id === id);
      if (existing) {
        this.title.set(existing.title);
        this.category.set(existing.category);
        this.description.set(existing.description || '');
        this.sellingPrice.set(existing.pricePaise / 100);
        this.mrpPrice.set(existing.compareAtPricePaise ? existing.compareAtPricePaise / 100 : existing.pricePaise / 100);
        this.stockCount.set(existing.stockCount || 10);
        this.dietaryType.set(existing.isVeg ? 'veg' : 'non-veg');
        this.isMadeToOrder.set(existing.isMadeToOrder || false);
        this.leadTimeMinutes.set(existing.leadTimeMinutes || 15);
        if (existing.variants) {
          this.variants.set([...existing.variants]);
        }
      }
    }
  }

  triggerImageUpload() {
    const sample = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
    this.imagesList.update(list => [...list, sample]);
  }

  setPrimaryImage(idx: number) {
    this.primaryImageIndex.set(idx);
  }

  removeImage(idx: number) {
    this.imagesList.update(list => list.filter((_, i) => i !== idx));
    if (this.primaryImageIndex() >= this.imagesList().length) {
      this.primaryImageIndex.set(0);
    }
  }

  adjustStock(amount: number) {
    this.stockCount.update(c => Math.max(0, c + amount));
  }

  addVariant() {
    const newVar: ProductVariant = {
      id: `var-${Date.now()}`,
      name: '1 kg',
      pricePaise: this.sellingPrice() * 100,
      stockCount: 10
    };
    this.variants.update(v => [...v, newVar]);
  }

  updateVariantName(index: number, val: string) {
    this.variants.update(vars =>
      vars.map((v, i) => i === index ? { ...v, name: val } : v)
    );
  }

  updateVariantPrice(index: number, val: number) {
    this.variants.update(vars =>
      vars.map((v, i) => i === index ? { ...v, pricePaise: val * 100 } : v)
    );
  }

  updateVariantStock(index: number, val: number) {
    this.variants.update(vars =>
      vars.map((v, i) => i === index ? { ...v, stockCount: val } : v)
    );
  }

  removeVariant(index: number) {
    this.variants.update(vars => vars.filter((_, i) => i !== index));
  }

  saveProduct() {
    if (!this.title().trim()) {
      alert('Please enter a product title!');
      return;
    }

    const prod: ProductItem = {
      id: this.productId() || `prod-${Date.now()}`,
      outletId: 'outlet-main',
      title: this.title(),
      description: this.description(),
      category: this.category(),
      pricePaise: this.sellingPrice() * 100,
      compareAtPricePaise: this.mrpPrice() * 100,
      inStock: this.stockCount() > 0,
      stockCount: this.stockCount(),
      isVeg: this.dietaryType() === 'veg',
      isMadeToOrder: this.isMadeToOrder(),
      leadTimeMinutes: this.leadTimeMinutes(),
      imageUrl: this.imagesList()[this.primaryImageIndex()] || '',
      variants: this.variants()
    };

    this.store.saveProduct(prod);
    this.router.navigate(['/catalogue']);
  }

  deleteThisProduct() {
    const id = this.productId();
    if (id && confirm('Are you sure you want to delete this product?')) {
      this.store.deleteProduct(id);
      this.router.navigate(['/catalogue']);
    }
  }

  goBack() {
    this.router.navigate(['/catalogue']);
  }
}
