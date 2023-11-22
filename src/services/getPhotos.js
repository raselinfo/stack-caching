const photos = require("../db");

const getPhotos =  (start,end) => {
    const data=photos.slice(start,end);
    return data
};

module.exports = getPhotos;
