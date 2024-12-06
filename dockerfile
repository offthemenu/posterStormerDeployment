# Use Python as the base image for the backend
FROM python:3.9 AS base

# Install Node.js for the frontend in the same container
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Set the working directory
WORKDIR /app

# Backend setup
COPY backend ./backend
COPY requirements.txt ./ 
RUN pip install --no-cache-dir -r requirements.txt

# Frontend setup
COPY package*.json ./
COPY public ./public
COPY src ./src
RUN npm install

# Install Nginx
RUN apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose Cloud Run's single external port
EXPOSE 8080

# Use a process manager to start both backend and frontend
CMD ["sh", "-c", "uvicorn backend.embeddingsFetch:app --host 0.0.0.0 --port 8000 & npm start --prefix /app & nginx -g 'daemon off;'"]