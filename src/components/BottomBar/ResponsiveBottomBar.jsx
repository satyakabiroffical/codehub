import React, { useEffect, useState } from "react";
import { ImHome } from "react-icons/im";
import { BsChatSquareTextFill, BsFillCartCheckFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import style from "../../assets/css/ResponsiveBottomBar.module.css";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import { Link } from "react-router-dom";

import { useMediaQuery } from "@mui/material";

const ResponsiveBottomBar = () => {
  const NavItmes = ProductContext(ProductArray);

  const setState = NavItmes.setState;
  const cartItem = NavItmes.cartItem;
  const getCartItems = NavItmes.getCartItems;
  useEffect(() => {
    if (localStorage.getItem("id")) {
      getCartItems(localStorage.getItem("id"));
    }
  }, [localStorage.getItem("id")]);
  const [active, setActive] = useState(0);

  const [nav3] = useState({
    home: {
      name: "Home",
      dis: " -175px",
      id: 0,
      icons: (
        <ImHome style={{ zIndex: "1000", color: "#fff", fontSize: "1rem" }} />
      ),
      link: "/",
    },
    profile: {
      name: "Related",
      dis: " -50px",
      id: 1,
      icons: (
        <FaUserAlt
          style={{ zIndex: "1000", color: "#fff", fontSize: "1rem" }}
        />
      ),
      link: "/profile-page",
    },
    categories: {
      name: "Categories",
      dis: " 57px",
      id: 2,
      icons: (
        <BsChatSquareTextFill
          style={{ zIndex: "1000", color: "#fff", fontSize: "1rem" }}
        />
      ),
      link: "/Categories-page",
    },
    cart: {
      name: "Cart",
      dis: " 175px",
      id: 3,
      icons: (
        <BsFillCartCheckFill
          style={{ zIndex: "1000", color: "#fff", fontSize: "1rem" }}
        />
      ),
      click: true,
    },
  });
  const menus = Object.values(nav3);
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

  const matches = useMediaQuery("(min-width:380px) and (max-width: 450px)");

  return (
    <div
      className={style.main_bottom}
      style={{
        transitionDuration: "200ms",
        overflow: "hidden",
        bottom: `${visible ? "0px" : "-120px"}`,
        // opacity: `${visible ? "1" : "0"}`,
      }}
    >
      <div className={style.bottombar_container}>
        <div
          className={style.bottom_icone_bg1}
          style={{
            transform: `translateX(${menus[active].dis})`,
            transition: "transform",
            transitionDuration: "800ms",
            display: `${matches ? "block" : "none"}`,
          }}
        ></div>
        <div className={style.bottom_icons_container}>
          {menus.map((menu, index) => (
            <Link to={index !== 3 ? `${menu.link}` : null} key={index}>
              <div
                className={style.bottom_icone_bg}
                onClick={() => {
                  setActive(index);
                  if (index === 3) {
                    setState(`${menu.click}`);
                  }
                  // handleScroll(index);
                  // scollToRef.current.scrollIntoView()
                }}
              >
                {index === 2 ? (
                  <Badge
                    badgeContent={cartItem ? cartItem?.totalItems : "0"}
                    max={9}
                    overlap="rectangular"
                    color="secondary"
                  >
                    {menu.icons}
                  </Badge>
                ) : (
                  menu.icons
                )}{" "}
                {/* <div className={style.bottam_icon} style={{ zIndex: "1000" }}> */}{" "}
                {/* </div> */}
              </div>
            </Link>
          ))}
          {/* <div className={style.bottom_icone_bg}>
            <HiHome className={style.bottam_icon} />
          </div>

          <div className={style.bottom_icone_bg}>
            <AiOutlineShoppingCart className={style.bottam_icon} />
          </div>

          <div className={style.bottom_icone_bg}>
            <AiOutlineShoppingCart className={style.bottam_icon} />
          </div>
          <div className={style.bottom_icone_bg}>
            <AiOutlineShoppingCart className={style.bottam_icon} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveBottomBar;
