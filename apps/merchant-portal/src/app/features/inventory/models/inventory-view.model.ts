export type StockAdjustmentReason = 'RESTOCK' | 'CORRECTION' | 'DAMAGE' | 'SPOILAGE' | 'RETURN';

export interface InventoryItem {
  id: string;
  productId: string;
  title: string;
  category: string;
  currentStock: number;
  lowStockThreshold: number;
  unit: string;
  isLowStock: boolean;
  inStock: boolean;
  lastUpdated: string;
}

export interface StockMovementRecord {
  id: string;
  productId: string;
  productTitle: string;
  delta: number;
  previousStock: number;
  newStock: number;
  reason: StockAdjustmentReason;
  note?: string;
  actorName: string;
  timestamp: string;
}

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    productId: 'prod-samosa-1',
    title: 'Nagpur Special Samosa',
    category: 'Sweets & Snacks',
    currentStock: 45,
    lowStockThreshold: 15,
    unit: 'pcs',
    isLowStock: false,
    inStock: true,
    lastUpdated: 'Just now'
  },
  {
    id: 'inv-2',
    productId: 'prod-tarri-poha-1',
    title: 'Authentic Tarri Poha Plate',
    category: 'Fresh Meals & Tiffin',
    currentStock: 30,
    lowStockThreshold: 10,
    unit: 'plates',
    isLowStock: false,
    inStock: true,
    lastUpdated: '10m ago'
  },
  {
    id: 'inv-3',
    productId: 'prod-orange-barfi-1',
    title: 'Famous Nagpur Orange Barfi',
    category: 'Sweets & Snacks',
    currentStock: 4,
    lowStockThreshold: 10,
    unit: 'boxes',
    isLowStock: true,
    inStock: true,
    lastUpdated: '25m ago'
  },
  {
    id: 'inv-4',
    productId: 'prod-custom-cake-1',
    title: 'Eggless Belgian Chocolate Cake',
    category: 'Bakery & Cakes',
    currentStock: 0,
    lowStockThreshold: 3,
    unit: 'cakes',
    isLowStock: true,
    inStock: false,
    lastUpdated: '1h ago'
  }
];

export const INITIAL_MOVEMENTS: StockMovementRecord[] = [
  {
    id: 'mov-1',
    productId: 'prod-samosa-1',
    productTitle: 'Nagpur Special Samosa',
    delta: 50,
    previousStock: 0,
    newStock: 50,
    reason: 'RESTOCK',
    note: 'Fresh morning batch prepared',
    actorName: 'Ramesh (Kitchen)',
    timestamp: 'Today, 08:30 AM'
  },
  {
    id: 'mov-2',
    productId: 'prod-orange-barfi-1',
    productTitle: 'Famous Nagpur Orange Barfi',
    delta: -6,
    previousStock: 10,
    newStock: 4,
    reason: 'CORRECTION',
    note: 'In-store counter sales update',
    actorName: 'Sunil (Cashier)',
    timestamp: 'Today, 11:15 AM'
  }
];

export type InventoryViewModel = any;
