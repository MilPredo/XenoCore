import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  maxPage: number;
}
function Pagination({ currentPage = 1, maxPage = 10 }: PaginationProps) {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    maxPage: 100,
  });
  function clamp(number: number, min: number, max: number) {
    return Math.min(Math.max(number, min), max);
  }
  useEffect(() => {
    setPagination({ currentPage, maxPage });
  }, [maxPage, currentPage]);

  return (
    <Flex justify="center">
      <Flex gap={1} bg="secondary.700" p="2" borderRadius="lg">
        <Button
          size="sm"
          onClick={() =>
            setPagination({
              ...pagination,
              currentPage: 1,
            })
          }
        >
          <FiChevronsLeft />
        </Button>
        <Button
          size="sm"
          mr="2"
          onClick={() =>
            setPagination({
              ...pagination,
              currentPage: Math.max(pagination.currentPage - 1, 1),
            })
          }
        >
          <FiChevronLeft />
        </Button>
        {(() => {
          let pageButtons = [];
          for (let i = -2; i <= 2; i++) {
            //
            pageButtons.push(
              i + clamp(pagination.currentPage, 1 + 2, pagination.maxPage - 2)
            );
          }
          return pageButtons;
        })().map((value, index) => (
          <Button
            key={index}
            colorScheme={value === pagination.currentPage ? "cyan" : "gray"}
            size="sm"
            onClick={() => setPagination({ ...pagination, currentPage: value })}
          >
            <Text>{value}</Text>
          </Button>
        ))}
        <Button
          size="sm"
          ml="2"
          onClick={() =>
            setPagination({
              ...pagination,
              currentPage: Math.min(
                pagination.currentPage + 1,
                pagination.maxPage
              ),
            })
          }
        >
          <FiChevronRight />
        </Button>
        <Button
          size="sm"
          onClick={() =>
            setPagination({
              ...pagination,
              currentPage: pagination.maxPage,
            })
          }
        >
          <FiChevronsRight />
        </Button>
      </Flex>
    </Flex>
  );
}

export default Pagination;
