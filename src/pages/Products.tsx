import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DynamicTable, { CellType } from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";
import AddProductButton from "../components/AddProductButton";
import { useProductStore } from "../stores/productStore";
import Pagination from "../components/Pagination";


//ppu-((cog - ppu)*0.1)
function Products() {
  const { rows, count, getProducts } = useProductStore();
  const [page, setPage] = useState(1);
  const [doSearch, setDoSearch] = useState(false);
  const [search, setSearch] = useState<{
    product_name: string;

    id: string;
  }>({ product_name: "", id: "" });
  useEffect(() => {
    console.log("id:", search.id.trim())
    setSearch({
      product_name: search.product_name.trim(),
      id: search.id.trim(),
    });
    getProducts(page, search.product_name.trim(), search.id.trim());
    console.log(rows);
  }, [page, doSearch]);
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
            placeholder="Search Item ID"
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
          onClick={() => {
            setDoSearch(!doSearch);
          }}
          leftIcon={<FiSearch />}
          variant="solid"
          colorScheme="cyan"
        >
          Search
        </Button>
        <AddProductButton onSubmitSuccess={() => setDoSearch(!doSearch)} />
      </Flex>
      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable
          columns={[
            "Category",
            "Item ID",
            "Product",
            "Default COG",
            "Default PPU",
            "MD Price",
            "Agent Price",
            // "Papers",
            // "Initial Qty",
            // "Re-Order Level",
            // "Current Quantity",
            // "Stock Status",
            "Description",
          ]}
          rows={rows}
          //columns={["Supplier", "Address", "Contact Number", "Email", "Notes"]}
          //rows={rows as (string | CellType)[][]}
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

export default Products;
