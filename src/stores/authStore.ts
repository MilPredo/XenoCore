import { create } from "zustand";
import supabase from "../api/supabase";
import { useNavigate } from "react-router";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  error: any;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Check if there is a user session in local storage
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    isAuthenticated: !!initialUser,
    user: initialUser,
    error: null,
    login: async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          console.log(
            "Error signing in:",
            (error as { message: string }).message
          );
          alert(JSON.stringify(error));
          set({ user: null, error, isAuthenticated: false });
        } else if (data.user) {
          // Store the user session in local storage
          localStorage.setItem("user", JSON.stringify(data));
          const {
            data: { session },
          } = await supabase.auth.getSession();
          console.log(session);
          set({ user: data, error: null, isAuthenticated: true });
        } else {
          set({ user: null, error, isAuthenticated: false });
        }
      } catch (error) {
        console.log("Error:", error);
        set({ user: null, error, isAuthenticated: false });
      }
    },
    logout: async () => {
      // Clear the user session from local storage
      try {
        const res = await supabase.auth.signOut();
        console.log(res)
        set({ isAuthenticated: false, user: null, error: null });
      } catch (error) {
        console.log("Error:", error);
      }
      //localStorage.removeItem("user");
    },
  };
});
