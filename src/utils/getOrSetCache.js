const redisClient = require("./redisClient");
const getOrSetCache = (cb, key) => {
  const promise = new Promise((resolve, reject) => {
    const REDIS_EXPIRE_TIME = process.env.REDIS_EXPIRE_TIME || 3600;

    // photos
    // photos:_start=0&limit=10
    // photos:_start=0&limit=5
    // photo:1
    // photo:2

    key = key || "photos";
    redisClient.get(key, (err, data) => {
      if (err) reject(err);
      if (data) {
        console.log("cache hit 🥰");
        return resolve(JSON.parse(data));
      }

      cb()
        .then((data) => {
          redisClient.setex(key, REDIS_EXPIRE_TIME, JSON.stringify(data));
          resolve(data);
          console.log("cache miss 😢")
        })
        .catch((err) => {
          reject(err);
        });
    });
  });


  return promise;
};

module.exports = getOrSetCache;
