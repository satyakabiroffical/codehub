import { CardMedia, useMediaQuery } from "@mui/material";
import ProductArray from "Context/Contex";
import { ProductContext } from "Context/Contex";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// reactstrap components
import { Button } from "reactstrap";

export default function VideoCard({ value }) {
  function getYoutubeId() {
    if (typeof value == "string") {
      var regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = value.match(regExp);
      return match && match[7].length == 11 ? match[7] : false;
    }
  }
  const matches = useMediaQuery(" (max-width:870px)");
  return (
    <>
      <div
        className="card m-3"
        style={{ width: `${matches ? "100%" : "25rem"}`, height: "15rem" }}
      >
        <div
          style={{ width: `${matches ? "100%" : "25rem"}`, height: "15rem" }}
        >
          {/* {  console.log(value.image)} */}
          <iframe
            src={`https://www.youtube.com/embed/${getYoutubeId()}`}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "fill",
            }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
