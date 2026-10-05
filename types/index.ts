export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '28' | '30' | '32' | '34' | '36' | 'FREE';

export type Gender = 'Men' | 'Women' | 'Unisex';

export type Category =
  | 'Hoodies'
  | 'Jeans'
  | 'Jackets'
  | 'Shirts'
  | 'T-Shirts'
  | 'Polos'
  | 'Womens'
  | 'Accessories'
  | 'Socks'
  | 'Caps';

export type Collection =
  | 'Mens Wear'
  | 'Womens Wear'
  | 'Casual Fashion'
  | 'Everyday Style'
  | 'Festive Sale';

export interface Colorway {
  name: string;
  hex: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  title: string; // Already in 'ELLANE / NAME' format
  category: Category;
  gender: Gender;
  collections: Collection[];
  price: number;
  mrp: number; // INR integers; discount is derived
  colorways: Colorway[];
  images: ProductImage[]; // >= 2 images; [1] is hover image
  sizes: Size[];
  stock: Partial<Record<Size, number>>;
  tags: ('New' | 'Best Seller' | 'Limited' | 'Festive')[];
  description: string;
  details: {
    fabric: string;
    fit: string;
    care: string[];
  };
  rating: number;
  reviewsCount: number;
  createdAt: string;
  isPlaceholder?: boolean; // true = invented demo item
}

export interface CartLine {
  productId: string;
  size: Size;
  color?: string;
  qty: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  date: string;
}

export interface OrderFixture {
  id: string;
  contact: string;
  status: 0 | 1 | 2 | 3 | 4 | 5; // 0: Order Placed, 1: Confirmed, 2: Packed, 3: In Transit, 4: Out for Delivery, 5: Delivered
  events: {
    label: string;
    at: string;
  }[];
  courier: {
    name: string;
    url: string;
  };
}

export interface CollectionMeta {
  slug: string;
  title: string;
  subTitle?: string;
  description: string;
  heroImage: string;
  filterType?: 'category' | 'collection' | 'all';
  targetValue?: string;
}

export interface FilterState {
  category: Category[];
  gender: Gender[];
  sizes: Size[];
  priceRange: [number, number];
  inStockOnly: boolean;
}

export type SortOption =
  | 'featured'
  | 'best-selling'
  | 'title-asc'
  | 'title-desc'
  | 'price-asc'
  | 'price-desc'
  | 'created-desc';
