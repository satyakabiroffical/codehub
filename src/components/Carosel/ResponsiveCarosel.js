import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// import CartCard from 'components/CartCard';

import { CircularProgress } from "@mui/material";
const ResponsiveCarosel = ({ value }) => {
  return (
    <Carousel
      width={250}
      useKeyboardArrows={true}
      transitionTime={1000}
      swipeScrollTolerance={1}
      swipeable={true}
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      dynamicHeight={false}
      centerSlidePercentage={100}
      centerMode={true}
      autoPlay={true}
      autoFocus={true}
      axis={"horizontal"}
      emulateTouch={true}
      interval="3000"
      Responsive={true}
    >
      {value && value.length ? (
        value.map((value, index) => (
          <div key={index} style={{ height: " 11rem", width: "100%" }}>
            <img
              src={value}
              alt={value}
              style={{ height: "100%", width: "100%", objectFit: "contain" }}
              onError={(e) =>
                (e.target.src = require("assets/img/websiteDefaults.jpg"))
              }
            />
          </div>
        ))
      ) : (
        <CircularProgress color="info" value={40} />
      )}
    </Carousel>
  );
};

export default ResponsiveCarosel;
