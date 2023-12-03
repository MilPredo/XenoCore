import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { FiPlus, FiSearch, FiUserPlus } from "react-icons/fi";
import AddCustomerButton from "../components/AddCustomerButton";
import { useCustomerStore } from "../stores/customerStore";
import Pagination from "../components/Pagination";

function Customers() {
  const { rows, count, getCustomers } = useCustomerStore();
  const [page, setPage] = useState(1);
  const [doSearch, setDoSearch] = useState(false);
  const [search, setSearch] = useState<{
    first_name: string;
    middle_name: string;
    last_name: string;
  }>({ first_name: "", middle_name: "", last_name: "" });
  useEffect(() => {
    setSearch({
      first_name: search.first_name.trim(),
      middle_name: search.middle_name.trim(),
      last_name: search.last_name.trim(),
    });
    getCustomers(page, search.first_name.trim(), search.middle_name.trim(), search.last_name.trim());
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
            placeholder="First Name"
            value={search.first_name}
            onChange={(e) => {
              setSearch({ ...search, first_name: e.target.value });
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
            placeholder="Middle Name"
            value={search.middle_name}
            onChange={(e) => {
              setSearch({ ...search, middle_name: e.target.value });
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
            placeholder="Last Name"
            value={search.last_name}
            onChange={(e) => {
              setSearch({ ...search, last_name: e.target.value });
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
        <AddCustomerButton onSubmitSuccess={() => setDoSearch(!doSearch)} />
      </Flex>

      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable columns={["First Name", "Middle Name", "Last Name", "Contact Number", "Notes"]} rows={rows} />
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

export default Customers;
