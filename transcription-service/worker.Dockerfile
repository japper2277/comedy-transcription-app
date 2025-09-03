# Dockerfile for Celery Worker
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy worker code
COPY backend/celery_worker/ ./celery_worker/
COPY backend/api/config.py ./api/config.py
COPY backend/api/logging_config.py ./api/logging_config.py

# Set environment variables
ENV PYTHONPATH=/app
ENV C_FORCE_ROOT=1

# Run Celery worker
CMD ["celery", "-A", "celery_worker.tasks", "worker", "--loglevel=info", "--concurrency=2"]