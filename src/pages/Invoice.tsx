import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";
import AddSalesButton from "../components/AddSalesButton";
import { useSaleStore } from "../stores/saleStore";
import Pagination from "../components/Pagination";
import CreateRequestButton from "../components/CreateRequestButton";
import DirectInvoiceButton from "../components/DirectInvoiceButton";

function Invoice() {
  //const { rows, count, getSales } = useSaleStore();
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
    //getSales(page, search.product_name.trim(), search.id.trim());
    //console.log(rows);
    //console.log(count);
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
            placeholder="Search Request ID"
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
            placeholder="Search User Name"
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
        <DirectInvoiceButton />
        {/* <AddSalesButton onSubmitSuccess={() => setDoSearch(!doSearch)} /> */}
      </Flex>

      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable
          columns={[
            "",
            "Requested By",
            "Request ID",
            "Request Date",
            "Address",
            "Status",
          ]}
          rows={[[<Button>View</Button>,"Mil", 1, "February 21, 2024", "Urbiztondo, San Juan, La Union"]]}
        />
        <Box mb="8">
          <Pagination
            currentPage={1}
            maxPage={1 / 16}
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

export default Invoice;
