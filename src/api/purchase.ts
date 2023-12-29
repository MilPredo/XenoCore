import { serverRoute } from "./serverRoute";

export interface AddPurchaseData {
  product_id: number;
  quantity: number;
  cog?: number;
  transaction_date?: Date;
  delivery_date?: Date;
  delivery_status?: string;
  notes?: string;
  user_id: number;
  supplier_id?: number;
}

export interface GetPurchaseData {
  id: number,
  product_id: number,
  quantity: number,
  cog: number,
  transaction_date: string,
  delivery_date?: string | null,
  delivery_status: string,
  notes?: string | null,
  user_id: number | null,
  supplier_id?: number,
  product_name: string,
  supplier_name?: string
  username?: string
}

export const addPurchases = async (items: AddPurchaseData[]) => {
  try {
    let headersList = {
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify(items);

    let response = await fetch(`${await serverRoute()}/purchases`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      credentials: "include",
    });

    let data: any = response;
    console.log("purchase order successful!", response.status)
    console.log(data.message);
    //alert(data);
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};


export const getPurchases = async (
  page?: number,
  product_name?: string,
  id?: string
) => {
  const queryParams = new URLSearchParams();

  const baseUrl = `${await serverRoute()}/purchases`;
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
      rows: GetPurchaseData[];
      count: number;
    } = await response.json();
    console.log("get purchases:", response.status);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

