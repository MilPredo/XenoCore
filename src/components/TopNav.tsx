import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { useAuthStore } from "../stores/authStore";
import { useLocation } from "react-router-dom";
//dominant.900
//secondary.800
//accentA.500
//accentB.600
function TopNav() {
  const { logout } = useAuthStore();
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation()
  return (
    <Flex gap='2' align='center' boxShadow='md' zIndex={2} m='2' borderRadius='xl' bg="accentA.500" _light={{bg:"accentB.500"}} pos="sticky" top="2" p="2">
      <Heading m='2' size="md" textTransform={'capitalize'}>{location.pathname}</Heading>
      <Spacer />
      <Button
        leftIcon={colorMode === "light" ? <FiMoon/> : <FiSun/>}
        // colorScheme="teal"
        variant="predo"
        onClick={toggleColorMode}
      >
        {`${colorMode === "light" ? "Dark" : "Light"} Mode`}
      </Button>
      <Button
      leftIcon={<FiLogOut/>}
        // colorScheme="teal"
        onClick={logout}
      >
        Log Out
      </Button>
    </Flex>
  );
}

export default TopNav;
