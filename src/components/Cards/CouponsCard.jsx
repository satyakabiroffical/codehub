import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { Button, Stack } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import { Link } from "react-router-dom";

export default function CouponCard({ value, isloop, id, setIsOpen1, handleCouponsApply }) {
  // const [coupon, setCoupon] = useState(null);
  const prodData = ProductContext(ProductArray);
  const totalPrice = prodData.totalPrice;
  const setTotalPrice = prodData.setTotalPrice;
  const discountByCoupon = prodData.discountByCoupon;
  const setDiscountByCoupon = prodData.setDiscountByCoupon;
  const isCoupon = prodData.isCoupon;
  const setIsCoupon = prodData.setIsCoupon;
  const getCartItemsByCoupons = prodData.getCartItemsByCoupons;
  const userId = localStorage.getItem("id");
  // const handleCouponsApply = (coupon, id) => {
  //   // console.log(coupon);
  //   axios({
  //     method: "post",
  //     url: `${process.env.REACT_APP_URL}/applyCoupon`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },

  //     data: {
  //       couponCode: coupon,
  //       productId: isloop ? id : undefined,
  //       cartId: !isloop ? localStorage.getItem("cartId") : undefined,
  //     },
  //   })
  //     .then((response) => {
  //       // console.log(response, "reso");
  //       // alert(response.data.message);
  //       // alert(response.data.data.totalDiscount);
  //       if (
  //         response?.data?.message !== "coupon is not valid for this product"
  //       ) {
  //         setIsCoupon(response.data?.data);
  //         if (response.data.totalDiscount) {
  //           setDiscountByCoupon(response.data.totalDiscount);
  //         } else {
  //           setDiscountByCoupon(response.data?.data?.product?.discount);
  //         }
  //         setTotalPrice(totalPrice - response.data.totalDiscount);
  //       }
  //       getCartItemsByCoupons(userId, coupon);
  //       toast.success(response.data.message, {
  //         position: "top-center",
  //         autoClose: true,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //       setIsOpen1(false);
  //     })
  //     .catch((error) => {
  //       // console.log(error);
  //       toast.warn(error.response.data.message, {
  //         position: "top-right",

  //         autoClose: true,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //     });
  // };
  // console.log(value, "coupon");

  return (
    <>
      {/* {value?.couponCode}
    name: {value.name}
str: {value.startingDate}
  ex : {value.expiryDate}
 onClick={() => handleCouponsApply(value?.couponCode, id)}
   sx={{ width: 100, height: '100%' }}
        image={value.image}
            alt="img"
            onError={(e) =>
              (e.target.src = require("assets/img/websiteDefaults.jpg"))
            } */}

      <Card
        sx={{
          width: "100%",
          boxShadow: "0px 5px 4px rgba(0, 0, 0, 0.25)",
          height: "100%",

          display: "flex",

          flexDirection: "column",
          alignItems: "center",
          // border: "1px solid #E3E8EE",
          border: 0.5,
          borderColor: "gainsboro",
        }}
        style={{
          backgroundColor: "var( --color-theme2)",
          color: "var( --color-main)",
        }}
      >
        <Box
          sx={{
            width: "100%",

            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            // border: "1px solid #E3E8EE",

            position: "relative",
            p: 1,
          }}
        >
          {/* <Checkbox
            onChange={handleClickWishlish}
            sx={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}
            icon={<FavoriteBorder sx={{ color: "primary.main" }} />}
            checkedIcon={<Favorite sx={{ color: "primary.main" }} />}
          /> */}

          <Box
            sx={{
              height: 150,
              width: "100%",
              p: 1,
              objectFit: "contain",
              position: "relative",
            }}
          >
            <img
              src={value.image}
              alt="img"
              onError={(e) =>
                (e.target.src = require("assets/img/websiteDefaults.jpg"))
              }
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />

            {/* <div
              style={{
                position: "absolute",
                backgroundColor: "rgba(217, 217, 217, 0.75)",
                bottom: "-10px",
                right: "-15px",
                width: " 70%",
                borderRadius: " 10px",
                height: "1.5rem",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 3,
              }}
            >
              <StarHalf sx={{ color: "#FFD708" }} />{" "}
              <Typography variant="body2" color="primary" fontWeight={600}>
                {value.review.rating}
                /5
              </Typography>
            </div> */}
          </Box>

          <CardContent
            sx={{ width: "100%", borderTop: "1px solid #E3E8EE", mt: 1 }}
            style={{ paddingBottom: 0 }}
            align={"start"}
          >
            <Stack
              direction={"column"}
              spacing={0.2}
              justifyContent={"space-between"}
              sx={{ alignItems: "flex-start" }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }} noWrap>
                name: {value?.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "600",
                }}
                whiteSpace={"noWrap"}
              >
                coupon code : {value?.couponCode}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "600",
                }}
                whiteSpace={"noWrap"}
              >
                str: {value?.startingDate}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "600",
                }}
                whiteSpace={"noWrap"}
              >
                ex : {value?.expiryDate}
              </Typography>
            </Stack>
          </CardContent>
        </Box>
        <Button
          sx={{
            width: "100%",
            m: 0,
            bgcolor: "#FA5D29",
            "&:hover": {
              bgcolor: "#FA5D29",
            },
          }}
          variant="contained"
          size="large"
          onClick={() => {handleCouponsApply(value?.couponCode, id)}}
        >
          Apply Coupon
        </Button>
      </Card>
    </>
  );
}
