export type PreorderStatus = 
  | 'CONFIRMED' 
  | 'IN_PREPARATION' 
  | 'READY_FOR_PICKUP' 
  | 'COLLECTED' 
  | 'CANCELLED';

export interface PreorderItem {
  name: string;
  quantity: number;
  unitPricePaise: number;
}

export interface PreorderViewModel {
  orderId: string;
  customerName: string;
  customerPhoneMasked: string;
  items: PreorderItem[];
  totalAmountPaise: number;
  orderDate: string;
  scheduledFulfillmentDate: string;
  scheduledTimeSlot: string;
  status: PreorderStatus;
  specialInstructions?: string;
  batchName?: string;
  isPaid: boolean;
  tokenNumber: string;
}

export type PreordersViewModel = any;
