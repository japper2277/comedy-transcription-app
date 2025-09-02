from celery import Celery
import os
import fakeredis

# Create FakeRedis server for local development
fake_redis = fakeredis.FakeStrictRedis(host='localhost', port=6379, db=0)

# Initialize Celery app with memory transport for local testing
celery_app = Celery(
    "transcription_worker",
    broker="memory://localhost/",
    backend="cache+memory://",
    include=["celery_worker.tasks"]
)

# Celery configuration
celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    result_expires=3600,  # Results expire after 1 hour
    # Use memory transport for local development
    broker_transport_options={
        'visibility_timeout': 3600,
    },
    result_backend_transport_options={
        'visibility_timeout': 3600,
    }
)

print("Celery configured with in-memory transport for local development")