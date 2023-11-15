import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface UserCardProps {
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
}
//dominant.900
//secondary.800
//accentA.500
//accentB.600
function UserCard({
  username,
  first_name,
  middle_name,
  last_name,
}: UserCardProps) {
  return (
    <Card justify="center" flexGrow={1} bg="secondary.800" _light={{ bg: "secondary.50" }}>
      <CardHeader>
        <Flex align="center">
          <Avatar
            mr="5"
            size="lg"
            name={`${first_name} ${middle_name} ${last_name}`}
          />
          <Flex flexDir="column" overflow="hidden">
            <Heading
              size="md"
              textTransform="capitalize"
            >{`${first_name} ${last_name}`}</Heading>
            <Text isTruncated>@{username}</Text>
          </Flex>
          <Spacer/>
          <Button flex="none" variant='predo'>View Profile</Button>
        </Flex>
      </CardHeader>
      {/* <CardBody>
        <Text isTruncated fontWeight="bold">
          User Details
        </Text>
        <Text
          isTruncated
          textTransform="capitalize"
        >{`${last_name}, ${first_name} ${middle_name}`}</Text>
      </CardBody>
      <CardFooter>
        <Button colorScheme="accentA.500">View Profile</Button>
      </CardFooter> */}
    </Card>
  );
}

export default UserCard;
