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
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { registerUser, getUsers} from "../api/users";
import UserCard from "../components/UserCard";
import { FiPlus, FiSearch, FiUserPlus } from "react-icons/fi";
import Pagination from "../components/Pagination";
import { useFormik } from "formik";

interface RegisterFormValues {
  username: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}
function Users() {
  const [users, setUsers] = useState<
    Array<{
      id:number,
      username: string;
      first_name: string;
      middle_name: string;
      last_name: string;
    }>
  >([{ id:0, username: "", first_name: "", last_name: "", middle_name: "" }]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<{
    username: string;
    first_name: string;
    middle_name: string;
    last_name: string;
  }>({ username: "", first_name: "", last_name: "", middle_name: "" });

  useEffect(() => {
    (async () => {
      let a = await getUsers(
        page,
        search.username,
        search.first_name,
        search.middle_name,
        search.last_name
      );
      setUsers(a.rows);
      setCount(a.count);
      console.log(a);
    })();
  }, [page]);

  // function handleRegister() {
  //   registerUser();
  // }

  function doSearch() {
    (async () => {
      let a = await getUsers(
        page,
        search.username.trim(),
        search.first_name.trim(),
        search.middle_name.trim(),
        search.last_name.trim()
      );
      setUsers(a.rows);
      setCount(a.count);
      console.log(a);
    })();
  }

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      middle_name: "",
    },
    validate: (values) => {
      const errors: Partial<RegisterFormValues> = {};
      if (!values.username) {
        errors.username = "Username is required";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      if (!values.first_name) {
        errors.first_name = "First name is required";
      }

      if (!values.middle_name) {
        errors.middle_name = "Middle name is required";
      }

      if (!values.last_name) {
        errors.last_name = "Last name is required";
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      registerUser(
        values.username,
        values.password,
        values.first_name,
        values.middle_name,
        values.last_name,
        ""
      ).then((response) => {
        if (response?.status === 200) {
          (async () => {
            let a = await getUsers(
              page,
              search.username,
              search.first_name,
              search.middle_name,
              search.last_name
            );
            setUsers(a.rows);
            setCount(a.count);
            console.log(a);
          })();
          resetForm();
          onClose();
        }
        console.log(response);
      });
    },
  });

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
              value={search.username}
              onChange={(e) => {
                setSearch({ ...search, username: e.target.value.trim() });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  doSearch();
                }
              }}
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
              value={search.first_name}
              onChange={(e) => {
                setSearch({ ...search, first_name: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  doSearch();
                }
              }}
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
              value={search.middle_name}
              onChange={(e) => {
                setSearch({ ...search, middle_name: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  doSearch();
                }
              }}
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
              value={search.last_name}
              onChange={(e) => {
                setSearch({ ...search, last_name: e.target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  doSearch();
                }
              }}
            />
          </Flex>
          <Button
            onClick={doSearch}
            leftIcon={<FiSearch />}
            variant="solid"
            colorScheme="cyan"
          >
            Search
          </Button>
          <Button
            onClick={onOpen}
            leftIcon={<FiUserPlus />}
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
            <form onSubmit={formik.handleSubmit}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create new user</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl
                    isInvalid={
                      !!formik.errors.username && formik.touched.username
                    }
                  >
                    <FormLabel>Username</FormLabel>
                    <Input
                      ref={initialRef}
                      placeholder="Username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      id="username"
                      name="username"
                    />
                    <FormErrorMessage>
                      {formik.errors.username}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={
                      !!formik.errors.password && formik.touched.password
                    }
                  >
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      id="password"
                      name="password"
                    />
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={
                      !!formik.errors.first_name && formik.touched.first_name
                    }
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      placeholder="First Name"
                      onChange={formik.handleChange}
                      value={formik.values.first_name}
                      id="first_name"
                      name="first_name"
                    />
                    <FormErrorMessage>
                      {formik.errors.first_name}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={
                      !!formik.errors.middle_name && formik.touched.middle_name
                    }
                  >
                    <FormLabel>Middle Name</FormLabel>
                    <Input
                      placeholder="Middle Name"
                      onChange={formik.handleChange}
                      value={formik.values.middle_name}
                      id="middle_name"
                      name="middle_name"
                    />
                    <FormErrorMessage>
                      {formik.errors.middle_name}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    mt={4}
                    isInvalid={
                      !!formik.errors.last_name && formik.touched.last_name
                    }
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      placeholder="Last Name"
                      onChange={formik.handleChange}
                      value={formik.values.last_name}
                      id="last_name"
                      name="last_name"
                    />
                    <FormErrorMessage>
                      {formik.errors.last_name}
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button type="submit" colorScheme="green" mr={3}>
                    Register
                  </Button>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
        </Flex>
        <SimpleGrid columns={{ sm: 1, md: 2, "2xl": 4 }} spacing={2} m="4">
          {count
            ? users.map((value, index) => (
                <Flex flexDir="column" key={index}>
                  <UserCard {...value} occupation="Agent" />
                </Flex>
              ))
            : "Cannot view: User is unauthorized."}
        </SimpleGrid>
        <Pagination
          currentPage={1}
          maxPage={count / 16}
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
