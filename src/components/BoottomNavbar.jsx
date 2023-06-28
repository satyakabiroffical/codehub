import React, { useEffect, useState } from "react";
import style from "assets/css/BoottomNavbar.module.css";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
// import { useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Badge, useMediaQuery } from "@mui/material";

// import { useScrollTo } from "react-use-window-scroll";
// import scrollToComponent from 'react-scroll-to-component';
const BottumNavBaar = ({ rate }) => {
  const NavItmes = ProductContext(ProductArray);
  const Menus = Object.values(NavItmes.nav);
  const Menus2 = Object.values(NavItmes.nav2);
  const cartItem = NavItmes.cartItem;
  const order = NavItmes.order;
  const getCartItems = NavItmes.getCartItems;
  const [active, setActive] = useState(0);
  const matches = useMediaQuery(" (max-width:870px)");
  const setState = NavItmes.setState;
  // console.log(cartItem);
  const isId = localStorage.getItem("id");
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);
  useEffect(() => {
    if (isId) {
      getCartItems(isId);
    }
  }, []);

  return (
    <>
      {!rate ? (
        <div className={style.Container}>
          <div
            className={scrolled ? ` ${style.scroll_nav}` : `${style.mainDiv1}`}
            style={{
              display: `${
                location.pathname === "/register-page" ||
                location.pathname === "/verify" ||
                matches
                  ? "none"
                  : "flex"
              }`,
            }}
            // className={style.mainDiv1}
          >
            <div className={style.mainDiv}>
              <div
                className={style.item1}
                style={{
                  transform: `translateX(${Menus[active].dis})`,
                  transition: "transform",
                  transitionDuration: "800ms",
                }}
              ></div>
              <span
                onClick={() => window.scrollTo(0, 0)}
                className={style.item}
              >
                code hub
              </span>

              {Menus.map((menu, index) => (
                <a href={`#${menu.id}`} key={index}>
                  <div
                    className={style.item}
                    onClick={() => {
                      setActive(index);
                      // handleScroll(index);
                      // scollToRef.current.scrollIntoView()
                    }}
                  >
                    <span className={style.span_tag} style={{ zIndex: "10" }}>
                      {" "}
                      {menu.name}{" "}
                    </span>
                  </div>
                </a>
              ))}
              {/* <div className={style.item}>Home</div>
  <div className={style.item}>Category</div>
  <div className={style.item}>Technology</div>
  <div className={style.item}>About Us</div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className={style.Container}>
          <div
            className={scrolled ? ` ${style.scroll_nav}` : `${style.mainDiv1}`}
            style={{
              display: `${
                location.pathname === "/register-page" ||
                location.pathname === "/verify" ||
                matches
                  ? "none"
                  : "flex"
              }`,
            }}
            // className={style.mainDiv1}
          >
            <div className={style.mainDiv}>
              <div
                className={style.item1}
                style={{
                  transform: `translateX(${Menus2[active].dis})`,
                  transition: "transform",
                  transitionDuration: "800ms",
                }}
              ></div>
              <Link to={"/"} className={style.item}>
                code hub
              </Link>

              {Menus2.map((menu, index) => (
                <a href={`#${menu.id}`} key={index}>
                  <div
                    className={style.item}
                    onClick={() => {
                      setActive(index);
                      if (index === 2) {
                        setState(true);
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
                        <span
                          className={style.span_tag}
                          style={{ zIndex: "10" }}
                        >
                          {menu.name}
                        </span>
                      </Badge>
                    ) : (
                      <span className={style.span_tag} style={{ zIndex: "10" }}>
                        {menu.name}
                      </span>
                    )}
                  </div>
                </a>
              ))}
              {/* <div className={style.item}>Home</div>
  <div className={style.item}>Category</div>
  <div className={style.item}>Technology</div>
  <div className={style.item}>About Us</div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottumNavBaar;
