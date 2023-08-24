import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, TextField, Grid, Paper } from "@mui/material";
import UploadButton from "@mui/joy/Button";
import { useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";

const FileUploadForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setVideo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    if (
      !data.title ||
      !data.description ||
      !data.thumbnailUrl[0] ||
      !data.videoUrl[0]
    ) {
      setFormValid(true);
      return;
    }
    setFormValid(false);

    setLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnailUrl", data.thumbnailUrl[0]);
    formData.append("videoUrl", data.videoUrl[0]);

    try {
      await axios.post(
        "https://giddy-eel-button.cyclic.cloud/api/video/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Upload successful");
      reset();
      setThumbnail(null);
      setVideo(null);
    } catch (error) {
      console.log("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        elevation={10}
        style={{ padding: 20, maxWidth: "50%", margin: "0 auto" }}
      >
        {formValid && (
          <h4 style={{ color: "red" }}>Please fill all the fields!</h4>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              fullWidth
              label="Title"
              {...register("title")}
              helperText={"Max 20 characters allowed"}
              inputProps={{
                maxLength: 20,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="standard"
              fullWidth
              label="Description"
              multiline
              rows={4}
              {...register("description")}
              helperText={"Max 200 characters allowed"}
              inputProps={{
                maxLength: 200,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {thumbnail && (
              <img
                src={thumbnail}
                alt="thumbnail"
                style={{ maxWidth: "50%", height: "auto" }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <UploadButton variant="outlined" color="neutral">
              <input
                type="file"
                {...register("thumbnailUrl")}
                accept="image/png, image/jpeg"
                onChange={handleThumbnailChange}
              />
              Upload Thumbnail
            </UploadButton>
          </Grid>
          <Grid item xs={12}>
            {video && (
              <video controls style={{ maxWidth: "75%" }}>
                <source src={video} type="video/mp4" />
              </video>
            )}
          </Grid>
          <Grid item xs={12}>
            <UploadButton variant="outlined" color="neutral">
              <input
                type="file"
                {...register("videoUrl")}
                accept=".mpg, .avi, .mp4"
                onChange={handleVideoChange}
              />
              Upload Video
            </UploadButton>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ color: "white", background: "black" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress variant="plain" size="sm" />
              ) : (
                "Upload"
              )}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default FileUploadForm;
