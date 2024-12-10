import React from 'react';
import './TopMoviesDisplay.css';

function TopMoviesDisplay({ titles }) {
    if (!titles || titles.length === 0) {
        return <p>No similar movies yet. Please enter your prompt!</p>;
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