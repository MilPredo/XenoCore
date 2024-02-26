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
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiPlus, FiSearch, FiShoppingCart, FiUserPlus, FiX } from "react-icons/fi";
import AddCustomerButton from "./AddCustomerButton";
import DynamicTable from "./DynamicTable";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import AddProductButton from "./AddProductButton";
import AddSupplierButton from "./AddSupplierButton";
import AsyncSelect from "react-select/async";
import { getProduct } from "../api/product";
import QuantityInput from "./QuantityInput";
import CartItem, { CartItemData } from "./CartItem";
import Cart from "./Cart";
import ProductList from "./ProductList";
import { AddPurchaseData, addPurchases } from "../api/purchase";
import { getSupplier } from "../api/supplier";
import { SupplierData } from "../stores/supplierStore";
import { useAuthStore } from "../stores/authStore";

export const useDebounce = (val: any, ms: number) => {
  const [debouncedValue, setDebouncedValue] = useState(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(val);
    }, ms);

    return () => {
      clearTimeout(handler);
    };
  }, [val, ms]);

  return debouncedValue;
};

interface PurchaseFormValues {
  // items: {
  //   product_id: string;
  //   quantity: string;
  //   cog?: number;
  // }[];
  address: string;
  transaction_date?: Date | string;
  delivery_date?: Date | string;
  delivery_status?: string;
  notes?: string;
  user_id: number;
}

interface PurchaseFormItems {
  product_id: string;
  quantity: string;
  cog?: number;
}

