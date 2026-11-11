import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-quantity-stepper',
  standalone: true,
  template: `
    <div class="ui-quantity-stepper">
      <button type="button" (click)="decrement()" [disabled]="quantity() <= min()">-</button>
      <span class="qty">{{ quantity() }}</span>
      <button type="button" (click)="increment()" [disabled]="quantity() >= max()">+</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuantityStepperComponent {
  quantity = input<number>(1);
  min = input<number>(0);
  max = input<number>(99);
  changed = output<number>();

  decrement() {
    if (this.quantity() > this.min()) {
      this.changed.emit(this.quantity() - 1);
    }
  }

  increment() {
    if (this.quantity() < this.max()) {
      this.changed.emit(this.quantity() + 1);
    }
  }
}
