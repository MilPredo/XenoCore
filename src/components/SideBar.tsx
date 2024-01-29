import {
  Box,
  StackItem,
  Text,
  VStack,
  Stack,
  Flex,
  Heading,
  Center,
  Badge,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FiBarChart2,
  FiBox,
  FiCheckSquare,
  FiDollarSign,
  FiPackage,
  FiPieChart,
  FiPlusSquare,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
  FiUsers,
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import NavLinkComponent from "./NavLinkComponent";
import "../fonts.css";
import { useAuthStore } from "../stores/authStore";

function SideBar() {
  const [modules, setModules] = useState([
    { name: "Dashboard", to: "dashboard", icon: FiBarChart2 },
    { name: "Inventory", to: "inventory", icon: FiPackage },
    { name: "Purchases", to: "purchases", icon: FiShoppingCart },
    { name: "Request", to: "request", icon: FiPlusSquare },
    { name: "Invoice", to: "invoice", icon: FiCheckSquare },
    { name: "Sales", to: "sales", icon: FiDollarSign },
    { name: "Customers", to: "customers", icon: FiUser },
    { name: "Suppliers", to: "suppliers", icon: FiBox },
    { name: "Products", to: "products", icon: FiShoppingBag },
    { name: "Users", to: "users", icon: FiUsers },
    { name: "Reports", to: "report", icon: FiPieChart },
  ]);
  const {colorMode} =useColorMode()
  const { user } = useAuthStore();
  return (
    <Flex flexDir="column" maxW="240px">
      <Center m="2" py="4" borderRadius={"xl"} _dark={{bg:"secondary.700"}}>
        {/* <Heading
          textAlign="center"
          fontFamily="MostlyMono"
          _light={{ letterSpacing: "widest" }}
          _dark={{ fontFamily: "NeverMindBauhaus-Bold" }}
          maxW="240px"
        >
          Inventory System
        </Heading> */}
        <Image
          src={colorMode==="dark"?"/oncotine_dark.png":"/oncotine.png"}
          alt="oncotine Logo"
          _dark={{ filter: "drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.25))"}}
        />
        {/* <img src="/oncotine_stroke.png" style={{filter}}/> */}
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
          <Flex gap="1" align="center">
            <Heading size="sm" fontWeight="bold" flexDir="column">
              Logged in as
            </Heading>
            <Heading
              p="4px"
              borderRadius="md"
              bg="accentA.500"
              _light={{
                bg: "accentB.500",
              }}
              size="sm"
              fontWeight="extrabold"
            >
              @{user.username}
            </Heading>
          </Flex>
          <Heading
            px={2}
            py={1}
            my={2}
            borderRadius="md"
            bg="secondary.800"
            _light={{
              bg: "secondary.100",
            }}
            size="sm"
            fontWeight="medium"
            textTransform="uppercase"
          >
            {`${user.last_name}, ${user.first_name} ${user.middle_name}`}
          </Heading>
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
