import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";
import { FiPlus, FiSearch } from "react-icons/fi";

function Suppliers() {
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
          Add Supplier
        </Button>
      </Flex>
      <DynamicTable
        columns={["Supplier", "Address", "Contact Number", "Email", "Notes"]}
        rows={[
          ["Arasaka", "Big St, Night City", "09232323232", "arasaka@arasaka.com", "ewan"],
          ["Biotechnica", "Smol St, Night City", "09232275232", "biotechnica@biotechnica.com", "para di aa ahaha"],
        ]}
      />
    </Flex>
  );
}

export default Suppliers;
