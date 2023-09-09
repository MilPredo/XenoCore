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
import { useState } from "react";

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
  ];

  return (
    <Box>
      <InputGroup my={{ base: 0, md: 10 }}>
        <InputLeftElement pointerEvents="none">
          <FiSearch />
        </InputLeftElement>
        <Input type="text" placeholder="Search Item" />
      </InputGroup>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Category</Th>
              <Th>Product</Th>
              <Th>COG</Th>
              <Th>Papers</Th>
              <Th>Price per Unit</Th>
              <Th>Initial Quantity</Th>
              <Th>Re-Order Level</Th>
              <Th>Current In Stock Quantity</Th>
              <Th>Status</Th>
              <Th>Total Inventory Cost</Th>
              <Th>Total Inventory Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dummyInventory.map((value, index) => (
              <Tr key={index}>
                <Td>
                  <Tag>{value.category}</Tag>
                </Td>
                <Td>{value.productName}</Td>
                <Td>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value.cog)}</Td>
                <Td>{value.papers ? '✔️':'❌'}</Td>
                <Td>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value.pricePerUnit)}</Td>
                <Td>{value.initialQuantity}</Td>
                <Td>{value.reOrderLevel}</Td>
                <Td>{value.initialQuantity}</Td>
                <Td>
                  <Badge variant="solid" colorScheme={value.initialQuantity>=value.reOrderLevel ? 'green' : value.initialQuantity<=0 ? 'red': 'orange'}>
                    {value.initialQuantity>=value.reOrderLevel ? 'In Stock' : value.initialQuantity<=0 ? 'No Stock': 'Low Stock'}
                  </Badge>
                </Td>
                <Td>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value.cog*value.initialQuantity)}</Td>
                <Td>{new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value.pricePerUnit*value.initialQuantity)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Inventory;
