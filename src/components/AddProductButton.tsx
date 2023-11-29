import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { FiUserPlus } from "react-icons/fi";
interface RegisterFormValues {
  first_name: string;
  middle_name: string;
  last_name: string;
  contact_number: string;
}

function AddProductButton() {
  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      contact_number: "",
    },
    validate: (values) => {
      const errors: Partial<RegisterFormValues> = {};

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const format = (val: any) => `₱` + val;
  const parse = (val: any) => val.replace(/^\$/, "");

  const [value, setValue] = React.useState("0.00");
  const products = [
    "UNITED LABORATORIES (UNILAB)",
    "PFIZER PHILIPPINES",
    "GLAXOSMITHKLINE (GSK) PHILIPPINES",
    "MERCK PHILIPPINES",
    "SANOFI PHILIPPINES",
  ];
  return (
    <>
      <Button onClick={onOpen} leftIcon={<FiUserPlus />} variant="solid" colorScheme="green">
        Add New Product
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered size="6xl">
        <form onSubmit={formik.handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputGroup gap={4}>
                <FormControl mt={4} isInvalid={!!formik.errors.first_name && formik.touched.first_name}>
                  <FormLabel>Product Name</FormLabel>
                  <Input />
                  <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isInvalid={!!formik.errors.first_name && formik.touched.first_name}>
                  <FormLabel>Supplier</FormLabel>
                  <AutoComplete openOnFocus>
                    <AutoCompleteInput variant="filled" />
                    <AutoCompleteList>
                      {products.map((product, id) => (
                        <AutoCompleteItem key={`option-${id}`} value={product} textTransform="capitalize">
                          {product}
                        </AutoCompleteItem>
                      ))}
                    </AutoCompleteList>
                  </AutoComplete>
                  <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!formik.errors.middle_name && formik.touched.middle_name}>
                  <FormLabel>Base Price</FormLabel>
                  <NumberInput onChange={(valueString) => setValue(parse(valueString))} value={format(value)}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormErrorMessage>{formik.errors.middle_name}</FormErrorMessage>
                </FormControl>
              </InputGroup>

              <FormLabel mt={4}>Description</FormLabel>
              <Textarea />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="green" mr={3}>
                Add Product
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default AddProductButton;
