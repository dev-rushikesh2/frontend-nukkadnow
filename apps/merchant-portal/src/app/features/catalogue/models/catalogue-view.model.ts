export interface ProductVariant {
  id: string;
  name: string; // e.g. "500g", "1kg", "Small"
  pricePaise: number;
  stockCount: number;
}

export interface ProductItem {
  id: string;
  outletId: string;
  title: string;
  description: string;
  category: string;
  pricePaise: number;
  compareAtPricePaise?: number;
  inStock: boolean;
  stockCount: number;
  isVeg: boolean;
  isMadeToOrder: boolean;
  leadTimeMinutes?: number;
  dailyOrderLimit?: number;
  imageUrl?: string;
  variants: ProductVariant[];
}

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-samosa-1',
    outletId: 'outlet-dharampeth-1',
    title: 'Nagpur Special Samosa',
    description: 'Crispy golden pastry stuffed with spicy potato and green peas masala.',
    category: 'Sweets & Snacks',
    pricePaise: 2500, // â‚¹25.00
    inStock: true,
    stockCount: 45,
    isVeg: true,
    isMadeToOrder: false,
    imageUrl: '',
    variants: []
  },
  {
    id: 'prod-tarri-poha-1',
    outletId: 'outlet-dharampeth-1',
    title: 'Authentic Tarri Poha Plate',
    description: 'Iconic Nagpur breakfast beaten rice served with piping hot spicy chana tarri and sev.',
    category: 'Fresh Meals & Tiffin',
    pricePaise: 4000, // â‚¹40.00
    inStock: true,
    stockCount: 30,
    isVeg: true,
    isMadeToOrder: false,
    variants: []
  },
  {
    id: 'prod-orange-barfi-1',
    outletId: 'outlet-dharampeth-1',
    title: 'Famous Nagpur Orange Barfi',
    description: 'Heritage sweet prepared with fresh local orange zest and rich mawa.',
    category: 'Sweets & Snacks',
    pricePaise: 32000, // â‚¹320.00
    inStock: true,
    stockCount: 12,
    isVeg: true,
    isMadeToOrder: false,
    variants: [
      { id: 'var-250g', name: '250g Box', pricePaise: 16000, stockCount: 8 },
      { id: 'var-500g', name: '500g Box', pricePaise: 32000, stockCount: 12 },
      { id: 'var-1kg', name: '1kg Gift Pack', pricePaise: 62000, stockCount: 4 }
    ]
  },
  {
    id: 'prod-custom-cake-1',
    outletId: 'outlet-dharampeth-1',
    title: 'Eggless Belgian Chocolate Cake',
    description: 'Freshly baked artisanal cake with dark chocolate ganache.',
    category: 'Bakery & Cakes',
    pricePaise: 65000, // â‚¹650.00
    inStock: true,
    stockCount: 5,
    isVeg: true,
    isMadeToOrder: true,
    leadTimeMinutes: 180, // 3 hours lead time
    dailyOrderLimit: 8,
    variants: [
      { id: 'cake-500g', name: '500g', pricePaise: 65000, stockCount: 5 },
      { id: 'cake-1kg', name: '1 kg', pricePaise: 120000, stockCount: 3 }
    ]
  }
];

export type CatalogueViewModel = any;
