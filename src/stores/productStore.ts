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
    let rows: (string[] | undefined)[] = []
    if (!data) return
    for (let index = 0; index < data.rows.length; ++index) {
        const row = data.rows[index];
        rows.push([
            row.category,
            row.product_name,
            row.default_cog.toString(),
            row.default_ppu.toString(),
            row.papers,
            row.initial_qty.toString(),
            row.reorder_level.toString(),
            row.current_qty.toString(),
            row.stock_status,
            row.description
        ])
    }
    set({ ...data, rows });
  },
}));
