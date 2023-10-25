import { Avatar, Center, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

interface UserInfo {
  username: string;
}
function CurrentUserNav() {
  const { user }: { user: UserInfo } = useAuthStore();
  useEffect(() => {
    console.log(user.username);
  }, [user]);

  return (
    <Center>
      <Flex flexDir="column" align="center">
        <Avatar size="md" name={user.username} boxShadow={"base"} m={2} />
        <Text>{user.username}</Text>
      </Flex>
    </Center>
  );
}

export default CurrentUserNav;
