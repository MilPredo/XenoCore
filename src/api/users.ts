export const getUsers = async (
  page: number,
  username?: string,
  first_name?: string,
  middle_name?: string,
  last_name?: string,
) => {
  const baseUrl = "http://127.0.0.1:1338/user";
  const queryParams = new URLSearchParams();
  queryParams.append("page", `${page}`);
  if (username) {
    queryParams.append("username", `${username}`);
  }
  if (first_name) {
    queryParams.append("first_name", `${first_name}`);
  }
  if (middle_name) {
    queryParams.append("middle_name", `${middle_name}`);
  }
  if (last_name) {
    queryParams.append("last_name", `${last_name}`);
  }
  const apiUrl = `${baseUrl}?${queryParams.toString()}`;
  console.log(apiUrl);
  try {
    let response = await fetch(apiUrl, {
      method: "GET",
      credentials: "include",
    });

    let data: {
      rows: Array<{
        id: number,
        username: string;
        first_name: string;
        middle_name: string;
        last_name: string;
        occupation: string;
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
    authority;

    let response = await fetch("http://127.0.0.1:1338/user/register", {
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

export const getUsersProfile = async (id: number) => {
  const baseUrl = `http://127.0.0.1:1338/user/${id}`;
  try {
    let response = await fetch(baseUrl, {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { rows: [], count: 0 };
  }
};
