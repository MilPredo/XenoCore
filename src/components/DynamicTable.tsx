import {
  Box,
  Flex,
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
import Pagination from "./Pagination";
export type ColumnType = {
  attributes?: TableColumnHeaderProps;
  content: any;
};
export type CellType = {
  attributes?: TableCellProps;
  content: any;
};
export interface DynamicTableProps {
  columns: any[];
  rows: any[][];
  count: number;
  onPageChange?: (page: number) => void;
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
    <>
      <Box borderRadius="md" boxShadow="base" overflow="auto" m="2">
        <Table size="sm">
          <Thead
            bg="secondary.50"
            // borderRadius="xl"
            boxShadow="base"
            _dark={{
              bg: "secondary.700",
            }}
            p={2}
            position="sticky"
            top={0}
            zIndex="docked"
          >
            <Tr>
              {props.columns.map((value, index) =>
                typeof value === "string" ? (
                  <Th textAlign="center" py={3} key={index}>
                    {value}
                  </Th>
                ) : (
                  <Th
                    textAlign="center"
                    py={3}
                    {...value.attributes}
                    key={index}
                  >
                    {value.content}
                  </Th>
                )
              )}
            </Tr>
          </Thead>
          <Tbody textTransform="uppercase">
            {props.rows.map((row, index) => (
              <Tr key={index}>
                {row.map((cell, index) => (
                  <Td textAlign="center" key={index}>
                    {cell}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box mb="8">
        <Pagination
          currentPage={1}
          maxPage={props.count / 16}
          onPageChange={(page) => {
            console.log(page);
            if (props.onPageChange) props.onPageChange(page);
            //setPage(page);
          }}
        />
      </Box>
    </>
  );
};

export default DynamicTable;
