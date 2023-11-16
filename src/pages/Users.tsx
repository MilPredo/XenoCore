import {
  Box,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import getUsers from "../api/users";
import UserCard from "../components/UserCard";
import { FiPlus, FiSearch } from "react-icons/fi";
function Users() {
  const [users, setUsers] = useState<
    Array<{
      username: string;
      first_name: string;
      middle_name: string;
      last_name: string;
    }>
  >([]);
  useEffect(() => {
    (async () => {
      let a = await getUsers(1);
      setUsers(a);
      console.log(a);
    })();
  }, []);

  return (
    <Flex flex={1} flexDir="column">
      {/* <Box>
        <Heading size="md">Users</Heading>
      </Box> */}
      <Box overflow="auto">
        <Flex
          p={2}
          bg="secondary.50"
          _dark={{ bg: "secondary.700" }}
          borderRadius="xl"
          m="4"
          gap={2}
        >
          <Flex gap={2} flex={1}>
            <Input
              variant="filled"
              _light={{
                bg: "white",
              }}
              _dark={{
                _hover: { _placeholder: { color: "white", opacity: 0.5 } },
                _focus: { _placeholder: { color: "white", opacity: 0.5 } },
              }}
              placeholder="Username"
            />
            <Input
              variant="filled"
              _light={{
                bg: "white",
              }}
              _dark={{
                _hover: { _placeholder: { color: "white", opacity: 0.5 } },
                _focus: { _placeholder: { color: "white", opacity: 0.5 } },
              }}
              placeholder="First Name"
            />
            <Input
              variant="filled"
              _light={{
                bg: "white",
              }}
              _dark={{
                _hover: { _placeholder: { color: "white", opacity: 0.5 } },
                _focus: { _placeholder: { color: "white", opacity: 0.5 } },
              }}
              placeholder="Middle Name"
            />
            <Input
              variant="filled"
              _light={{
                bg: "white",
              }}
              _dark={{
                _hover: { _placeholder: { color: "white", opacity: 0.5 } },
                _focus: { _placeholder: { color: "white", opacity: 0.5 } },
              }}
              placeholder="Last Name"
            />
          </Flex>
          <Button leftIcon={<FiSearch/>} variant="solid" colorScheme="cyan">Search</Button>
          <Button leftIcon={<FiPlus/>} variant="solid" colorScheme="green">Create New User</Button>
        </Flex>
        <SimpleGrid columns={{ sm: 1, md: 2, "2xl": 4 }} spacing={2} m="4">
          {users.map((value, index) => (
            <Flex flexDir="column" key={index}>
              <UserCard {...value} occupation="Agent" userid={""+index} />
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default Users;
