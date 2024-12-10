import React from 'react';
import './TopMoviesDisplay.css';
import { Text } from '@chakra-ui/react';

function TopMoviesDisplay({ titles }) {
    if (!titles || titles.length === 0) {
        return <Text fontSize="lg" color="brand.darkGray">No similar movies yet. Please enter your prompt!</Text>;
    }
    else {
        return (
            <table>
              <thead>
                <tr>
                  <th>Movie Title</th>
                  <th>Director</th>
                </tr>
              </thead>
              <tbody>
              {titles.map((movie, index) => (
                    <tr key={index}>
                    <td>{movie.title}</td>
                    <td>{movie.director}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          );  
    }
};

export default TopMoviesDisplay;