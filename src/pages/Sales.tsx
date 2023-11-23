import { Box, Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";

function Sales() {
  return (
    <Flex flex={1} flexDir="column">
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
          />
        </Flex>
        <Button leftIcon={<FiSearch />} variant="solid" colorScheme="cyan">
          Search
        </Button>
        <Button leftIcon={<FiPlus />} variant="solid" colorScheme="green">
          Add New
        </Button>
      </Flex>
      <DynamicTable
        count={1}
        columns={[
          "Product",
          "Customer",
          { content: "Quantity", attributes: { isNumeric: true } },
          { content: "Sale Price", attributes: { isNumeric: true } },
          "Payment Method",
          "Remittance Status",
          "Date of transaction",
          "User",
          "User Type",
        ]}
        rows={[
          [
            "Potato peeler",
            "Potato man",
            { content: 2, attributes: { isNumeric: true } },
            {
              content: new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(100),
              attributes: { isNumeric: true },
            },
            "Cash",
            "Un-Remitted",
            "December 1, 2023",
            "LAST, FIRST MIDDLE",
            "Doctor"
          ],
        ]}
      />
    </Flex>
  );
}

export default Sales;
