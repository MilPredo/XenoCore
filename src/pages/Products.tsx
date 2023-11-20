import { Flex } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";

function Products() {
  return (
    <Flex flex={1} flexDir="column">
      <DynamicTable
        columns={["Product", "Description"]}
        rows={[
          ["Paracetamol", "ewan lol"],
          ["Bonamine", "para di hilo ahaha"],
        ]}
      />
    </Flex>
  );
}

export default Products;
