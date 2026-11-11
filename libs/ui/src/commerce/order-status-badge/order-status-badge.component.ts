import { Component, input, ChangeDetectionStrategy } from '@angular/core';

export type OrderBadgeState =
  | 'PLACED'
  | 'ACCEPTED'
  | 'PREPARING'
  | 'READY'
  | 'OUT_FOR_DELIVERY'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REJECTED';

@Component({
  selector: 'ui-order-status-badge',
  standalone: true,
  template: `
    <span [class]="'order-badge order-badge--' + state().toLowerCase()">
      {{ label() }}
    </span>
  `,
  styles: [`
    .order-badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .order-badge--placed {
      background: #fef3c7;
      color: #92400e; /* Amber */
    }
    .order-badge--accepted {
      background: #e0f2fe;
      color: #0369a1; /* Sky Blue */
    }
    .order-badge--preparing {
      background: #ffedd5;
      color: #c2410c; /* Orange */
    }
    .order-badge--ready {
      background: #dcfce7;
      color: #15803d; /* Green */
    }
    .order-badge--out_for_delivery {
      background: #f3e8ff;
      color: #7e22ce; /* Purple */
    }
    .order-badge--completed {
      background: #f1f5f9;
      color: #475569; /* Slate Gray */
    }
    .order-badge--cancelled,
    .order-badge--rejected {
      background: #fee2e2;
      color: #b91c1c; /* Red */
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderStatusBadgeComponent {
  state = input.required<OrderBadgeState>();

  get label(): () => string {
    return () => {
      switch (this.state()) {
        case 'PLACED': return 'New Order';
        case 'ACCEPTED': return 'Accepted';
        case 'PREPARING': return 'Preparing';
        case 'READY': return 'Ready for Pickup';
        case 'OUT_FOR_DELIVERY': return 'Out for Delivery';
        case 'COMPLETED': return 'Completed';
        case 'CANCELLED': return 'Cancelled';
        case 'REJECTED': return 'Rejected';
        default: return this.state();
      }
    };
  }
}
