import { Box, Flex, Heading, List, ListItem, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CartItem, { CartItemData } from "./CartItem";

function Cart(props: {
  cartItems: CartItemData[];
  onChange?: (cartItems: CartItemData[]) => void;
  mode?: "cog" | "ppu";
  selected_user_type?: number
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
      const cog = item.default_cog
      const ppu = item.default_ppu
      let finalPPU = ppu;
      if (typeof props.selected_user_type !== "undefined" && cog && ppu){
        finalPPU = props.selected_user_type === 1
            ? ppu - (ppu - cog) * 0.2
            : props.selected_user_type === 2
            ? ppu - (ppu - cog) * 0.1
            : ppu
      }
      const itemValue = (props.mode === "cog" ? item.default_cog ?? 0 : finalPPU ?? 0)
      
      const itemTotal = itemValue * (item.quantity ?? 1);
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
  }, [props.cartItems, props.selected_user_type]);

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
                    default_ppu={props.selected_user_type === 1
                      ? (val.default_ppu??0) - ((val.default_ppu??0) - (val.default_cog??0)) * 0.2
                      : props.selected_user_type === 2
                      ? (val.default_ppu??0) - ((val.default_ppu??0) - (val.default_cog??0)) * 0.1
                      : (val.default_ppu??0)}
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
              Total Price {props.selected_user_type === 1
            ? "(Agent Discount)"
            : props.selected_user_type === 2
            ? "(MD Discount)"
            : ""}:
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
