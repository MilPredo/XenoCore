import { create } from "zustand";
import { useNavigate } from "react-router";
import Cookies from 'js-cookie';
interface AuthState {
  isAuthenticated: boolean;
  user: any;
  error: any;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Check if there is a user session in local storage
  const storedUser = Cookies.get("session");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    isAuthenticated: !!initialUser,
    user: initialUser,
    error: null,
    login: async (username: string, password: string) => {
      try {
        // const { data, error } = await supabase.auth.signInWithPassword({
        //   email: email,
        //   password: password,
        // });
        let headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
          username: username,
          password: password,
        });

        let response = await fetch("http://127.0.0.1:1338/user/login", {
          method: "POST",
          body: bodyContent,
          headers: headersList,
          credentials: 'include'
        });

        let data = await response.json();
        console.log(data);
        console.log("cookie: ", response.headers.getSetCookie());

        if (data.user) {
          // Store the user session in local storage
          //localStorage.setItem("user", JSON.stringify(data.user));
          Cookies.set("session", JSON.stringify(data.user));
          // const {
          //   data: { session },
          // } = await supabase.auth.getSession();
          // console.log(session);
          console.log("data: ", Cookies.get('session'))
          console.log(data);
          set({ user: data.user, error: null, isAuthenticated: true });
        } else {
          console.log(
            "Error signing in:",
            data.error
            // (error as { message: string }).message
          );
          alert(data.error);
          set({ user: null, error: data.error, isAuthenticated: false });
        }

        // if (!data.user) {

        // } else if (data.user) {
        //   // Store the user session in local storage
        //   localStorage.setItem("user", JSON.stringify(data));
        //   // const {
        //   //   data: { session },
        //   // } = await supabase.auth.getSession();
        //   // console.log(session);
        //   console.log(data);
        //   set({ user: data, error: null, isAuthenticated: true });
        // } else {
        //   set({ user: null, error: data.error, isAuthenticated: false });
        // }
      } catch (error) {
        console.log("Error:", error);
        set({ user: null, error, isAuthenticated: false });
      }
    },
    logout: async () => {
      // Clear the user session from local storage
      try {
        // const res = await supabase.auth.signOut();
        let headersList = {
          Accept: "*/*",
        };

        let response = await fetch("http://127.0.0.1:1338/user/logout", {
          method: "POST",
          headers: headersList,
        });

        let data = await response.json();
        console.log(data);
       0// localStorage.removeItem("user");
        Cookies.remove("user")
        set({ user: null, error: null, isAuthenticated: false });
      } catch (error) {
        console.log("Error:", error);
      }
    },
  };
});
