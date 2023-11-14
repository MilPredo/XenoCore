import {
  Box,
  StackItem,
  Text,
  VStack,
  Stack,
  Flex,
  Heading,
  Center
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FiBarChart,
  FiDollarSign,
  FiPackage,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import NavLinkComponent from "./NavLinkComponent";
import "../fonts.css";

function SideBar() {
  const [modules, setModules] = useState([
    { name: "Statistics", to: "statistics", icon: FiBarChart },
    { name: "Inventory", to: "inventory", icon: FiPackage },
    { name: "Users", to: "users", icon: FiUsers },
    { name: "Purchases", to: "purchases", icon: FiShoppingCart },
    { name: "Sales", to: "sales", icon: FiDollarSign },
  ]);
  return (
    <Flex bg="secondary.800" _light={{bg:"secondary.50"}} flexDir="column" >
        <Center mx="2" py="4" borderRadius={"xl"}>
          <Heading
            textAlign="center"
            fontFamily="MostlyMono"
            _light={{ letterSpacing: "widest" }}
            _dark={{ fontFamily: "NeverMindBauhaus-Bold" }}
            maxW="240px" 
          >
            Inventory System
          </Heading>
        </Center>
      <Stack flex={1} overflow="auto">
        {/* <StackItem mt="2">
          Project XenoCore
        </StackItem> */}
        <Stack
          pt='1'
          spacing={0}
          overflowY={"scroll"}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {modules.map((module) => (
            <NavLink key={module.name} to={module.to}>
              {({
                isActive,
                isPending,
              }: {
                isActive: boolean;
                isPending: boolean;
              }) => (
                <NavLinkComponent
                  name={module.name}
                  icon={module.icon}
                  isActive={isActive}
                  isPending={isPending}
                />
              )}
            </NavLink>
          ))}
        </Stack>
      </Stack>
    </Flex>
    // <Box p="2">
    //   <Box minW="240px" m='5' >
    //     <Stack minW="240px" overflow='auto'>
    //       <StackItem>Project XenoCore</StackItem>

    //     </Stack>
    //   </Box>
    // </Box>
  );
}

export default SideBar;
