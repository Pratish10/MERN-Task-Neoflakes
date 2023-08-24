import axios from "axios";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import Cards from "./Cards";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const VideosList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          "https://giddy-eel-button.cyclic.cloud/api/video/get-videos"
        );
        // console.log(response.data.videos);
        setVideos(response.data.videos);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError("Error Fetching List");
      }
    };
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <React.Fragment>
        <CircularProgress variant="plain" size="lg" />
      </React.Fragment>
    );
  }

  if (error) {
    return <h4>{error}</h4>;
  }

  return (
    <React.Fragment>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{ flexGrow: 1 }}
      >
        {videos.map((video) => (
          <Grid item xs={2} sm={4} md={4} key={video._id}>
            <Link to={video.videoUrl}>
              <Cards key={video._id} video={video} />
            </Link>
            <br />
            <br />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default VideosList;
