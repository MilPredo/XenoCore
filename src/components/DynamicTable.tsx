import {
  Table,
  TableCellProps,
  TableColumnHeaderProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface DynamicTableProps {
  columns: {
    attributes?: TableColumnHeaderProps;
    content: any;
  }[];
  rows: {
    attributes?: TableCellProps;
    content: any;
  }[][];
}
const DynamicTable = (props: DynamicTableProps) => {
  // const [table, setTable] = useState({
  //   columns: [
  //     {
  //       attributes: {},
  //       content: <>asd</>,
  //     },
  //   ],
  //   rows: [[{ attributes: {}, content: <>dsa</> }]],
  // });
  return (
    <Table size="sm">
      <Thead
        bg="secondary.50"
        // borderRadius="xl" 
        boxShadow= "base"
        _dark={{
          bg:"secondary.700"
        }}
        p={2}
        position="sticky"
        top={0}
        zIndex="docked"
      >
        <Tr >
          {props.columns.map((value, index) => (
            <Th py={3} {...value.attributes} key={index}>
              {value.content}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {props.rows.map((row, index) => (
          <Tr key={index}>
            {row.map((cell, index) => (
              <Td {...cell.attributes} key={index}>
                {cell.content}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DynamicTable;
