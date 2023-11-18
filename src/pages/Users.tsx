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
import getUsers, { registerUser } from "../api/users";
import UserCard from "../components/UserCard";
import { FiPlus, FiSearch } from "react-icons/fi";
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
      username: string;
      first_name: string;
      middle_name: string;
      last_name: string;
    }>
  >([{ username: "", first_name: "", last_name: "", middle_name: "" }]);
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

  // function handleRegister() {
  //   registerUser();
  // }

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

        if (response?.status===200) {
          (async () => {
            let a = await getUsers(page);
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
                  <UserCard {...value} occupation="Agent" userid={"" + index} />
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
