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
import { Link } from "react-router-dom";

interface UserCardProps {
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  occupation: string;
  userid: string;
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
  occupation,
  userid,
}: UserCardProps) {
  return (
    <Card
      justify="center"
      flexGrow={1}
      bg="secondary.700"
      _light={{ bg: "secondary.50" }}
    >
      <CardHeader>
        <Flex align="center">
          {/* <Avatar
            mr="5"
            bg='accentA.500'
            size="lg"
            name={`${first_name} ${middle_name} ${last_name}`}
          /> */}
          <Flex gap={1} flexDir="column" overflow="hidden">
            <Flex flexDir="row">
              <Heading
                size="md"
                borderWidth="2px"
                borderColor="blackAlpha.200"
                _dark={{
                  borderColor: "accentA.300",
                }}
                p="2"
                borderRadius="lg"
                textTransform="capitalize"
              >{`${first_name} ${middle_name} ${last_name}`}</Heading>
            </Flex>

            <Flex gap={2}>
              <Flex flexDir="row" align="center">
                <Text
                  isTruncated
                  borderWidth="2px"
                  borderColor="blackAlpha.200"
                  _dark={{
                    borderColor: "accentA.500",
                  }}
                  p="2"
                  py="0"
                  borderRadius="lg"
                >
                  @{username}
                </Text>
              </Flex>
              <Flex flexDir="row" align="center">
                <Text
                  isTruncated
                  // borderWidth="2px"
                  bg="blackAlpha.200"
                  _dark={{
                    bg: "accentA.500",
                  }}
                  p="2"
                  py="0"
                  borderRadius="lg"
                >
                  {occupation}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Spacer minW={2} />
          <Link to={`${userid}`}>
            <Button flex="none" variant="predo">
              View Profile
            </Button>
          </Link>
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
