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
          _hover: {
            bg: isActive ? "green.500" : "blue.300",
          },
          bg: isActive ? "green.500" : "blue.500",
        }}
        _light={{
          _hover: {
            bg: isActive ? "cyan.300" : "blue.300",
          },
          bg: isActive ? "cyan.300" : "white",

          boxShadow: "base",
        }}
        // boxShadow={
        //   isActive ? "inset 0px 0px 0px 2px rgb(129, 199, 132)" : ""
        // }
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        <Text fontSize={"md"} fontWeight={"medium"}>
          {name}
        </Text>
      </Flex>
    </Box>
  );
}

export default NavLinkComponent