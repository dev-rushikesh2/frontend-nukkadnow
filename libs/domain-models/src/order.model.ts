export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PLACED'
  | 'ACCEPTED'
  | 'PREPARING'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'COMPLETED'
  | 'CANCELLED';

export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  unitPricePaise: number;
  totalPaise: number;
}

export interface Order {
  id: string;
  outletId: string;
  customerId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotalPaise: number;
  taxPaise: number;
  totalPaise: number;
  pickupToken?: string;
  fulfillmentType: 'PICKUP' | 'MERCHANT_DELIVERY';
  createdAt: string;
}
