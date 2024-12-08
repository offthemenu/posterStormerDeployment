FROM python:3.9

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install MongoDB CLI tools
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-archive-keyring.gpg && \
    echo "deb [ arch=amd64 signed-by=/usr/share/keyrings/mongodb-archive-keyring.gpg ] https://repo.mongodb.org/apt/debian buster/mongodb-org/6.0 main" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list && \
    apt-get update && apt-get install -y mongodb-org-shell && \
    ln -s /usr/bin/mongo /usr/local/bin/mongo && \
    rm -rf /var/lib/apt/lists/*

# Install Node.js for frontend
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Install Nginx
RUN apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Copy and build frontend
COPY package*.json ./
RUN npm install
COPY public ./public
COPY src ./src
RUN npm run build

# Copy backend code
COPY backend ./backend

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy .env file for runtime access
COPY .env /app/.env

EXPOSE 8080
CMD ["sh", "-c", "uvicorn backend.embeddingsFetch:app --host 0.0.0.0 --port 8000 & nginx -g 'daemon off;'"]
