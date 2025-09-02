web: cd backend && uvicorn api.main:app --host 0.0.0.0 --port $PORT
worker: cd backend && celery -A celery_worker.tasks worker --loglevel=info --concurrency=2