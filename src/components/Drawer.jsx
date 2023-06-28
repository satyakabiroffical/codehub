import React from "react";
// import style from "assets/css/ProductPage.module.css";
import banner from "../assets/img/AddtoCart.svg";
import { BsArrowBarLeft } from "react-icons/bs";

import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  Paper,
  Stack,
  // Typography,
  styled,
  useMediaQuery,
  Tooltip,
  CircularProgress,
} from "@mui/material";

import { Link } from "react-router-dom";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import CartCard from "./Cards/CartCard";
// import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useEffect } from "react";
// import { Close, Start } from "@mui/icons-material";

const DrawerRight = ({ name, rate, Cart }) => {
  // const id = useParams();
  const cart = ProductContext(ProductArray);
  const cartItems = cart.cartItem;
  const state = cart.state;
  const setState = cart.setState;
  const CartProductItems = cart.cartItem.productId;
  const setCartItems = cart.getCartItems;

  // const OrderBYProdID = cart.setOrder;
  const remove = cart.handleAllRemoveCart;
  const Loading = cart.isLoading;
  // // console.log(OrderBYProdID);
  // console.log(Loading);
  // console.log(CartProductItems);
  // console.log(cartItems);

  const userId = localStorage.getItem("id");
  // const history = useHistory();
  // const navigate = useNavigate()
  const matches = useMediaQuery(" (max-width:870px)");

  useEffect(() => {
    if (userId) {
      setCartItems(userId);
    }
  }, [userId]);

  const btnStyle = {
    background: "#2c1250",
    border: "1px solid var(--color-themeS)",
    bordeRadius: "6px",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "11px",
    lineHeight: "15px",
    textAlign: "center",
    cursor: "pointer",
    color: "var(--color-main)",
    width: "90%",
    height: "2.5rem",
    margin: "2% 5%",
    marginBottom: `${matches ? "10rem" : null}`,
    "&:hover": {
      background: "#140927",
      color: "var(--color-main)",
      border: "1px solid #ff4931e",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "12px",
    },
  };

  const Item = styled(Paper)(({ theme }) => ({
    background: "#140927",
    color: "var(--color-main)",
    ...theme.typography.h6,
    padding: theme.spacing(2),
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "0.7rem",
    lineHeight: "15px",
    cursor: "pointer",
    textTransform: "capitalize",
    border: "1px solid var(--color-themeS)",
    bordeRadius: "6px",
    letterSpacing: "0.5px",
    "&:hover": {
      background: "#2c1250",
      color: "var(--color-main)",
    },
  }));

  const list = (right) => (
    <Box
      sx={{ width: right === "top" || right === "bottom" ? "auto" : 350 }}
      style={{ width: `${matches ? " 290px" : "350px"}` }}
      role="presentation"
    >
      {/* {console.log(CartProductItems, "gdfgh")} */}
      {CartProductItems && CartProductItems.length === 0 ? (
        <img
          src={banner}
          alt={"empty_cart"}
          style={{
            padding: "0.6rem",
            marginTop: "4rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : (
        <>
          <List style={{ justifyContent: "center", alignItems: "center" }}>
            {Loading ? (
              <CircularProgress
                color="info"
                value={40}
                style={{
                  margin: "auto",
                  padding: "auto",
                }}
              />
            ) : (
              <>
                {CartProductItems &&
                  CartProductItems.length &&
                  CartProductItems.map((value, index) => (
                    <ListItem key={index}>
                      <CartCard data={value} key={index} rate={true} />

                      <Divider light={true} />
                    </ListItem>
                  ))}
              </>
            )}
          </List>
          <Box
            sx={{
              width: "90%",
              margin: "auto",
            }}
          >
            <Stack
              direction="row"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Item variant="contained">
                total Items : {cartItems.totalItems}
              </Item>
              <Item variant="contained">
                total Price : ₹ {cartItems.totalPrice}
              </Item>
            </Stack>
          </Box>
          <Link to={`/checkout-page/${userId}`}>
            <Button
              onClick={() => setState(false)}
              //  className={style.btn_1}
              sx={btnStyle}
              variant="contained"
              // onclick\
            >
              CheckOut
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
  return (
    <>
      {/* <Button
        variant={`${Cart ? "none" : "contained"}`}
       
        style={
          !rate
            ? {
                width: `${matches ? "7rem" : "9rem"}`,
                height: "3rem",
                outline: "none",
                boxShadow: "12px 32px 80px -20px rgb(0 0 0 / 12%)",
                borderRadius: "16px",
                backgroundColor: " var(--color-seco)",
                border: "none",
                cursor: "pointer",
                textTransform: "capitalize",
              }
            : {
                background: "#2c1250",
                border: "1px solid var(--color-themeS)",
                borderRadius: "6px",
                width: " 5rem",
                height: "2rem",
                fontStyle: "normal",
                fontWeight: "500",

                lineHeight: "15px",
                textAlign: "center",
                cursor: "pointer",
                color: " var(--color-main)",
                fontSize: "0.6rem",
              }
        }
        sx={{
          height: `${ Cart ? "2rem" : ""}`,
          width: `${Cart ? "100%" : ""}`,
          color: `${Cart ? "#fff" : ""}`,
        }}
      >
        {name}
      </Button> */}
      {/* {alert(state.right)} */}
      <Drawer
        state={true}
        anchor="right"
        open={state}
        PaperProps={{
          sx: {
            backgroundColor: "var( --color-theme1S)",
          },
        }}
        sx={{ zIndex: "99999" }}
        onClose={() => setState(false)}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            width: `${matches ? "50%" : "100%"}`,
            padding: "1rem",
          }}
        >
          <Tooltip
            title="close Cart"
            placement="bottom"
            arrow
            showonhover="true"
          >
            <Button
              variant="contained"
              onClick={() => setState(false)}
              style={{
                alignItems: "flex-start",
                fontSize: "18px",
                width: "10%",
                background: "#2c1250",
                border: "1px solid var(--color-themeS)",
                cursor: "pointer",
                color: "var(--color-main)",
                "&:hover": {
                  background: "#2c1250",
                  color: "var(--color-main)",
                  border: "1px solid #ff4931e",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "12px",
                },
              }}
            >
              <BsArrowBarLeft />
            </Button>
          </Tooltip>
          <Tooltip
            title="empty Cart"
            placement="bottom"
            arrow
            showonhover="true"
          >
            <Button
              variant="contained"
              onClick={() => remove(userId)}
              style={{
                alignItems: "flex-start",
                fontSize: "18px",
                width: "10%",
                background: "#2c1250",
                border: "1px solid var(--color-themeS)",
                cursor: "pointer",
                color: "var(--color-main)",
                "&:hover": {
                  background: "#2c1250",
                  color: "var(--color-main)",
                  border: "1px solid #ff4931e",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "12px",
                },
              }}
            >
              <MdRemoveShoppingCart />
            </Button>
          </Tooltip>
        </Box>
        {list("right")}
      </Drawer>
    </>
  );
};

export default DrawerRight;
