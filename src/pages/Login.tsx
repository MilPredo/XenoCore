import React, { useEffect, useState } from "react";
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
import { Form, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import supabase from "../api/supabase";
import { useAuthStore } from "../stores/authStore";

interface LoginFormValues {
  email: string;
  password: string;
}

function Login() {
  let navigate = useNavigate();
  const { isAuthenticated, user, error, login } = useAuthStore();
  const [loginFailed, setLoginFailed] = useState<boolean | null>();
  useEffect(() => {
    if (isAuthenticated) {
      //console.log(user);
      navigate("/dashboard");
    }

    if (error) {
      //console.log(error);
      setLoginFailed(true);
    }
  }, [isAuthenticated, error]);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors: Partial<LoginFormValues> = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }
      //console.log(errors);
      return errors;
    },
    onSubmit: (values) => {
      // Handle form submission
      //console.log("hello");
      login(values.email, values.password);
    },
  });
  return (
    <Center w="100vw" h="100vh">
      <form onSubmit={formik.handleSubmit}>
        <Card minW="sm" overflow="hidden">
          <CardHeader>
            <Heading size="md" textAlign="center">
              Inventory System Login
            </Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={4}>
              <FormControl
                isInvalid={
                  (!!formik.errors.email && formik.touched.email) ||
                  !!loginFailed
                }
              >
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  (!!formik.errors.password && formik.touched.password) ||
                  !!loginFailed
                }
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <FormErrorMessage>
                  {formik.errors.password}{" "}
                  {loginFailed ? "Invalid Email and/or Password" : null}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </CardBody>
          <CardFooter>
            <Flex w="100%" justifyContent="flex-end">
              <Button variant="solid" colorScheme="blue" type="submit">
                Log In
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      </form>
    </Center>
  );
}

export default Login;
