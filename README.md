# Poster Stormer

**Poster Stormer** is a web application that generates movie posters based on user-input prompts. Using React for the frontend and FastAPI for the backend, the app allows users to specify genres and styles for poster generation. It dynamically recommends similar movie posters based on the user’s input.

## Table of Contents
1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the App](#running-the-app)
2. [How to Use](#how-to-use)
3. [Design Choices](#design-choices)
   - [App Purpose and Functionality](#app-purpose-and-functionality)
   - [User Interface Layout](#user-interface-layout)
4. [Components](#components)
   - [App.js](#appjs)
   - [PromptInput](#promptinput)
   - [AdditionalOptions](#additionaloptions)
   - [PosterDisplay](#posterdisplay)
   - [TypingAnimation](#typinganimation)
5. [Backend API](#backend-api)
   - [Overview](#overview)
   - [Endpoints](#endpoints)
     - [Root Endpoint](#root-endpoint)
     - [Generate Prompt](#generate-prompt)
     - [Get Available Genres](#get-available-genres)
   - [Features and Logic](#features-and-logic)
   - [Example Workflow](#example-workflow)
6. [Deployment](#deployment)
   - [Backend](#backend)
   - [Frontend](#frontend)
7. [Use of AI](#use-of-ai)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (Node package manager, comes with Node.js)
- [Python](https://www.python.org/) (version 3.8 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/offthemenu/posterStormerDeployment.git
   cd poster-stormer
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   ```

3. Install the backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - In the `.env` file, store the following variables:
     ```plaintext
     Mongo_URI=<Your MongoDB connection string>
    
     REACT_APP_FAL_KEY=<Your FAL API key>
     ```

### Running the App

1. Start the backend server:
   ```bash
   uvicorn backend.embeddingsFetch:app --reload
   ```
   The backend server will start at `http://127.0.0.1:8000`.

2. Start the frontend server:
   ```bash
   npm start
   ```
   This command will start the React development server, and you can view the app in your browser at `http://localhost:3000`.

This will create an optimized production build in the `build` folder.

## How to Use

1. **Input a Prompt**: In the `PromptInput` section, type a description for your movie plot (i.e., one-paragraph synopsis) to inspire the poster generation.
2. **Select Additional Options (WiP)**: 
   - **Genre**: Choose a genre from the dropdown menu to filter similar movies by genre.
   - **Style**: Pick the artistic style you'd like your poster to be created with (e.g., "3D Digital Art").
   - **Make it Retro (Work in Progress)**: Toggle to give your poster an 80's feel
3. **Generate Posters**: Click the "Generate" button to view the poster based on the selected criteria.
4. **Navigate Posters**: Use the "Previous" and "Next" buttons to browse through the 3 generated posters.

## Design Choices

### App Purpose and Functionality

- **Primary Purpose**: The app enables users to generate movie posters based on a brief movie plot description.
- **Additional Features**: Users can expand the interface to add specific indicators like genre and style for a more customized poster generation experience.

### User Interface Layout

- **Simple Title and Plot Input (Left Panel)**: The primary input area where users type their movie plot. This minimal design choice focuses on simplicity, allowing users to directly enter the plot idea without distraction. There is also the option to edit the prompt for ease of use.
- **Advanced Options Dropdown**: Users have the option to expand for additional features, keeping the interface clean and npt overwhelming for basic use but allowing advanced customization for users who want more control over the output.
  - **Genre (Dropdown)**: Users can select a genre for the poster, offering genre-specific aesthetic influences on the poster's design. A dropdown allows the app to be more precise in the output as it gives the product more control.
  - **Style**: Allows users to specify the artistic style they want their posters to be created in. 
  - **Make it Retro**: This toggle button allows users to choose if they'd like their posters to be created with the 80's feel

## Components

### App.js

`App.js` is the main component of the application. It handles the state, layout, and structure of the app.

- **State Variables**:
  - `numberOfPosters`: Tracks the number of posters requested by the user.
  - `postersToDisplay`: Stores the array of generated posters for display.
  - `currentIndex`: Tracks the currently displayed poster index.
  - `plotValue`: Stores the user's input for the movie plot.
  - `titleValue`: Stores the user's input for the movie title.
  - `genreValue`: Stores the selected genre.
  - `styleValue`: Stores the selected poster style.
  - `isRetroValue`: Boolean indicating whether the retro option is selected.
  - `loading`: Boolean indicating whether the app is in the loading state.
  - `loadingPercentage`: Tracks the progress of poster generation.
  - `loadingMovies`: Stores movie titles being loaded for user feedback.

- **Functions**:
  - `handlePlotChange`, `handleTitleChange`, `handleGenreChange`, `handleStyleChange`, and `handleRetroChange`: Update the respective state variables when the user modifies inputs.
  - `getPosterDescription`: Sends a request to the `/generate_prompt` API endpoint and retrieves a description based on user inputs.
  - `handleGenerate`: Manages the process of fetching the poster description, calling the Flux API for generation, and updating the display with the results.
  - `handleNext` and `handlePrev`: Navigate through the list of generated posters by updating the `currentIndex`.

- **Components Used**:
  - `<PromptInput />`: Provides inputs for the movie title and plot.
  - `<AdditionalOptions />`: Displays dropdown menus for genre, style, and retro options.
  - `<PosterDisplay />`: Renders the generated posters and navigation buttons.
  - `<TypingAnimation />`: Displays dynamic loading messages while the posters are being generated.

---

### PromptInput

**Location**: `Components/PromptInput.js`

This component provides input fields for the movie title and plot description.

- **Description**:
  - Renders an input field for the movie title and a textarea for the plot description.
  - Placeholder text provides guidance to users on what to input.

- **Props**:
  - `onPlotChange`: Callback to update the plot state in `App.js`.
  - `onTitleChange`: Callback to update the title state in `App.js`.

- **Styling**: Uses Chakra UI for styling.

---

### AdditionalOptions

**Location**: `Components/AdditionalOptions.js`

This component provides additional options for customizing poster generation, such as genre, style, and retro preferences.

- **Description**:
  - Allows users to select options from dropdown menus to refine their poster preferences.

- **Props**:
  - `onGenreChange`: Callback to update the selected genre.
  - `onStyleChange`: Callback to update the selected poster style.
  - `onRetroChange`: Callback to update the retro preference.

- **Options**:
  - **Genre**: Populates a dropdown menu with genres fetched from the backend `/get_available_genres` endpoint.
  - **Style**: Provides predefined options for poster styles (e.g., "3D Digital Art," "Realistic Photography").
  - **Retro**: Dropdown with "Yes" and "No" options to indicate whether the retro style should be applied.

- **Features**:
  - Implements caching for genres to improve performance and minimize backend calls.
  - Sets default values for genre and retro preferences.

---

### PosterDisplay

**Location**: `Components/PosterDisplay.js`

This component displays the generated posters and their details.

- **Description**:
  - Renders the generated poster with additional details (e.g., title).
  - Provides scrolling logic to bring the poster into view when loaded.

- **Props**:
  - `poster`: The currently displayed poster object.
  - `posterRef`: Ref for handling scroll behavior.

- **Styling**: Uses Chakra UI for responsive design and visual enhancements (e.g., shadows, rounded corners).

---

### TypingAnimation

**Location**: `Components/TypingAnimation.js`

This component displays dynamic typing animations for loading messages.

- **Description**:
  - Iterates through a list of sentences, typing each one character by character.
  - Deletes each sentence after a pause before moving to the next one.

- **Props**:
  - `sentences`: Array of sentences to display in sequence.
  - `typingSpeed`: Speed of typing animation.
  - `pauseAfterTyping`: Time to pause before deleting a sentence.
  - `delayBetweenSentences`: Time to pause between sentences.

- **Styling**: Styled with Chakra UI to match the overall app theme.

## Backend API

The backend for Poster Stormer is built using **FastAPI** and provides endpoints to handle prompt generation, filtering movies based on user inputs, and retrieving available genres. The backend integrates with MongoDB for data storage and utilizes FAISS for efficient similarity searches.

---

### Overview

The backend consists of the following key components:
1. **Database Connection**: MongoDB is used to store movie details, embeddings, and user inputs.
2. **FAISS**: Used to perform similarity searches on movie embeddings.
3. **SentenceTransformer**: Embedding model (`all-MiniLM-L6-v2`) to convert plots into vector representations for similarity calculations.
4. **Endpoints**: Includes APIs for generating prompts and retrieving genres.

---

### Endpoints

### Root Endpoint

#### Method: GET

#### **Endpoint**: `/api/`
#### **Description**: 
Returns a confirmation message to verify that the backend is running.
#### **Response**:
  ```json
  {
    "message": "Backend is running"
  }

### Generate Prompt

#### Method: POST

#### Endpoint: `/api/generate_prompt`

#### Description:
Generates a detailed prompt for poster generation based on user input. Matches the top 5 most similar movies using FAISS and retrieves their details.

#### Request Body:

```json
{
  "title": "Intergalactic Journey",
  "plot": "A thrilling adventure in space with alien encounters.",
  "genre": "Sci-Fi",
  "style": "Illustration (Animated)",
  "isRetro": true
}
```

- **title** (string): Title of the movie.
- **plot** (string): Short description of the movie plot.
- **genre** (optional, string): Filter movies by genre.
- **style** (optional, string): Style preference for the poster (e.g., "3D Digital Art").
- **isRetro** (optional, boolean): Whether to filter movies from the 1970-1989 range.

#### Response:

```json
{
  "imdbIDs": ["tt1234567", "tt2345678", "tt3456789", "tt4567890", "tt5678901"],
  "movieTitles": {
    "Movie 1": "Director 1",
    "Movie 2": "Director 2",
    "Movie 3": "Director 3",
    "Movie 4": "Director 4",
    "Movie 5": "Director 5"
  },
  "prompt": "Create an image (no text) for the poster for a movie with this plot: A thrilling adventure in space with alien encounters. The top 5 closest movies are Movie 1 by Director 1, Movie 2 by Director 2, Movie 3 by Director 3, Movie 4 by Director 4, Movie 5 by Director 5. Generate a poster that is in a flat-image illustration style. The text 'Intergalactic Journey' must be clearly visible as the title."
}
```

- **imdbIDs**: Array of IMDb IDs for the top 5 similar movies.
- **movieTitles**: Object mapping movie titles to their directors.
- **prompt**: A descriptive prompt for poster generation.


### Get Available Genres

#### Method: GET

#### Endpoint: `/api/get_available_genres`

#### Description:
Retrieves a list of all unique genres available in the database for filtering purposes.

#### Response:

```json
[
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller"
]
```

- Returns an array of strings representing unique movie genres.

---

### Features and Logic

#### 1. MongoDB Integration

- **Collections:**
  - **movieDetails:** Stores movie metadata (e.g., title, director, genre, release date).
  - **movieEmbeddings:** Stores precomputed embeddings for movie plots and their corresponding IMDb IDs.
  - **userInputCollection:** Stores user queries and generated prompts for tracking and debugging.

#### 2. FAISS Similarity Search

- Converts user-provided plot descriptions into embeddings using `SentenceTransformer`.
- Performs similarity search on the precomputed embeddings stored in `movieEmbeddings` to find the top 5 closest movies.

#### 3. Query Filtering

- Filters movies by:
  - **Genre:** Matches the genre specified by the user.
  - **Style:** Matches the poster style to predefined tags (e.g., "3D Digital Art").
  - **Retro Period:** Limits results to movies released between 1970-1989 if `isRetro` is set to true.

---

### Example Workflow

1. **User Inputs:**

```json
{
  "title": "The Last Voyage",
  "plot": "A journey to the unknown depths of the sea.",
  "genre": "Adventure",
  "style": "Realistic Photography",
  "isRetro": false
}
```

2. **Backend:**
   - Filters movies based on genre and retrieves precomputed embeddings.
   - Matches the plot embedding with the top 5 similar movies using FAISS.
   - Generates a descriptive prompt for the poster.

3. **Response:**

```json
{
  "imdbIDs": ["tt9876543", "tt8765432", "tt7654321", "tt6543210", "tt5432109"],
  "movieTitles": {
    "Movie A": "Director A",
    "Movie B": "Director B",
    "Movie C": "Director C",
    "Movie D": "Director D",
    "Movie E": "Director E"
  },
  "prompt": "Create an image (no text) for the poster for a movie with this plot: A journey to the unknown depths of the sea. The top 5 closest movies are Movie A by Director A, Movie B by Director B, Movie C by Director C, Movie D by Director D, Movie E by Director E. Generate a poster that stylistically resembles that of the similar movies. The text 'The Last Voyage' must be clearly visible as the title."
}
```

---

### Deployment Notes

- **Backend API Endpoints:**
  - **Local Development:** `http://127.0.0.1:8000/api`
  - **Production:** `https://poster-stormer-backend-320432349353.us-central1.run.app/api`

- Ensure the `Mongo_URI` environment variable is correctly set in the `.env` file or deployment configuration to connect to the MongoDB instance.

## Deployment

### Backend
Deployed using Docker:

**Dockerfile:**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend ./backend
EXPOSE 8000
CMD ["uvicorn", "backend.embeddingsFetch:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Hosted:** [Backend Hosted Site URL](https://poster-stormer-backend-320432349353.us-central1.run.app/)

### Frontend
Deployed using Docker:

**Dockerfile:**
```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:1.22
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

**Hosted:** [Frontend Site URL](https://poster-stormer-frontend-320432349353.us-central1.run.app/)


## Use of AI
Throughout development, we utilized ChatGPT to assist with:

Writing and explaining JavaScript functions.
Structuring components and organizing the code for readability.
Error handling when fetching data from the API and generating user feedback messages.
All AI-generated code snippets were reviewed, modified, and understood before incorporation.
