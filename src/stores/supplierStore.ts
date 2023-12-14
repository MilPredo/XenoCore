import { create } from "zustand";
import { getSupplier } from "../api/supplier";

export interface SupplierState {
  rows: (string[] | undefined)[];
  count: number;
  getSuppliers: (page?: number, supplier_name?: string) => void;
}

export interface SupplierData {
  id: number;
  supplier_name: string;
  address: string;
  contact_number: string;
  email: string;
  notes: string;
}

export const useSupplierStore = create<SupplierState>()((set) => ({
  rows: [],
  count: 0,
  getSuppliers: async (page = 1, supplier_name = '') => {
    let data = await getSupplier(page, supplier_name);
    let rows: (string[] | undefined)[] = []
    if (!data) return
    for (let index = 0; index < data.rows.length; ++index) {
        const row = data.rows[index];
        rows.push([
            row.supplier_name,
            row.address,
            row.contact_number,
            row.email,
            row.notes,
        ])
    }
    set({ ...data, rows });
  },
}));
