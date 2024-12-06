# Backend Stage
FROM python:3.9 AS backend

# Set working directory for backend
WORKDIR /backend

# Copy backend-related files
COPY backend ./backend
COPY requirements.txt .

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Export Port
EXPOSE 8000

# Command to run backend server
CMD ["uvicorn", "backend.embeddingsFetch:app", "--host", "0.0.0.0", "--port", "8000"]