import { create } from "zustand";
import { getSupplier } from "../api/supplier";
import { getProduct } from "../api/product";

export interface ProductState {
  rows: any[][];
  count: number;
  getProducts: (page?: number, product_name?: string, id?: string) => void;
}

export const useProductStore = create<ProductState>()((set) => ({
  rows: [],
  count: 0,
  getProducts: async (page = 1, product_name = "", id?: string) => {
    let data = await getProduct(page, product_name, id);
    let rows: any[][] = [];
    if (!data) return;
    for (let index = 0; index < data.rows.length; ++index) {
      const row = data.rows[index];
      rows.push([
        row.category,
        row.id,
        row.product_name,
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(row.default_cog),
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(row.default_ppu),
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(row.default_ppu - (row.default_ppu - row.default_cog) * 0.1),
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(row.default_ppu - (row.default_ppu - row.default_cog) * 0.2),
        //row.default_ppu-((row.default_cog - row.default_ppu)*0.1)
        // row.papers,
        // row.initial_qty,
        // row.reorder_level,
        // row.current_qty,
        // row.stock_status,
        row.description,
      ]);
    }
    set({ ...data, rows });
  },
}));

export const useProductPurchaseStore = create<ProductState>()((set) => ({
  rows: [],
  count: 0,
  getProducts: async (page = 1, product_name = "") => {
    let data = await getProduct(page, product_name);
    let rows: any[][] = [];
    if (!data) return;
    for (let index = 0; index < data.rows.length; ++index) {
      const row = data.rows[index];
      rows.push([
        row.category,
        row.product_name,
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(row.default_cog),
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(row.default_ppu),
        // row.papers,
        // row.initial_qty,
        // row.reorder_level,
        // row.current_qty,
        // row.stock_status,
        row.description,
      ]);
    }
    set({ ...data, rows });
  },
}));
