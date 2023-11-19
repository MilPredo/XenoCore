import { Box, Checkbox, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsersProfile } from "../api/users";
import { FiUser } from "react-icons/fi";
import DynamicTable from "../components/DynamicTable";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<{
    user: {
      id: number;
      username: string;
      first_name: string;
      middle_name: string;
      last_name: string;
    };
    access: {
      [key: string]: {
        create: boolean;
        read: boolean;
        update: boolean;
        delete: boolean;
      };
    };
  }>();
  useEffect(() => {
    (async () => {
      const asd = await getUsersProfile(Number(id));
      setProfile(asd);
    })();
  }, []);
  return (
    <Flex flex={1} flexDir="column">
      <Flex p="4" m="4" flexDir="column" gap="2">
        <Flex flexDir="row">
          <Flex
            flexDir="column"
            borderRadius="xl"
            gap="2"
            p="4"
            bg="secondary.700"
            _light={{ bg: "secondary.50" }}
          >
            <Flex flexDir="row" gap="2">
              <Heading
                bg="dominant.600"
                _light={{ bg: "dominant.50" }}
                px="2"
                py="1"
                borderRadius="md"
                fontWeight="semibold"
                textTransform="uppercase"
              >
                {profile?.user.first_name}
              </Heading>
              <Heading
                bg="dominant.600"
                _light={{ bg: "dominant.50" }}
                px="2"
                py="1"
                borderRadius="md"
                fontWeight="semibold"
                textTransform="uppercase"
              >
                {profile?.user.middle_name}
              </Heading>
              <Heading
                bg="dominant.600"
                _light={{ bg: "dominant.50" }}
                px="2"
                py="1"
                borderRadius="md"
                fontWeight="semibold"
                textTransform="uppercase"
              >
                {profile?.user.last_name}
              </Heading>
            </Flex>
            <Flex align="center" flexDir="row" gap="2">
              <Text
                borderRadius="md"
                bg="accentA.500"
                _light={{ bg: "accentB.500" }}
                px="1"
                py="0"
                fontWeight="bold"
                fontSize="xl"
              >
                @{profile?.user.username}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <DynamicTable
          columns={["Module", "Create", "Read", "Update", "Delete"]}
          rows={[
            [
              "User Management",
              {
                content: (
                  <Checkbox
                    isReadOnly
                    isChecked={profile?.access["user_management_access"]?.create ?? false}
                  />
                ),
              },
              {
                content: (
                  <Checkbox
                    isReadOnly
                    isChecked={profile?.access["user_management_access"]?.read ?? false}
                  />
                ),
              },
              {
                content: (
                  <Checkbox
                    isReadOnly
                    isChecked={profile?.access["user_management_access"]?.update ?? false}
                  />
                ),
              },
              {
                content: (
                  <Checkbox
                    isReadOnly
                    isChecked={profile?.access["user_management_access"]?.delete ?? false}
                  />
                ),
              },
            ],
          ]}
        />
      </Flex>
    </Flex>
  );
}

export default Profile;
