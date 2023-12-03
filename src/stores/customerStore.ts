import { create } from "zustand";
import { getSupplier } from "../api/supplier";
import { getProduct } from "../api/product";
import { getCustomer } from "../api/customer";

export interface CustomerState {
  rows: any[][];
  count: number;
  getCustomers: (page?: number, first_name?: string, middle_name?: string, last_name?: string) => void;
}

export const useCustomerStore = create<CustomerState>()((set) => ({
  rows: [],
  count: 0,
  getCustomers: async (page = 1, first_name = "", middle_name = "", last_name = "") => {
    let data = await getCustomer(page, first_name, middle_name, last_name);
    let rows: any[][] = [];
    if (!data) return;
    for (let index = 0; index < data.rows.length; ++index) {
      const row = data.rows[index];
      rows.push([row.first_name, row.middle_name, row.last_name, row.contact_number, row.notes]);
    }
    set({ ...data, rows });
  },
}));
