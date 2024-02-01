import { CustomerRow, ProductRow } from "../interface";
import { SupplierData } from "../stores/supplierStore";
import { serverRoute } from "./serverRoute";

export const addCustomer = async (
  first_name: string,
  middle_name: string,
  last_name: string,
  contact_number?: string,
  notes?: string
) => {
  try {
    // Construct the API route
    const apiRoute = `${window.location.protocol + '//' + window.location.hostname}:1338/customer`;

    let headersList = {
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify({
      first_name,
      middle_name,
      last_name,
      contact_number,
      notes,
    });

    let response = await fetch(apiRoute, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      credentials: "include",
    });

    let data: any = await response;
    console.log(data.message);
    //alert(data);
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

export const getCustomer = async (
  page?: number,
  first_name?: string,
  middle_name?: string,
  last_name?: string
) => {
  // Construct the API route
  const apiRoute = `${window.location.protocol + '//' + window.location.hostname}:1338/customer`;
  console.log("api route:", apiRoute);
  const queryParams = new URLSearchParams();
  const baseUrl = apiRoute;
  queryParams.append("page", `${page}`);
  queryParams.append("first_name", `${first_name}`);
  queryParams.append("middle_name", `${middle_name}`);
  queryParams.append("last_name", `${last_name}`);
  const apiUrl = `${baseUrl}?${queryParams.toString()}`;
  try {
    let response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    });

    let data: {
      rows: CustomerRow[];
      count: number;
    } = await response.json();
    console.log("get product:", response.status);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
