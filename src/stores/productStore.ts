import { create } from "zustand";
import { getSupplier } from "../api/supplier";
import { getProduct } from "../api/product";

export interface ProductState {
  rows: (string[] | undefined)[];
  count: number;
  getProducts: (page?: number, product_name?: string) => void;
}

export const useProductStore = create<ProductState>()((set) => ({
  rows: [],
  count: 0,
  getProducts: async (page = 1, product_name = '') => {
    let data = await getProduct(page, product_name);
    let rows: (any[] | undefined)[] = []
    if (!data) return
    for (let index = 0; index < data.rows.length; ++index) {
        const row = data.rows[index];
        rows.push([
            row.category,
            row.product_name,
            row.default_cog,
            row.default_ppu,
            row.papers,
            row.initial_qty,
            row.reorder_level,
            row.current_qty,
            row.stock_status,
            row.description
        ])
    }
    set({ ...data, rows });
  },
}));
