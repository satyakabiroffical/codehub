import {
  Button,
  Divider,
  Fade,
  Grid,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import ProductArray from "Context/Contex";
import { ProductContext } from "Context/Contex";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../assets/css/OrderHistory.module.css";
import banner from "assets/img/EmptyOrders.svg";
import ListCard from "components/Cards/ListCard";
import { Box } from "@mui/system";
import {
  CalendarMonthOutlined,
  KeyboardArrowDown,
  Replay,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import useRazorpay from "react-razorpay";
import LogInModal from "components/Modal/LogInModal";

const OrderHistory = () => {
  const data = ProductContext(ProductArray);

  const orderDetails = data.order;
  const getOrderDetails = data.getOrderDetails;
  const totalPrice = data.getOrderDetails;
  const discountByCoupon = data.getOrderDetails;
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const Razorpay = useRazorpay();

  // console.log(orderDetails , 'orderDetails')

  const checkoutHandler = async (ev) => {
    // console.log(ev, "hhh");
    const TotalPrice = ev.amount;
    //  const ewprice = parseInt(TotalPrice)
    //  console.log(TotalPrice)
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
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
          contact: localStorage.getItem("mobile"),
        },
        notes: {
          address: "Inderpuri c-sector",
          order_id: ev._id,
        },
        theme: {
          color: "#1f2251",
        },
      };
      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        // console.log(response.error.code, "code");
        // console.log(response.error.description, "desc");
        // console.log(response.error.source, "source");
        // console.log(response.error.step, " step");
        // console.log(response.error.reason, "reason");
        // console.log(response.error.metadata.order_id, "order_id");
        // console.log(response.error.metadata.payment_id, "payment_id");
        localStorage.setItem("payment_id", response.error.metadata.payment_id);
        // rzp1.close();
      });

      rzp1.open();
    }
  };
  const navigete = useNavigate();
  const OrderUpdate = (ev) => {
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

  const matches = useMediaQuery("(max-width:999px)");
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  // console.log(orderDetails);
  const [isDate, setIsDate] = React.useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [isFilter, setIsFilter] = React.useState(undefined);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isfunctionsCall = () => {
    handleClose();
    setIsFilter("manually");
    setModalOpen(true);
  };
  const handleClickFilter = () => {
    // alert("akjhfkanfg");
    setModalOpen(false);
    // console.log(isDate);
  };
  useEffect(() => {
    if (
      isFilter !== undefined ||
      isDate?.startDate !== undefined ||
      isDate?.endDate !== undefined
    ) {
      getOrderDetails(
        `${process.env.REACT_APP_URL}/getOrderByUserId/${userId}?filter=${isFilter}&startDate=${isDate?.startDate}&endDate=${isDate?.endDate}`
      );
    } else {
      getOrderDetails(
        `${process.env.REACT_APP_URL}/getOrderByUserId/${userId}`
      );
    }
  }, [userId, isFilter, isDate]);
  return (
    <>
      <div className="section section-typo" style={{ height: "100%" }}>
        <img alt="..." className="path" src={require("assets/img/path1.png")} />
        <img
          alt="..."
          className="path path1"
          src={require("assets/img/path3.png")}
        />

        <div
          className={style.OrderHistory_container}
          style={{ minHeight: "1005" }}
        >
          <div
            className={style.OrderHistory_container__1}
            style={{
              height: `${matches ? "100%" : "5rem"}`,
              flexDirection: `${matches ? "column" : "row"}`,
              width: `${matches ? "100%" : "70%"}`,
            }}
          >
            <div>
              <Typography variant={matches ? "h4" : "h3"} fontWeight={700}>
                Order history
              </Typography>
              <Typography variant="subtitle2" display="inline">
                Manage your recent order and download your projects.......!
              </Typography>
            </div>

            <Button
              variant="contained"
              onClick={() => navigate("/")}
              style={{
                border: "1px solid var(--color-themeS)",
                backgroundColor: " #2c1250",
                boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                width: "auto",
                height: "2.5rem",
                fontSize: "0.7rem",
                Padding: "0.5rem",
              }}
              className={`${style.btn_1}  ${style.btn_123_media}`}
            >
              <span> Download More Code </span>
            </Button>
            <Button
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDown />}
              style={{
                border: "1px solid var(--color-themeS)",
                backgroundColor: " #2c1250",
                boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                width: "auto",
                height: "2.5rem",
                fontSize: "0.7rem",
                Padding: "0.5rem",
              }}
              className={`${style.btn_1}  ${style.btn_123_media}`}
            >
              Filter {isFilter}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {/* 'today'.'week'.'month'.'year'.'total'.'manually' */}
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsFilter("today");
                }}
              >
                today
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsFilter("week");
                }}
              >
                week
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsFilter("month");
                }}
              >
                month
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsFilter("year");
                }}
              >
                year
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  setIsFilter("total");
                }}
              >
                total
              </MenuItem>
              <MenuItem onClick={isfunctionsCall}>manually</MenuItem>
            </Menu>
          </div>

          <div
            className={style.OrderHistory_cards}
            style={{ padding: `${matches ? "0.6rem 0" : "2%"}` }}
          >
            {orderDetails && orderDetails.length ? (
              <>
                {orderDetails &&
                  orderDetails.length > 0 &&
                  orderDetails.map((value, i) => {
                    // console.log(value);

                    return (
                      <Box
                        key={i}
                        sx={{
                          color: "#fff",
                          width: "100%",
                          maxWidth: "80%",

                          background: `radial-gradient(ellipse at top, #292D61 30%, #171941 60%)`,
                          boxShadow: "0 1px 20px 0 rgb(0 0 0 / 10%)",
                          p: 1,
                          m: 1,
                        }}
                      >
                        <Box sx={{ my: 3, mx: 2 }}>
                          <Grid container alignItems="center">
                            <Grid item xs>
                              <Typography
                                gutterBottom
                                variant="h3"
                                component="div"
                                fontWeight={500}
                              >
                                Order Status : {value?.status}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                gutterBottom
                                variant="h6"
                                component="div"
                              >
                                Total Items : {value?.totalItems}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="body3"
                                component="div"
                              >
                                Total Price : ₹ {value?.totalPrice}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="body2"
                                component="div"
                              >
                                Total Discount : ₹ {value?.totalDiscount}
                              </Typography>
                              <Typography
                                gutterBottom
                                variant="body2"
                                component="div"
                              >
                                Total Paying Amount : ₹{" "}
                                {value?.totalPayingAmount}
                              </Typography>

                              {value?.status === "pending" && (
                                <Button
                                  style={{
                                    border: "1px solid var(--color-themeS)",
                                    backgroundColor: " #2c1250",
                                    boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                                    width: "10rem",
                                    height: "2.5rem",
                                    fontSize: "0.7rem",
                                    Padding: "0.5rem",
                                    color: "#fff",
                                  }}
                                  onClick={() =>
                                    checkoutHandler({
                                      amount: value?.totalPayingAmount,
                                      id: value?._id,
                                    })
                                  }
                                >
                                  <Replay
                                    sx={{ mr: 1 }}
                                    style={{
                                      fontSize: "1.5rem",
                                      color: "#fff",
                                    }}
                                  />{" "}
                                  Retry payment
                                </Button>
                              )}
                            </Grid>
                          </Grid>
                          <Typography
                            variant="body2"
                            sx={{ display: "inline-block", mr: 2 }}
                          >
                            Your order create at :{" "}
                            {new Date(value?.updatedAt).toLocaleDateString(
                              "en-GB",
                              {
                                hour: "numeric",
                                hour12: true,
                                minute: "numeric",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ display: "inline-block", mr: 2 }}
                          >
                            Your order id: {value?._id}
                          </Typography>
                        </Box>
                        <Divider sx={{ bgcolor: "#fff", width: "100%" }} />

                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-around",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          {value?.productId &&
                            value?.productId.length > 0 &&
                            value?.productId.map((data, index) => {
                              // console.log(value);
                              return (
                                <ListCard
                                  data={data}
                                  key={index}
                                  isShow={value}
                                />
                              );
                            })}
                        </Box>
                      </Box>
                    );
                  })}
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "25rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={banner}
                  alt={"...."}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <LogInModal
        open={modalOpen}
        setOpen={setModalOpen}
        rate={true}
        height={"20rem"}
        width={"35rem"}
        // name={"  Have a coupon?"}
        description={
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignitems: "center",
              gap: 1,
              flexDirection: "column",
              p: 1.6,
            }}
          >
            <Typography variant="body1" sx={{ color: "white" }}>
              Start date
            </Typography>
            <TextField
              id="outlined-start-adornment"
              sx={{
                m: 1,
                width: "100%",
                color: "white",
                backgroundColor: "white",
                outlineColor: "white",
              }}
              value={setIsDate.startDate}
              onChange={(e) =>
                setIsDate((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
              type="date"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthOutlined sx={{ ml: 3 }} />
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="body1" sx={{ color: "white" }}>
              End date
            </Typography>
            <TextField
              id="outlined-start-adornment"
              sx={{
                m: 1,
                width: "100%",
                color: "white",
                backgroundColor: "white",
                outlineColor: "white",
              }}
              value={setIsDate.endDate}
              onChange={(e) =>
                setIsDate((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
              type="date"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthOutlined sx={{ ml: 3 }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={handleClickFilter}
              className={`${style.btn_1}  ${style.btn_123_media}`}
              style={{
                border: "1px solid var(--color-themeS)",
                backgroundColor: " #2c1250",
                boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                width: "auto",
                height: "2.5rem",
                fontSize: "0.7rem",
                Padding: "0.5rem",
              }}
            >
              submit
            </Button>
          </Box>
        }
      />
    </>
  );
};

export default OrderHistory;
