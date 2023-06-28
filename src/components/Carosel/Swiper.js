import React from "react";
import Slider from "react-slick";
import "./swiper.css";
const SlickCarousel = ({ children }) => {
  const settings = {
    swipe: true,
    touchMove: true,
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    beforeChange: function (currentSlide, nextSlide) {},
    afterChange: function (currentSlide) {},
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#11071F",
          borderRadius: "17px",
          transform: "rotate(0deg)",
          top: "45%",
          right: "1%",
          zIndex: "1",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#11071F",
          borderRadius: "17px",
          transform: "rotate(0deg)",
          left: "1%",
          top: "45%",
          zIndex: "1",
        }}
        onClick={onClick}
      />
    );
  }
  return <Slider {...settings}>{children}</Slider>;
};

export default SlickCarousel;
