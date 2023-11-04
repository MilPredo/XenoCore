import { Box, StackItem, Text, VStack } from "@chakra-ui/layout";
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

function SideBar() {
  const [modules, setModules] = useState([
    { name: "Statistics", to: "statistics", icon: FiBarChart },
    { name: "Inventory", to: "inventory", icon: FiPackage },
    { name: "Users", to: "users", icon: FiUsers },
    { name: "Purchases", to: "purchases", icon: FiShoppingCart },
    { name: "Sales", to: "sales", icon: FiDollarSign },
  ]);
  return (
    <Box>
      <Box minW="240px" />
      <VStack minW="240px" pos="fixed">
        <StackItem>Project XenoCore</StackItem>
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
      </VStack>
    </Box>
  );
}

export default SideBar;
