import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tag,
  Badge,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu, FiList, FiX, FiSearch } from "react-icons/fi";
import { IconType } from "react-icons";
import { useState, useEffect } from "react";
import { useNavHeight } from "../stores/navHeight";
import getInventory from "../api/inventory";
import DynamicTable from "../components/DynamicTable";
import EditableCell from "../components/EditableCell";

function calculateStockStatus(qtyInStock: number, reorderLevel: number): string {
  if (qtyInStock <= 0) {
    return "No Stock"; // If qtyInStock is less than or equal to 0, return "No Stock".
  } else if (qtyInStock > reorderLevel) {
    return "In Stock"; // If qtyInStock is greater than reorderLevel, return "In Stock".
  } else {
    return "Low Stock"; // Otherwise, return "Low Stock".
  }
}

function Inventory() {
  const dummyInventory = [
    {
      category: "E",
      productName: "AMOXICILLIN",
      cog: 15.99,
      papers: true,
      pricePerUnit: 15.99,
      initialQuantity: 700,
      reOrderLevel: 300,
    },
    {
      category: "E",
      productName: "LOPERAMIDE",
      cog: 9.49,
      papers: true,
      pricePerUnit: 9.49,
      initialQuantity: 300,
      reOrderLevel: 100,
    },
    {
      category: "E",
      productName: "RANITIDINE",
      cog: 11.99,
      papers: true,
      pricePerUnit: 11.99,
      initialQuantity: 200,
      reOrderLevel: 120,
    },
    {
      category: "E",
      productName: "SALBUTAMOL INHALER",
      cog: 18.99,
      papers: false,
      pricePerUnit: 18.99,
      initialQuantity: 0,
      reOrderLevel: 1,
    },
    {
      category: "E",
      productName: "HYDROCHLOROTHIAZIDE",
      cog: 14.99,
      papers: true,
      pricePerUnit: 14.99,
      initialQuantity: 120,
      reOrderLevel: 24,
    },
    {
      category: "E",
      productName: "OMEPRAZOLE",
      cog: 17.49,
      papers: true,
      pricePerUnit: 17.49,
      initialQuantity: 100,
      reOrderLevel: 20,
    },
    {
      category: "A",
      productName: "PARACETAMOL",
      cog: 5.99,
      papers: false,
      pricePerUnit: 5.99,
      initialQuantity: 1000,
      reOrderLevel: 20,
    },
    {
      category: "B",
      productName: "IBUPROFEN",
      cog: 12.49,
      papers: false,
      pricePerUnit: 12.49,
      initialQuantity: 800,
      reOrderLevel: 30,
    },
    {
      category: "C",
      productName: "CETIRIZINE",
      cog: 8.99,
      papers: true,
      pricePerUnit: 8.99,
      initialQuantity: 1200,
      reOrderLevel: 40,
    },
    {
      category: "D",
      productName: "ASCORBIC ACID (VITAMIN C)",
      cog: 15.99,
      papers: true,
      pricePerUnit: 15.99,
      initialQuantity: 500,
      reOrderLevel: 20,
    },
    {
      category: "E",
      productName: "AMOXICILLIN",
      cog: 9.49,
      papers: true,
      pricePerUnit: 9.49,
      initialQuantity: 700,
      reOrderLevel: 300,
    },
    {
      category: "A",
      productName: "LOPERAMIDE",
      cog: 11.99,
      papers: true,
      pricePerUnit: 11.99,
      initialQuantity: 300,
      reOrderLevel: 100,
    },
    {
      category: "B",
      productName: "RANITIDINE",
      cog: 15.99,
      papers: true,
      pricePerUnit: 15.99,
      initialQuantity: 200,
      reOrderLevel: 120,
    },
    {
      category: "D",
      productName: "ASCORBIC ACID (VITAMIN C)",
      cog: 5.99,
      papers: false,
      pricePerUnit: 5.99,
      initialQuantity: 1000,
      reOrderLevel: 20,
    },
    {
      category: "E",
      productName: "LOPERAMIDE",
      cog: 11.99,
      papers: true,
      pricePerUnit: 11.99,
      initialQuantity: 300,
      reOrderLevel: 100,
    },
    {
      category: "A",
      productName: "RANITIDINE",
      cog: 80.0,
      papers: true,
      pricePerUnit: 150.0,
      initialQuantity: 50,
      reOrderLevel: 100,
    },
    {
      category: "D",
      productName: "ASCORBIC ACID (VITAMIN C)",
      cog: 200.0,
      papers: true,
      pricePerUnit: 450.0,
      initialQuantity: 30,
      reOrderLevel: 10,
    },
  ];
  const { navBarHeight } = useNavHeight();
  useEffect(() => {
    (async () => {
      let a = await getInventory(1);
      console.log(a);
    })();
  }, []);

  return (
    <Flex flexDir="column" overflow="hidden">
      {/* <Box bg='secondary.500'>
      asd
    </Box> */}
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
      </Flex>

      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable
          count={1}
          columns={[
            "Category",
            "Product",
            { content: "COG" },
            "Papers",
            { content: "Price per Unit" },
            "Initial Quantity",
            "Re-Order Level",
            "Current In Stock Quantity",
            "Status",
            {
              content: "Total Inventory Cost",
            },
            {
              content: "Total Inventory Value",
            },
          ]}
          rows={dummyInventory.map((value) => [
            { content: <Tag>{value.category}</Tag> },
            value.productName,
            { content: <EditableCell defaultValue={value.cog} /> },
            { content: <Checkbox defaultChecked={value.papers} /> },
            { content: <EditableCell defaultValue={value.pricePerUnit} /> },
            { content: <EditableCell defaultValue={value.initialQuantity} type="number" /> },
            { content: <EditableCell defaultValue={value.reOrderLevel} type="number" /> }, //value.reOrderLevel + "",
            value.initialQuantity + "",
            {
              content: (
                <Badge
                  variant="solid"
                  colorScheme={
                    value.initialQuantity >= value.reOrderLevel
                      ? "green"
                      : value.initialQuantity <= 0
                      ? "red"
                      : "orange"
                  }
                >
                  {value.initialQuantity >= value.reOrderLevel
                    ? "In Stock"
                    : value.initialQuantity <= 0
                    ? "No Stock"
                    : "Low Stock"}
                </Badge>
              ),
            },
            {
              content: new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(value.cog * value.initialQuantity),
            },
            {
              content: new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(value.pricePerUnit * value.initialQuantity),
            },
          ])}
        />
      </Flex>
      {/* <Table overflowX="unset" overflowY="unset" size="sm">
          <Thead
            _light={{ boxShadow: "base" }}
            _dark={{ bg: "rgb(31,31,63)", borderRadius: "xl" }}
            p={2}
            bg="white"
            position="sticky"
            top={0}
            zIndex="docked"
          >
            <Tr>
              <Th>Category</Th>
              <Th>Product</Th>
              <Th isNumeric>COG</Th>
              <Th>Papers</Th>
              <Th isNumeric>Price per Unit</Th>
              <Th>Initial Quantity</Th>
              <Th>Re-Order Level</Th>
              <Th>Current In Stock Quantity</Th>
              <Th>Status</Th>
              <Th isNumeric>Total Inventory Cost</Th>
              <Th isNumeric>Total Inventory Value</Th>
            </Tr>
          </Thead>
          <Tbody overflowX="auto" maxH="100px">
            {dummyInventory.map((value, index) => (
              <Tr
                key={index}
                _hover={{
                  _dark: {
                    bg: "gray.500",
                  },
                  _light: {
                    bg: "gray.200",
                  },
                }}
                _focus={{
                  _dark: {
                    bg: "rgba(255,255,255,0.75)",
                  },
                  _light: {
                    bg: "rgba(0,0,0,0.75)",
                  },
                }}
                transitionDuration="0.5s"
              >
                <Td>
                  <Tag>{value.category}</Tag>
                </Td>
                <Td>{value.productName}</Td>
                <Td isNumeric>
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(value.cog)}
                </Td>
                <Td>{value.papers ? "✔️" : "❌"}</Td>
                <Td isNumeric>
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(value.pricePerUnit)}
                </Td>
                <Td>{value.initialQuantity}</Td>
                <Td>{value.reOrderLevel}</Td>
                <Td>{value.initialQuantity}</Td>
                <Td>
                  <Badge
                    variant="solid"
                    colorScheme={
                      value.initialQuantity >= value.reOrderLevel
                        ? "green"
                        : value.initialQuantity <= 0
                        ? "red"
                        : "orange"
                    }
                  >
                    {value.initialQuantity >= value.reOrderLevel
                      ? "In Stock"
                      : value.initialQuantity <= 0
                      ? "No Stock"
                      : "Low Stock"}
                  </Badge>
                </Td>
                <Td isNumeric>
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(value.cog * value.initialQuantity)}
                </Td>
                <Td isNumeric>
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(value.pricePerUnit * value.initialQuantity)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table> */}
    </Flex>
  );
}

export default Inventory;
