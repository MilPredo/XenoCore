import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  return (
    <Flex flex={1} flexDir='column'>
      <Flex flex={1} bg='secondary.700' _light={{bg: "secondary.50"}}>
        asd
      </Flex>
      <Flex flex={1} bg='secondary.700' _light={{bg: "secondary.50"}}>
        asd
      </Flex>
    </Flex>
  );
}

export default Profile;
