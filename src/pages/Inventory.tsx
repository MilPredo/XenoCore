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
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiList,
  FiX,
  FiSearch,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { useState, useEffect } from "react";
import { useNavHeight } from "../stores/navHeight";
import getInventory from "../api/inventory";
import DynamicTable from "../components/DynamicTable";

function calculateStockStatus(
  qtyInStock: number,
  reorderLevel: number
): string {
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
      category: "Machines",
      productName: "Hemodialysis Machine",
      cog: 25000.0, // Cost in Philippine Peso
      papers: false,
      pricePerUnit: 45000.0, // Price in Philippine Peso
      initialQuantity: 5,
      reOrderLevel: 2,
    },
    {
      category: "Supplies",
      productName: "Dialyzer",
      cog: 150.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 300.0, // Price in Philippine Peso
      initialQuantity: 100,
      reOrderLevel: 50,
    },
    {
      category: "Supplies",
      productName: "Blood Tubing Set",
      cog: 25.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 60.0, // Price in Philippine Peso
      initialQuantity: 200,
      reOrderLevel: 100,
    },
    {
      category: "Medicine",
      productName: "Heparin Solution",
      cog: 10.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 25.0, // Price in Philippine Peso
      initialQuantity: 50,
      reOrderLevel: 20,
    },
    {
      category: "Machines",
      productName: "Reverse Osmosis System",
      cog: 8000.0, // Cost in Philippine Peso
      papers: false,
      pricePerUnit: 15000.0, // Price in Philippine Peso
      initialQuantity: 0,
      reOrderLevel: 1,
    },
    {
      category: "Supplies",
      productName: "Dialysis Catheters",
      cog: 80.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 150.0, // Price in Philippine Peso
      initialQuantity: 50,
      reOrderLevel: 100,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
      initialQuantity: 30,
      reOrderLevel: 10,
    },
    {
      category: "Medicine",
      productName: "Erythropoietin (EPO)",
      cog: 200.0, // Cost in Philippine Peso
      papers: true,
      pricePerUnit: 450.0, // Price in Philippine Peso
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
      </Flex>

      <DynamicTable
        columns={[
          "Category",
          "Product",
          { content: "COG", attributes: { isNumeric: true } },
          "Papers",
          { content: "Price per Unit", attributes: { isNumeric: true } },
          "Initial Quantity",
          "Re-Order Level",
          "Current In Stock Quantity",
          "Status",
          {
            content: "Total Inventory Cost",
            attributes: { isNumeric: true },
          },
          {
            content: "Total Inventory Value",
            attributes: { isNumeric: true },
          },
        ]}
        rows={dummyInventory.map((value) => [
          { content: <Tag>{value.category}</Tag> },
          value.productName,
          value.cog + "",
          value.papers ? "✔️" : "❌",
          {
            content: new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(value.pricePerUnit),
            attributes: { isNumeric: true },
          },
          value.initialQuantity + "",
          value.reOrderLevel + "",
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
            attributes: { isNumeric: true },
          },
          {
            content: new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "PHP",
            }).format(value.pricePerUnit * value.initialQuantity),
            attributes: { isNumeric: true },
          },
        ])}
      />
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
