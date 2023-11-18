import { Flex } from "@chakra-ui/react";
import React from "react";
import DynamicTable from "../components/DynamicTable";

function Purchases() {
  return (
    <Flex flex={1} flexDir="column">
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
