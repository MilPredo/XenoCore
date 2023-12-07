import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";
import AddSalesButton from "../components/AddSalesButton";

function Sales() {
  return (
    <Flex flex={1} flexDir="column" overflow="hidden">
      <Flex
        p={2}
        bg="secondary.50"
        _dark={{ bg: "secondary.700" }}
        borderRadius="xl"
        m="4"
        gap={2}
      >
        <Flex gap={2} flex={1}>
          <Input
            variant="filled"
            _light={{
              bg: "white",
            }}
            _dark={{
              _hover: { _placeholder: { color: "white", opacity: 0.5 } },
              _focus: { _placeholder: { color: "white", opacity: 0.5 } },
            }}
            placeholder="Search"
          />
        </Flex>
        <Button leftIcon={<FiSearch />} variant="solid" colorScheme="cyan">
          Search
        </Button>
        <AddSalesButton />
      </Flex>

      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable 
          columns={[
            "Product",
            "Customer",
            "Quantity",
            "Sale Price",
            "Payment Method",
            "Remittance Status",
            "Date of transaction",
            "User",
            "User Type",
          ]}
          rows={[
            [
              "Paracetamol",
              "Santos, Juan Carlos",
              "3",
              new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(10.99),
              "Cash (Full Payment)",
              "Remitted",
              "2023-11-01",
              "Dela Cruz, Maria Elena",
              "Doctor",
            ],

            [
              "Ibuprofen",
              "Lazaro, Maria Cristina",
              "2",
              new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(12.49),
              "Cheque (Partial Payment/Dated)",
              "Un-Remitted",
              "2023-11-02",
              "Reyes, Emilio Andres",
              "Agent",
            ],
          ]}
        />
      </Flex>
    </Flex>
  );
}

export default Sales;
