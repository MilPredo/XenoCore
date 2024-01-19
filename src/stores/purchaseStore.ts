import { create } from "zustand";
import { getSupplier } from "../api/supplier";
import { getProduct } from "../api/product";
import { getPurchases } from "../api/purchase";

export interface PurchaseState {
  rows: any[][];
  count: number;
  getPurchases: (page?: number, product_name?: string, id?: string) => void;
}

export const usePurchaseStore = create<PurchaseState>()((set) => ({
  rows: [],
  count: 0,
  getPurchases: async (page = 1, product_name = "", id = "") => {
    let data = await getPurchases(page, product_name, id);
    //console.log(data.rows);
    let rows: any[][] = [];
    if (!data) return;
    for (let index = 0; index < data.rows.length; ++index) {
      const row = data.rows[index];
      rows.push([
        row.supplier_name,
        row.product_id,
        row.product_name,
        row.quantity,
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(row.cog),
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(row.cog * row.quantity),
        row.transaction_date ? new Date(row.transaction_date).toLocaleDateString() : "",
        row.delivery_date ? new Date(row.delivery_date).toLocaleDateString() : "",
        row.delivery_status,
        // row.papers,
        // row.initial_qty,
        // row.reorder_level,
        // row.current_qty,
        // row.stock_status,
        row.username,
      ]);
    }
    console.log("hallo",rows)
    set({ ...data, rows });
  },
}));

// export const useProductPurchaseStore = create<ProductState>()((set) => ({
//   rows: [],
//   count: 0,
//   getProducts: async (page = 1, product_name = '') => {
//     let data = await getProduct(page, product_name);
//     let rows: any[][] = []
//     if (!data) return
//     for (let index = 0; index < data.rows.length; ++index) {
//         const row = data.rows[index];
//         rows.push([
//             row.category,
//             row.product_name,
//             new Intl.NumberFormat("en-PH", {
//               style: "currency",
//               currency: "PHP",
//             }).format(row.default_cog)
//             ,
//             new Intl.NumberFormat("en-PH", {
//               style: "currency",
//               currency: "PHP",
//             }).format(row.default_ppu),
//             // row.papers,
//             // row.initial_qty,
//             // row.reorder_level,
//             // row.current_qty,
//             // row.stock_status,
//             row.description
//         ])
//     }
//     set({ ...data, rows });
//   },
// }));
