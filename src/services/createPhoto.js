const photos = require("../db");
const createPhot = (data) => {
  const id = photos.length + 1;
  const newPhoto = photos.push({ ...data, id });
  

  return {...data,id};
};

module.exports = createPhot;
