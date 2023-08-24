const asyncHandler = require("express-async-handler");
const Video = require("../Models/videoSchema");
const getDataUri = require("../Config/dataUri");
const cloudinary = require("cloudinary");

const uploadVideo = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;

    const thumbnailUri = getDataUri(req.files.thumbnailUrl[0]);
    const videoUri = getDataUri(req.files.videoUrl[0]);

    const videoExists = await Video.findOne({ title }).lean();

    if (videoExists) {
      return res
        .status(401)
        .json({ message: "Error! Video already exists", success: false });
    }

    if (!title || !description)
      return res.status(400).json({ warning: "Please add all the fields!" });

    const [thumbnailResult, videoResult] = await Promise.all([
      cloudinary.v2.uploader.upload(thumbnailUri.content, {
        folder: "thumbnails",
      }),
      cloudinary.v2.uploader.upload(videoUri.content, {
        resource_type: "video",
        folder: "videos",
      }),
    ]);

    const newVideo = await Video.create({
      title: title,
      description: description,
      thumbnailUrl: thumbnailResult.secure_url,
      videoUrl: videoResult.secure_url,
    });
    if (newVideo) {
      res.status(200).json({
        _id: newVideo._id,
        title: newVideo.title,
        description: newVideo.description,
        thumbnailUrl: thumbnailResult.secure_url,
        videoUrl: videoResult.secure_url,
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Error! uploading Data", success: false });
    console.log("Error uploading Data", error.message);
  }
});

const getVideos = asyncHandler(async (req, res) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const perPage = 10;

    // const totalCount = await Video.countDocuments();

    // const totalPages = Math.ceil(totalCount / perPage);
    // const offset = (page - 1) * perPage;

    const videos = await Video.find({}).lean();

    res.status(200).json({
      videos: videos,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching videos",
      success: false,
    });
    console.log("Error fetching videos:", error.message);
  }
});

module.exports = { uploadVideo, getVideos };
