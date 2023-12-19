export interface AddSaleData {
  customer_id: number;
  product_id: number;
  user_id: number;
  quantity: number;
  ppu: number;
  transaction_date?: Date;
  payment_method: number;
  remittance_status: number;
  user_type: number;
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

export interface GetSaleData {
  id: number;
  customer_id: number;
  product_id: number;
  user_id: number;
  quantity: number;
  ppu: number;
  transaction_date: Date;
  payment_method: number;
  remittance_status: number;
  user_type: number;
  customer_first_name: string;
  customer_middle_name: string;
  customer_last_name: string;
  product_name: string;
  username: string;
}

export const addSales = async (items: AddSaleData[]) => {
  try {
    let headersList = {
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify(items);
    console.log('sale',bodyContent)
    let response = await fetch("http://127.0.0.1:1338/sales", {
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

export const getSales = async (
  page?: number,
  product_name?: string,
  id?: string
) => {
  const queryParams = new URLSearchParams();

  const baseUrl = "http://127.0.0.1:1338/sales";
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
      rows: GetSaleData[];
      count: number;
    } = await response.json();
    console.log("get purchases:", response.status);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
