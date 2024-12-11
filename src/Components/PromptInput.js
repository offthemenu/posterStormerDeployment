import React from "react";
import { Box, Input, Textarea, Text } from "@chakra-ui/react";

function PromptInput({onPlotChange, onTitleChange}) {
  const handlePlotChange = (event) => {
    onPlotChange(event.target.value)
  }
  const handleTitleChange = (event) => {
    onTitleChange(event.target.value)
  }

  
  return (
    <Box>
      <Text fontSize="lg" mb={2} fontWeight="semibold" color="white">
          Title
      </Text>
      <Input
        placeholder="Enter the Movie Title"
        mb={4}
        onChange={(e) => onTitleChange(e.target.value)}
        focusBorderColor="brand.primary"
        color="brand.lighrGray"
      />
      <Text fontSize="lg" mb={2} fontWeight="semibold" color="white">
          Plot of Your Movie
      </Text>
      <Textarea
        placeholder="Enter the Plot of the Movie"
        rows={7}
        onChange={(e) => onPlotChange(e.target.value)}
        focusBorderColor="brand.primary"
        color="brand.lighrGray"
      />
    </Box>
  );
}

export default PromptInput;
