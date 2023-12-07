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
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import AddCustomerButton from "./AddCustomerButton";
import DynamicTable from "./DynamicTable";

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
      <Button onClick={onOpen} leftIcon={<FiPlus />} variant="solid" colorScheme="green">
        Add New Sale
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered size="6xl">
        <form onSubmit={formik.handleSubmit}>
          <ModalOverlay />
          <ModalContent _dark={{bg:'dominant.800'}}>
            <ModalHeader>Add new sale</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading size="sm">Select customer</Heading>

              <Flex gap={4}>
                <FormControl mt={4}>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    id="first_name"
                    name="first_name"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Middle Name</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.middle_name}
                    id="middle_name"
                    name="middle_name"
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    id="last_name"
                    name="last_name"
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Actions</FormLabel>
                  <Flex gap={2}>
                    <Button leftIcon={<FiSearch />} variant="solid" colorScheme="cyan">
                      Search
                    </Button>
                    <AddCustomerButton />
                  </Flex>
                </FormControl>
              </Flex>
              <Flex flex={1} flexDir="column" overflow="hidden" mt={6}>
                <DynamicTable 
                  columns={["First Name", "Middle Name", "Last Name", "Contact Number", "Action"]}
                  rows={[
                    [
                      "Juan",
                      "Carlos",
                      "Santos",
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
                <FormLabel>Currently Selected Customer:</FormLabel>
                <Text fontWeight="bold" textTransform="uppercase">
                  Juan Carlos Santos
                </Text>
              </Flex>
              <Flex gap={2} m={2}>
                <Flex flex={1} bg='purple' >
a
                </Flex>
                <Flex flex={1} bg='yellow' >
a
                </Flex>
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
                  <FormLabel>Payment Method</FormLabel>
                  <Select placeholder="...">
                    <option>Cash (Full Payment)</option>
                    <option>Cash (Partial Payment)</option>
                    <option>E-Wallet</option>
                    <option>Cheque (Full Payment/PDC)</option>
                    <option>Cheque (Full Payment/Dated)</option>
                    <option>Cheque (Partial Payment/PDC)</option>
                    <option>Cheque (Partial Payment/Dated)</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Select Remittance Status</FormLabel>
                  <Select placeholder="...">
                    <option>Remitted</option>
                    <option>Un-Remitted</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Sold as</FormLabel>
                  <Select placeholder="...">
                    <option>Agent</option>
                    <option>Doctor</option>
                  </Select>
                </FormControl>
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="green" mr={3}>
                Sell
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
