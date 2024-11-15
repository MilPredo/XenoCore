import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { Box, ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

import Inventory from "./pages/Inventory.tsx";
import UserManagement from "./pages/UserManagement.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import NotFound from "./pages/NotFound.tsx";
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />,
    children: [
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "sales",
        element: <Inventory />,
      },
      {
        path: "usermanagement",
        element: <UserManagement />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <Box w='100vw' h='100vh'><NotFound /></Box>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
