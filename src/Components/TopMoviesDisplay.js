import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

function TopMoviesDisplay({ titles }) {
  if (!titles || titles.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Text fontSize="lg" color="gray.500">
          No similar movies yet. Please enter your prompt!
        </Text>
      </Box>
    );
  } else {
    return (
      <Box borderWidth="1px" borderRadius="lg" p={4} mt={4} overflowX="auto">
        <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.700">
          Top Similar Movies
        </Text>
        <Table variant="striped" colorScheme="gray" size="md">
          <Thead>
            <Tr>
              <Th>Movie Title</Th>
              <Th>Director</Th>
            </Tr>
          </Thead>
          <Tbody>
            {titles.map((movie, index) => (
              <Tr key={index}>
                <Td>{movie.title}</Td>
                <Td>{movie.director}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  }
}

export default TopMoviesDisplay;
