const photos = require("../db");

const deletePhotos = (id) => {
  const index = photos.findIndex((photo) => photo.id === parseInt(id, 10));
  if (index === -1) {
    const error = new Error();
    error.status = 404;
    error.message = "Photo not found";
    throw error;
  }

  const photo = photos.splice(index, 1);

  return {id};
};

module.exports = deletePhotos;
