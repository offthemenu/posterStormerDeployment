import React, { useState, useEffect } from "react";
import { Select, Box, Text, VStack } from "@chakra-ui/react";
import axios from "axios";

function AdditionalOptions({ setNumberOfPosters, onGenreChange, onStyleChange, onRetroChange }) {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000/api"; // Default to local development
        console.log("Fetching genres from:", `${backendUrl}/get_available_genres`);
        
        const response = await axios.get(`${backendUrl}/get_available_genres`);
        setGenres(response.data);
        
        if (response.data && response.data.length) {
          onGenreChange(response.data[0]); // Set default genre to the first item
        }

        // Cache genres in local storage
        localStorage.setItem("genresCache", JSON.stringify(response.data));
        localStorage.setItem("genresCacheTime", Date.now());
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Try to load cached genres first
    const cachedGenres = JSON.parse(localStorage.getItem("genresCache"));
    const cacheTime = localStorage.getItem("genresCacheTime");
    if (cachedGenres && cacheTime && Date.now() - cacheTime < 24 * 60 * 60 * 1000) {
      setGenres(cachedGenres);
      setIsLoading(false);
      onGenreChange(cachedGenres[0]); // Use cached genre as default
    } else {
      fetchGenres();
    }
  }, [onGenreChange]);

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text fontSize="lg" mb={2} fontWeight="semibold" color="black">
          Genre:
        </Text>
        <Select
          placeholder="Select Genre"
          onChange={(e) => onGenreChange(e.target.value)}
          focusBorderColor="brand.primary"
          color="gray.700"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </Select>
      </Box>

      {/* Poster Style Dropdown */}
      <Box>
        <Text fontSize="lg" mb={2} fontWeight="semibold" color="black">
          Poster Style:
        </Text>
        <Select
          placeholder="Select Style"
          onChange={(e) => onStyleChange(e.target.value)}
          focusBorderColor="brand.primary"
          color="gray.700"
        >
          <option value="3D Digital Art">3D Digital Art</option>
          <option value="Realistic Photography">Realistic Photography</option>
          <option value="Illustration (Animated)">Illustration (Animated)</option>
        </Select>
      </Box>

      {/* Make it Retro Dropdown */}
      <Box>
        <Text fontSize="lg" mb={2} fontWeight="semibold" color="black">
          Make it Retro:
        </Text>
        <Select
          defaultValue="False"
          onChange={(e) => onRetroChange(e.target.value)}
          focusBorderColor="brand.primary"
          color="gray.700"
        >
          <option value="False">No</option>
          <option value="True">Yes</option>
        </Select>
      </Box>
    </VStack>
  );
}

export default AdditionalOptions;
