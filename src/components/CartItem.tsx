import { Button, Flex, Heading, Icon, Spacer, Text, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import QuantityInput from "./QuantityInput";
import { FiX } from "react-icons/fi";

export interface CartItemData {
  id: number;
  product_name: string;
  quantity?: string;
  default_ppu: number;
}

interface CartItemProps extends CartItemData {
  onChange?: (quantity: string) => void;
  onRemoveButtonPressed?: (id: number) => void;
}

function CartItem(props: CartItemProps) {
  const [quantity, setQuantity] = useState(props.quantity ?? "1");
  useEffect(() => {
    if (props.onChange) props.onChange(quantity);
  }, [quantity]);
  return (
    <Flex
      align="center"
      justify="center"
      _light={{ borderColor: "rgba(127,127,127,127)", borderWidth: "thin" }}
      borderRadius="lg"
      _dark={{ bg: "secondary.700" }}
    >
      <Button
        onClick={() => {
          if (props.onRemoveButtonPressed) {
            props.onRemoveButtonPressed(props.id);
          }
        }}
        size="xs"
        colorScheme="red"
        m={2}
      >
        <Icon as={FiX} />
      </Button>
      <Tooltip label={props.product_name}>
        <Heading flex={1} px={2} py={1} m={1} size="sm" textTransform="uppercase" isTruncated>
          {props.product_name}
        </Heading>
      </Tooltip>

      <Flex align="center" flexDir="column">
        <Heading px={2} py={1} m={1} size="sm" textTransform="uppercase">
          Price:{" "}
          {new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
          }).format(props.default_ppu)}
          ×{quantity}
        </Heading>
        <Heading px={2} py={1} m={1} size="sm" textTransform="uppercase">
          Total:{" "}
          {new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "PHP",
          }).format(props.default_ppu * Number.parseInt(quantity))}
        </Heading>
      </Flex>
      <Flex align="center" flexDir="column" gap="2">
        <Text>Qty.</Text>
        <QuantityInput onChange={setQuantity} />
      </Flex>
    </Flex>
  );
}

export default CartItem;
