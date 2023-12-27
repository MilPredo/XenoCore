import { InventoryRow } from "../interface";

const getInventory = async (page: number = 1, product_name?: string, id?:number) => {
  // Define the base URL of the API
  const baseUrl = "http://127.0.0.1:1338/inventory"; // Replace with your API URL

  // Create a URLSearchParams object to manage query parameters
  const queryParams = new URLSearchParams();
  queryParams.append("page", `${page}`); // Replace '1' with the desired page number
  if(product_name) queryParams.append("product_name", `${product_name}`);
  if(id) queryParams.append("id", `${id}`);

  // Combine the base URL with the query parameters
  const apiUrl = `${baseUrl}?${queryParams.toString()}`;

  // Create the fetch request
  try {
    let response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // You can add any other headers if necessary
      },
      credentials: 'include'
    });
    let data: {
      rows: InventoryRow[];
      count: number;
    } = await response.json();
    console.log("get product:", response.status);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};


export default getInventory
