# Frontend build stage
FROM node:18 AS frontend-builder

WORKDIR /app

# Copy only the package.json and package-lock.json for dependency installation
COPY package*.json ./
RUN npm install

# Copy the React source code and build the app
COPY public ./public
COPY src ./src
RUN npm run build

# Backend build stage
FROM python:3.9 AS backend-builder

WORKDIR /app

# Install MongoDB CLI tools
RUN curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add - && \
    echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/debian buster/mongodb-org/6.0 main" | tee /etc/apt/sources.list.d/mongodb-org/6.0.list && \
    apt-get update && apt-get install -y mongodb-org-shell && \
    rm -rf /var/lib/apt/lists/*

# Install backend dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend ./backend

# Final production image
FROM python:3.9 AS production

WORKDIR /app

# Install Nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy React build files from frontend build stage
COPY --from=frontend-builder /app/build /app/build

# Copy backend code and dependencies from backend build stage
COPY --from=backend-builder /app/backend /app/backend
COPY --from=backend-builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=backend-builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the default Nginx port
EXPOSE 8080

# Start both backend (uvicorn) and Nginx
CMD ["sh", "-c", "uvicorn backend.embeddingsFetch:app --host 0.0.0.0 --port 8000 & nginx -g 'daemon off;'"]
