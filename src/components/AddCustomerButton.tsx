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
import { addCustomer } from "../api/customer";
interface CustomerFormValues {
  first_name: string;
  middle_name: string;
  last_name: string;
  contact_number?: string;
  description?: string;
}

function AddCustomerButton(props: { onSubmitSuccess?: () => void }) {
  const formik = useFormik<CustomerFormValues>({
    initialValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      contact_number: "",
      description: "",
    },
    validate: (values) => {
      const errors: Partial<CustomerFormValues> = {};

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
      console.log("hallo", values);
      addCustomer(
        values.first_name,
        values.middle_name,
        values.last_name,
        values.contact_number,
        values.description
      ).then((response) => {
        if (response?.status === 200) {
          if (props.onSubmitSuccess) props.onSubmitSuccess();
          resetForm();
          onClose();
          alert("Customer Added");
        }
      });
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<FiUserPlus />}
        variant="solid"
        colorScheme="green"
      >
        Add New Customer
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
          <ModalContent _dark={{bg:'dominant.800'}}>
            <ModalHeader>Add new customer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <InputGroup gap={4}>
                <FormControl
                  mt={4}
                  isInvalid={
                    !!formik.errors.first_name && formik.touched.first_name
                  }
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    placeholder="First Name"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                    id="first_name"
                    name="first_name"
                  />
                  <FormErrorMessage>
                    {formik.errors.first_name}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  mt={4}
                  isInvalid={
                    !!formik.errors.middle_name && formik.touched.middle_name
                  }
                >
                  <FormLabel>Middle Name</FormLabel>
                  <Input
                    placeholder="Middle Name"
                    onChange={formik.handleChange}
                    value={formik.values.middle_name}
                    id="middle_name"
                    name="middle_name"
                  />
                  <FormErrorMessage>
                    {formik.errors.middle_name}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  mt={4}
                  isInvalid={
                    !!formik.errors.last_name && formik.touched.last_name
                  }
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    placeholder="Last Name"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                    id="last_name"
                    name="last_name"
                  />
                  <FormErrorMessage>{formik.errors.last_name}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt={4}
                  isInvalid={
                    !!formik.errors.last_name && formik.touched.last_name
                  }
                >
                  <FormLabel>Contact Number</FormLabel>
                  <Input
                    placeholder="Contact Number"
                    onChange={formik.handleChange}
                    value={formik.values.contact_number}
                    type="number"
                    inputMode="tel"
                    id="contact_number"
                    name="contact_number"
                  />
                  <FormErrorMessage opacity={'unset'}>{formik.errors.last_name}</FormErrorMessage>
                </FormControl>
              </InputGroup>

              <FormLabel mt={4}>Additional Notes</FormLabel>
              <Textarea
                onChange={formik.handleChange}
                value={formik.values.description}
                id="description"
                name="description"
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="green" mr={3}>
                Add Customer
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}

export default AddCustomerButton;
