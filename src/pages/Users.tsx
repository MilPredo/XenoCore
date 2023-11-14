import {
  Box,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import getUsers from "../api/users";
import UserCard from "../components/UserCard";
function Users() {
  const [users, setUsers] = useState<
    Array<{
      username: string;
      first_name: string;
      middle_name: string;
      last_name: string;
    }>
  >([]);
  useEffect(() => {
    (async () => {
      let a = await getUsers(1);
      setUsers(a);
      console.log(a);
    })();
  }, []);

  return (
    <Flex flex={1} flexDir="column" overflow="hidden">
      {/* <Box>
        <Heading size="md">Users</Heading>
      </Box> */}
      <Box overflow="auto">
        <SimpleGrid columns={4} spacing={2} m="4" >
          <Flex>
            <Card flexGrow={1} bg="secondary.800" _light={{ bg: "secondary.50" }}>
              <CardBody>
                <Box>
                  asd
                </Box>
              </CardBody>
            </Card>
          </Flex>
          {users.map((value, index) => (
            <Flex flexDir='column' key={index}>
              <UserCard {...value} />
            </Flex>
          ))}
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="uvuvevwevwe unyetenyevewe"
              middle_name="ugwemubwem"
              last_name="osas"
              username="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
          <Flex>
            <UserCard
              first_name="asd"
              last_name="asd"
              username="asd"
              middle_name="asd"
            />
          </Flex>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default Users;
