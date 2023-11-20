import { Flex } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";

function Suppliers() {
  return (
    <Flex flex={1} flexDir="column">
      <DynamicTable
        columns={["Supplier", "Description"]}
        rows={[
          ["Arasaka", "ewan lol"],
          ["Biotechnica", "para di hilo ahaha"],
        ]}
      />
    </Flex>
  );
}

export default Suppliers;
