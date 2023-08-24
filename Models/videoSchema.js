const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true, maxLength: 200 },
    thumbnailUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
