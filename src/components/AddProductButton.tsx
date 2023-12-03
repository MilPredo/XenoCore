import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
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
  SelectField,
  Textarea,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { FiUserPlus } from "react-icons/fi";
import CurrencyInput from "react-currency-input-field";
import { addProduct } from "../api/product";
interface ProductFormValues {
  category: string;
  product_name: string;
  default_cog?: string;
  default_ppu?: string;
  description?: string;
}

/*
  id: number;
  product_name: string;
  category: string;
  default_cog: number;
  default_ppu: number;
  papers: boolean;
  initial_qty: number;
  reorder_level: number;
  current_qty: number;
  stock_status: string;
  description: string;
*/
function AddProductButton(props: { onSubmitSuccess?: () => void }) {
  const [first, setfirst] = useState("");
  const formik = useFormik<ProductFormValues>({
    initialValues: {
      category: "",
      product_name: "",
      default_cog: "",
      default_ppu: "",
      description: "",
    },
    validate: (values) => {
      const errors: Partial<ProductFormValues> = {};

      if (!values.category) {
        errors.category = "Category is required";
      }

      if (!values.product_name) {
        errors.product_name = "Product name is required";
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      console.log("hallo", values);
      addProduct(
        values.product_name,
        values.category,
        parseFloat((values.default_cog ?? "").replace(/,/g, "")),
        parseFloat((values.default_ppu ?? "").replace(/,/g, "")),
        values.description
      ).then((response) => {
        if (response?.status === 200) {
          if (props.onSubmitSuccess) props.onSubmitSuccess();
          resetForm();
          onClose();
          alert("Product Added");
        }
      });
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  const format = (val: any) => `₱` + val;
  const parse = (val: any) => val.replace(/^\$/, "");
  const { colorMode } = useColorMode();
  const [value, setValue] = React.useState("0.00");
  const products = [
    "UNITED LABORATORIES (UNILAB)",
    "PFIZER PHILIPPINES",
    "GLAXOSMITHKLINE (GSK) PHILIPPINES",
    "MERCK PHILIPPINES",
    "SANOFI PHILIPPINES",
  ];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
                <FormControl mt={4} isInvalid={!!formik.errors.category && formik.touched.category}>
                  <FormLabel>Category</FormLabel>
                  <Select
                    id="category"
                    name="category"
                    placeholder="Select category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                  </Select>
                  <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isInvalid={!!formik.errors.product_name && formik.touched.product_name}>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    id="product_name"
                    name="product_name"
                    value={formik.values.product_name}
                    onChange={formik.handleChange}
                  />
                  <FormErrorMessage>{formik.errors.product_name}</FormErrorMessage>
                </FormControl>
                {/* <FormControl mt={4} isInvalid={!!formik.errors.first_name && formik.touched.first_name}>
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
                </FormControl> */}
                <FormControl mt={4}>
                  <FormLabel>Base Cost of Goods</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="₱" />
                    <CurrencyInput
                      id="default_cog"
                      name="default_cog"
                      decimalsLimit={2}
                      placeholder="0.00"
                      onValueChange={(value) => {
                        formik.setFieldValue("default_cog", value ?? "");
                      }}
                      value={formik.values.default_cog}
                      style={{
                        border: "1px solid",
                        borderRadius: "0px 6px 6px 0px",
                        paddingLeft: "0.5rem",
                        fontSize: "1rem",
                        width: "100%",
                        backgroundColor: "transparent",
                        borderColor: colorMode === "dark" ? "rgba(255, 255, 255, 0.16)" : "rgb(226, 232, 240)",
                      }}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Base Price Per Unit</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children="₱" />
                    <CurrencyInput
                      id="default_ppu"
                      name="default_ppu"
                      decimalsLimit={2}
                      placeholder="0.00"
                      onValueChange={(value) => {
                        formik.setFieldValue("default_ppu", value ?? "");
                      }}
                      maxLength={255}
                      value={formik.values.default_ppu}
                      style={{
                        border: "1px solid",
                        borderRadius: "0px 6px 6px 0px",
                        paddingLeft: "0.5rem",
                        fontSize: "1rem",
                        width: "100%",
                        backgroundColor: "transparent",
                        borderColor: colorMode === "dark" ? "rgba(255, 255, 255, 0.16)" : "rgb(226, 232, 240)",
                      }}
                    />
                  </InputGroup>
                </FormControl>
              </InputGroup>

              <FormLabel mt={4}>Description</FormLabel>
              <Textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
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
