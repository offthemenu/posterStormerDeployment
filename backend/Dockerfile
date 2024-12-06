# Backend Stage
FROM python:3.9 AS backend

# Set working directory for backend
WORKDIR /backend

# Copy backend-related files
COPY backend ./backend
COPY requirements.txt .

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Use Cloud Run's PORT variable
ENV PORT 8080

# Command to run backend server
CMD ["uvicorn", "backend.embeddingsFetch:app", "--host", "0.0.0.0", "--port", "${PORT}"]