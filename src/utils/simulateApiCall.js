const simulateApiCall = (cb) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = cb();
        console.log(data);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    }, 5000);
  });

  return promise;
};
module.exports = simulateApiCall;
