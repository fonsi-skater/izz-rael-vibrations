export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  modelName: string;
  slug: string;
  description: string | null;
  price: number;
  images: string[];
  stock: number;
  featured: boolean;
  category: Category;
  subcategory: Subcategory | null;
  brand: Brand;
}

export interface CartLine {
  productId: string;
  modelName: string;
  brand: string;
  price: number;
  qty: number;
  image?: string;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";
