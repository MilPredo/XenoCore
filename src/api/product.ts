import { ProductRow } from "../interface";
import { SupplierData } from "../stores/supplierStore";

export const addProduct = async (
  product_name: string,
  category: string,
  default_cog?: number,
  default_ppu?: number,
  description?: string,
  reorder_level?: number,
  papers?: boolean,
  initial_qty?: number,
  current_qty?: number,
  stock_status?: string
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
      description,
    });

    let response = await fetch("http://127.0.0.1:1338/product", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      credentials: "include",
    });

    let data: any = response;
    console.log(data.message);
    //alert(data);
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const updateProduct = async (
  id: number,
  product: {
    product_name?: string;
    category?: string;
    default_cog?: number;
    default_ppu?: number;
    description?: string;
    reorder_level?: number;
    papers?: boolean;
    initial_qty?: number;
    current_qty?: number;
    stock_status?: string;
  }
) => {
  try {
    let headersList = {
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      id,
      ...product
    });
    console.log(bodyContent)
    let response = await fetch("http://127.0.0.1:1338/product", {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
      credentials: "include",
    });

    // let data: any = await response.json();
    console.log(response.status);
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// export interface ProductData {
//   product_name: string;
//   category: string;
//   default_cog: number;
//   default_ppu: number;
//   papers: string;
//   initial_qty: number;
//   reorder_level: number;
//   current_qty: number;
//   stock_status: string;
//   description: string;
// }

export const getProduct = async (page?: number, product_name?: string, id?: string) => {
  const queryParams = new URLSearchParams();

  const baseUrl = "http://127.0.0.1:1338/product";
  queryParams.append("page", `${page}`);
  queryParams.append("product_name", `${product_name}`);
  console.log("product api ", id);
  queryParams.append("id", `${id}`);
  const apiUrl = `${baseUrl}?${queryParams.toString()}`;
  try {
    let response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    });

    let data: {
      rows: ProductRow[];
      count: number;
    } = await response.json();
    console.log("get product:", response.status);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
