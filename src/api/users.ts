const getUsers = async (page: number) => {
  const baseUrl = "http://127.0.0.1:1338/user";
  const queryParams = new URLSearchParams();
  queryParams.append("page", `${page}`);
  const apiUrl = `${baseUrl}?${queryParams.toString()}`;
  try {
    let response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    });

    let data: {
      rows: Array<{
        username: string;
        first_name: string;
        middle_name: string;
        last_name: string;
      }>;
      count: number;
    } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { rows: [], count: 0 };
  }
};

export default getUsers;
