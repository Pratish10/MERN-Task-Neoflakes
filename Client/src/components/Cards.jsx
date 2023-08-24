import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import PropTypes from "prop-types";

const Cards = (props) => {
  const date = new Date(props.video.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={props.video.thumbnailUrl}
            srcSet={props.video.thumbnailUrl}
            loading="lazy"
            alt={props.video.title}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography level="title-md">{props.video.title}</Typography>
        <Typography level="body-sm">{props.video.description}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography
            level="body-xs"
            fontWeight="md"
            textColor="text.secondary"
          >
            Date: {formattedDate}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

Cards.propTypes = {
  video: PropTypes.shape({
    thumbnailUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Cards;
