import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CartItem, { CartItemData } from "./CartItem";
import ProductItem, { ProductItemData } from "./ProductItem";
import { FiSearch } from "react-icons/fi";
import { getProduct } from "../api/product";
import Pagination from "./Pagination";
import DynamicTable from "./DynamicTable";
import { getCustomer } from "../api/customer";
import { CustomerRow } from "../interface";

function Customer(props: {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}) {
  return (
    <Flex
      align="center"
      justify="center"
      _light={{ borderColor: "rgba(127,127,127,127)", borderWidth: "thin" }}
      borderRadius="lg"
      _dark={{ bg: "secondary.700" }}
    >
      <Heading
        flex={1}
        px={2}
        py={1}
        m={1}
        size="sm"
        textTransform="uppercase"
        isTruncated
      >
        {props.firstName}
      </Heading>
      <Heading
        flex={1}
        px={2}
        py={1}
        m={1}
        size="sm"
        textTransform="uppercase"
        isTruncated
      >
        {props.middleName}
      </Heading>
      <Heading
        flex={1}
        px={2}
        py={1}
        m={1}
        size="sm"
        textTransform="uppercase"
        isTruncated
      >
        {props.lastName}
      </Heading>

      <Button
        // onClick={() => {
        //   if (props.onAddToCartButtonPressed)
        //     props.onAddToCartButtonPressed(props.id);
        // }}
        size="xs"
        colorScheme="green"
        m={2}
      >
        Select
      </Button>
    </Flex>
  );
}

function CustomerSelector(props: {
  onChange?: (cartItems: CartItemData[]) => void;
}) {
  const [customers, setCustomers] = useState<
    {
      id: number;
      first_name: string;
      middle_name: string;
      last_name: string;
    }[]
  >([]);
  const [selected, setSelected] = useState<{
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
  }>();
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [doSearch, setDoSearch] = useState(false);
  const [search, setSearch] = useState<{
    first_name: string;
    middle_name: string;
    last_name: string;
  }>({ first_name: "", middle_name: "", last_name: "" });

  useEffect(() => {
    // setSearch({
    //   first_name: search.first_name,
    //   middle_name: search.middle_name.trim(),
    //   last_name: search.last_name.trim(),
    // });
    (async () => {
      const result = await getCustomer(
        page,
        search.first_name.trim(),
        search.middle_name.trim(),
        search.last_name.trim()
      );
      console.log(result?.rows);
      setCount(result?.count ?? 0);
      let customerlist = result?.rows.map((val) => {
        return {
          id: val.id,
          first_name: val.first_name,
          middle_name: val.middle_name,
          last_name: val.last_name,
        };
      });

      setCustomers(customerlist ?? []);
    })();
  }, [doSearch, page]);

  return (
    <Flex flexDir="column" height="100%" overflow="hidden">
      <Flex align="center" justify="center" gap={4} pb={2}></Flex>
      {/* <Box
        bg="secondary.50"
        _dark={{ bg: "transparent", borderWidth: "1px" }}
        borderRadius="xl"
        flex={1} 
        overflow="auto"
      >
        <List spacing={1} p={1}>
          {customers
            .map((val) => {
              return (
                <ListItem key={val.id}>
                  <Customer
                    id={val.id}
                    firstName={val.first_name}
                    middleName={val.first_name}
                    lastName={val.first_name}
                  />
                </ListItem>
              );
            })
            .filter(Boolean)}
        </List>
      </Box> */}
      <Flex m="6" gap={6}>
        <Flex flexDir="column" flex={1} gap={2}>
          <Input
            onChange={(e) => {
              setSearch({ ...search, first_name: e.target.value });
            }}
            value={search.first_name}
            placeholder="First Name"
            size="sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDoSearch(!doSearch);
              }
            }}
          />
          <Input
            onChange={(e) => {
              setSearch({ ...search, middle_name: e.target.value });
            }}
            value={search.middle_name}
            placeholder="Middle Name"
            size="sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDoSearch(!doSearch);
              }
            }}
          />
          <Input
            onChange={(e) => {
              setSearch({ ...search, last_name: e.target.value });
            }}
            value={search.last_name}
            placeholder="Last Name"
            size="sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setDoSearch(!doSearch);
              }
            }}
          />
          <Button onClick={() => setDoSearch(!doSearch)} size="sm">
            <FiSearch />
          </Button>
          <Flex>
            <Heading size="sm">Selected: </Heading>
            <Heading
              flex="1"
              textAlign="center"
              size="sm"
              textTransform="uppercase"
            >
              {selected
                ? selected?.first_name +
                  `${
                    selected?.middle_name
                      ? " " + selected?.middle_name + " "
                      : " "
                  }` +
                  selected?.last_name
                : "None"}
            </Heading>
          </Flex>
        </Flex>
        <Flex flex={2} flexDir="column" overflow="hidden" maxH="200">
          <DynamicTable
            columns={["First Name", "Middle Name", "Last Name", ""]}
            rows={customers.map((val) => {
              return [
                val.first_name,
                val.middle_name,
                val.last_name,
                <Button
                  isDisabled={selected?.id === val.id}
                  onClick={() => {
                    setSelected({ ...val });
                  }}
                  size="sm"
                  colorScheme={selected?.id === val.id?"green":"cyan"}
                >
                  {selected?.id === val.id?"Selected":"Select"}
                </Button>,
              ];
            })}
          />
        </Flex>
      </Flex>

      <Box my="2">
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
  );
}

export default CustomerSelector;
