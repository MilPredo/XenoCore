import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";
import AddProductButton from "../components/AddProductButton";

function Products() {
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
        <AddProductButton />
      </Flex>
      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable
          count={1}
          columns={[
            "Item ID",
            "Supplier",
            "Product",
            {
              content: "Current Sale Price Per Item",
            },
            "Description",
          ]}
          rows={[
            [
              "P001",
              "Paracetamol",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(10.99),
              },
              "Pain reliever and fever reducer",
            ],

            [
              "P002",
              "Ibuprofen",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(12.49),
              },
              "Nonsteroidal anti-inflammatory drug (NSAID)",
            ],

            [
              "P003",
              "Cetirizine",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(8.99),
              },
              "Antihistamine for allergy relief",
            ],

            [
              "P004",
              "Ascorbic Acid (Vitamin C)",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(5.99),
              },
              "Vitamin supplement for immune support",
            ],

            [
              "P005",
              "Amoxicillin",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(15.99),
              },
              "Antibiotic for bacterial infections",
            ],

            [
              "P006",
              "Loperamide",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(9.49),
              },
              "Anti-diarrheal medication",
            ],

            [
              "P007",
              "Ranitidine",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(11.99),
              },
              "H2 blocker for heartburn and acid indigestion",
            ],

            [
              "P008",
              "Salbutamol Inhaler",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(18.99),
              },
              "Bronchodilator for asthma relief",
            ],

            [
              "P009",
              "Hydrochlorothiazide",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(14.99),
              },
              "Diuretic for blood pressure control",
            ],

            [
              "P010",
              "Omeprazole",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(17.49),
              },
              "Proton pump inhibitor for stomach ulcers",
            ],

            [
              "P011",
              "Simvastatin",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(16.99),
              },
              "Statins for cholesterol management",
            ],

            [
              "P012",
              "Metformin",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(13.99),
              },
              "Antidiabetic medication",
            ],

            [
              "P013",
              "Acetylsalicylic Acid (Aspirin)",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(7.99),
              },
              "Pain reliever and anti-inflammatory",
            ],

            [
              "P014",
              "Loratadine",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(10.49),
              },
              "Antihistamine for allergy relief",
            ],

            [
              "P015",
              "Ciprofloxacin",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(19.99),
              },
              "Broad-spectrum antibiotic",
            ],

            [
              "P016",
              "Folic Acid",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(6.99),
              },
              "Vitamin supplement for prenatal care",
            ],

            [
              "P017",
              "Dextromethorphan",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(8.49),
              },
              "Cough suppressant",
            ],

            [
              "P018",
              "Naproxen",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(11.49),
              },
              "NSAID for pain and inflammation",
            ],

            [
              "P019",
              "Esomeprazole",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(20.99),
              },
              "Proton pump inhibitor for acid reflux",
            ],

            [
              "P020",
              "Mefenamic Acid",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(9.99),
              },
              "Nonsteroidal anti-inflammatory drug (NSAID)",
            ],

            [
              "P021",
              "Bonamine",
              {
                content: new Intl.NumberFormat("en-PH", {
                  style: "currency",
                  currency: "PHP",
                }).format(9.99),
              },
              "Anti-motion sickness",
            ],
          ]}
        />
      </Flex>
    </Flex>
  );
}

export default Products;
