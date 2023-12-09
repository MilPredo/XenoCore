import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CartItem, { CartItemData } from "./CartItem";
import ProductItem, { ProductItemData } from "./ProductItem";
import { FiSearch } from "react-icons/fi";
import { getProduct } from "../api/product";
import Pagination from "./Pagination";

function ProductList(props: {
  cartItems: CartItemData[];
  onChange?: (cartItems: CartItemData[]) => void;
  mode?: "cog" | "ppu";
}) {
  const [productItems, setProductItems] = useState<ProductItemData[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [doSearch, setDoSearch] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    (async () => {
      const result = await getProduct(page, search);
      console.log(result?.rows);
      setCount(result?.count ?? 0);
      let productList = result?.rows.map((product) => {
        let newProduct: ProductItemData = {
          default_cog: product.default_cog,
          default_ppu: product.default_ppu,
          id: product.id,
          product_name: product.product_name,
        };
        return newProduct;
      });
      setProductItems(productList ?? []);
    })();
  }, [doSearch, page]);

  const isInCart = (itemId: number) => {
    const found = props.cartItems.find((product) => product.id === itemId);
    return found ? true : false;
  };

  const AddItemToCart = (itemId: number) => {
    let newCart = [...props.cartItems];
    let productFound = productItems.find((product) => product.id === itemId);
    if (productFound) {
      console.log("product", productFound);
      newCart.push(productFound);
      if (props.onChange) props.onChange(newCart);
    }
  };
  return (
    <Flex flexDir="column" height="100%" overflow="hidden">
      <Flex align="center" justify="center" gap={4} pb={2}>
        <Heading size="md">Products</Heading>
        <Input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder="Search Product"
          size="sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setDoSearch(!doSearch);
            }
          }}
        />
        <Button onClick={() => setDoSearch(!doSearch)} size="sm">
          <FiSearch />
        </Button>
      </Flex>
      <Box
        bg="secondary.50"
        _dark={{ bg: "transparent", borderWidth: "1px" }}
        borderRadius="xl"
        flex={1}
        overflow="auto"
      >
        <List spacing={1} p={1}>
          {productItems
            .map((val) => {
              if (isInCart(val.id)) return null;
              return (
                <ListItem key={val.id}>
                  <ProductItem
                    id={val.id}
                    mode={props.mode}
                    product_name={val.product_name}
                    default_ppu={val.default_ppu}
                    default_cog={val.default_cog}
                    onAddToCartButtonPressed={AddItemToCart}
                  />
                </ListItem>
              );
            })
            .filter(Boolean)}
        </List>
      </Box>

      <Box my="2">
        <Pagination
          currentPage={1}
          maxPage={count / 16}
          onPageChange={(page) => {
            console.log(page);
            setPage(page);
          }}
        />
      </Box>
    </Flex>
  );
}

export default ProductList;
