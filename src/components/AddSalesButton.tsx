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

  const [paymentMethod, setPaymentMethod] = useState<number | undefined>();
  const [remittanceStatus, setRemittanceStatus] = useState<
    number | undefined
  >();
  const [soldAs, setSoldAs] = useState<number | undefined>();
  const [errors, setErrors] = useState<{
    paymentMethod: boolean;
    remittanceStatus: boolean;
    soldAs: boolean;
  }>({
    paymentMethod: false,
    remittanceStatus: false,
    soldAs: false,
  });

  const handleSubmit = () => {
    setErrors({ ...errors, paymentMethod: !paymentMethod });
    setErrors({ ...errors, remittanceStatus: !remittanceStatus });
    setErrors({ ...errors, soldAs: !soldAs });
  };
  const { user } = useAuthStore();
  useEffect(() => {
    if (errors.paymentMethod || errors.remittanceStatus || errors.soldAs)
      return;
      
        // if (values.items.length === 0) {
        //   console.log("cart is empty");
        //   return;
        // }
        //@ts-ignore
        const finalCart:AddSaleData[] = cart.map((item) => {
          console.log(item, paymentMethod, remittanceStatus, soldAs);
          return {
            customer_id: customer?.id,
            product_id: item.id,
            user_id: user.id ?? 1,
            quantity: item.quantity ?? 0,
            ppu: item.default_ppu ?? 0,
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
            setPaymentMethod(undefined)
            setRemittanceStatus(undefined)
            setSoldAs(undefined)
            setErrors({
              paymentMethod: false,
              remittanceStatus: false,
              soldAs: false,
            })
            onClose();
            alert("Sale Added!");
          }
        });
      
  }, [errors]);
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
        <ModalOverlay />
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
                <Cart onChange={setCart} cartItems={cart} />
              </GridItem>
            </Grid>
            <InputGroup gap={4}>
              <FormControl mt={4}>
                <FormLabel>Payment Method</FormLabel>
                <Select
                  placeholder="..."
                  onChange={(e) => {
                    setPaymentMethod(parseInt(e.target.value));
                  }}
                >
                  <option value={1}>Cash (Full Payment)</option>
                  <option value={2}>Cash (Partial Payment)</option>
                  <option value={3}>E-Wallet</option>
                  <option value={4}>Cheque (Full Payment/PDC)</option>
                  <option value={5}>Cheque (Full Payment/Dated)</option>
                  <option value={6}>Cheque (Partial Payment/PDC)</option>
                  <option value={7}>Cheque (Partial Payment/Dated)</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Select Remittance Status</FormLabel>
                <Select
                  placeholder="..."
                  onChange={(e) => {
                    setRemittanceStatus(parseInt(e.target.value));
                  }}
                >
                  <option value={1}>Remitted</option>
                  <option value={2}>Un-Remitted</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Sold as</FormLabel>
                <Select
                  placeholder="..."
                  onChange={(e) => {
                    setSoldAs(parseInt(e.target.value));
                  }}
                >
                  <option value={1}>Agent</option>
                  <option value={2}>Doctor</option>
                </Select>
              </FormControl>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              isDisabled={cart.length < 1 || !customer}
              // type="submit"
              onClick={()=>{
                handleSubmit()
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
