FROM python:3.9

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend
COPY backend ./backend

# Install Node.js for frontend
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Install Nginx
RUN apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy React frontend
COPY package*.json ./
RUN npm install
COPY public ./public
COPY src ./src
RUN npm run build

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
CMD ["sh", "-c", "uvicorn backend.embeddingsFetch:app --host 0.0.0.0 --port 8000 & nginx -g 'daemon off;'"]
