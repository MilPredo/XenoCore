import { Button, Flex, Input, Select } from "@chakra-ui/react";
import React from "react";
import DynamicTable, { CellType } from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";
import AddPurchaseButton from "../components/AddPurchaseButton";

function Purchases() {


  const mockData: Array<CellType | string>[] = [
    [
      "UNITED LABORATORIES (UNILAB)",
      "Paracetamol",
      "1000",
      "5.99",
      "2023-11-01",
      "2023-11-05",
      "Delivered",
      "Santos, Juan Carlos",
    ],

    // Row 2
    [
      "PFIZER PHILIPPINES",
      "Ibuprofen",
      "12.49",
      "2023-11-02",
      "2023-11-07",
      "Ordered",
      "Lazaro, Maria Cristina",
    ],

    // Row 3
    [
      "GLAXOSMITHKLINE (GSK) PHILIPPINES",
      "Cetirizine",
      "1200",
      "8.99",
      "2023-11-03",
      "2023-11-10",
      "Incomplete",
      "Del Rosario, Roberto Jose",
    ],

    // Row 4
    [
      "MERCK PHILIPPINES",
      "Ascorbic Acid (Vitamin C)",
      "500",
      "15.99",
      "2023-11-04",
      "2023-11-11",
      "Delivered",
      "Santiago, Olivia Luz",
    ],

    // Row 5
    [
      "SANOFI PHILIPPINES",
      "Amoxicillin",
      "700",
      "9.49",
      "2023-11-05",
      "2023-11-12",
      "Ordered",
      "Gomez, Alejandro Lu",
    ],

    // Row 6
    [
      "UNITED LABORATORIES (UNILAB)",
      "Loperamide",
      "300","11.99",
      "2023-11-06",
      "2023-11-13",
       "Delivered",
      "Hernandez, Jaime Tomas",
    ],

    // Row 7
    [
      "PFIZER PHILIPPINES",
      "Ranitidine",
      "1500", "18.99",
      "2023-11-07",
      "2023-11-14",
       "Incomplete",
      "Garcia, Eduardo Jacob",
    ],

    // Row 8
    [
      "GLAXOSMITHKLINE (GSK) PHILIPPINES",
      "Salbutamol Inhaler",
      "200", 
      "14.99",
      "2023-11-08",
      "2023-11-15",
       "Delivered",
      "Torres, Miguel Willie",
    ],

    // Row 9
    [
      "MERCK PHILIPPINES",
      "Hydrochlorothiazide",
      "1000", "17.49",
      "2023-11-09",
      "2023-11-16",
       "Ordered",
      "Villanueva, Sofia Rosa",
    ],

    // Row 10
    [
      "SANOFI PHILIPPINES",
      "Omeprazole",
      "500", "16.99",
      "2023-11-10",
      "2023-11-17",
       "Delivered",
      "Lim, Mateo David",
    ],

    // Row 11
    [
      "UNITED LABORATORIES (UNILAB)",
      "Simvastatin",
      "600",
       "20.99",
      "2023-11-11",
      "2023-11-18",
       "Incomplete",
      "Rivera, Benjamin Carlos",
    ],

    // Row 12
    [
      "PFIZER PHILIPPINES",
      "Metformin",
      "400", "13.99",
      "2023-11-12",
      "2023-11-19",
       "Delivered",
      "Reyes, Emilio Andres",
    ],

    // Row 13
    [
      "GLAXOSMITHKLINE (GSK) PHILIPPINES",
      "Acetylsalicylic Acid (Aspirin)",
      "800", "8.49",
      "2023-11-13",
      "2023-11-20",
       "Ordered",
      "Dela Cruz, Maria Elena",
    ],

    // Row 14
    [
      "MERCK PHILIPPINES",
      "Loratadine",
      "200",
       "10.49",
      "2023-11-14",
      "2023-11-21",
       "Delivered",
      "Gomez, Alejandro Lu",
    ],

    // Row 15
    [
      "SANOFI PHILIPPINES",
      "Ciprofloxacin",
      "300", "19.99",
      "2023-11-15",
      "2023-11-22", "Incomplete",
      "Castro, Isabella Maria",
    ],

    // Row 16
    [
      "UNITED LABORATORIES (UNILAB)",
      "Folic Acid",
      "400",
      "6.99",
      "2023-11-16",
      "2023-11-23",
      "Delivered",
      "Hernandez, Jaime Tomas",
    ],
  ];
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
        <AddPurchaseButton />
      </Flex>

      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable
          count={1}
          columns={[
            "Supplier",
            "Product",
            "Quantity",
            "Purchase Price Per Unit",
            "Order Date",
            "Delivery Date",
            "Order Status",
            "User",
          ]}
          rows={[[]]}
        />
      </Flex>
    </Flex>
  );
}

export default Purchases;
