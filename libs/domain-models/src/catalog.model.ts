export interface Product {
  id: string;
  outletId: string;
  title: string;
  description: string;
  pricePaise: number;
  category: string;
  inStock: boolean;
  imageUrl?: string;
  leadTimeHours?: number;
  isVegetarian?: boolean;
}
