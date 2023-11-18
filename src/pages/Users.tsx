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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import getUsers from "../api/users";
import UserCard from "../components/UserCard";
import { FiPlus, FiSearch } from "react-icons/fi";
import Pagination from "../components/Pagination";
function Users() {
  const [users, setUsers] = useState<
    Array<{
      username: string;
      first_name: string;
      middle_name: string;
      last_name: string;
    }>
  >([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      let a = await getUsers(page);
      setUsers(a.rows);
      setCount(a.count);
      console.log(a);
    })();
  }, [page]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
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
          <Button leftIcon={<FiSearch />} variant="solid" colorScheme="cyan">
            Search
          </Button>
          <Button
            onClick={onOpen}
            leftIcon={<FiPlus />}
            variant="solid"
            colorScheme="green"
          >
            Create New User
          </Button>
          <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create new user</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input ref={initialRef} placeholder="Username" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Password" />
                </FormControl>
                
                <FormControl mt={4}>
                  <FormLabel>First Name</FormLabel>
                  <Input placeholder="First Name" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Middle Name</FormLabel>
                  <Input placeholder="Middle Name" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Last Name</FormLabel>
                  <Input placeholder="Last Name" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="green" mr={3}>
                  Register
                </Button>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
        <SimpleGrid columns={{ sm: 1, md: 2, "2xl": 4 }} spacing={2} m="4">
          {users.map((value, index) => (
            <Flex flexDir="column" key={index}>
              <UserCard {...value} occupation="Agent" userid={"" + index} />
            </Flex>
          ))}
        </SimpleGrid>
        <Pagination
          currentPage={1}
          maxPage={count / 10}
          onPageChange={(page) => {
            console.log(page);
            setPage(page);
          }}
        />
      </Box>
    </Flex>
  );
}

export default Users;
