export const getUsers = async (page: number) => {
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

export const registerUser = async (
  username: string,
  password: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  authority: string
) => {
  // const queryParams = new URLSearchParams();
  // queryParams.append("page", `${page}`);
  // const apiUrl = `${baseUrl}?${queryParams.toString()}`;
  try {
    let headersList = {
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      username: username,
      password: password,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
    });
    authority

    let response = await fetch("http://127.0.0.1:1338/user/register", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    console.log(data.message);
    alert(data)
    return response;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export default getUsers;
