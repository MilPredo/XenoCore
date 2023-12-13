interface AddPurchaseData {
  product_id: string;
  quantity: string;
  cog?: number;
  transaction_date?: Date;
  delivery_date?: Date;
  delivery_status?: string;
  notes?: string;
  user_id: number;
  supplier_id?: number;
}

export const addPurchases = async (items: AddPurchaseData[]) => {
  try {
    let headersList = {
      "Content-Type": "application/json",
    };
    let bodyContent = JSON.stringify(items);

    let response = await fetch("http://127.0.0.1:1338/purchases", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
      credentials: "include",
    });

    let data: any = response;
    console.log("purchase order successful!", response.status)
    console.log(data.message);
    alert(data);
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
