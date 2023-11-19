import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";
import { FiSearch } from "react-icons/fi";

function Purchases() {
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
      </Flex>
      <DynamicTable
        columns={[
          "Product",
          { content: "Quantity", attributes: { isNumeric: true } },
          { content: "Purchase Price", attributes: { isNumeric: true } },
          "Order Date",
          "Delivery Date",
          "Order Status",
          "Agent",
        ]}
        rows={[
          [
            "Potato peeler",
            { content: 2, attributes: { isNumeric: true } },
            {
              content: new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(100),
              attributes: { isNumeric: true },
            },
            "October 7, 2023",
            "October 14, 2023",
            "Delivered",
            "LAST, FIRST MIDDLE",
          ],
        ]}
      />
    </Flex>
  );
}

export default Purchases;
