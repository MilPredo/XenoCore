import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination() {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    maxPage: 100,
  });
  return (
    <Flex justify="center">
      <Flex bg="secondary.700" p="2" borderRadius="lg">
        <Button size="sm">
          <FiChevronLeft />
        </Button>
        {(() => {
          let pageButtons = [];
          for (
            let i = pagination.currentPage - 2;
            i <= pagination.currentPage + 2;
            i++
          ) {
            pageButtons.push(i);
          }
          return pageButtons;
        })().map((value, index) => (
          <Button key={index} size="sm" onClick={()=>setPagination({...pagination, currentPage: value})}>
            <Text>{value}</Text>
          </Button>
        ))}
        <Button size="sm">
          <FiChevronRight />
        </Button>
      </Flex>
    </Flex>
  );
}

export default Pagination;
