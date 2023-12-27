//Data shape from server when using get request
export interface ProductRow {
  id: number;
  product_name: string;
  category: string;
  default_cog: number;
  default_ppu: number;
  papers: boolean;
  initial_qty: number;
  reorder_level: number;
  current_qty: number;
  stock_status: string;
  description: string;
}

export interface InventoryRow {
  id: number;
  product_name: string;
  default_cog: number;
  default_ppu: number;
  category: string;
  papers: boolean;
  reorder_level: number;
  total_purchase_quantity: number;
  total_sale_quantity: number;
  inventory_balance: number;
}



export interface CustomerRow {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  contact_number: string;
  notes: string;
}

//Data shape from client when using post request
export interface ProductRequestNew {
  product_name: string;
  category: string;
  default_cog?: number;
  default_ppu?: number;
  papers?: boolean;
  initial_qty?: number;
  reorder_level?: number;
  current_qty?: number;
  stock_status?: string;
  description?: string;
}
