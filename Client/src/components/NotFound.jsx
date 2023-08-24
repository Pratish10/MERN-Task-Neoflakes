import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ paddingTop: "64px", position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h1" style={{ color: "black" }}>
          404
        </Typography>
        <Typography variant="h6" style={{ color: "black" }}>
          The page you’re looking for doesn’t exist.
        </Typography>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Button style={{ background: "black" }} variant="contained" to="/">
            Back Home
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default NotFound;
