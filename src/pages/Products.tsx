import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DynamicTable, { CellType } from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";
import AddProductButton from "../components/AddProductButton";
import { useProductStore } from "../stores/productStore";
import Pagination from "../components/Pagination";

function Products() {
  const { rows, count, getProducts } = useProductStore();
  const [page, setPage] = useState(1);
  const [doSearch, setDoSearch] = useState(false);
  const [search, setSearch] = useState<{
    product_name: string;
  }>({ product_name: "" });
  useEffect(() => {
    setSearch({ product_name: search.product_name.trim() });
    getProducts(page, search.product_name.trim());
    console.log(rows);
  }, [page, doSearch]);
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
            "Product",
            "Default COG",
            "Default PPU",
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
