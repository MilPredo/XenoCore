import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root.tsx";
import { createBrowserRouter, RouterProvider, createHashRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { Box, ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";

import Inventory from "./pages/Inventory.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import NotFound from "./pages/NotFound.tsx";
import theme from "./theme.ts";
import Users from "./pages/Users.tsx";
import Sales from "./pages/Sales.tsx";
import Profile from "./pages/Profile.tsx";
import Purchases from "./pages/Purchases.tsx";
import Products from "./pages/Products.tsx";
import Suppliers from "./pages/Suppliers.tsx";
import Customers from "./pages/Customers.tsx";
import Dashboard from "./pages/Dashboard.tsx";

/*
Pahabol ...
Naalala ko, sabi ni Madam ...
Na iba Agent price at MD price sa gen sheet na may Unit Price/cost, kaya padagdag ng dalawa pa columns ...

Agent price
MD price

Actually...
MD Price = Unit cost minus [(unit cost minus COG) × 10%] 

Example:
COG = 1,500
Unit cost = 2,000
Unit cost - CoG = 500
500 x 0.10 = 50
2,000 - 50 = 1,950 = MD Price

And

Agent Price = Unit cost minus [(unit cost minus COG) × 20%] 

Example:
COG = 1,500
Unit cost = 2,000
Unit cost - CoG = 500
500 x 0.20 = 100
2,000 - 100 = 1,900 = Agent Price

*/
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Root />} />,
    children: [
      {
        path: "inventory",
        element: <Inventory />,
      },
      // {
      //   path: "dashboard",
      //   element: <Dashboard />,
      // },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "purchases",
        element: <Purchases />,
      },
      {
        path: "suppliers",
        element: <Suppliers />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <Profile />,
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
