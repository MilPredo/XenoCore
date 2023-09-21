import React, { ReactNode, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideNavBar from "./components/SideNavBar";

export default function Dashboard() {
  return (
    <Box>
      <Flex minH="100vh">
        <SideNavBar />  
        <Box flex={1} ml={{ base: "full", md: 60 }} p="4">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}
