import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

function Sales() {
  return (
    <Flex flex={1} flexDir='column'>
      <Box flex={1} bg='red'>asd</Box>
      <Box flex={2} bg='green'>asd</Box>
      <Box flex={3} bg='blue'>asd</Box>
    </Flex>
  )
}

export default Sales