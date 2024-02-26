import { serverRoute } from "./serverRoute";

export interface AddRequestItem {
  product_id: number;
  quantity: number;
  ppu: number;
  cog: number;
}

export interface AddRequestData {
  user_id: number;
  address: number;
  delivery_date: number;
  is_invoiced: number;
  discount_type: number;
  transaction_date?: Date;
  admin_id: number;
  notes: string;
  items: Partial<Array<AddRequestItem>>;
}
/* 
customer_id, 
product_id, 
user_id, 
quantity, 
ppu, 
transaction_date, 
payment_method, 
remittance_status, 
user_type
*/

export interface GetRequestItem {
  request_id: number;
  product_id: number;
  quantity: number;
  ppu: number;
  cog: number;
}

export interface GetRequestData {
  user_id: number;
  address: number;
  delivery_date: number;
  is_invoiced: number;
  discount_type: number;
  transaction_date?: Date;
  admin_id: number;
  notes: string;
}

export const addRequest = async (items: AddRequestData[]) => {
  try {
    let headersList = {
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify(items);
    console.log("sale", bodyContent);
    let response = await fetch(`${window.location.protocol + "//" + window.location.hostname}:1338/invoice`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      credentials: "include",
    });

    let data: any = response;
    console.log("sale order successful!", response.status);
    console.log(data.message);
    // alert(data);
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getRequest = async (page?: number, request_id?: number, id?: number) => {
  const queryParams = new URLSearchParams();

  const baseUrl = `${window.location.protocol + "//" + window.location.hostname}:1338/invoice`;
  queryParams.append("page", `${page}`);
  queryParams.append("request_id", `${request_id}`);
  console.log("product api ", id);
  queryParams.append("product_id", `${id}`);
  const apiUrl = `${baseUrl}?${queryParams.toString()}`;
  try {
    let response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    });

    let data: {
      rows: GetRequestData[];
      count: number;
    } = await response.json();
    console.log("get purchases:", response.status);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const getRequestItem = async (request_id?: number) => {
  const apiUrl = `${window.location.protocol + "//" + window.location.hostname}:1338/invoice/${request_id}`;
  try {
    let response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    });

    let data: {
      rows: GetRequestItem[];
      count: number;
    } = await response.json();
    console.log("get purchases:", response.status);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
