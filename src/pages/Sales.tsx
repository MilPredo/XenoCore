import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";

function Sales() {
  return (
    <Flex flex={1} flexDir="column">
      <DynamicTable
        columns={[
          "Customer",
          "Product",
          { content: "Quantity", attributes: { isNumeric: true } },
          { content: "Sale Price", attributes: { isNumeric: true } },
          "Payment Method",
          "Remittance Status",
          "Agent",
        ]}
        rows={[
          [
            "Potato man",
            "Potato peeler",
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
            "LAST, FIRST MIDDLE",
          ],
        ]}
      />
    </Flex>
  );
}

export default Sales;
