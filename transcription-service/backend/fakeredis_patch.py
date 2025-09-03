"""
Patch to use fakeredis for local development when Redis is not available
"""
import os
import redis
import fakeredis

# Only apply patch in development
if os.getenv('ENVIRONMENT', 'development') == 'development':
    print("Using FakeRedis for local development")
    
    # Monkey patch redis.from_url to return FakeRedis
    original_from_url = redis.from_url
    
    def fake_from_url(url, **kwargs):
        print(f"FakeRedis connection to: {url}")
        return fakeredis.FakeRedis()
    
    redis.from_url = fake_from_url
    
    # Also patch Redis class directly
    original_redis = redis.Redis
    redis.Redis = fakeredis.FakeRedis
    
    print("FakeRedis patch applied successfully")
else:
    print("Production mode - using real Redis")