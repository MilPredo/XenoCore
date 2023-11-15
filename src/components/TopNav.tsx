import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useAuthStore } from "../stores/authStore";
//dominant.900
//secondary.800
//accentA.500
//accentB.600
function TopNav() {
  const { logout } = useAuthStore();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex boxShadow='md' zIndex={2} m='2' borderRadius='xl' bg="accentA.500" _light={{bg:"accentB.600"}} pos="sticky" top="2" p="2">
      <Text>Navbar</Text>
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
        // colorScheme="teal"
        onClick={logout}
      >
        Log Out
      </Button>
    </Flex>
  );
}

export default TopNav;
