import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Owl.css";
import { useMediaQuery } from "@mui/material";

// ....
const OwlCarouselApp = ({
  children,
  coupons,
  center,
  items,
  autoWidth,
  autoheight,
  margin,
  margin1,
}) => {
  const matches = useMediaQuery(" (max-width:870px)");
  return (
    <>
      <OwlCarousel
        items={items ? items : 4}
        lazyLoad={false}
        margin={matches ? (margin1 ? margin1 : 20) : margin ? margin : 20}
        mouseDrag={true}
        touchDrag={true}
        loop={false}
        center={center ? center : false}
        nav={true}
        autoplayTimeout={3000}
        smartSpeed={1000}
        autoplay={false}
        slideBy={1}
        autoWidth={autoWidth || coupons ? false : true}
        autoheight={false}
        navText={[
          '<i className="fa fa-angle-left" aria-hidden="true"></i>',
          '<i className="fa fa-angle-right" aria-hidden="true"></i>',
        ]}
        dots={false}
        responsiveClass={true}
        responsive={{
          0: {
            items: 1,
            margin: matches ? (margin1 ? margin1 : 20) : margin ? margin : 20,
          },
          400: {
            items: 1,
            margin: matches ? (margin1 ? margin1 : 20) : margin ? margin : 20,
          },
          600: {
            items: 2,
            margin: matches ? (margin1 ? margin1 : 20) : margin ? margin : 20,
          },
          700: {
            items: 3,
            margin: matches ? (margin1 ? margin1 : 20) : margin ? margin : 20,
          },
          1000: {
            items: items ? items : 4,
            margin: matches ? (margin1 ? margin1 : 20) : margin ? margin : 20,
          },
        }}
        className="owl-theme"
      >
        {/* {rate
          ? Element.map(({ img, review, msg, date, id }) => {
              return (
                <div
                  className="item"
                  key={id}
                  style={{ width: "300px", height: "300px" }}
                >
                  <CardRetting
                    img={img}
                    review={review}
                    msg={msg}
                    date={date}
                    key={id}
                  />
                </div>
              );
            })
          : <> */}

        {/* {
  !mobile? 
   data.map((proddata, index) => {
    return (
      <div className="item Product_card_item_owlCarousel" key={index}>
        <ProductCard data={proddata} key={index} />
      </div>
    );
  }) :  data.map((proddata, index) => {
    return (
      <div className="item " key={index} style={{ width: '100%' , height: '100%'}}>
        <HomeCard data={proddata} key={index} />
      </div>
    );
  })
}
<OwlCarousel data={value} />
 */}

        {children}
      </OwlCarousel>
    </>
  );
};
export default OwlCarouselApp;
