import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";
import AddSalesButton from "../components/AddSalesButton";

function Sales() {
  return (
    <Flex flex={1} flexDir="column" overflow="hidden">
      <Flex p={2} bg="secondary.50" _dark={{ bg: "secondary.700" }} borderRadius="xl" m="4" gap={2}>
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
          count={1}
          columns={[
            "Product",
            "Customer",
            { content: "Quantity", attributes: { isNumeric: true } },
            { content: "Sale Price", attributes: { isNumeric: true } },
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
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(10.99),
              },
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
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(12.49),
              },
              "Cheque (Partial Payment/Dated)",
              "Un-Remitted",
              "2023-11-02",
              "Reyes, Emilio Andres",
              "Agent",
            ],

            [
              "Cetirizine",
              "Del Rosario, Roberto Jose",
              "5",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(8.99),
              },
              "E-Wallet",
              "Remitted",
              "2023-11-03",
              "Villanueva, Sofia Rosa",
              "Doctor",
            ],

            [
              "Ascorbic Acid (Vitamin C)",
              "Santiago, Olivia Luz",
              "1",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(5.99),
              },
              "Cash (Partial Payment)",
              "Un-Remitted",
              "2023-11-04",
              "Lim, Mateo David",
              "Agent",
            ],

            [
              "Amoxicillin",
              "Gomez, Alejandro Lu",
              "4",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(15.99),
              },
              "Cheque (Full Payment/Dated)",
              "Remitted",
              "2023-11-05",
              "Ramos, Emma Nicole",
              "Doctor",
            ],

            [
              "Loperamide",
              "Aquino, Guillermo Eduardo",
              "2",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(9.49),
              },
              "Cash (Partial Payment)",
              "Un-Remitted",
              "2023-11-06",
              "Castro, Isabella Maria",
              "Agent",
            ],

            [
              "Ranitidine",
              "Hernandez, Jaime Tomas",
              "3",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(11.99),
              },
              "Cheque (Partial Payment/PDC)",
              "Remitted",
              "2023-11-07",
              "Lopez, Isabela Marie",
              "Doctor",
            ],

            [
              "Salbutamol Inhaler",
              "Garcia, Eduardo Jacob",
              "1",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(18.99),
              },
              "E-Wallet",
              "Un-Remitted",
              "2023-11-08",
              "Garcia, Mia Gabriela",
              "Agent",
            ],

            [
              "Hydrochlorothiazide",
              "Torres, Miguel Willie",
              "2",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(14.99),
              },
              "Cash (Full Payment)",
              "Remitted",
              "2023-11-09",
              "Torres, Sophie Paige",
              "Doctor",
            ],

            [
              "Omeprazole",
              "Collado, Sophie Paige",
              "1",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(17.49),
              },
              "Cheque (Partial Payment/Dated)",
              "Un-Remitted",
              "2023-11-10",
              "Rivera, Benjamin Carlos",
              "Agent",
            ],

            [
              "Simvastatin",
              "Rivera, Benjamin Carlos",
              "3",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(16.99),
              },
              "E-Wallet",
              "Remitted",
              "2023-11-11",
              "Yap, Alden Jose",
              "Doctor",
            ],

            [
              "Metformin",
              "Yap, Alden Jose",
              "2",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(13.99),
              },
              "Cash (Full Payment)",
              "Un-Remitted",
              "2023-11-12",
              "Santos, Juan Carlos",
              "Agent",
            ],

            [
              "Acetylsalicylic Acid (Aspirin)",
              "Reyes, Emilio Andres",
              "4",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(7.99),
              },
              "Cheque (Full Payment/PDC)",
              "Remitted",
              "2023-11-13",
              "Lazaro, Maria Cristina",
              "Doctor",
            ],

            [
              "Loratadine",
              "Villanueva, Sofia Rosa",
              "1",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(10.49),
              },
              "E-Wallet",
              "Un-Remitted",
              "2023-11-14",
              "Del Rosario, Roberto Jose",
              "Agent",
            ],

            [
              "Ciprofloxacin",
              "Lim, Mateo David",
              "2",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(19.99),
              },
              "Cash (Full Payment)",
              "Remitted",
              "2023-11-15",
              "Santiago, Olivia Luz",
              "Doctor",
            ],

            [
              "Folic Acid",
              "Ramos, Emma Nicole",
              "3",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(6.99),
              },
              "Cheque (Partial Payment/PDC)",
              "Un-Remitted",
              "2023-11-16",
              "Gomez, Alejandro Lu",
              "Agent",
            ],

            [
              "Dextromethorphan",
              "Castro, Isabella Maria",
              "1",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(8.49),
              },
              "E-Wallet",
              "Remitted",
              "2023-11-17",
              "Ramos, Emma Nicole",
              "Doctor",
            ],

            [
              "Naproxen",
              "Lopez, Isabela Marie",
              "2",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(11.49),
              },
              "Cash (Partial Payment)",
              "Un-Remitted",
              "2023-11-18",
              "Garcia, Eduardo Jacob",
              "Agent",
            ],

            [
              "Esomeprazole",
              "Garcia, Mia Gabriela",
              "1",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(20.99),
              },
              "Cheque (Full Payment/Dated)",
              "Remitted",
              "2023-11-19",
              "Torres, Miguel Willie",
              "Doctor",
            ],

            [
              "Mefenamic Acid",
              "Torres, Sophie Paige",
              "2",
              {
                content: new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(9.99),
              },
              "E-Wallet",
              "Un-Remitted",
              "2023-11-20",
              "Collado, Sophie Paige",
              "Agent",
            ],
          ]}
        />
      </Flex>
    </Flex>
  );
}

export default Sales;
