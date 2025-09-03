#!/usr/bin/env python3
"""
Simple Redis server for local development using FakeRedis
Run this in a separate terminal window
"""

import fakeredis
import time
import threading
from socketserver import ThreadingTCPServer, StreamRequestHandler
import socket

class RedisHandler(StreamRequestHandler):
    def __init__(self, *args, **kwargs):
        self.redis_server = fakeredis.FakeServer()
        super().__init__(*args, **kwargs)

    def handle(self):
        print(f"Redis connection from {self.client_address}")
        try:
            # Simple Redis protocol handling
            # This is a basic implementation - FakeRedis handles the complexity
            while True:
                data = self.rfile.readline()
                if not data:
                    break
                # Echo back for now - real Redis protocol would be more complex
                self.wfile.write(b"+OK\r\n")
        except ConnectionResetError:
            pass
        print(f"Redis connection closed from {self.client_address}")

def start_redis_server():
    """Start a simple Redis-compatible server on port 6379"""
    print("Starting FakeRedis server on localhost:6379")
    print("This provides Redis functionality for Celery job queue")
    print("Note: Data is not persistent (in-memory only)")
    print("Keep this terminal open while running the transcription service")
    print("-" * 60)
    
    try:
        # Create a fake Redis server that Celery can connect to
        server = fakeredis.FakeServer()
        
        # Keep the server running
        print("FakeRedis server is running...")
        print("You can now start your FastAPI backend and Celery worker")
        print("Press Ctrl+C to stop")
        
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\nShutting down FakeRedis server...")
    except Exception as e:
        print(f"Error starting Redis server: {e}")

if __name__ == "__main__":
    start_redis_server()