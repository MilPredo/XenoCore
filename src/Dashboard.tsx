import React, { ReactNode, useEffect } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideNavBar from "./components/SideNavBar";

export default function Dashboard() {
  return (
    <Flex maxH="100vh">
      <SideNavBar />
      <Box
        // _light={{ bg: "blue.200" }}
        flex={1}
        maxW="calc(100% - (240px))"
        maxH="100vh"
        // _dark={{ bg: '#0F0F1F' }}
        overflowX="hidden"
      >
        <Box h="60px">
          <Flex pos="fixed" flex="1">
            <Heading>Test</Heading>
          </Flex>
        </Box>
        <Outlet />
      </Box>
    </Flex>
  );
}
