import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  Input,
  InputGroup,
  List,
  ListItem,
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
  Spacer,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import {
  FiArrowRight,
  FiPlus,
  FiSearch,
  FiShoppingCart,
  FiUserPlus,
  FiX,
} from "react-icons/fi";
import AddCustomerButton from "./AddCustomerButton";
import DynamicTable from "./DynamicTable";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import AddProductButton from "./AddProductButton";
import AddSupplierButton from "./AddSupplierButton";
import AsyncSelect from "react-select/async";
import { getProduct } from "../api/product";
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

  const [cart, setCart] = useState([
    {
      product_name: 1,
      quantity: 2,
    },
  ]);
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<FiPlus />}
        variant="solid"
        colorScheme="green"
      >
        Add New Purchase
      </Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="6xl"
      >
        <form onSubmit={formik.handleSubmit}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new purchase</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid
                templateRows="repeat(1, minmax(0, 1fr))"
                templateColumns="repeat(2, minmax(0, 1fr))"
                maxH={200}
                flex={1}
                gap={6}
              >
                <GridItem
                  bg="secondary.50"
                  borderRadius="xl"
                  rowSpan={1}
                  colSpan={1}
                  overflow="auto"
                >
                  <List minH="10em" spacing={1} p={1}>
                    <ListItem
                      borderColor="rgba(127,127,127,127)"
                      borderWidth="thin"
                      borderRadius="lg"
                    >
                      <Flex align="center" justify="space-evenly">
                        <Heading
                          px={2}
                          py={1}
                          m={1}
                          size="sm"
                          textTransform="uppercase"
                          isTruncated
                          textAlign="center"
                          flex={1}
                        >
                          Bonamine
                        </Heading>
                        <Heading
                          px={2}
                          py={1}
                          m={1}
                          size="sm"
                          textTransform="uppercase"
                        >
                          {new Intl.NumberFormat("en-PH", {
                            style: "currency",
                            currency: "PHP",
                          }).format(20)}
                        </Heading>
                        <Button size="xs" colorScheme="green" m={2}>
                          <Icon as={FiArrowRight} />
                        </Button>
                      </Flex>
                    </ListItem>
                  </List>
                </GridItem>
                <GridItem
                  bg="secondary.50"
                  borderRadius="xl"
                  rowSpan={1}
                  colSpan={1}
                  overflow="auto"
                >
                  <List minH="10em" spacing={1} p={1}>
                    <ListItem
                      borderColor="rgba(127,127,127,127)"
                      borderWidth="thin"
                      borderRadius="lg"
                    >
                      <Flex align="center" justify="space-evenly">
                        <Button size="xs" colorScheme="red" m={2}>
                          <Icon as={FiX} />
                        </Button>
                        <Heading
                          px={2}
                          py={1}
                          m={1}
                          size="sm"
                          textTransform="uppercase"
                          isTruncated
                          textAlign="center"
                          flex={1}
                        >
                          Cetirizine
                        </Heading>
                        <NumberInput defaultValue={20} min={1} max={2000}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Flex>
                    </ListItem>
                  </List>
                </GridItem>
              </Grid>

              {/* <Heading size="sm">Select supplier</Heading>

              <Flex gap={4}>
                <FormControl flex={1} mt={4}>
                  <FormLabel>Supplier Name</FormLabel>
 
                  <Input
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                  />
                </FormControl>
                <FormControl flex={0} mt={4}>
                  <FormLabel>Actions</FormLabel>
                  <Flex gap={2}>
                    <Button
                      leftIcon={<FiSearch />}
                      variant="solid"
                      colorScheme="cyan"
                    >
                      Search
                    </Button>
                    <AddSupplierButton />
                  </Flex>
                </FormControl>
              </Flex>
              <Flex flex={1} flexDir="column" overflow="hidden" mt={6}>
                <DynamicTable
                  columns={["Supplier", "Contact Number", "Action"]}
                  rows={[
                    [
                      "UNITED LABORATORIES (UNILAB)",
                      "09171234567",

                      <Button colorScheme="cyan" mr={3}>
                        Select
                      </Button>,
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
                  <FormLabel>Order Date</FormLabel>
                  <Input type="date"></Input>
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
              </InputGroup> */}
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="green" mr={3}>
                Purchase
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
