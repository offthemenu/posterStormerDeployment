# Frontend Stage
FROM node:18 AS frontend

# Set working directory for frontend
WORKDIR /frontend

# Copy frontend-related files
COPY package*.json ./
COPY public ./public
COPY src ./src

# Install frontend dependencies
RUN npm install

# Use Cloud Run's PORT variable
ENV PORT 8080

# Command to run frontend server
CMD ["npm", "start"]