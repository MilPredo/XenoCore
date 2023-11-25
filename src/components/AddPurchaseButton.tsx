import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
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
  Select,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { FiPlus, FiSearch, FiUserPlus } from "react-icons/fi";
import AddCustomerButton from "./AddCustomerButton";
import DynamicTable from "./DynamicTable";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import AddProductButton from "./AddProductButton";
interface RegisterFormValues {
  first_name: string;
  middle_name: string;
  last_name: string;
  contact_number: string;
}

function AddPurchaseButton() {
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
  const products = ["bonamine", "neozef", "cetirizine", "bioflu", "ibroprufen"];
  return (
    <>
      <Button onClick={onOpen} leftIcon={<FiPlus />} variant="solid" colorScheme="green">
        Add New Purchase
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered size="6xl">
        <form onSubmit={formik.handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new purchase</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading size="sm">Select supplier</Heading>

              <InputGroup gap={4}>
                <FormControl mt={4}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    id="first_name"
                    name="first_name"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Actions</FormLabel>
                  <Flex gap={2}>
                    <Button leftIcon={<FiSearch />} variant="solid" colorScheme="cyan">
                      Search
                    </Button> 
                    <AddProductButton />
                  </Flex>
                </FormControl>
              </InputGroup>
              <Flex flex={1} flexDir="column" overflow="hidden" mt={6}>
                <DynamicTable
                  count={1}
                  columns={["Supplier", "Contact Number", "Action"]}
                  rows={[
                    [
                      "UNITED LABORATORIES (UNILAB)",
                      "09171234567",
                      {
                        content: (
                          <Button colorScheme="cyan" mr={3}>
                            Select
                          </Button>
                        ),
                      },
                    ],
                  ]}
                />
              </Flex>
              <Flex>
                <FormLabel>Currently Selected Supplier:</FormLabel>
                <Text fontWeight="bold" textTransform="uppercase">
                UNITED LABORATORIES (UNILAB)
                </Text>
              </Flex>
              <InputGroup gap={4}>
                <FormControl mt={4} isInvalid={!!formik.errors.last_name && formik.touched.last_name}>
                  <FormLabel>Select product</FormLabel>
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
                <FormControl mt={4}>
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput defaultValue={1} min={1} max={20}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Delivery Date</FormLabel>
                  <Input type="date"></Input>
                </FormControl> 
                <FormControl mt={4}>
                  <FormLabel>Order Status</FormLabel>
                  <Select defaultValue="Ordered" width="150px">
                    <option value="Ordered">Ordered</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Problematic">Problematic</option>
                  </Select>
                </FormControl> 
              </InputGroup>
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

export default AddPurchaseButton;
