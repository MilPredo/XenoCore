import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  return (
    <Flex flexDir='column'>
      {id}
      <Text>This page is the Profile Page. </Text>
      <Text>This page is under construction 🚧. </Text>
      <Text>This page will show all information about the user</Text>
      <Text>
        This page will allow editing of user information, as well as adding
        access to specific modules.
      </Text>
    </Flex>
  );
}

export default Profile;
