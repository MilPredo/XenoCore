import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiUsers,
  FiSettings,
  FiMenu,
  FiList,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import Inventory from "./pages/Inventory";
import { Outlet, Link, Navigate, NavLink } from "react-router-dom";
import SideBar from "./components/SideBar";
interface LinkItemProps {
  name: string;
  to: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Inventory", to: "inventory", icon: FiList },
  { name: "User Management", to: "usermanagement", icon: FiUsers },
  { name: "Settings", to: "settings", icon: FiSettings },
  { name: "Log Out", to: "/login", icon: FiLogOut },
];

export default function Dashboard() {
  return (
    <Box minH="100vh">
      <Flex
        bg={useColorModeValue("white", "gray.900")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
      ></Flex>
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
    // <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
    //   <SidebarContent
    //     onClose={() => onClose}
    //     display={{ base: "none", md: "block" }}
    //   />
    //   <Drawer
    //     isOpen={isOpen}
    //     placement="left"
    //     onClose={onClose}
    //     returnFocusOnClose={false}
    //     onOverlayClick={onClose}
    //     size="full"
    //   >
    //     <DrawerContent>
    //       <SidebarContent onClose={onClose} />
    //     </DrawerContent>
    //   </Drawer>
    //   <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
    //   <Box ml={{ base: 0, md: 60 }} p="4">
    //     <Outlet />
    //   </Box>
    // </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Flex
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex alignItems="center" mx="8" my="4" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Inventory System
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Flex flex={1} bg="red" flexDir={"column"}>
        <Box flex={1}>
          {LinkItems.map((link) => (
            <NavItem key={link.name} to={link.to} icon={link.icon}>
              {link.name}
            </NavItem>
          ))}
        </Box>
        <Box flex={1} bg="green">
          asd
        </Box>
      </Flex>
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  to: string;
  children: string | number;
}
const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Box
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none", bg: "primary" }}
        >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "rgba(255,255,255,0.2)",
              color: "white",
            }}
            boxShadow={
              isActive ? "inset 0px 0px 0px 2px rgba(135, 206, 250, 0.5)" : ""
            }
            {...rest}
          >
            {icon && (
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </Box>
      )}
    </NavLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Inventory System
      </Text>
    </Flex>
  );
};
