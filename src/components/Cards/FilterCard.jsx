// import { ShoppingCart } from "@mui/icons-material";
import { FaShoppingCart } from "react-icons/fa";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { Box, Button, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "assets/css/FilterCard.module.css";
import ResponsiveCarosel from "components/Carosel/ResponsiveCarosel";

import { toast } from "react-toastify";
import axios from "axios";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import { Link, useNavigate } from "react-router-dom";
import Card from "components/productCard/card";

const FilterCard = ({ OrderHistory, data, rate, Checkout, isCouponData }) => {
  // console.log(data)
  const matches = useMediaQuery("(max-width:430px)");
  const prodData = ProductContext(ProductArray);
  const setGetCartItems = prodData.getCartItems;
  const isCoupon = prodData.isCoupon;
  const setState = prodData.setState;
  const matches1 = useMediaQuery("(max-width:870px)");
  const navigate = useNavigate();
  // console.log(isCoupon, "isCoupon");
  const handleClickCart = async (url) => {
    if (localStorage.getItem("id")) {
      const userId = localStorage.getItem("id");

      // console.log(url);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/addToCart/${userId}/${url}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          // console.log(response);
          setGetCartItems(userId);
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    } else {
      const userId = localStorage.getItem("id");
      // console.log(userId);
      // console.log(url);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/createCart/${url}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          // console.log(response);
          localStorage.setItem("id", response.data.data.userId);
          // console.log(userId);
          setGetCartItems(userId);
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((error) => {
          // console.log(error.response.data.message);
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        });
    }
  };
  const [isRibbon, setIsRibbon] = useState(false);
  useEffect(() => {
    
    if (isCoupon && isCoupon.length > 0) {
      const array = isCoupon.some((value) => {
        return data?._id === value?.product?.productId;
      });
      setIsRibbon(array);
      // console.log(data?._id, "value?._id");
    } else if (isCouponData) {
      const array = isCouponData === data?._id;
      setIsRibbon(array);
    }
  }, [isCoupon, isCouponData]);
  // console.log(Checkout, isRibbon, isCoupon, data);
  return (
    <>
      {!matches1 ? (
        <div
          className={style.FilterCard_container}
          style={{
            position: `${Checkout ? "relative" : "static"}`,
            overflow: "hidden",
          }}
        >
          {Checkout && isRibbon && (
            <img
              style={{
                width: "300px",

                objectFit: "auto",
                // transform: `rotate(-45deg)`,
                position: "absolute",
                top: "-60px",
                left: "-60px",
              }}
              src={require("../../components/Cards/red-gift-ribbon-bow-isolated-white-removebg-preview.png")}
              alt=".........."
            />
          )}

          <div className={style.FilterCard_first_container}>
            <div
              className={style.FilterCard_img_container}
              onClick={() => navigate(`/product-page/${data._id}`)}
              style={{ cursor: "pointer" }}
            >
              {!rate ? (
                <ResponsiveCarosel value={data?.file} />
              ) : (
                <img
                  src={data?.file && data.file?.length > 0 && data?.file[0]}
                  alt="img"
                  onError={(e) =>
                    (e.target.src = require("assets/img/websiteDefaults.jpg"))
                  }
                  className={style.FilterCard_img_1}
                />
              )}
            </div>
            <div className={style.FilterCard_text_container}>
              <div className={style.FilterCard_span_container}>
                <span className={style.filterCard_spanTag__1}>
                  {data?.title?.slice(0, 15)}
                </span>
                <span className={style.filterCard_spanTag__mini}>
                  by {data?.seller}
                </span>
              </div>
              <ul className={style.FilterCard_ulTag__1}>
                {data?.features &&
                  data?.features.slice(0, 4).map((elm, index) => (
                    <li className={style.FilterCard_liTag__1} key={index}>
                      {elm?.slice(0, 15)}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <hr
            style={{
              border: "0.5px solid",
              color: "var(--color-main)",
              margin: "1%",
              width: `${matches ? "100%" : "0"}`,
              height: `${matches ? "0%" : "80%"}`,
            }}
            className={style.hr_line__1}
          />
          <div className={style.FilterCard_end_container}>
            <div className={style.FilterCard_end_container_iconss}></div>
            <div className={style.FilterCard_end_container_11}>
              <span className={style.FilterCard_spanTag__end}>
                ₹{data?.price}
              </span>
              {/* <span className={style.FilterCard_spanTag__end1}>55 Sales</span> */}

              {!matches1 ? (
                <span
                  className={style.FilterCard_spanTag__end1}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  Last updated:
                  {new Date(data?.updatedAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              ) : (
                <>
                  <span
                    className={style.FilterCard_spanTag__end1}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    Last updated:{" "}
                  </span>
                  <span
                    className={style.FilterCard_spanTag__end1}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {new Date(data?.updatedAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
            <div className={style.filtercard_btn_container}>
              {!Checkout &&
                (!OrderHistory ? (
                  <Button
                    style={{
                      border: "1px solid var(--color-themeS)",
                      backgroundColor: " #2c1250",
                      boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                      width: "7rem",
                      height: "2.5rem",
                      fontSize: "0.7rem",
                      Padding: "0.5rem",
                    }}
                    className={`${style.btn_1}  ${style.btn_123_media}`}
                    onClick={() => {
                      handleClickCart(data._id);
                      setState(true);
                    }}
                  >
                    <FaShoppingCart
                      style={{ fontSize: "1rem", color: "#fff" }}
                    />
                  </Button>
                ) : (
                  <Button
                    onClick={() => window.open(`${data?.zipFile[0]}`)}
                    variant="contained"
                    tag={Link}
                    style={{
                      border: "1px solid var(--color-themeS)",
                      backgroundColor: " #2c1250",
                      boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                      width: "7rem",
                      height: "2.5rem",
                      fontSize: "0.7rem",
                      Padding: "0.5rem",
                    }}
                    className={`${style.btn_1}  ${style.btn_123_media}`}
                  >
                    <HiDocumentArrowDown style={{ fontSize: "1.5rem" }} />
                  </Button>
                ))}

              <Button
                onClick={() => window.open(`${data?.livePreview}`)}
                variant="contained"
                style={{
                  border: "1px solid var(--color-themeS)",
                  backgroundColor: " #2c1250",
                  boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                  width: "7rem",
                  height: "2.5rem",
                  fontSize: "0.7rem",
                  Padding: "0.5rem",
                }}
                className={`${style.btn_1}  ${style.btn_123_media}`}
              >
                Live Preview
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Card value={data} filter={true} />
      )}
    </>
  );
};

export default FilterCard;
