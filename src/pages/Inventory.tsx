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
// import { useNavHeight } from "../stores/navHeight";
import DynamicTable from "../components/DynamicTable";
import EditableCell from "../components/EditableCell";
import { useInventoryStore } from "../stores/inventoryStore";
import Pagination from "../components/Pagination";
import { updateProduct } from "../api/product";
import EditProductButton from "../components/EditProductButton";

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
  const { rows, count, getInventory } = useInventoryStore();
  const [page, setPage] = useState(1);
  const [doSearch, setDoSearch] = useState(false);
  const [search, setSearch] = useState<{
    product_name: string;

    id: string;
  }>({ product_name: "", id: "" });
  useEffect(() => {
    console.log("id:", search.id);
    setSearch({
      product_name: search.product_name?.trim(),
      id: search.id,
    });
    getInventory(page, search.product_name?.trim(), search.id);
    console.log(rows);
  }, [page, doSearch]);

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
            placeholder="Search Product ID"
            value={search.id}
            onChange={(e) => {
              setSearch({ ...search, id: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDoSearch(!doSearch);
              }
            }}
          />
          <Input
            variant="filled"
            _light={{
              bg: "white",
            }}
            _dark={{
              _hover: { _placeholder: { color: "white", opacity: 0.5 } },
              _focus: { _placeholder: { color: "white", opacity: 0.5 } },
            }}
            placeholder="Search Product Name"
            value={search.product_name}
            onChange={(e) => {
              setSearch({ ...search, product_name: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDoSearch(!doSearch);
              }
            }}
          />
        </Flex>
        <Button
          leftIcon={<FiSearch />}
          variant="solid"
          colorScheme="cyan"
          onClick={() => {
            setDoSearch(!doSearch);
          }}
        >
          Search
        </Button>
      </Flex>

      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable
          // row.category,
          // row.id,
          // row.product_name,
          // row.papers,
          // row.default_cog,
          // row.default_ppu,
          // row.default_ppu - (row.default_ppu - row.default_cog) * 0.1, //md discount
          // row.default_ppu - (row.default_ppu - row.default_cog) * 0.2, //agent discount
          // row.reorder_level,
          // row.total_purchase_quantity,
          // row.total_sale_quantity,
          // row.inventory_balance,

          columns={[
            "",
            "Category",
            "ID",
            "Product",
            "Papers",
            "Cost of Goods",
            "Price per Unit",
            // "Price per Unit (MD Discount)",
            // "Price per Unit (Agent Discount)",
            "Re-Order Level",
            "Status",
            "Purchase Quantity",
            "Sale Quantity",
            "Inventory Balance",
            "Total Inventory Cost",
            "Total Inventory Value",
            "Total Inventory Value (MD Discount)",
            "Total Inventory Value (Agent Discount)",
          ]}
          rows={rows.map((row) => {
            return [
              <EditProductButton
                row={[
                  row.category,
                  row.id,
                  row.product_name,
                  new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(row.default_cog),
                  new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(row.default_ppu),
                  undefined,
                  undefined,
                  row.reorder_level,
                  row.description,
                ]}
                onSubmitSuccess={() => {
                  getInventory(page, search.product_name.trim(), search.id);
                }}
              />,
              <Tag>{row.category}</Tag>,
              row.id,
              row.product_name,
              <Checkbox readOnly defaultChecked={row.papers} />,
              new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(row.default_cog),
              new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(row.default_ppu),
              row.reorder_level,
              <Badge
                variant="solid"
                colorScheme={
                  row.inventory_balance > 0 ? (row.inventory_balance >= row.reorder_level ? "green" : "orange") : "red"
                }
              >
                {row.inventory_balance > 0 ? (row.inventory_balance >= row.reorder_level ? "IN STOCK" : "LOW STOCK") : "NO STOCK"}
              </Badge>,
              row.total_purchase_quantity,
              row.total_sale_quantity,
              row.inventory_balance,
              new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(row.inventory_balance * row.default_cog),
              new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(row.inventory_balance * row.default_ppu),
              new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(row.inventory_balance * (row.default_ppu - (row.default_ppu - row.default_cog) * 0.2)),
              new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(row.inventory_balance * (row.default_ppu - (row.default_ppu - row.default_cog) * 0.1)),
            ];
          })}
          // rows={[].map((value) => [
          //   <Tag>{value.category}</Tag>,
          //   value.productName,
          //   <EditableCell defaultValue={value.cog} />,
          //   <Checkbox defaultChecked={value.papers} />,
          //   <EditableCell defaultValue={value.pricePerUnit} />,
          //   <EditableCell defaultValue={value.initialQuantity} type="number" />,
          //   <EditableCell defaultValue={value.reOrderLevel} type="number" />, //value.reOrderLevel + "",
          //   value.initialQuantity + "",

          //   <Badge
          //     variant="solid"
          //     colorScheme={
          //       value.initialQuantity >= value.reOrderLevel ? "green" : value.initialQuantity <= 0 ? "red" : "orange"
          //     }
          //   >
          //     {value.initialQuantity >= value.reOrderLevel
          //       ? "In Stock"
          //       : value.initialQuantity <= 0
          //       ? "No Stock"
          //       : "Low Stock"}
          //   </Badge>,
          //   new Intl.NumberFormat("en-PH", {
          //     style: "currency",
          //     currency: "PHP",
          //   }).format(value.cog * value.initialQuantity),
          //   ,
          //   new Intl.NumberFormat("en-PH", {
          //     style: "currency",
          //     currency: "PHP",
          //   }).format(value.pricePerUnit * value.initialQuantity),
          //   ,
          // ])}
        />
        <Box mb="8">
          <Pagination
            currentPage={1}
            maxPage={count / 16}
            onPageChange={(page) => {
              console.log(page);
              setPage(page);
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default Inventory;
