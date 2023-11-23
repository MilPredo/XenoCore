import React from "react";
import DynamicTable from "../components/DynamicTable";
import { Button, Flex, Input } from "@chakra-ui/react";
import { FiPlus, FiSearch, FiUserPlus } from "react-icons/fi";

function Customers() {
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
        <Button leftIcon={<FiUserPlus />} variant="solid" colorScheme="green">
          Add Customer
        </Button>
      </Flex>
      <DynamicTable
        count={1}
        columns={["First Name", "Middle Name", "Last Name", "Address", "Notes"]}
        rows={[
          ["Manny", "Pacman", "Pakyaw", "Seneral Gantos", "Eyy boksingero pre!!"],
          ["Elon", "Martian", "Mars", "Elon City, Mars", "Is da GOAT!!!!"],
        ]}
      />
    </Flex>
  );
}

export default Customers;
