import { Box, Flex, Heading, List, ListItem, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CartItem, { CartItemData } from "./CartItem";

function Cart(props: {
  cartItems: CartItemData[];
  onChange?: (cartItems: CartItemData[]) => void;
  mode?: "cog" | "ppu";
}) {
  const updateCartItemQuantity = (itemId: number, quantity: number) => {
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

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const calculateCartTotalPrice = () => {
    let total = props.cartItems.reduce((total, item) => {
      const itemTotal = (props.mode === "cog" ? item.default_cog ?? 0 : item.default_ppu ?? 0) * (item.quantity ?? 1);
      return total + itemTotal;
    }, 0);
    console.log("adwadsaw", total);
    setTotalPrice(total);
  };

  const calculateCartTotalQuantity = () => {
    let total = props.cartItems.reduce((total, item) => {
      return total + (typeof item.quantity === "undefined" ? 1 : item.quantity);
    }, 0);
    setTotalQuantity(total);
  };

  useEffect(() => {
    calculateCartTotalPrice();
    calculateCartTotalQuantity();
  }, [props.cartItems]);

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
        minH={200}
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
      <Flex>
        <Spacer />
        <Box
          flexDir="column"
          my="2"
          px="2"
          _light={{ borderColor: "rgba(127,127,127,127)", borderWidth: "thin" }}
          borderRadius="lg"
          _dark={{ bg: "secondary.700" }}
        >
          <Flex my="1" align="center" gap={2}>
            <Text as="span" fontSize="lg" fontWeight="medium">
              Total Price:
            </Text>
            <Text
              as="span"
              textColor="gold"
              _light={{
                textColor: "black",
                bg: "gold",
                px: "1ch",
                borderRadius: "full",
              }}
              fontSize="lg"
              py="1px"
              fontWeight="black"
            >
              {new Intl.NumberFormat("en-PH", {
                style: "currency",
                currency: "PHP",
              }).format(totalPrice)}
            </Text>
          </Flex>

          <Flex mb="1" align="center" gap={2}>
            <Text fontSize="lg" fontWeight="medium">
              Total Quantity:
            </Text>
            <Text as="span" fontSize="lg" fontWeight="black">
              {totalQuantity}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Cart;
