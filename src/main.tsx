import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./Dashboard.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { Box, ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";



import Inventory from "./pages/Inventory.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import NotFound from "./pages/NotFound.tsx";
import theme from "./theme.ts";
import Users from "./pages/Users.tsx";
import Sales from "./pages/Sales.tsx";
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
        element: <Sales />,
      },
      {
        path: "users",
        element: <Users />,
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
    errorElement: (
      <Box w="100vw" h="100vh">
        <NotFound />
      </Box>
    ),
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
      {/* <Dashboard/> */}
    </ChakraProvider>
  </React.StrictMode>
);
