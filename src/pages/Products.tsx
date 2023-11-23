import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";

function Products() {
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
          Add Product
        </Button>
      </Flex>
      <DynamicTable
        count={1}
        columns={[
          "Product",
          {
            attributes: { isNumeric: true },
            content: "Current Sale Price Per Item",
          },
          "Description",
        ]}
        rows={[
          [
            "Paracetamol",
            {
              attributes: { isNumeric: true },
              content: new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(25),
            },
            "ewan lol",
          ],
          [
            "Bonamine",
            {
              attributes: { isNumeric: true },
              content: new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(50),
            },
            "para di hilo ahaha",
          ],
        ]}
      />
    </Flex>
  );
}

export default Products;
