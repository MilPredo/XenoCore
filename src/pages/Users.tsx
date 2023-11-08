import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import getUsers from "../api/users";

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
      setUsers(a??[]);
      console.log(a);
    })();
  }, []);

  return (
    <Flex flexDir="column" _dark={{ bg: "#0F0F1F" }} p="4">
      <Box>
        <Heading size="md">Users</Heading>
      </Box>
      <Box>
        {users.map((value, index) => (
          <Box key={index}>
            <text>{value.username}</text>
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

export default Users;
