import { Box, Flex, FlexProps, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

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
        borderRadius="lg"
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
        }}
        _light={{
          _hover: {
            boxShadow: "inset 0px 0px 0px 2px rgba(0, 0, 0, 1)",
          },
          bg: isActive ? "cyan.200" : "white",

          boxShadow: "base",
        }}
        // boxShadow={
        //   isActive ? "inset 0px 0px 0px 2px rgb(129, 199, 132)" : ""
        // }
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="md" as={icon} />}
        <Text  userSelect={"none"} fontSize={"md"} fontWeight={"medium"}>
          {name}
        </Text>
      </Flex>
    </Box>
  );
}

export default NavLinkComponent;
