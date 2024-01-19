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
// import { useNavHeight } from "../stores/navHeight";
import DynamicTable from "../components/DynamicTable";
import EditableCell from "../components/EditableCell";
import { useInventoryStore } from "../stores/inventoryStore";
import Pagination from "../components/Pagination";
import { updateProduct } from "../api/product";

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
  // const dummyInventory = [
  //   {
  //     category: "E",
  //     productName: "AMOXICILLIN",
  //     cog: 15.99,
  //     papers: true,
  //     pricePerUnit: 15.99,
  //     initialQuantity: 700,
  //     reOrderLevel: 300,
  //   },
  //   {
  //     category: "E",
  //     productName: "LOPERAMIDE",
  //     cog: 9.49,
  //     papers: true,
  //     pricePerUnit: 9.49,
  //     initialQuantity: 300,
  //     reOrderLevel: 100,
  //   },
  //   {
  //     category: "E",
  //     productName: "RANITIDINE",
  //     cog: 11.99,
  //     papers: true,
  //     pricePerUnit: 11.99,
  //     initialQuantity: 200,
  //     reOrderLevel: 120,
  //   },
  //   {
  //     category: "E",
  //     productName: "SALBUTAMOL INHALER",
  //     cog: 18.99,
  //     papers: false,
  //     pricePerUnit: 18.99,
  //     initialQuantity: 0,
  //     reOrderLevel: 1,
  //   },
  //   {
  //     category: "E",
  //     productName: "HYDROCHLOROTHIAZIDE",
  //     cog: 14.99,
  //     papers: true,
  //     pricePerUnit: 14.99,
  //     initialQuantity: 120,
  //     reOrderLevel: 24,
  //   },
  //   {
  //     category: "E",
  //     productName: "OMEPRAZOLE",
  //     cog: 17.49,
  //     papers: true,
  //     pricePerUnit: 17.49,
  //     initialQuantity: 100,
  //     reOrderLevel: 20,
  //   },
  //   {
  //     category: "A",
  //     productName: "PARACETAMOL",
  //     cog: 5.99,
  //     papers: false,
  //     pricePerUnit: 5.99,
  //     initialQuantity: 1000,
  //     reOrderLevel: 20,
  //   },
  //   {
  //     category: "B",
  //     productName: "IBUPROFEN",
  //     cog: 12.49,
  //     papers: false,
  //     pricePerUnit: 12.49,
  //     initialQuantity: 800,
  //     reOrderLevel: 30,
  //   },
  //   {
  //     category: "C",
  //     productName: "CETIRIZINE",
  //     cog: 8.99,
  //     papers: true,
  //     pricePerUnit: 8.99,
  //     initialQuantity: 1200,
  //     reOrderLevel: 40,
  //   },
  //   {
  //     category: "D",
  //     productName: "ASCORBIC ACID (VITAMIN C)",
  //     cog: 15.99,
  //     papers: true,
  //     pricePerUnit: 15.99,
  //     initialQuantity: 500,
  //     reOrderLevel: 20,
  //   },
  //   {
  //     category: "E",
  //     productName: "AMOXICILLIN",
  //     cog: 9.49,
  //     papers: true,
  //     pricePerUnit: 9.49,
  //     initialQuantity: 700,
  //     reOrderLevel: 300,
  //   },
  //   {
  //     category: "A",
  //     productName: "LOPERAMIDE",
  //     cog: 11.99,
  //     papers: true,
  //     pricePerUnit: 11.99,
  //     initialQuantity: 300,
  //     reOrderLevel: 100,
  //   },
  //   {
  //     category: "B",
  //     productName: "RANITIDINE",
  //     cog: 15.99,
  //     papers: true,
  //     pricePerUnit: 15.99,
  //     initialQuantity: 200,
  //     reOrderLevel: 120,
  //   },
  //   {
  //     category: "D",
  //     productName: "ASCORBIC ACID (VITAMIN C)",
  //     cog: 5.99,
  //     papers: false,
  //     pricePerUnit: 5.99,
  //     initialQuantity: 1000,
  //     reOrderLevel: 20,
  //   },
  //   {
  //     category: "E",
  //     productName: "LOPERAMIDE",
  //     cog: 11.99,
  //     papers: true,
  //     pricePerUnit: 11.99,
  //     initialQuantity: 300,
  //     reOrderLevel: 100,
  //   },
  //   {
  //     category: "A",
  //     productName: "RANITIDINE",
  //     cog: 80.0,
  //     papers: true,
  //     pricePerUnit: 150.0,
  //     initialQuantity: 50,
  //     reOrderLevel: 100,
  //   },
  //   {
  //     category: "D",
  //     productName: "ASCORBIC ACID (VITAMIN C)",
  //     cog: 200.0,
  //     papers: true,
  //     pricePerUnit: 450.0,
  //     initialQuantity: 30,
  //     reOrderLevel: 10,
  //   },
  // ];
  // const { navBarHeight } = useNavHeight();

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
              <Tag>{row.category}</Tag>,
              row.id,
              row.product_name,
              <Checkbox readOnly defaultChecked={row.papers} />,
              <EditableCell
                defaultValue={row.default_cog}
                onSave={(val) => {
                  console.log("ahahha", val);
                  updateProduct(row.id, {
                    default_cog: parseFloat(val + ""),
                  }).then((response) => {
                    if (response?.status === 200) {
                      alert("Product COG Updated");
                      return true;
                    }
                  });
                  return false;
                }}
              />,
              <EditableCell
                defaultValue={row.default_ppu}
                onSave={(val) => {
                  console.log("ahahha", val);
                  updateProduct(row.id, {
                    default_ppu: parseFloat(val + ""),
                  }).then((response) => {
                    if (response?.status === 200) {
                      alert("Product PPU Updated");
                      return true;
                    }
                  });
                  return false;
                }}
              />,
              <EditableCell
                defaultValue={row.reorder_level}
                type="number"
                onSave={(val) => {
                  console.log("ahahha", val);
                  updateProduct(row.id, {
                    reorder_level: parseInt(val + ""),
                  }).then((response) => {
                    if (response?.status === 200) {
                      alert("Product Re=Order Level Updated");
                      return true;
                    }
                  });
                  return false;
                }}
              />,
              <Badge
                variant="solid"
                colorScheme={
                  row.inventory_balance >= row.reorder_level
                    ? "green"
                    : row.inventory_balance <= 0
                    ? "red"
                    : "orange"
                }
              >
                {row.inventory_balance >= row.reorder_level
                  ? "In Stock"
                  : row.inventory_balance <= 0
                  ? "No Stock"
                  : "Low Stock"}
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
              }).format(
                row.inventory_balance *
                  (row.default_ppu - (row.default_ppu - row.default_cog) * 0.2)
              ),
              new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(
                row.inventory_balance *
                  (row.default_ppu - (row.default_ppu - row.default_cog) * 0.1)
              ),
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
