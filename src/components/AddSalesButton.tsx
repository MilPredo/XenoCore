import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { FiPlus } from "react-icons/fi";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

interface RegisterFormValues {
  username: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}

function AddSalesButton({ onSubmit }: { onSubmit?: (val: boolean) => void }) {
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
      // registerUser(
      //   values.username,
      //   values.password,
      //   values.first_name,
      //   values.middle_name,
      //   values.last_name,
      //   ""
      // ).then((response) => {
      //   onSubmit(response?.status === 200)
      //   if (response?.status === 200) {
      //     // (async () => {
      //     //   let a = await getUsers(
      //     //     page,
      //     //     search.username,
      //     //     search.first_name,
      //     //     search.middle_name,
      //     //     search.last_name
      //     //   );
      //     //   setUsers(a.rows);
      //     //   setCount(a.count);
      //     //   console.log(a);
      //     // })();
      //     resetForm();
      //     onClose();
      //   }
      //   console.log(response);
      // });
    },
  });
  const products = ["bonamine", "neozef", "cetirizine", "bioflu", "ibroprufen"];
  //https://github.com/anubra266/choc-autocomplete
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<FiPlus />}
        variant="solid"
        colorScheme="green"
      >
        Add New
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
            <ModalHeader>Add new sale</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading size="sm" >Select customer</Heading>
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

              <FormControl
                mt={4}
                isInvalid={
                  !!formik.errors.last_name && formik.touched.last_name
                }
              >
                <FormLabel>Select product</FormLabel>
                <AutoComplete openOnFocus>
                  <AutoCompleteInput variant="filled" />
                  <AutoCompleteList>
                    {products.map((product, id) => (
                      <AutoCompleteItem
                        key={`option-${id}`}
                        value={product}
                        textTransform="capitalize"
                      >
                        {product}
                      </AutoCompleteItem>
                    ))}
                  </AutoCompleteList>
                </AutoComplete>
                <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="green" mr={3}>
                Add
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default AddSalesButton;
