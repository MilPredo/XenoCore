import { create } from "zustand";
import { getSupplier } from "../api/supplier";
import { getProduct } from "../api/product";
import getInventory from "../api/inventory";
import { InventoryRow } from "../interface";

export interface InventoryState {
  rows: InventoryRow[];
  count: number;
  getInventory: (page?: number, product_name?: string, id?: number) => void;
}

export const useInventoryStore = create<InventoryState>()((set) => ({
  rows: [],
  count: 0,
  getInventory: async (page = 1, product_name?: string, id?: number) => {
    //@ts-ignore
    let data = await getInventory(page, product_name, id);
    let rows: InventoryRow[] = [];
    if (!data) return;

    // for (let index = 0; index < data.rows.length; ++index) {
    //   const row = data.rows[index];
    //   rows.push([
    //     row.category,
    //     row.id,
    //     row.product_name,
    //     row.papers,
    //     row.default_cog,
    //     row.default_ppu,
    //     row.default_ppu - (row.default_ppu - row.default_cog) * 0.1, //md discount
    //     row.default_ppu - (row.default_ppu - row.default_cog) * 0.2, //agent discount
    //     row.reorder_level,
    //     row.total_purchase_quantity,
    //     row.total_sale_quantity,
    //     row.inventory_balance,
    //     //row.default_ppu-((row.default_cog - row.default_ppu)*0.1)
    //     // row.initial_qty,
    //     // row.current_qty,
    //     // row.stock_status,
    //     // row.description,
    //   ]);
    // }
    set({ ...data });
  },
}));
