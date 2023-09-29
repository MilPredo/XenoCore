import { Box, Center, Flex, FlexProps, Heading, Stack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  FiBarChart,
  FiDollarSign,
  FiList,
  FiLogOut,
  FiPackage,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import ThemeSwitchButton from "./ThemeSwitchButton";
import NavLinkComponent from "./NavLinkComponent";
import CurrentUserNav from "./CurrentUserNav";
import "../fonts.css";
interface NavLinkItemProps extends FlexProps {
  icon: IconType;
  to: string;
  name: string;
  isActive?: boolean;
  isPending?: boolean;
}

function SideNavBar() {
  const LinkItems: Array<NavLinkItemProps> = [
    { name: "Statistics", to: "statistics", icon: FiBarChart },
    { name: "Inventory", to: "inventory", icon: FiPackage },
    { name: "User Management", to: "usermanagement", icon: FiUsers },
    { name: "Purchases", to: "purchases", icon: FiShoppingCart },
    { name: "Sales", to: "sales", icon: FiDollarSign },
  ];
  const { logout } = useAuthStore();
  return (
    <Flex flexDir={"column"} h="100vh" minW="240px" w="60">
      <Stack
        zIndex={1}
        _dark={{ bg: "#181830" }}
        //_light={{ bg: "rgb(241,245,143)" }}
        h="100vh"
        maxH="100vh"
        pos="fixed"
        w="60"
        py="2"
      >
        <Center mx="2" py="4" borderRadius={"xl"}>
          <Heading
            textAlign="center"
            fontFamily="MostlyMono"
            _light={{ letterSpacing: "widest" }}
            _dark={{ fontFamily: "NeverMindBauhaus-Bold" }}
          >
            Inventory System
          </Heading>
        </Center>
        <Stack
          p="2"
          mx="2"
          flex={1}
          overflowY={"scroll"}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          _dark={{
            bg: "rgb(31,31,63)",
            boxShadow:
              "inset 4px 4px 8px rgba(255, 255, 255, 0.02), inset -4px -4px 8px rgba(0, 0, 0, 0.02)",
            borderRadius: "xl",
          }}
          _light={{
            bg: "#BDFFFF",
            boxShadow: "",
          }}
          boxShadow={"base"}
        >
          {LinkItems.map((link) => (
            <NavLink key={link.name} to={link.to}>
              {({
                isActive,
                isPending,
              }: {
                isActive: boolean;
                isPending: boolean;
              }) => (
                <NavLinkComponent
                  name={link.name}
                  icon={link.icon}
                  isActive={isActive}
                  isPending={isPending}
                />
              )}
            </NavLink>
          ))}
        </Stack>

        <Stack
          p="2"
          mx="2"
          _light={{ bg: "#FFBDFF", boxShadow: "base" }}
          _dark={{ borderRadius: "xl" }}
        >
          <CurrentUserNav />
          <ThemeSwitchButton />
          <NavLinkComponent
            name={"Log Out"}
            icon={FiLogOut}
            onClick={() => {
              logout();
            }}
          />
        </Stack>
      </Stack>
    </Flex>
  );
}

export default SideNavBar;
