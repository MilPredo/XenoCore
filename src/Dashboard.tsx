import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Stack,
} from "@chakra-ui/react";
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
    <HStack gap='0'>
      {/*< Flex maxH="100vh"> <SideNavBar /> */}
      {/* <Box
        // _light={{ bg: "blue.200" }}
        flex={1}
        maxW="calc(100% - (240px))"
        maxH="100vh"
        // _dark={{ bg: '#0F0F1F' }}
        overflowX="hidden"
      >
        <Outlet />
      </Box> */}
      {/* <Flex
        flex={1}
        maxH="100%"
        flexDir="column"
        _dark={{ bg: "#0F0F1F" }}
        // pt={`${navBarHeight}px`}
        overflow="unset"
      >
        <Outlet />
      </Flex></Flex>*/}
      {/* <Flex h="100vh" pos="sticky" top="0" bottom="0" bg="red">

      </Flex> */}
      <SideNavBar />
      <Flex
        flex={1}
        maxH="100%"
        flexDir="column"
        _dark={{ bg: "#0F0F1F" }}
        // pt={`${navBarHeight}px`}
        h="100vh"
        w="100%"
        overflow="hidden"
      >
        {/* <Flex justify="flex-end" pos="sticky" top="0">
          <Button>Press me</Button>
          <Button>Press me</Button>
          <Button>Press me</Button>
          <Button>Press a</Button>
          <Button>Press me</Button>
        </Flex> */}
        <Outlet />
      </Flex>
    </HStack>
  );
}

// import {
//   Box,
//   Flex,
//   HStack,
//   Heading,
//   Link,
//   Spacer,
//   StackDivider,
//   StackItem,
//   Text,
//   VStack,
// } from "@chakra-ui/react";
// import React from "react";

// function Dashboard() {
//   return (
//     <Flex w="100%" h="100vh" overflow='hidden'>
//       <Box minW="240px" />
//       <VStack minW="240px" pos="fixed">
//         <StackItem>Project XenoCore</StackItem>
//         <StackItem>
//           <Link>asd</Link>
//         </StackItem>
//         <StackItem>
//           <Link>dsa</Link>
//         </StackItem>
//         <StackDivider />
//         <StackItem>
//           <Link>qwe</Link>
//         </StackItem>
//       </VStack>
//       <Flex flexDir="column" w="100%" maxH='100vh' overflow='auto'>
//         <Flex bg="red" pos="sticky" top='0'>
//           <Text>Navbar</Text>
//           <Spacer />
//           <Text>asd</Text>
//         </Flex>
//         <Box bg="orange">
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//           <Box my="8">asd</Box>
//         </Box>
//       </Flex>
//     </Flex>
//   );
// }

// export default Dashboard;
