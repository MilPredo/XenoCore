import { Button, useColorMode } from "@chakra-ui/react";
import NavLinkComponent from "./NavLinkComponent";
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeSwitchButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <NavLinkComponent
      name={`${colorMode === "light" ? "Dark" : "Light"} Mode`}
      icon={colorMode === "light" ? FiMoon : FiSun}
      onClick={toggleColorMode}
    />
  );
}

export default ThemeSwitchButton;
