# Use Python as the base image for the backend
FROM python:3.9 AS base

# Install Node.js for the frontend in the same container
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Install MongoDB CLI tools
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add - && \
    echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/debian buster/mongodb-org/6.0 main" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list && \
    apt-get update && apt-get install -y mongodb-org-shell && \
    rm -rf /var/lib/apt/lists/*

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
RUN apt-get update && apt-get install -y apt-transport-https ca-certificates && \
    apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose Cloud Run's single external port
EXPOSE 8080

# Use a process manager to start both backend and frontend
CMD ["sh", "-c", "uvicorn backend.embeddingsFetch:app --host 0.0.0.0 --port 8000 & npm start --prefix /app & nginx -g 'daemon off;'"]
