import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
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
import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import AddCustomerButton from "./AddCustomerButton";
import DynamicTable from "./DynamicTable";
import ProductList from "./ProductList";
import Cart from "./Cart";
import { CartItemData } from "./CartItem";
import CustomerSelector from "./CustomerSelector";
import { AddSaleData, addSales } from "../api/sale";
import { useAuthStore } from "../stores/authStore";

interface RegisterFormValues {
  username: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}

function AddSalesButton(props: { onSubmitSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const products = ["bonamine", "neozef", "cetirizine", "bioflu", "ibroprufen"];
  //https://github.com/anubra266/choc-autocomplete
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
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

  const [customer, setCustomer] = useState<
    | {
        id: number;
        first_name: string;
        middle_name: string;
        last_name: string;
      }
    | undefined
  >();

  const [paymentMethod, setPaymentMethod] = useState<number>(-1);
  const [remittanceStatus, setRemittanceStatus] = useState<
    number
  >(-1);
  const [soldAs, setSoldAs] = useState<number>(-1);
  const [errors, setErrors] = useState<{
    paymentMethod: string;
    remittanceStatus: string;
    soldAs: string;
  }>({
    paymentMethod: "",
    remittanceStatus: "",
    soldAs: "",
  });

  const handleSubmit = () => {
    console.log("hallo", paymentMethod, remittanceStatus, soldAs);
    setErrors({
      paymentMethod: paymentMethod == -1 ? "Select a Payment Method" : "",
      remittanceStatus: remittanceStatus == -1 ? "Select a Remittance Status" : "",
      soldAs: soldAs == -1 ? "Select a Discount Type" : ""
    });
    setIsSubmitting(true);
    // setErrors({ ...errors, isSubmitting: true });
  };
  const { user } = useAuthStore();
  useEffect(() => {
    console.log('errors',errors);
    console.log('asd',paymentMethod, remittanceStatus, soldAs);
    if (paymentMethod == -1 || remittanceStatus == -1 || soldAs == -1) {
      console.log('its error')
      setIsSubmitting(false);
      return;
    }
  
    // if (values.items.length === 0) {
    //   console.log("cart is empty");
    //   return;
    // }
    //@ts-ignore
    const finalCart: AddSaleData[] = cart.map((item) => {
      console.log(item, paymentMethod, remittanceStatus, soldAs);
      return {
        customer_id: customer?.id,
        product_id: item.id,
        user_id: user.id ?? 1,
        quantity: item.quantity ?? 0,
        ppu: item.default_ppu ?? 0,
        cog: item.default_cog ?? 0,
        transaction_date: new Date(),
        payment_method: paymentMethod,
        remittance_status: remittanceStatus,
        user_type: soldAs,
        //TODO: FIX THIS TYPE!!!!!
        //@ts-ignore
        // delivery_date: values.delivery_date ? new Date(values.delivery_date as string) : undefined,
        // delivery_status: values.delivery_status,
      };
    });
    console.log("final cart", finalCart);
    addSales(finalCart).then((response) => {
      if (response?.status === 200) {
        if (props.onSubmitSuccess) props.onSubmitSuccess();
        // resetForm();
        setCart([]);
        setPaymentMethod(0);
        setRemittanceStatus(0);
        setSoldAs(0);
        setErrors({
          paymentMethod: "",
          remittanceStatus: "",
          soldAs: "",
        });
        setIsSubmitting(false);
        onClose();
        alert("Sale Added!");
      }
    });
  }, [isSubmitting]);
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<FiPlus />}
        variant="solid"
        colorScheme="green"
      >
        Add New Sale
      </Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="6xl"
      >
        {/* <form onSubmit={formik.handleSubmit}> */}
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent _dark={{ bg: "dominant.800" }}>
          <ModalHeader>Add new sale</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading size="sm">Select customer</Heading>
            <CustomerSelector onChange={setCustomer} />
            {/* <Flex gap={4}>
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
                    <Button
                      leftIcon={<FiSearch />}
                      variant="solid"
                      colorScheme="cyan"
                    >
                      Search
                    </Button>
                    <AddCustomerButton />
                  </Flex>
                </FormControl>
              </Flex> */}
            <Grid
              mt={8}
              templateRows="repeat(1, minmax(0, 1fr))"
              templateColumns="repeat(2, minmax(0, 1fr))"
              maxH={500}
              flex={1}
              gap={6}
            >
              <GridItem rowSpan={1} colSpan={1} overflow="auto">
                <ProductList onChange={setCart} cartItems={cart} />
              </GridItem>
              <GridItem rowSpan={1} colSpan={1}>
                <Cart
                  onChange={setCart}
                  cartItems={cart}
                  selected_user_type={soldAs}
                />
              </GridItem>
            </Grid>

            <InputGroup gap={4}>
              <FormControl mt={4} isInvalid={errors.paymentMethod != ""}>
                <FormLabel>Payment Method</FormLabel>
                <Select
                  placeholder="..."
                  onChange={(e) => {
                    if (e.target.value == "") {
                      console.log(0)
                      setPaymentMethod(-1);
                      setErrors({
                        ...errors,
                        paymentMethod: "Select a Payment Method",
                      });
                    } else {
                      console.log(parseInt(e.target.value))
                      setPaymentMethod(parseInt(e.target.value));
                      setErrors({
                        ...errors,
                        paymentMethod: "",
                      });
                    }
                    //
                  }}
                  value={paymentMethod}
                >
                  <option value={1}>Cash (Full Payment)</option>
                  <option value={2}>Cash (Partial Payment)</option>
                  <option value={3}>E-Wallet</option>
                  <option value={4}>Cheque (Full Payment/PDC)</option>
                  <option value={5}>Cheque (Full Payment/Dated)</option>
                  <option value={6}>Cheque (Partial Payment/PDC)</option>
                  <option value={7}>Cheque (Partial Payment/Dated)</option>
                </Select>
                <FormErrorMessage>{errors.paymentMethod}</FormErrorMessage>
              </FormControl>
              <FormControl mt={4} isInvalid={errors.remittanceStatus != ""}>
                <FormLabel>Select Remittance Status</FormLabel>
                <Select
                  placeholder="..."
                  onChange={(e) => {
                    if (e.target.value == "") {
                      setRemittanceStatus(-1);
                      setErrors({
                        ...errors,
                        remittanceStatus: "Select a Remittance Status",
                      });
                    } else {
                      setRemittanceStatus(parseInt(e.target.value));
                      setErrors({
                        ...errors,
                        remittanceStatus: "",
                      });
                    }
                  }}
                >
                  <option value={1}>Remitted</option>
                  <option value={2}>Un-Remitted</option>
                </Select>
                <FormErrorMessage>{errors.remittanceStatus}</FormErrorMessage>
              </FormControl>
              <FormControl mt={4} isInvalid={errors.soldAs != ""}>
                <FormLabel>Sold as</FormLabel>
                <Select
                  placeholder="..."
                  onChange={(e) => {
                    if (e.target.value == "") {
                      setSoldAs(-1);
                      setErrors({
                        ...errors,
                        soldAs: "Select a Discount Type",
                      });
                    } else {
                      setSoldAs(parseInt(e.target.value));
                      setErrors({
                        ...errors,
                        soldAs: "",
                      });
                    }
                  }}
                >
                  <option value={0}>None</option>
                  <option value={1}>Agent</option>
                  <option value={2}>Doctor</option>
                </Select>
                <FormErrorMessage>{errors.soldAs}</FormErrorMessage>
              </FormControl>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isSubmitting}
              isDisabled={cart.length < 1 || !customer}
              // type="submit"
              onClick={() => {
                handleSubmit();
              }}
              colorScheme="green"
              mr={3}
            >
              Sell
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
        {/* </form> */}
      </Modal>
    </>
  );
}

export default AddSalesButton;
