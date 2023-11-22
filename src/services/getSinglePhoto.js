const photos = require("../db");

const getSinglePhoto = (id) => {
  const data = photos.find((photo) => photo.id === parseInt(id));
  if (!data) {
    const error = new Error();
    error.status = 404;
    error.message = "Photo not found";
    throw error;
  }
  return data;
};

module.exports = getSinglePhoto;
