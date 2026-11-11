export type OrderSource = 'MARKETPLACE' | 'WALKIN' | 'QR';
export type OrderLifecycleState = 'PLACED' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'REJECTED';

export interface OrderItemDetail {
  title: string;
  quantity: number;
  pricePaise: number;
  notes?: string;
}

export interface OrderInboxItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhoneMasked: string;
  source: OrderSource;
  status: OrderLifecycleState;
  fulfillmentType: 'PICKUP' | 'MERCHANT_DELIVERY';
  pickupSlotTime?: string;
  itemsSummary: string;
  items: OrderItemDetail[];
  totalPaise: number;
  receivedAgo: string;
  prepMinutes?: number;
  countdownMinutes?: number;
}

export const INITIAL_INBOX_ORDERS: OrderInboxItem[] = [
  {
    id: 'ord-101',
    orderNumber: '#NK-801',
    customerName: 'Anand Sharma',
    customerPhoneMasked: '+91 98234 *****',
    source: 'MARKETPLACE',
    status: 'PLACED',
    fulfillmentType: 'PICKUP',
    pickupSlotTime: 'Today, 05:30 PM',
    itemsSummary: '4x Nagpur Special Samosa, 2x Tarri Poha Plate',
    items: [
      { title: 'Nagpur Special Samosa', quantity: 4, pricePaise: 10000 },
      { title: 'Authentic Tarri Poha Plate', quantity: 2, pricePaise: 8000, notes: 'Extra tarri please' }
    ],
    totalPaise: 18000,
    receivedAgo: 'Just now'
  },
  {
    id: 'ord-102',
    orderNumber: '#NK-802',
    customerName: 'Pooja Kulkarni',
    customerPhoneMasked: '+91 94221 *****',
    source: 'QR',
    status: 'PREPARING',
    fulfillmentType: 'PICKUP',
    pickupSlotTime: 'Today, 05:45 PM',
    itemsSummary: '1x 500g Nagpur Orange Barfi',
    items: [
      { title: 'Famous Nagpur Orange Barfi (500g)', quantity: 1, pricePaise: 32000 }
    ],
    totalPaise: 32000,
    receivedAgo: '8m ago',
    prepMinutes: 15,
    countdownMinutes: 7
  },
  {
    id: 'ord-103',
    orderNumber: '#NK-803',
    customerName: 'Vikas Rao',
    customerPhoneMasked: '+91 97654 *****',
    source: 'WALKIN',
    status: 'READY',
    fulfillmentType: 'PICKUP',
    itemsSummary: '2x Nagpur Special Samosa',
    items: [
      { title: 'Nagpur Special Samosa', quantity: 2, pricePaise: 5000 }
    ],
    totalPaise: 5000,
    receivedAgo: '15m ago',
    prepMinutes: 10,
    countdownMinutes: 0
  }
];

export type OrderInboxViewModel = any;
