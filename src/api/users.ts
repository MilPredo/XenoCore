const getUsers = async (page: number) => {
    // Define the base URL of the API
    const baseUrl = "http://127.0.0.1:1338/user"; // Replace with your API URL
  
    // Create a URLSearchParams object to manage query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("page", `${page}`); // Replace '1' with the desired page number
  
    // Combine the base URL with the query parameters
    const apiUrl = `${baseUrl}?${queryParams.toString()}`;
    console.log(apiUrl)
    // Create the fetch request
    try {
      let response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${sessionID}`
          // You can add any other headers if necessary
        }
      });
      console.log(await response.json());
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  
  
  export default getUsers
  