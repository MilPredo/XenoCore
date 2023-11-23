import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

function NotFound() {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Page is under construction 🚧";
  }

  return (
    <Flex flex={1}>
      <Center w="100%" h="100%">
        <Flex flexDir="column" align={"center"}>
          <Heading size={"3xl"} m={26}>
            Hmm..
          </Heading>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Looks like this page is being shy right now...
          </Text>
          <Text fontStyle={"italic"}>{errorMessage}</Text>
          <Flex my="2em" flexDir={"column"} align={"center"}>
            <Text>Return to </Text>
            <Link to="/">
              <Button>Dashboard</Button>
            </Link>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
}

export default NotFound;
