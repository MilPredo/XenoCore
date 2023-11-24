import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";

function Suppliers() {
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
          />
        </Flex>
        <Button leftIcon={<FiSearch />} variant="solid" colorScheme="cyan">
          Search
        </Button>
        <Button leftIcon={<FiPlus />} variant="solid" colorScheme="green">
          Add Supplier
        </Button>
      </Flex>
      <Flex flex={1} flexDir="column" m="6" overflow="hidden">
        <DynamicTable
          columns={["Supplier", "Address", "Contact Number", "Email", "Notes"]}
          rows={[
            [
              "United Laboratories (Unilab)",
              "123 Pharma Street, Metro Manila",
              "09171234567",
              "info@unilab.com",
              "Leading pharmaceutical company in the Philippines",
            ],
            [
              "Pfizer Philippines",
              "456 Med Lane, Quezon City",
              "09281234567",
              "info@pfizer.ph",
              "Global pharmaceutical giant",
            ],
            [
              "GlaxoSmithKline (GSK) Philippines",
              "789 Pharma Avenue, Makati City",
              "09391234567",
              "info@gsk.ph",
              "Multinational pharmaceutical company",
            ],
            [
              "Merck Philippines",
              "101 Health Drive, Taguig",
              "09451234567",
              "info@merck.com.ph",
              "Global healthcare and life sciences company",
            ],
            [
              "Sanofi Philippines",
              "555 Wellness Street, Manila",
              "09561234567",
              "info@sanofi.ph",
              "Global pharmaceutical company",
            ],
          ]}
          count={1}
        />
      </Flex>
    </Flex>
  );
}

export default Suppliers;
