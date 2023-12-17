import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";
import AddSalesButton from "../components/AddSalesButton";
import { useSaleStore } from "../stores/saleStore";
import Pagination from "../components/Pagination";

function Sales() {
  const { rows, count, getSales } = useSaleStore();
  const [page, setPage] = useState(1);
  const [doSearch, setDoSearch] = useState(false);
  const [search, setSearch] = useState<{
    product_name: string;
  }>({ product_name: "" });
  useEffect(() => {
    setSearch({
      product_name: search.product_name.trim(),
    });
    getSales(page, search.product_name.trim());
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
        <AddSalesButton />
      </Flex>

      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable
          columns={[
            "Customer",
            "Product",
            "Quantity",
            "Sale Price",
            "Total Price",
            "Payment Method",
            "Remittance Status",
            "Date of transaction",
            "User",
            "User Type",
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

export default Sales;
