import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-dietary-tag',
  standalone: true,
  template: `
    <span
      [class]="'dietary-symbol ' + (isVeg() ? 'veg' : 'non-veg')"
      [attr.aria-label]="isVeg() ? 'Vegetarian' : 'Non-Vegetarian'"
      [title]="isVeg() ? 'Vegetarian' : 'Non-Vegetarian'">
      <span class="inner-dot"></span>
    </span>
  `,
  styles: [`
    .dietary-symbol {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 3px;
      border-width: 1.5px;
      border-style: solid;
      background: #ffffff;
      flex-shrink: 0;
    }
    .inner-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
    }
    .dietary-symbol.veg {
      border-color: #16a34a;
    }
    .dietary-symbol.veg .inner-dot {
      background-color: #16a34a;
    }
    .dietary-symbol.non-veg {
      border-color: #dc2626;
    }
    .dietary-symbol.non-veg .inner-dot {
      background-color: #dc2626;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DietaryTagComponent {
  isVeg = input<boolean>(true);
}
