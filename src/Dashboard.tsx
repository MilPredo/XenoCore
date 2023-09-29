import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideNavBar from "./components/SideNavBar";
import NavLinkComponent from "./components/NavLinkComponent";
import ThemeSwitchButton from "./components/ThemeSwitchButton";
import { FiLogOut } from "react-icons/fi";
import { useAuthStore } from "./stores/authStore";
import { useNavHeight } from "./stores/navHeight";

export default function Dashboard() {
  const { logout } = useAuthStore();
  const { navBarHeight, setNavBarHeight } = useNavHeight();
  const [navBarWidth, setNavBarWidth] = useState(0);
  // Create a ref to the navbar
  const navbarRef = useRef(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update the screenWidth state
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    // Attach an event listener for the resize event
    window.addEventListener("resize", updateScreenWidth);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  useEffect(() => {
    // Calculate the navbar's height
    if (navbarRef.current) {
      //@ts-ignore
      const height = navbarRef.current.clientHeight;
      //@ts-ignore
      const width = navbarRef.current.clientWidth;
      setNavBarHeight(height);
      setNavBarWidth(width);
    }
  }, [screenWidth]);
  return (
    <Flex maxH="100vh">
      <SideNavBar />
      <Box
        // _light={{ bg: "blue.200" }}
        flex={1}
        maxW="calc(100% - (240px))"
        maxH="100vh"
        // _dark={{ bg: '#0F0F1F' }}
        overflowX="hidden"
      >
        <Box>
          <Flex ref={navbarRef} pos="fixed" flex="1">
            <Flex
              px={2}
              _light={{ bg: "#FFBDFF", boxShadow: "base" }}
              _dark={{ borderRadius: "xl" }}
            >
              <Flex>
                <Stack direction="row" py="2">
                  <ThemeSwitchButton />
                  <NavLinkComponent
                    name={"Log Out"}
                    icon={FiLogOut}
                    onClick={() => {
                      logout();
                    }}
                  />
                </Stack>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <Outlet />
      </Box>
    </Flex>
  );
}
