export type BatchStatus = 
  | 'SCHEDULED' 
  | 'OPEN_FOR_ORDERS' 
  | 'CUTOFF_REACHED' 
  | 'PREPARING' 
  | 'READY_FOR_PICKUP' 
  | 'COMPLETED';

export interface BatchPreorderItem {
  orderId: string;
  customerName: string;
  quantity: number;
  paymentStatus: 'PAID' | 'COD';
  pickupSlot: string;
}

export interface BatchViewModel {
  id: string;
  batchName: string;
  productName: string;
  productId: string;
  productionDate: string; // YYYY-MM-DD
  readyTime: string;      // HH:mm format e.g. "17:00"
  cutoffTime: string;     // HH:mm format e.g. "16:00"
  totalCapacityUnits: number;
  bookedUnits: number;
  unitPricePaise: number;
  status: BatchStatus;
  preorders: BatchPreorderItem[];
  instructions?: string;
}

export type BatchesViewModel = BatchViewModel;
