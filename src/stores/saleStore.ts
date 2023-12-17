import { create } from "zustand";
import { getSupplier } from "../api/supplier";
import { getProduct } from "../api/product";
import { getPurchases } from "../api/purchase";
import { getSales } from "../api/sale";

export interface SaleState {
  rows: any[][];
  count: number;
  getSales: (page?: number, product_name?: string) => void;
}

export const useSaleStore = create<SaleState>()((set) => ({
  rows: [],
  count: 0,
  getSales: async (page = 1, product_name = "") => {
    let data = await getSales(page, product_name);
    //console.log(data.rows);
    let rows: any[][] = [];
    if (!data) return;
    for (let index = 0; index < data.rows.length; ++index) {
      const row = data.rows[index];
      rows.push([
        `${row.customer_first_name} ${row.customer_middle_name} ${row.customer_last_name}`,
        row.product_name,
        row.quantity,
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(row.ppu),
        new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(row.ppu * row.quantity),
        row.payment_method,
        row.remittance_status,
        row.transaction_date ? new Date(row.transaction_date).toLocaleDateString() : "",
        row.username,
        row.user_type,
        // row.papers,
        // row.initial_qty,
        // row.reorder_level,
        // row.current_qty,
        // row.stock_status,
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
