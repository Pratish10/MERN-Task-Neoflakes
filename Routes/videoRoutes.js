const express = require("express");
const multer = require("multer");
const { uploadVideo, getVideos } = require("../Controllers/videoControllers");
const singleUpload = require("../Config/multer");

const { check } = require("express-validator");
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const validateVideoUpload = [
  check("title").not().isEmpty().withMessage("Title is required"),
  check("description").not().isEmpty().withMessage("Description is required"),
];

const handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    success: false,
  });
};

router.post(
  "/upload",
  upload.fields([
    { name: "thumbnailUrl", maxCount: 1 },
    { name: "videoUrl", maxCount: 1 },
  ]),
  validateVideoUpload,
  uploadVideo,
  singleUpload
);

router.get("/get-videos", getVideos);

router.use(handleErrors);

module.exports = router;
