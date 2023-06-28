import React, { useEffect, useState } from "react";
import useRazorpay from "react-razorpay";
import style from "assets/css/CheckOutPage.module.css";
import {
  Button,
  TextField,
  Box,
  CircularProgress,
  useMediaQuery,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../../assets/css/paymentOpions.css";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import LogInModal from "components/Modal/LogInModal";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FilterCard from "components/Cards/FilterCard";

import CouponCard from "components/Cards/CouponsCard";
import OwlCarouselApp from "components/Carosel/OwlCarousel";
import UserLogin from "components/Modal/UserLogin";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Strip from "components/Cards/Strip";

const CheckOutPage = () => {
  const Razorpay = useRazorpay();
  const prodData = ProductContext(ProductArray);
  const getCartItems = prodData.getCartItems;
  const getCartItemsByCoupons = prodData.getCartItemsByCoupons;
  const setLoading = prodData.setIsLoading;
  const cartItem = prodData.cartItem;
  const isCoupon = prodData.isCoupon;
  const setIsCoupon = prodData.setIsCoupon;
  const user = prodData.user;
  const allCoupons = prodData.allCoupons;
  const getAllCoupons = prodData.getAllCoupons;

  const discountByCoupon = prodData.discountByCoupon;
  const setDiscountByCoupon = prodData.setDiscountByCoupon;
  const getUserByUserId = prodData.getUserByUserId;

  const navigete = useNavigate();
  const { id } = useParams();
  const [SingleProduct, setSingleProduct] = useState([]);
  const [isCouponData, setisCouponData] = useState(null);
  const [isGST, setIsGST] = useState(null);
  const [isloop, setIsLoop] = useState(false);
  // const [setIsLoading] = useState(false);

  const userId = localStorage.getItem("id");

  const token = localStorage.getItem("token");
  // console.log("Order", Order);
  // console.log("totalPrice", totalPrice);
  // console.log("cartItem", cartItem);
  // console.log("SingleProduct", SingleProduct);
  // console.log("SingleProduct", SingleProduct);
  // console.log("Loading", isLoading);

  // console.log('SingleProduct' , SingleProduct);
  // console.log("id", id);
  // console.log('deisc', discountByCoupon )
  // console.log('deisc', typeof discountByCoupon )
  // console.log("deisc", isCoupon);
  useEffect(() => {
    window.scroll(0, 0);
    setDiscountByCoupon(0);
    getAllCoupons();
  }, []);
  useEffect(() => {
    if (SingleProduct) {
      const gst = SingleProduct?.price * 0.18;
      setIsGST(Math.floor(gst));

      // console.log(gst);
      // console.log(SingleProduct?.price);
      // console.log(isGST);
    }
  }, [SingleProduct]);
  const getSingleProduct = async (url) => {
    // console.log(url)
    // setIsLoading(true);
    try {
      const res = await axios.get(
        url
        // `${process.env.REACT_APP_URL}/getProductById/${id.id}`
      );
      const prod = await res.data;
      // console.log(prod);
      setIsLoop(true);
      setSingleProduct(prod.data);

      // setIsLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error("Products is not there !", {
        position: "top-right",
        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const [coupons, setCoupons] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const handleCouponsApply = (data, id) => {
    setDiscountByCoupon(0);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/applyCoupon`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      data: {
        couponCode: data ? data : coupons,
        productId: isloop ? id : undefined,
        cartId: !isloop ? localStorage.getItem("cartId") : undefined,
      },
    })
      .then((response) => {
        // console.log("coupon", response);
        // alert(response.data.message);
        if (response?.data?.message === "successfully apply your coupon") {
          setIsCoupon(response.data?.data);
          setisCouponData(response.data?.data?.product?.productId);
          setDiscountByCoupon(response.data?.data?.totalDiscount);
          // setTotalPrice(totalPrice - response.data.totalDiscount);
          setIsOpen1(false);
        }
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
        getCartItemsByCoupons(userId, data ? data : coupons);
      })
      .catch((error) => {
        console.log(error);
        toast.warn(error.response.data.message, {
          position: "top-right",

          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const handleOrderClickByCart = (url) => {
    // console.log(url);
    if (localStorage.getItem("token")) {
      const userId = localStorage.getItem("id");
      // console.log(userId);
      // console.log(url);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/orderByCartId/${userId}/${url}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          // checkoutHandler(response.data.data);
          // console.log(response, 'orderByCart');
          // console.log(response.data.data);
          localStorage.setItem("orderId", response.data.data._id);
          // OrderBYProdID(response.data.data.cartId);
          checkoutHandler({
            amount: cartItem?.totalPayingAmount,
            id: response.data.data._id,
          });

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
          // console.log(error, "errreljhdorderbyCart");
          toast.error("order placed failed", {
            position: "top-right",

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
      toast.error("user not login ", {
        position: "top-right",

        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const handleOrderClickByid = (url) => {
    // console.log(url);

    if (localStorage.getItem("token")) {
      const userId = localStorage.getItem("id");
      // console.log(userId);
      // console.log(url);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/orderByProductId/${userId}/${url}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          // console.log(totalPrice);
          // console.log(response.data.data);
          // console.log(response.data.data.totalPayingAmount)
          localStorage.setItem("orderId", response.data.data._id);

          checkoutHandler({
            amount: SingleProduct.price
              ? discountByCoupon
                ? SingleProduct.price - discountByCoupon + isGST
                : SingleProduct.price + isGST
              : SingleProduct.price + isGST,
            id: response.data.data._id,
          });
          // OrderBYProdID(response.data.data.cartId);
          // RazorpayApp(response.data.data._id)
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
          console.log(error);
          toast.error("Please Login first...!", {
            position: "top-right",
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
      toast.error("user not login ", {
        position: "top-right",

        autoClose: true,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // const [transactionID, setTransactionID] = useState("");
  // const [showPaymentFail, setShowPaymentFail] = useState(false);
  // console.log(user, "user");
  const checkoutHandler = async (ev) => {
    // console.log(ev);
    const TotalPrice = ev.amount;
    //  const ewprice = parseInt(TotalPrice)
    // console.log(TotalPrice);
    if (ev !== "") {
      // alert(process.env.REACT_APP_RZ_KEY);
      const options = {
        key: process.env.REACT_APP_RZ_KEY,
        amount: TotalPrice * 100,
        currency: "INR",
        name: "skCodeHub.com",
        description:
          "Sk CodeHub Brand of Satya Kabir E-solutions Private Limited 2023.",
        image: require("assets/img/logoItems.jpg"),
        handler: function (response) {
          // console.log(response)
          OrderUpdate({ Id: response.razorpay_payment_id, OrderId: ev.id });
        },

        prefill: {
          name: user?.name ? user?.name : localStorage.getItem("name"),
          email: user?.email ? user?.email : localStorage.getItem("email"),
          contact: user?.mobile ? user?.mobile : localStorage.getItem("mobile"),
        },
        notes: {
          address: "Inderpuri c-sector",
          order_id: ev._id,
        },
        theme: {
          color: "#1f2251",
        },
        modal: {
          ondismiss: function () {
            navigete("/orderHistory-page");
          },
        },
      };
      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        //   modal: {
        //     ondismiss: function(){
        //         navigete("/orderHistory-page");
        //     }
        // }
        localStorage.setItem("payment_id", response.error.metadata.payment_id);
        toast.error(response.error.reason, {
          position: "top-right",
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // ondismiss={()=>Navigate('/orderHistory-page')}
      });

      rzp1.open();
    }
  };

  const OrderUpdate = (ev) => {
    //  console.log(ev)
    setLoading(true);

    axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}/updateOrder/${ev.OrderId}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        transactionId: ev.Id,
        status: "Ordered",
      },
    })
      .then((response) => {
        // console.log(response, 'update susss')
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

        navigete("/payment-page");
      })
      .catch((error) => {
        // console.log(error , 'err');
        toast.error("payment failed!!", {
          position: "top-right",
          autoClose: true,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  useEffect(() => {
    if (id !== userId) {
      getSingleProduct(`${process.env.REACT_APP_URL}/getProductById/${id}`);
    }
  }, [id]);
  useEffect(() => {
    getCartItems(userId);
  }, [userId]);
  const matches = useMediaQuery("(max-width:870px)");

  // console.log(user);

  const [value, setValue] = React.useState("razorpay");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleChangePaymentOptions = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <div className="section section-typo">
        <img alt="..." className="path" src={require("assets/img/path1.png")} />
        <img
          alt="..."
          className="path path1"
          src={require("assets/img/path3.png")}
        />

        <div className={style.CheckOutPage_main_container}>
          <div className={style.CheckOutPage_name_container}>
            <span className={style.CheckOutPage_name_spanTag}>Checkout</span>
          </div>
          <div className={style.CheckOutPage_name_container_1}>
            {!token ? (
              <Button
                onClick={() => setIsOpen(true)}
                sx={{ textTransform: "capitalize", color: "var(--color-main)" }}
              >
                Click here to login.....!
              </Button>
            ) : null}
            <Button
              onClick={() => setIsOpen1(true)}
              sx={{ textTransform: "capitalize", color: "var(--color-main)" }}
            >
              Have a coupon?
            </Button>
          </div>
          <div
            className={style.CheckOutPage_container___1}
            style={{ flexDirection: `${matches ? "column" : "row"}` }}
          >
            {/* {console.log(SingleProduct)} */}
            {SingleProduct === [] && cartItem.productId.length === 0 ? (
              <CircularProgress color="info" value={40} />
            ) : (
              <>
                <div className={style.CheckOutPage_left_cards}>
                  {isloop ? (
                    <>
                      {SingleProduct === [] ? (
                        <CircularProgress color="info" value={40} />
                      ) : (
                        <>
                          <FilterCard
                            data={SingleProduct}
                            rate={true}
                            Checkout={true}
                            isCouponData={isCouponData}
                          />
                        </>
                      )}
                    </>
                  ) : cartItem.productId && cartItem.productId.length > 0 ? (
                    cartItem.productId.map((value, index) => (
                      <FilterCard
                        data={value}
                        key={index}
                        rate={true}
                        Checkout={true}
                      />
                    ))
                  ) : (
                    <CircularProgress
                      color="info"
                      value={40}
                      style={{
                        margin: "auto",
                        padding: "auto",
                      }}
                    />
                  )}
                  {/* {console.log(SingleProduct)} */}

                  {/* <CircularProgress color="info" value={40}  /> */}
                </div>

                <div
                  className={style.CheckOutPage_container___checkout}
                  style={{
                    width: `${matches ? "100%" : "43%"}`,
                    marginTop: `${matches ? "2rem" : "none"}`,
                    position: "sticky",
                  }}
                >
                  <div className={style.CheckOutPage_name_container_112}>
                    <span>PRODUCT </span>
                    <span> SUBTOTAL</span>
                  </div>
                  {/* <span>{  SingleProduct && SingleProduct.title}</span> */}

                  {!isloop ? (
                    cartItem.productId &&
                    cartItem.productId.length &&
                    cartItem.productId.map((value, index) => (
                      <div
                        className={style.CheckOutPage_name_container_end1}
                        key={index}
                      >
                        <span> {value.title}</span>
                        <span> ₹ {value.price}</span>
                      </div>
                    ))
                  ) : (
                    <div className={style.CheckOutPage_name_container_end1}>
                      <span>{SingleProduct && SingleProduct.title}</span>
                      <span> ₹ {SingleProduct && SingleProduct.price}</span>
                    </div>
                  )}
                  {/* {console.log(cartItem, "cartItem")}
                  {console.log(SingleProduct, "SingleProduct")} */}
                  {isloop ? (
                    <>
                      <div
                        className={style.CheckOutPage_name_container_end}
                        style={{ textTransform: "uppercase" }}
                      >
                        <span>TOTAL Items </span>
                        <span>{1}</span>
                      </div>
                      <div className={style.CheckOutPage_name_container_end}>
                        <span>SUBTOTAL </span>
                        <span>
                          ₹ &nbsp;
                          {SingleProduct?.price}
                        </span>
                      </div>
                      {/* {console.log(cartItem, "cartItem")} */}
                      <div className={style.CheckOutPage_name_container_end}>
                        <span> DISCOUNT AMOUNT </span>
                        <span
                          style={{
                            color: "#00FF00",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹&nbsp; {(isCoupon && discountByCoupon) || 0}
                        </span>
                      </div>
                      <div className={style.CheckOutPage_name_container_end}>
                        <span>GST </span>
                        <span>
                          ₹ &nbsp;
                          {isGST}
                        </span>
                      </div>
                      <div className={style.CheckOutPage_name_container_112}>
                        <span>GRAND TOTAL </span>
                        <span>
                          ₹&nbsp;
                          {SingleProduct.price
                            ? discountByCoupon
                              ? SingleProduct.price - discountByCoupon + isGST
                              : SingleProduct.price + isGST
                            : SingleProduct.price + isGST}
                        </span>
                      </div>{" "}
                    </>
                  ) : (
                    <>
                      {" "}
                      <div
                        className={style.CheckOutPage_name_container_end}
                        style={{ textTransform: "uppercase" }}
                      >
                        <span>TOTAL Items </span>
                        <span>{!isloop ? cartItem.totalItems : 1}</span>
                      </div>
                      <div className={style.CheckOutPage_name_container_end}>
                        <span>SUBTOTAL </span>
                        <span>
                          ₹ &nbsp;
                          {!isloop
                            ? cartItem?.totalPrice
                            : SingleProduct && SingleProduct.price * 1}
                        </span>
                      </div>
                      <div className={style.CheckOutPage_name_container_end}>
                        <span>GST </span>
                        <span>
                          ₹ &nbsp;
                          {cartItem?.totalTax}
                        </span>
                      </div>
                      {/* {console.log(cartItem, "cartItem")} */}
                      <div className={style.CheckOutPage_name_container_end}>
                        <span> DISCOUNT AMOUNT </span>
                        <span
                          style={{
                            color: "#00FF00",
                            textDecoration: "line-through",
                          }}
                        >
                          ₹&nbsp;{cartItem?.totalDiscount}
                        </span>
                      </div>
                      <div className={style.CheckOutPage_name_container_112}>
                        <span>GRAND TOTAL </span>
                        <span>₹&nbsp;{cartItem?.totalPayingAmount}</span>
                      </div>{" "}
                    </>
                  )}

                  <div className={style.CheckOutPage_name_container_end}>
                    <span
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: "400",
                        textAlign: "justify",
                      }}
                    >
                      FEE Pay Securely using UPI and Cards Your personal data
                      will be used to process your order, support your
                      experience throughout this website, and for other purposes
                      described in our privacy policy.
                    </span>
                  </div>
                  {/* {console.log(cartItem, "cartItem._id")} */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <FormControl>
                      <Typography
                        variant="body1"
                        sx={{ color: "var(--color-main" }}
                      >
                        Payment Options
                      </Typography>
                      <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChangePaymentOptions}
                      >
                        <FormControlLabel
                          value="razorpay"
                          control={
                            <Radio style={{ color: "var(--color-main)" }} />
                          }
                          label="Razorpay"
                        />
                        <FormControlLabel
                          value="stripe"
                          control={
                            <Radio style={{ color: "var(--color-main)" }} />
                          }
                          label="Stripe"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  {value === "razorpay" && (
                    <div className={style.CheckOutPage_btn_container}>
                      {isloop ? (
                        <Button
                          onClick={() =>
                            handleOrderClickByid(SingleProduct._id)
                          }
                          variant="contained"
                          style={{
                            border: "1px solid var(--color-themeS)",
                            backgroundColor: " #2c1250",
                            boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                            width: "10rem",
                          }}
                          className={style.btn_1}
                        >
                          Place Order
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleOrderClickByCart(cartItem._id)}
                          variant="contained"
                          style={{
                            border: "1px solid var(--color-themeS)",
                            backgroundColor: " #2c1250",
                            boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                            width: "10rem",
                          }}
                          className={style.btn_1}
                        >
                          Place Order
                        </Button>
                      )}
                    </div>
                  )}
                  {value === "stripe" && (
                    <Strip />

                    // <div
                    //   className={style.CheckOutPage_btn_container}
                    //   style={{ width: "100%", padding: "10px" }}
                    // >
                    //   <Button
                    //     // onClick={() => handleOrderClickByid(SingleProduct._id)}
                    //     onClick={() => {
                    //       setIsModalOpen(true);
                    //     }}
                    //     variant="contained"
                    //     style={{
                    //       border: "1px solid var(--color-themeS)",
                    //       backgroundColor: " #2c1250",
                    //       boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                    //       width: "10rem",
                    //     }}
                    //     className={style.btn_1}
                    //   >
                    //     Place Order
                    //   </Button>
                    // </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <LogInModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        rate={true}
        // name={" Click here to login.....!"}
        description={<Strip />}
      /> */}
      <LogInModal
        open={isOpen}
        setOpen={setIsOpen}
        rate={true}
        // name={" Click here to login.....!"}
        description={<UserLogin />}
      />
      <LogInModal
        open={isOpen1}
        setOpen={setIsOpen1}
        rate={true}
        // name={"  Have a coupon?"}
        description={
          <div className={style.CheckOutPage_container___Login}>
            <div
              className={style.CheckOutPage_name_container_112}
              style={{ alignItems: "center" }}
            >
              <span>Coupons :-</span>
            </div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: `${matches ? "0" : "3"}`,

                  p: 3,
                },
                "& .MuiFormLabel-root": {
                  color: "#fff",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "#fff",
                },
                "&  .MuiInputBase-root": {
                  color: "#fff",
                },

                "&  .MuiInputBase-root::before": {
                  borderBottom: "1px solid #763CAC",
                },
                "&  .MuiInputBase-root::after": {
                  borderBottom: "1px solid #fff",
                },
                "&  .MuiFormLabel-asterisk": {
                  color: "#FA5D29",
                },
              }}
              noValidate
              autoComplete="off"
              style={{
                // top: `${matches? '48%' :   "50%" }`,
                // height : `${matches? '44rem' : '100%'}`
                display: "flex",
                justifyContent: "space-evenly ",
                alignItems: "center",
                flexDirection: "column",
                width: "80%",
                Height: "80%",
              }}
            >
              <TextField
                id="standard-basic-coupons"
                label="Enter Coupon Code here"
                variant="standard"
                type={"text"}
                fullWidth={true}
                required
                value={coupons}
                onChange={(e) => setCoupons(e.target.value)}
              />
              <Button
                onClick={() => handleCouponsApply(id)}
                variant="contained"
                style={{
                  border: "1px solid var(--color-themeS)",
                  backgroundColor: " #2c1250",
                  boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                  width: "10rem",
                  marginLeft: `${matches ? "0.6rem" : "4rem"}`,
                }}
                className={style.btn_1}
              >
                Apply Coupon
              </Button>
            </Box>
            <Box marginTop={"0.9rem"} sx={{ display: "flex", width: "100%" }}>
              <OwlCarouselApp coupons={true}>
                {allCoupons &&
                  allCoupons.length > 0 &&
                  allCoupons.map((value, index) => (
                    <CouponCard
                      handleCouponsApply={handleCouponsApply}
                      // discountByCoupon={discountByCoupon}
                      // setDiscountByCoupon={setDiscountByCoupon}
                      value={value}
                      key={index}
                      // isloop={isloop}
                      id={id}
                      // setIsOpen1={setIsOpen1}
                    />
                  ))}
              </OwlCarouselApp>
            </Box>
          </div>
        }
      />
      {/* <LogInModal
        open={isPaymentOptions}
        setOpen={setIsPaymentOptions}
        rate={true}
        // name={" Click here to login.....!"}
        description={<UserLogin />}
      /> */}
    </>
  );
};

export default CheckOutPage;
