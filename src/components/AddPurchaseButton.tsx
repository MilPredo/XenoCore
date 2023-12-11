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
import React, { useEffect, useRef, useState } from "react";
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
import QuantityInput from "./QuantityInput";
import CartItem, { CartItemData } from "./CartItem";
import Cart from "./Cart";
import ProductList from "./ProductList";
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
  const getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Month is zero-based
    let day = today.getDate();

    // Pad single-digit month or day with a leading zero
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  };
  const [cart, setCart] = useState<CartItemData[]>([]);
  useEffect(() => {
    console.log("cart", cart);
  }, [cart]);

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
          <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
          <ModalContent _dark={{ bg: "dominant.800" }}>
            <ModalHeader>Add new purchase</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid
                templateRows="repeat(1, minmax(0, 1fr))"
                templateColumns="repeat(2, minmax(0, 1fr))"
                maxH={500}
                flex={1}
                gap={6}
              >
                <GridItem rowSpan={1} colSpan={1} overflow="auto">
                  <ProductList mode="cog" onChange={setCart} cartItems={cart} />
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                  <Cart mode="cog" onChange={setCart} cartItems={cart} />
                </GridItem>
              </Grid>
              <InputGroup gap={4}>
                <FormControl
                  mt={4}
                  // isInvalid={
                  //   !!formik.errors.last_name && formik.touched.last_name
                  // }
                >
                  <FormLabel>Supplier</FormLabel>
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
                  <FormLabel>Order Date</FormLabel>
                  <Input defaultValue={getCurrentDate()} type="date"></Input>
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
              <Button
                isDisabled={cart.length<1} 
                type="submit"
                colorScheme="green"
                mr={3}
              >
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
