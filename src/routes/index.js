const { Router } = require("express");
const router = Router();
const getPhotos = require("../services/getPhotos");
const deletePhotos = require("../services/deletePhotos");
const createPhoto = require("../services/createPhoto");
const getSinglePhoto = require("../services/getSinglePhoto");
const simulateApiCall = require("../utils/simulateApiCall");
const photos = require("../db");
const getOrSetCache=require("../utils/getOrSetCache")
const deleteCache=require("../utils/deleteCache")

// Get Photos
router.get("/photos", async (req, res, next) => {
  try {

    const { _start, _limit } = req.query;
    const start = parseInt(_start, 10) || 0;
    const limit = parseInt(_limit, 10) || photos.length;
    // const data = await simulateApiCall(() => getPhotos(start, start + limit));
    const key=`photos:_start=${start}&_limit=${limit}`
    const data=await getOrSetCache(async()=>{
      const data= await simulateApiCall(() => getPhotos(start, start + limit));
      return data
    },key)
  

    res.json({ message: "ok", data: data });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// Get Single Photo
router.get("/photos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const key = `photo:${id}`;
    // const photo =  await simulateApiCall(() => getSinglePhoto(id));
     const photo = await getOrSetCache(async () => {
       return await simulateApiCall(() => getSinglePhoto(id));
     }, key);
  
    res.json({ message: "ok", data: photo });
  } catch (err) {
    next(err);
  }
});

// Create Photo
router.post("/photos", (req, res, next) => {
  try {
    const { title, url, thumbnailUrl, albumId } = req.body;

    const photo = createPhoto({
      title,
      url,
      thumbnailUrl,
      albumId,
    });

    res.json({ message: "ok", data: photo });
    // Cache delete
    // const key=`photo:${photo.id}`
    deleteCache({
      // keys:[key],
      pattern:"photos:_start=*"
    }) 

  } catch (err) {
    console.log(">...",err)
    next(err);
  }
});

// Delete Photo
router.delete("/photos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedPhoto = deletePhotos(id);
    res.json({ message: "ok", data: deletedPhoto });

    // Cache delete
    const key = `photo:${id}`;
    deleteCache({
      keys: [key],
      pattern: "photos:_start=*",
    });
  
  } catch (err) {
    next(err);
  }
});

module.exports = router;
