import { Avatar, Center, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

interface UserInfo {
  user: {
    email: string;
  };
}
function CurrentUserNav() {
  const { user }: { user: UserInfo } = useAuthStore();
  useEffect(() => {
    console.log(user.user.email);
  }, [user]);

  return (
    <Center>
      <Flex flexDir="column" align='center'>
        <Avatar size="md" name={user.user.email} m={2} />
        <Text>{user.user.email}</Text>
      </Flex>
    </Center>
  );
}

export default CurrentUserNav;
