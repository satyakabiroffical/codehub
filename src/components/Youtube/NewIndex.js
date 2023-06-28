import { Box } from "@mui/material";
import React from "react";
// import PropTypes from "prop-types";
// import "./index.css";
const NewIndex = ({ value }) => {
  // console.log(value);
  function getYoutubeId() {
    if (typeof value == "string") {
      var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = value.match(regExp);
      return match && match[7].length == 11 ? match[7] : false;
    }
  }
//   console.log(getYoutubeId());
  return (
    <Box
      sx={{
        height: {
          xs: "350px",
          sm: "350px",
          md: "250px",
          xl: "250px",
        },
        width: { xs: "100%", sm: "100%", md: "435px", xl: "435px" },
        padding: "1rem ",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${getYoutubeId()}`}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
        }}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default NewIndex;
