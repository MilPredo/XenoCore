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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { FiUserPlus } from "react-icons/fi";
import { addSupplier } from "../api/supplier";
interface SupplierFormValues {
  supplier_name: string;
  address: string;
  contact_number: string;
  email: string;
  notes: string;
}

function AddSupplierButton(props: { onSubmitSuccess?: () => void }) {
  const formik = useFormik<SupplierFormValues>({
    initialValues: {
      supplier_name: "",
      address: "",
      contact_number: "",
      email: "",
      notes: "",
    },
    validate: (values) => {
      const errors: Partial<SupplierFormValues> = {};

      if (!values.supplier_name) {
        errors.supplier_name = "Supplier name is required";
      }

      if (!values.address) {
        errors.address = "Address is required";
      }

      if (!values.contact_number) {
        errors.contact_number = "Contact number is required";
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      addSupplier(values.supplier_name, values.address, values.contact_number, values.email, values.notes).then(
        (response) => {
          if (response?.status === 200) {
            if (props.onSubmitSuccess) props.onSubmitSuccess();
            resetForm();
            onClose();
            alert("Supplier Registered");
          }
        }
      );
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
  return (
    <>
      <Button onClick={onOpen} leftIcon={<FiUserPlus />} variant="solid" colorScheme="green">
        Add New Supplier
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose} isCentered size="6xl">
        <form onSubmit={formik.handleSubmit}>
          <ModalOverlay />
          <ModalContent _dark={{bg:'dominant.800'}}>
            <ModalHeader>Add new supplier</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputGroup gap={4}>
                <FormControl mt={4} isInvalid={!!formik.errors.supplier_name && formik.touched.supplier_name}>
                  <FormLabel>Supplier Name</FormLabel>
                  <Input
                    value={formik.values.supplier_name}
                    onChange={formik.handleChange}
                    id="supplier_name"
                    name="supplier_name"
                  />
                  <FormErrorMessage>{formik.errors.supplier_name}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!formik.errors.address && formik.touched.address}>
                  <FormLabel>Address</FormLabel>
                  <Input onChange={formik.handleChange} value={formik.values.address} id="address" name="address" />
                  <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} isInvalid={!!formik.errors.contact_number && formik.touched.contact_number}>
                  <FormLabel>Contact Number</FormLabel>
                  <Input
                    placeholder="Contact Number"
                    onChange={formik.handleChange}
                    type="number"
                    inputMode="tel"
                    id="contact_number"
                    name="contact_number"
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl mt={4} isInvalid={!!formik.errors.email && formik.touched.email}>
                  <FormLabel>Email</FormLabel>
                  <Input onChange={formik.handleChange} type="email" inputMode="email" id="email" name="email" />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
              </InputGroup>

              <FormLabel mt={4}>Additional Notes</FormLabel>
              <Textarea />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="green" mr={3}>
                Add Supplier
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default AddSupplierButton;
