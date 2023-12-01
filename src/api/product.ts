import { SupplierData } from "../stores/supplierStore";

export const addProduct = async (
  product_name: string,
  category: string,
  default_cog?: number,
  default_ppu?: number,
  papers?: string,
  initial_qty?: number,
  reorder_level?: number,
  current_qty?: number,
  stock_status?: string,
  description?: string
) => {
  try {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      product_name,
      category,
      default_cog,
      default_ppu,
      papers,
      initial_qty,
      reorder_level,
      current_qty,
      stock_status,
      description
    });

    let response = await fetch("http://127.0.0.1:1338/product", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      credentials: "include",
    });

    let data = await response.json();
    console.log(data.message);
    alert(data);
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export interface ProductData {
  product_name: string;
  category: string;
  default_cog: number;
  default_ppu: number;
  papers: string;
  initial_qty: number;
  reorder_level: number;
  current_qty: number;
  stock_status: string;
  description: string;
}

export const getProduct = async (page?: number, product_name?: string) => {
  const queryParams = new URLSearchParams();
  const baseUrl = "http://127.0.0.1:1338/product";
  queryParams.append("page", `${page}`);
  queryParams.append("product_name", `${product_name}`);
  const apiUrl = `${baseUrl}?${queryParams.toString()}`;
  try {
    let response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    });

    let data: {
      rows: ProductData[];
      count: number;
    } = await response.json();
    console.log("get product:", response.status);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
