import { Box, Flex, FlexProps, Icon, Text, useBoolean } from "@chakra-ui/react";
import { useState } from "react";
import { IconType } from "react-icons";
/*
yellow (241,245,143)
orange (255,169,48)
*/

interface NavLinkComponentProps extends FlexProps {
  icon: IconType;
  name: string;
  isActive?: boolean;
  isPending?: boolean;
}

//dominant.900
//secondary.800
//accentA.500
//accentB.600
function NavLinkComponent({
  icon,
  name,
  isActive = false,
  isPending = false,
  ...rest
}: NavLinkComponentProps) {
  const [hover, setHover] = useBoolean();
  return (
    <Box
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none", bg: "primary" }}
    >
      <Flex
        align="center"
        p="2"
        my="1"
        mx="2"
        role="group"
        onMouseEnter={setHover.on}
        onMouseLeave={setHover.off}
        cursor="pointer"
        _dark={{
          transition: "0.5s",
          _hover: {
            bg: isActive ? "accentA.500" : "accentB.600",
            // bgGradient: isActive
            //   ? "linear(to-tl, purple.500, blue.500)"
            //   : "linear(to-tl, blue.400, cyan.400)",
            boxShadow:"inset 0px 0px 8px 2px rgba(255, 255, 255, 0.125), 0px 0px 8px 2px rgba(255, 255, 255, 0.125)",
             // "inset 0px 0px 8px 2px rgba(255, 255, 255, 0.5), 0px 0px 8px 2px rgba(255, 255, 255, 0.5)",
          },
          bg: isActive ? "accentA.500" : "transparent",
          // bgGradient: isActive
          //   ? "linear(to-tl, cyan.600, cyan.600)"
          //   : "linear(to-tl, blue.500, cyan.500)",
          boxShadow: isActive
            ? "inset 0px 0px 8px 2px rgba(255, 255, 255, 0.125), 0px 0px 8px 2px rgba(255, 255, 255, 0.125)"
            : "",
          borderRadius: "lg",
        }}
        _light={{
          _hover: {
            boxShadow: "inset 0px 0px 0px 2px rgba(0, 0, 0, 1)",
          },
          bg: isActive ? "accentB.500" : "transparent",
          boxShadow: isActive ? "inset 0px 0px 0px 2px rgba(0, 0, 0, 1)" : "",
          // boxShadow: isActive ? "md" : "base",
          borderRadius: "lg",
          transition: "0.25s",
          // transform: isActive ? "scale(1.05,1.05)" : "",
        }}
        zIndex={2}
        // boxShadow={
        //   isActive ? "inset 0px 0px 0px 2px rgb(129, 199, 132)" : ""
        // }
        {...rest}
      >
        <Flex
          transition="transform 0.2s"
          transform={hover && !isActive ? "translateX(6px)" : isActive ? "translateX(2px)" : ""}
          align='center'
        >
          {icon && <Icon mr="2" fontSize="lg" as={icon} />}
          <Text
            mr="2"
            fontFamily="Hand"
            fontSize=""
            fontWeight="bold"
            _dark={{ fontFamily: "Rounded", fontWeight: "bold" }}
            userSelect={"none"}
          >
            {name}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default NavLinkComponent;
