import { Button, Flex, Heading, Icon, Spacer, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import QuantityInput from "./QuantityInput";
import { FiArrowRight, FiX } from "react-icons/fi";

export interface ProductItemData {
  id: number;
  product_name: string;
  default_cog: number;
  default_ppu: number;
  mode?: "cog" | "ppu";
}

interface ProductItemProps extends ProductItemData {
  onAddToCartButtonPressed?: (id: number) => void;
}

function ProductItem(props: ProductItemProps) {
  return (
    <Flex
      align="center"
      justify="center"
      _light={{ borderColor: "rgba(127,127,127,127)", borderWidth: "thin" }}
      borderRadius="lg"
      _dark={{ bg: "secondary.700" }}
    >
      <Tooltip label={props.product_name}>
        <Heading
          flex={1}
          px={2}
          py={1}
          m={1}
          size="sm"
          textTransform="uppercase"
          isTruncated
        >
          {props.product_name}
        </Heading>
      </Tooltip>
      {props.mode === "cog" ? (
        <Heading
          flex={0}
          px={2}
          py={1}
          m={1}
          size="sm"
          textTransform="uppercase"
        >
          COG:{" "}
          {new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
          }).format(props.default_cog)}
        </Heading>
      ) : (
        <Heading
          flex={0}
          px={2}
          py={1}
          m={1}
          size="sm"
          textTransform="uppercase"
        >
          Price:{" "}
          {new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
          }).format(props.default_ppu)}
        </Heading>
      )}

      <Button
        onClick={() => {
          if (props.onAddToCartButtonPressed)
            props.onAddToCartButtonPressed(props.id);
        }}
        size="xs"
        colorScheme="green"
        m={2}
      >
        <Icon as={FiArrowRight} />
      </Button>
    </Flex>
    // <Flex align="center" borderColor="rgba(127,127,127,127)" borderWidth="thin" borderRadius="lg">
    //   <Button
    //     onClick={() => {
    //       if (props.onAddToCartButtonPressed) {
    //         props.onAddToCartButtonPressed(props.id);
    //       }
    //     }}
    //     size="xs"
    //     colorScheme="red"
    //     m={2}
    //   >
    //     <Icon as={FiX} />
    //   </Button>
    //   <Heading px={2} py={1} m={1} size="sm" textTransform="uppercase">
    //     {props.product_name}
    //   </Heading>
    //   <Heading px={2} py={1} m={1} size="sm" textTransform="uppercase">
    //     {new Intl.NumberFormat("en-PH", {
    //       style: "currency",
    //       currency: "PHP",
    //     }).format(props.default_ppu)}
    //     ×{quantity} ={" "}
    //     {new Intl.NumberFormat("en-PH", {
    //       style: "currency",
    //       currency: "PHP",
    //     }).format(props.default_ppu * Number.parseInt(quantity))}
    //   </Heading>
    //   <Spacer />
    //   <QuantityInput onChange={setQuantity} />
    // </Flex>
  );
}

export default ProductItem;
