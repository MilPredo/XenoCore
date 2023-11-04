import { Box, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import getUsers from '../api/users';

function Users() {

  useEffect(() => {
    (async () =>{
      let a = await getUsers(1);
      console.log(a)
    })()
  }, []);

  return (
    <Flex flexDir="column" _dark={{ bg: '#0F0F1F' }} p='4'>
      <Box>
        <Heading size='md'>Users</Heading>
      </Box>
      <Box>
        
      </Box>
    </Flex>
  )
}

export default Users