import React from "react";
import DynamicTable from "../components/DynamicTable";
import { Flex } from "@chakra-ui/react";

function Customers() {
  return (
    <Flex flex={1} flexDir="column">
      <DynamicTable
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
