const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const cloudinary = require("./Config/cloudinary.js");
const morgan = require("morgan");
// const fileupload = require("express-fileupload");
require("dotenv").config();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;

const app = express();

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(fileupload({ useTempFiles: true }));

connectDB();
cloudinary;

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello From Pratish",
    success: true,
  });
});

// video routes
app.use("/api/video", require("./Routes/videoRoutes"));

app.listen(PORT, console.log(`Server is listening on PORT:${PORT}`));
