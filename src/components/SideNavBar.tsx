import { Center, Flex, FlexProps, Heading, Stack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FiList, FiLogOut, FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import ThemeSwitchButton from "./ThemeSwitchButton";
import NavLinkComponent from "./NavLinkComponent";

interface NavLinkItemProps extends FlexProps {
  icon: IconType;
  to: string;
  name: string;
  isActive?: boolean;
  isPending?: boolean;
}

function SideNavBar() {
  const LinkItems: Array<NavLinkItemProps> = [
    { name: "Inventory", to: "inventory", icon: FiList },
    { name: "User Management", to: "usermanagement", icon: FiUsers },
  ];
  const { logout } = useAuthStore();
  return (
    <Flex flexDir={"column"} pos="fixed" h="100vh">
      <Stack
        py="2"
        w={{ base: "full", md: 60 }}
        flex={1}
        flexDir={"column"}
        overflow={"auto"}
      >
        <Center mx="2" py="4" borderRadius={"xl"}>
          <Heading>Title Here</Heading>
        </Center>
        <Stack
          py="2"
          flex={1}
          mx="2"
          borderRadius={"xl"}
          overflowY={"scroll"}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          _dark={{
            bg: "blue.900",
          }}
          _light={{
            bg: "blue.50",
            boxShadow: "md",
          }}
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
        <Stack py="2" mx="2" borderRadius={"xl"}>
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
