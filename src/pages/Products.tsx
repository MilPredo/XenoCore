import { Button, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DynamicTable, { CellType } from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";
import AddProductButton from "../components/AddProductButton";
import { useProductStore } from "../stores/productStore";

function Products() {
  const { rows, count, getProducts } = useProductStore();
  const [search, setSearch] = useState<{
    product_name: string;
  }>({ product_name: "" });
  useEffect(() => {
    getProducts();
    console.log(rows)
  }, []);
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
            placeholder="Search"
            value={search.product_name}
            onChange={(e) => {
              setSearch({ ...search, product_name: e.target.value.trim() });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getProducts(1, search.product_name);
              }
            }}
          />
        </Flex>
        <Button
          onClick={() => {
            getProducts(1, search.product_name);
          }}
          leftIcon={<FiSearch />}
          variant="solid"
          colorScheme="cyan"
        >
          Search
        </Button>
        <AddProductButton />
      </Flex>
      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable
          onPageChange={(page) => {
            getProducts(page);
          }}
          count={count}
          columns={[]}
          rows={[[]]}
          //columns={["Supplier", "Address", "Contact Number", "Email", "Notes"]}
          //rows={rows as (string | CellType)[][]}
        />
      </Flex>
    </Flex>
  );
}

export default Products;