function CreateRequestButton(props: { onSubmitSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cart, setCart] = useState<CartItemData[]>([]);
  const { user } = useAuthStore();
  interface Option {
    value: string;
    label: string;
  }
  const [supplierOptions, setSupplierOptions] = useState<Option[]>([]);
  const loadOptions = async (inputValue: string, callback: (options: Option[]) => void) => {
    // Perform an async request to fetch options based on inputValue
    const data = await getSupplier(1, inputValue);

    // Transform data into the format expected by react-select
    const options: Option[] = (data?.rows ?? []).map((item) => {
      return { value: item.id.toString(), label: item.supplier_name };
    });
    setSupplierOptions(options);
    // Call the callback with the loaded options
    callback(options);
  };
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
  const formik = useFormik<PurchaseFormValues>({
    initialValues: {
      // items: [],
      address: "",
      user_id: 1,
      transaction_date: getCurrentDate(),
      delivery_status: "Ordered",
    },
    validate: () => {
      const errors: Partial<PurchaseFormValues> = {};

      // if (!values.delivery_date) {
      //   errors.delivery_date = "Delivery date is required";
      // }

      // if (!values.transaction_date) {
      //   errors.transaction_date = "Transaction date is required";
      // }

      // if (!values.last_name) {
      //   errors.last_name = "Last name is required";
      // }
      console.log("errors", errors);
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      // if (values.items.length === 0) {
      //   console.log("cart is empty");
      //   return;
      // }
      setIsSubmitting(true);
      const finalCart: AddPurchaseData[] = cart.map((item) => {
        console.log(item, values);
        return {
          product_id: item.id,
          quantity: item.quantity ?? 0,
          cog: item.default_cog ?? 0,
          user_id: user.id ?? 1,
          //TODO: FIX THIS TYPE!!!!!
          //@ts-ignore
          supplier_id: values.supplier_id?.value ?? undefined,
          delivery_date: values.delivery_date ? new Date(values.delivery_date as string) : undefined,
          delivery_status: values.delivery_status,
          transaction_date: values.transaction_date ? new Date(values.transaction_date as string) : new Date(),
        };
      });
      console.log("final cart", finalCart);
      addPurchases(finalCart).then((response) => {
        setIsSubmitting(false);
        if (response?.status === 200) {
          if (props.onSubmitSuccess) props.onSubmitSuccess();
          resetForm();
          setCart([]);
          onClose();
          alert("Purchase Added!");
        }
      });
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const products = ["bonamine", "neozef", "cetirizine", "bioflu", "ibroprufen"];

  useEffect(() => {
    console.log("cart", cart);
  }, [cart]);
  // const [suppliers, setSuppliers] = useState<SupplierData[]>([]);
  const [supplierInput, setSupplierInput] = useState("");
  const searchQuery = useDebounce(supplierInput, 500);
  useEffect(() => {
    console.log("halloe");
  }, [searchQuery]);

  // useEffect(() => {
  //   console.log("hallo2e", suppliers);
  // }, [suppliers]);
  // const loadOptions = (
  //   inputValue: string,
  //   callback: (options: ColourOption[]) => void
  // ) => {
  //   setTimeout(() => {
  //     const suggestions = suppliers.map((val)=>{
  //       return {value:val.supplier_name, label:val.supplier_name}
  //     })
  //     callback(filterColors(inputValue));
  //   }, 1000);
  // };
  const { colorMode } = useColorMode();
  /*
Client Name: Garrod
Delivery Address: cainta
Delivery Date: jan  29,2023
Delivery time: 10am
Contact Number: 
Medicines & Qty: 50 box  of  30  1500 tab 
price  45 per tab
Amount: 67,500
Terms: pdc
courier: me
   */
  return (
    <>
      <Button onClick={onOpen} leftIcon={<FiPlus />} variant="solid" colorScheme="green">
        Create Order Request
      </Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={() => {
          formik.resetForm();
          setCart([]);
          onClose();
        }}
        isCentered
        size="6xl"
      >
        <form onSubmit={formik.handleSubmit}>
          <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
          <ModalContent _dark={{ bg: "dominant.800" }}>
            <ModalHeader>Create Order Request</ModalHeader>
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
                {/* <FormControl
                  mt={4}
                  // isInvalid={
                  //   !!formik.errors.last_name && formik.touched.last_name
                  // }
                >
                  <FormLabel>Supplier</FormLabel>
                  <AsyncSelect
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: "transparent",
                      }),
                      menuList: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: colorMode === "dark" ? "#3C3C5D" : baseStyles.backgroundColor,
                      }),
                      singleValue: (baseStyles) => ({
                        ...baseStyles,
                        color: colorMode === "dark" ? "white" : baseStyles.color,
                      }),
                      clearIndicator: (baseStyles) => ({
                        ...baseStyles,
                        color: colorMode === "dark" ? "white" : baseStyles.color,
                      }),
                      dropdownIndicator: (baseStyles) => ({
                        ...baseStyles,
                        color: colorMode === "dark" ? "white" : baseStyles.color,
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor:
                          colorMode === "dark"
                            ? state.isFocused
                              ? "#50507C"
                              : state.isSelected
                              ? "#64649B"
                              : baseStyles.backgroundColor
                            : baseStyles.backgroundColor,
                        color: colorMode === "dark" ? "white" : baseStyles.color,
                      }),

                      input: (baseStyles) => ({
                        ...baseStyles,
                        color: colorMode === "dark" ? "white" : baseStyles.color,
                      }),
                      // valueContainer: (baseStyles, state) => ({
                      //   ...baseStyles,
                      //   backgroundColor: 'green',
                      // }),
                    }}
                    isClearable
                    id="supplier_id"
                    name="supplier_id"
                    value={formik.values.supplier_id}
                    onChange={(supplier_id) => formik.setFieldValue("supplier_id", supplier_id)}
                    // inputValue={formik.values.supplier_name?.toString()}
                    // onInputChange={(val) => {
                    //   setSupplierInput(val);
                    // }}
                    cacheOptions
                    // suppliers.map((item) => {
                    //   return { value: item.supplier_name, label: item.supplier_name };
                    // })
                    loadOptions={(val, callback) => {
                      console.log("adadd");

                      //TODO: FIX THIS TYPE!!!!!
                      //@ts-ignore
                      loadOptions(val, callback);
                    }}
                    defaultOptions
                  />
                </FormControl> */}
                <FormControl mt={4} isInvalid={false}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    id="address"
                    name="address"
                    //@ts-ignore
                    value={formik.values.address}
                    onChange={(e) => formik.setFieldValue("address", e.target.value)}
                    placeholder="Enter full address"
                    type="text"
                  ></Input>

                  <FormErrorMessage>{formik.errors.transaction_date}</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isInvalid={!!formik.errors.transaction_date && formik.touched.transaction_date}>
                  <FormLabel>Order Date</FormLabel>
                  <Input
                    id="transaction_date"
                    name="transaction_date"
                    //@ts-ignore
                    value={formik.values.transaction_date}
                    onChange={(e) => formik.setFieldValue("transaction_date", e.target.value)}
                    defaultValue={getCurrentDate()}
                    type="date"
                  ></Input>

                  <FormErrorMessage>{formik.errors.transaction_date}</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isInvalid={!!formik.errors.delivery_date && formik.touched.delivery_date}>
                  <FormLabel>Delivery Date & Time</FormLabel>
                  <Input
                    id="delivery_date"
                    name="delivery_date"
                    //@ts-ignore
                    value={formik.values.delivery_date}
                    onChange={(e) => formik.setFieldValue("delivery_date", e.target.value)}
                    type="datetime-local"
                  ></Input>

                  <FormErrorMessage>{formik.errors.delivery_date}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt={4}
                  // isInvalid={errors.soldAs != ""}
                >
                  <FormLabel>Discount</FormLabel>
                  <Select
                    placeholder="..."
                    // onChange={(e) => {
                    //   if (e.target.value == "") {
                    //     setSoldAs(-1);
                    //     setErrors({
                    //       ...errors,
                    //       soldAs: "Select a Discount Type",
                    //     });
                    //   } else {
                    //     setSoldAs(parseInt(e.target.value));
                    //     setErrors({
                    //       ...errors,
                    //       soldAs: "",
                    //     });
                    //   }
                    // }}
                  >
                    <option value={0}>None</option>
                    <option value={1}>Agent</option>
                    <option value={2}>Doctor</option>
                  </Select>
                  <FormErrorMessage>{/* {errors.soldAs} */}</FormErrorMessage>
                </FormControl>
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isSubmitting}
                isDisabled={cart.length < 1}
                // onClick={() => {
                //   if (isSubmitting) return;
                //   setIsSubmitting(true);
                //   //handleSubmit()
                // }}
                type="submit"
                colorScheme="green"
                mr={3}
              >
                Submit
              </Button>
              <Button
                onClick={() => {
                  formik.resetForm();
                  setCart([]);
                  onClose();
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default CreateRequestButton;
