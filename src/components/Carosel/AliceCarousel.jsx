import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const AliceCarousela = ({ children, rate, img }) => {
  // console.log(data)
  const responsive = {
    0: {
      items: 1,
    },
    600: {
      items: 2,
      itemsFit: "contain",
    },
    1024: {
      items: 3,
      itemsFit: "contain",
    },
  };
  return (
    <AliceCarousel
      duration={400}
      autoPlay={false}
      startIndex={1}
      infinite={true}
      fadeOutAnimation={true}
      mouseDragEnabled={true}
      playButtonEnabled={false}
      responsive={responsive}
      autoPlayInterval={2000}
      autoPlayDirection="ltr"
      autoPlayActionDisabled={true}
      animationType={"fadeout"}
      ArrowRight={false}
      ArrowLeft={false}
    >
      {children}
    </AliceCarousel>
  );
};

export default AliceCarousela;
