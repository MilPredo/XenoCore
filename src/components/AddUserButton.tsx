import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { FiUserPlus } from "react-icons/fi";
import { registerUser } from "../api/users";
interface RegisterFormValues {
  username: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}
function AddUserButton() {
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
          // (async () => {
          //   let a = await getUsers(
          //     page,
          //     search.username,
          //     search.first_name,
          //     search.middle_name,
          //     search.last_name
          //   );
          //   setUsers(a.rows);
          //   setCount(a.count);
          //   console.log(a);
          // })();
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
    <>
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
                isInvalid={!!formik.errors.username && formik.touched.username}
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
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>

              <FormControl
                mt={4}
                isInvalid={!!formik.errors.password && formik.touched.password}
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
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
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
                <FormErrorMessage>{formik.errors.first_name}</FormErrorMessage>
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
                <FormErrorMessage>{formik.errors.middle_name}</FormErrorMessage>
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
                <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
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
    </>
  );
}

export default AddUserButton;
