import { SupplierData } from "../stores/supplierStore";
import { serverRoute } from "./serverRoute";

export const addSupplier = async (
  supplier_name: string,
  address: string,
  contact_number: string,
  email: string,
  notes: string
) => {
  // const queryParams = new URLSearchParams();
  // queryParams.append("page", `${page}`);
  // const apiUrl = `${baseUrl}?${queryParams.toString()}`;
  try {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      supplier_name,
      address,
      contact_number,
      email,
      notes,
    });

    let response = await fetch(`${window.location.protocol + '//' + window.location.hostname}:1338/supplier`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      credentials: "include",
    });

    let data = await response.json();
    console.log(data.message);
    //alert(data);
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getSupplier = async (page?: number, supplier_name?: string) => {
  const queryParams = new URLSearchParams();
  const baseUrl = `${window.location.protocol + '//' + window.location.hostname}:1338/supplier`
  queryParams.append("page", `${page}`);
  queryParams.append("supplier_name", `${supplier_name}`);
  const apiUrl = `${baseUrl}?${queryParams.toString()}`;
  try { 

    let response = await fetch(apiUrl, {
      method: "GET", 
      credentials: "include",
    });

    let data: {
      rows: SupplierData[];
      count: number;
    } = await response.json();
    console.log("get supplier:", response.status);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
