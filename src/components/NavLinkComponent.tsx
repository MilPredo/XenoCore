import { Box, Flex, FlexProps, Icon, Text } from "@chakra-ui/react";
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
function NavLinkComponent({
  icon,
  name,
  isActive = false,
  isPending = false,
  ...rest
}: NavLinkComponentProps) {
  return (
    <Box
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none", bg: "primary" }}
    >
      <Flex
        align="center"
        p="4"
        mx="2"
        role="group"
        cursor="pointer"
        _dark={{
          transition: "0.5s",
          _hover: {
            //bg: isActive ? "green.500" : "blue.300",
            bgGradient: isActive
              ? "linear(to-tl, purple.500, blue.500)"
              : "linear(to-tl, blue.400, cyan.400)",
            boxShadow:
              "inset 0px 0px 8px 2px rgba(255, 255, 255, 0.5), 0px 0px 8px 2px rgba(255, 255, 255, 0.5)",
          },
          bgGradient: isActive
            ? "linear(to-tl, purple.600, blue.600)"
            : "linear(to-tl, blue.500, cyan.500)",
          boxShadow: isActive
            ? "inset 0px 0px 8px 2px rgba(255, 255, 255, 0.5), 0px 0px 8px 2px rgba(255, 255, 255, 0.25)"
            : "inset 0px 0px 8px 2px rgba(255, 255, 255, 0.25)",
            borderRadius:"lg"
        }}
        _light={{
          _hover: {
            boxShadow: "inset 0px 0px 0px 2px rgba(0, 0, 0, 1)",
          },
          bg: isActive ? "#BDFFBD" : "#FFFFBF",

          boxShadow: isActive? "md" : "base",
          transition: '0.25s',
          transform: isActive ?'scale(1.05,1.05)':''
        }}
        zIndex={isActive?2:0}
        // boxShadow={
        //   isActive ? "inset 0px 0px 0px 2px rgb(129, 199, 132)" : ""
        // }
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="xl" as={icon} />}
        <Text fontFamily='Kasitau' fontSize="" fontWeight='bold' textTransform='uppercase'_dark={{fontFamily:'inherit', fontWeight:'medium'}}  userSelect={"none"}  >
          {name}
        </Text>
      </Flex>
    </Box>
  );
}

export default NavLinkComponent;
