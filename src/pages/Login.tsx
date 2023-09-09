import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
// import { Form, Formik, Field } from "formik";
import { useNavigate } from 'react-router-dom';
function Login() {
  let navigate = useNavigate();
  return (
    <Center w="100vw" h="100vh">
      <Card minW="sm" overflow={"hidden"}>
        <CardHeader>
          <Heading size="md" textAlign={"center"}>
            Inventory System Login
          </Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Enter username" />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
                <Input placeholder="Enter password" type="password" />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
          </Stack>
        </CardBody>
        <CardFooter>
          <Flex w="100%" justifyContent={"flex-end"}>
            <Button variant="solid" colorScheme="blue" onClick={()=>navigate('/dashboard')}>
              Log In
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Center>
  );
}

export default Login;
