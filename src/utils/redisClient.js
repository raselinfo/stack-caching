const Redis=require("ioredis")

const redisClient=new Redis({
    host:"127.0.0.1",
    port:6379,
    password:"123456789"
})


module.exports=redisClient;