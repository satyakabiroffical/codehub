import { useMediaQuery } from "@mui/material";
import React from "react";
import { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

const YouTubeVideos = ({ value, counter }) => {
  // console.log(value)
  // console.log(count);
  const matches = useMediaQuery("(max-width:870px)");

  function getYoutubeId() {
    if (typeof value == "string") {
      var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = value.match(regExp);
      return match && match[7].length == 11 ? match[7] : false;
    }
  }

  const opts = {
    height: "250",
    width: `${counter === 1 ? "1200" : counter === 2 ? "500" : "435"}`,
    // margin: "10px",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  //   console.log(value.split("=")[1].slice(0, 11), "youtubdi");
  return (
    <YouTube videoId={getYoutubeId()} opts={opts} onReady={onPlayerReady} />
  );
};

export default YouTubeVideos;
