import { Box, Flex, Heading, List, ListItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CartItem, { CartItemData } from "./CartItem";

function Cart(props: {
  cartItems: CartItemData[];
  onChange?: (cartItems: CartItemData[]) => void;
  mode?: "cog" | "ppu";
}) {
  const updateCartItemQuantity = (itemId: number, quantity: string) => {
    let newCart = [...props.cartItems];
    let found = newCart.find((product) => product.id === itemId);
    if (found) {
      found.quantity = quantity;
      if (props.onChange) props.onChange(newCart);
    }
  };

  const removeItem = (itemId: number) => {
    console.log("delete!");
    let newCart = [...props.cartItems];
    console.log(props.cartItems);
    let found = newCart.find((product) => {
      console.log(`${product.id} === ${itemId}`, product.id === itemId);
      return product.id === itemId;
    });
    console.log(itemId, "found:", found);
    if (found) {
      newCart = newCart.filter((obj) => obj.id !== itemId);

      if (props.onChange) props.onChange(newCart);
    }
  };
  return (
    <Flex flexDir="column" height="100%">
      <Heading size="md" mb="4">
        Cart
      </Heading>
      <Box
        bg="secondary.50"
        _dark={{ bg: "transparent", borderWidth: "1px" }}
        borderRadius="xl"
        flex={1}
        overflow="auto"
      >
        <List spacing={1} p={1}>
          {props.cartItems
            .map((val) => {
              return (
                <ListItem key={val.id}>
                  <CartItem
                    id={val.id}
                    product_name={val.product_name}
                    default_ppu={val.default_ppu}
                    default_cog={val.default_cog}
                    onRemoveButtonPressed={removeItem}
                    mode={props.mode}
                    onChange={(quantity) => {
                      updateCartItemQuantity(val.id, quantity);
                    }}
                  />
                </ListItem>
              );
            })
            .reverse()}
        </List>
      </Box>
    </Flex>
  );
}

export default Cart;
