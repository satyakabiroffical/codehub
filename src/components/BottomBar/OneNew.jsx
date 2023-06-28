import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import {
  AccountCircle,
  Home,
  LocalMall,
  ShoppingCart,
  Widgets,
} from "@mui/icons-material";
import {  useNavigate } from "react-router-dom";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("Home");
  //   console.log(value, 'mmmmmmmm')
  const provider = ProductContext(ProductArray);
  const setState = provider.setState;
  const handleChange = (event, newValue) => {
    setValue(newValue);
    //   console.log(newValue, 'iiiiiiii')
  };
  const navigate = useNavigate();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });
 
  return (
    <BottomNavigation
    style={{
        transitionDuration: "200ms",
        overflow: "hidden",
        bottom: `${visible ?  "0px" : "-120px"}`,
        
      }}
     
      sx={{
        width: "100%",
        bgcolor: "#372f2f ",
        zIndex: "999999",
        position: "fixed",
        bottom: 0,
        "& .MuiBottomNavigationAction-root": {
          color: "#fff",
        },
        "& .Mui-selected": {
          color: "#fa5d29",
        },
        // "& .MuiSvgIcon-root": {
        //   color: "#fa5d29",
        // },
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="Home"
        onClick={() => navigate("/")}
        style={{ color: `${value === "Home" ? "#fa5d29" : "#fff"}`, minWidth: '25px' }}
        icon={<Home />}
      />
      <BottomNavigationAction
        label="Profile"
        value="Profile"
        onClick={() => navigate("/profile-page")}
        style={{ color: `${value === "Profile" ? "#fa5d29" : "#fff"}`, minWidth: '25px' }}
        icon={<AccountCircle />}
      />
      <BottomNavigationAction
        label="Order "
        value="Order History"
        onClick={() => navigate("/orderHistory-page")}
        style={{ color: `${value === "Order History" ? "#fa5d29" : "#fff"}`, minWidth: '25px' }}
        icon={<LocalMall />}
      />
      <BottomNavigationAction
        label="Category"
        value="Category"
        onClick={() => navigate("/Categories-page")}
        style={{ color: `${value === "Category" ? "#fa5d29" : "#fff"}` , minWidth: '25px' }}
        icon={<Widgets />}
      />
      <BottomNavigationAction 
        label="Cart"
        onClick={() => setState(true)}
        value="Cart"
        style={{ color: `${value === "Cart" ? "#fa5d29" : "#fff"}` , minWidth: '25px'}}
        icon={<ShoppingCart />}
      />
    </BottomNavigation>
  );
}
