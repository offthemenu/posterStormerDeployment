import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

function TopMoviesDisplay({ titles }) {
  if (!titles || titles.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Text fontWeight="bold" fontSize="lg" color="white">
          No similar movies yet. Please enter your prompt!
        </Text>
      </Box>
    );
  } else {
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        mt={4}
        bg="transparent"
        boxShadow="md"
        w="100%"
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          mb={4}
          color="white"
          fontFamily="heading"
          textAlign="center"
        >
          Top Similar Movies
        </Text>
        <Table variant="simple" size="md" width="100%">
          <Thead bg="brand.primary">
            <Tr>
              <Th color="brand.white" textAlign="center" fontFamily="heading">
                Movie Title
              </Th>
              <Th color="brand.white" textAlign="center" fontFamily="heading">
                Director
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {titles.map((movie, index) => (
              <Tr key={index}>
                <Td textAlign="center" color="white" fontFamily="body">
                  {movie.title}
                </Td>
                <Td textAlign="center" color="white" fontFamily="body">
                  {movie.director}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  }
}

export default TopMoviesDisplay;
