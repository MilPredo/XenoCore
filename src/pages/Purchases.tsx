import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DynamicTable, { CellType } from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";
import AddPurchaseButton from "../components/AddPurchaseButton";
import { usePurchaseStore } from "../stores/purchaseStore";
import Pagination from "../components/Pagination";

function Purchases() {
  const { rows, count, getPurchases } = usePurchaseStore();
  const [page, setPage] = useState(1);
  const [doSearch, setDoSearch] = useState(false);
  const [search, setSearch] = useState<{
    product_name: string;
    id: string;
  }>({ product_name: "", id: "" });
  useEffect(() => {
    setSearch({
      product_name: search.product_name.trim(),
      id: search.id.trim(),
    });
    getPurchases(page, search.product_name.trim(), search.id.trim());
    console.log(rows);
    console.log(count);
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
          onClick={() => {
            setDoSearch(!doSearch);
          }}
          leftIcon={<FiSearch />}
          variant="solid"
          colorScheme="cyan"
        >
          Search
        </Button>
        <AddPurchaseButton onSubmitSuccess={() => setDoSearch(!doSearch)} />
      </Flex>

      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable
          columns={[
            "Supplier",
            "Product ID",
            "Product",
            "Quantity",
            "Item Cost",
            "Total Cost",
            "Order Date",
            "Delivery Date",
            "Order Status",
            "User",
          ]}
          rows={rows}
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

export default Purchases;
