import {
  Box,
  StackItem,
  Text,
  VStack,
  Stack,
  Flex,
  Heading,
  Center,
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
import { useAuthStore } from "../stores/authStore";

function SideBar() {
  const [modules, setModules] = useState([
    { name: "Statistics", to: "statistics", icon: FiBarChart },
    { name: "Inventory", to: "inventory", icon: FiPackage },
    { name: "Users", to: "users", icon: FiUsers },
    { name: "Purchases", to: "purchases", icon: FiShoppingCart },
    { name: "Sales", to: "sales", icon: FiDollarSign },
  ]);
  const { user } = useAuthStore();
  return (
    <Flex flexDir="column">
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
      <Flex gap="2" flexDir={"column"} flex={1} overflow="auto" m="2">
        {/* <StackItem mt="2">
          Project XenoCore
        </StackItem> */}
        <Stack
          boxShadow="md"
          zIndex={2}
          bg="secondary.700"
          _light={{ bg: "secondary.50" }}
          borderRadius="xl"
          py="1"
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
        <Flex
          boxShadow="md"
          zIndex={2}
          bg="secondary.700"
          _light={{ bg: "secondary.50" }}
          borderRadius="xl"
          p="2"
          flexDir={"column"}
          align="center"
        >
          <Heading size="sm" fontWeight="bold">
            Logged in as
          </Heading>
          <Heading size="sm" fontWeight="medium" textTransform="capitalize">
            {`${user.last_name}, ${user.first_name} ${user.middle_name}`}
          </Heading>
          <Flex>
            <Text>
              @{user.username}
            </Text>
          </Flex>
        </Flex>
      </Flex>
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
