docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 -e REDIS_ARGS="--requirepass 123456789" redis/redis-stack:latest# stack-caching
