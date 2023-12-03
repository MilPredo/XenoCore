import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DynamicTable, { CellType } from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";
import AddSupplierButton from "../components/AddSupplierButton";
import { useSupplierStore } from "../stores/supplierStore";
import Pagination from "../components/Pagination";

function Suppliers() {
  const { rows, count, getSuppliers } = useSupplierStore();
  const [page, setPage] = useState(1);
  const [doSearch, setDoSearch] = useState(false);
  const [search, setSearch] = useState<{
    supplier_name: string;
  }>({ supplier_name: "" });
  useEffect(() => {
    setSearch({ supplier_name: search.supplier_name.trim() });
    getSuppliers(page, search.supplier_name.trim());
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
            value={search.supplier_name}
            onChange={(e) => {
              setSearch({ ...search, supplier_name: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDoSearch(!doSearch);
                //getSuppliers(1, search.supplier_name);
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
        <AddSupplierButton onSubmitSuccess={() => setDoSearch(!doSearch)} />
      </Flex>
      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable
          columns={["Supplier", "Address", "Contact Number", "Email", "Notes"]}
          rows={rows as (string | CellType)[][]}
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

export default Suppliers;
