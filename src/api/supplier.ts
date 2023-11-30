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

    let response = await fetch("http://127.0.0.1:1338/supplier", {
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
