import React, { useEffect, useState } from "react";
import style from "assets/css/ProductPage.module.css";
import heymen from "assets/img/heymen.png";
import { MdInsertChart } from "react-icons/md";
import { RiFunctionFill } from "react-icons/ri";
import { TbDiscount2 } from "react-icons/tb";
import img22 from "../../assets/img/Asset 2.svg";
// import { FaShoppingCart } from "react-icons/fa";
// import RelatedCards from "components/RelatedCards";
// import SideDrawer from "components/Drawer";
import DrawerRight from "components/Drawer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import BottumNavBaar from "components/BoottomNavbar";
import { CardMedia, CircularProgress, useMediaQuery } from "@mui/material";
import RelatedCards from "components/Cards/RelatedCards";

import { FaShoppingCart } from "react-icons/fa";
import OwlCarouselApp from "components/Carosel/OwlCarousel";
import { Helmet } from "react-helmet";

const ProductPage = () => {
  const [isClick, setIsClick] = useState(false);
  const [isImgClick, setIsImgClick] = useState(0);

  const prodData = ProductContext(ProductArray);
  const setGetCartItems = prodData.getCartItems;
  const Loading = prodData.isLoading;
  const setMetatage = prodData.setMetatage;
  const setMetaId = prodData.setMetaId;
  const setLoading = prodData.setIsLoading;
  const setState = prodData.setState;
  const Menus = prodData.nav2;
  const { id } = useParams();

  const [SingleProduct, setSingleProduct] = useState("");
  const [relatedProduct, setRelatedProduct] = useState("");

  const getSingleProduct = async (url) => {
    try {
      const res = await axios.get(
        url
        // `${process.env.REACT_APP_URL}/getProductById/${id}`
      );
      const prod = await res.data;
      // console.log(prod.data);
      setSingleProduct(prod.data);
      setMetatage(prod.data);
      setMetaId(id);
      setLoading(false);
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

  const getRelatedProduct = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/relatedProduct/${id}`
      );
      const prod = await res.data;
      // console.log(prod.data);
      setRelatedProduct(prod.data);
      setLoading(false);
    } catch (error) {
      // console.log(error);
      toast.error("related products is not there", {
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
  // console.log(SingleProduct);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  const handleClickCart = async (url) => {
    if (localStorage.getItem("id")) {
      const userId = localStorage.getItem("id");
      // console.log(userId);
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
          localStorage.setItem("id", response.data.data.userId);
          localStorage.setItem("cartId", response.data.data._id);
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
          // console.log(error);
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
          localStorage.setItem("cartId", response.data.data._id);
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

  useEffect(() => {
    if (id) {
      window.scroll(0, 0);
    }
  }, [id]);
  useEffect(() => {
    getSingleProduct(`${process.env.REACT_APP_URL}/getProductById/${id}`);
  }, [id]);
  useEffect(() => {
    if (SingleProduct?.categoryId) {
      getRelatedProduct(SingleProduct.categoryId._id);
    }
  }, [SingleProduct]);
  const matches = useMediaQuery("(max-width:999px)");

  return (
    <>
      <BottumNavBaar rate={true} />
      <div
        className={style.ProductPage_container___1}
        id={`${Menus.product.id}`}
      >
        <div className={style.img_conainer1}>
          <div className={style.img_container2}>
            <div className={style.ImgCard_container}>
              {SingleProduct && SingleProduct.file.length > 0 ? (
                <img
                  src={SingleProduct.file[isImgClick]}
                  alt={"imgB"}
                  className={style.img__1}
                  onError={(e) =>
                    (e.target.src = require("assets/img/websiteDefaults.jpg"))
                  }
                />
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
            </div>

            <div className={style.img_overlay_container__1}>
              <div className={style.overlay_card_container}>
                <div className={style.heymen_img_container}>
                  <img src={heymen} alt="heymen" className={style.heymen_img} />
                </div>
                <div className={style.rightSide_container}>
                  <span> {SingleProduct.title}</span>
                  <div className={style.btn_section}>
                    <button
                      className={style.btn_1}
                      onClick={() => {
                        handleClickCart(SingleProduct?._id);
                        setState(true);
                      }}
                    >
                      {/* <span onClick={toggleDrawer}> */}
                      Add to Cart
                      {/* </span> */}
                    </button>
                    <button
                      className={style.btn_1}
                      onClick={() =>
                        window.open(`${SingleProduct?.livePreview}`)
                      }
                    >
                      Live Preview
                    </button>
                    {/* {console.log(SingleProduct)} */}
                  </div>
                </div>
              </div>
              <div className={style.overlay_img_container}>
                {SingleProduct && SingleProduct.file.length ? (
                  SingleProduct.file.map((value, index) => {
                    // console.log(value)
                    return (
                      <div
                        className={style.img_small_container}
                        key={index}
                        onClick={() => setIsImgClick(index)}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          gap: "5px",
                        }}
                      >
                        <img
                          src={value}
                          alt={"imgB"}
                          className={style.img__1}
                          onError={(e) =>
                            (e.target.src = require("assets/img/websiteDefaults.jpg"))
                          }
                        />
                      </div>
                    );
                  })
                ) : (
                  <CircularProgress color="info" value={40} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={style.technology_section}>
          <div className={style.technology_section___1}>
            <span className={style.text_11}>Technology used</span>
            <div className={style.tehnology_img_container}>
              {SingleProduct &&
                SingleProduct.technologyId.length > 0 &&
                SingleProduct.technologyId.map((value, index) => (
                  <img
                    src={value?.image}
                    alt={"techImg"}
                    className={style.technology_img_11}
                    key={index}
                    onError={(e) =>
                      (e.target.src = require("assets/img/websiteDefaults.jpg"))
                    }
                  />
                ))}

              {/* {icons_image.map((value, index) => {
                return (
                 
                );
              })} */}
            </div>
          </div>
          <div
            className={style.technology_section___2}
            style={{
              alignItems: `${matches ? "center" : "flex-start"}`,
              flexDirection: `${matches ? "column" : "row"}`,
            }}
          >
            <div
              className={style.technology_section_left}
              style={{ width: `${matches ? "80%" : "43%"}` }}
            >
              <span className={style.technology_span_tag}>
                Price : ₹{SingleProduct.price}
              </span>

              <div className={style.flex_contanier_btn}>
                <MdInsertChart className={style.font_icons_1} />
                <div className={style.btn____1}>
                  {SingleProduct &&
                    SingleProduct.features.length > 0 &&
                    SingleProduct.features.map((btn, index) => {
                      return (
                        <div className={style.btn______style_1} key={index}>
                          <span style={{ whiteSpace: "nowrap" }}>{btn}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className={style.flex_contanier_btn}>
                <RiFunctionFill className={style.font_icons_1} />
                <div className={style.btn____1}>
                  {SingleProduct &&
                    SingleProduct.technologyId.length > 0 &&
                    SingleProduct.technologyId.map((value, index) => (
                      <div className={style.btn______style_1} key={index}>
                        <span style={{ whiteSpace: "nowrap" }}>
                          {" "}
                          {value?.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div className={style.flex_contanier_btn}>
                <TbDiscount2 className={style.font_icons_1} />
                <div className={style.btn____1}>
                  {SingleProduct &&
                    SingleProduct.tag.length > 0 &&
                    SingleProduct.tag.map((btn, index) => {
                      return (
                        <div className={style.btn______style_1} key={index}>
                          <span style={{ whiteSpace: "nowrap" }}> {btn}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div
              className={style.gradiant_shadow_middile_container}
              style={{
                height: `${isClick ? "105%" : "30rem"}`,
                left: `${isClick ? "58%" : "32%"}`,
                width: `${isClick ? "30rem" : "20rem"}`,
                transitionDuration: "800ms",
                display: `${matches ? "none" : "block"}`,
              }}
            ></div>
            <div
              className={style.technology_section_right}
              style={{ width: `${matches ? "80%" : "40%"}` }}
            >
              <span
                className={style.technology_span_tag}
                style={{ fontSize: "2rem", fontWeight: "700" }}
              >
                {SingleProduct.title}
              </span>
              <span
                className={style.technology_span_tag}
                style={{
                  fontSize: `${matches ? " 18px" : "22px "}`,
                  marginBottom: `${matches ? "1rem" : "auto"}`,
                }}
              >
                Seller By : {SingleProduct.seller}
              </span>
              <div
                className={style.right_section_container}
                style={{
                  height: `${isClick ? "100%" : "15rem"}`,
                  transition: "2s",
                  padding: `${matches ? "1rem" : "0.6rem"}`,
                }}
              >
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
                    {!isClick ? (
                      <span>
                        {matches ? (
                          <>
                            {SingleProduct &&
                              SingleProduct?.description.slice(0, 100)}
                          </>
                        ) : (
                          <>
                            {SingleProduct &&
                              SingleProduct?.description.slice(0, 300)}
                          </>
                        )}

                        <span
                          onClick={handleClick}
                          style={{
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer",
                            transitionDuration: "1000ms",
                          }}
                        >
                          more
                        </span>
                      </span>
                    ) : (
                      <span>
                        {SingleProduct.description}
                        <span
                          onClick={() => setIsClick(false)}
                          style={{
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer",
                            marginLeft: "2%",
                            transitionDuration: "1000ms",
                          }}
                        >
                          Less
                        </span>
                      </span>
                    )}
                  </>
                )}
              </div>
              <div className={style.button_container___1}>
                <button
                  className={style.btn_right_one__button}
                  onClick={() => {
                    handleClickCart(SingleProduct?._id);
                    setState(true);
                  }}
                >
                  {/* <span 
                    onClick={() =>}
                  > */}
                  <FaShoppingCart /> Add to Cart
                  {/* </span> */}
                </button>
                <DrawerRight />

                {/* <Link to={`/cart-page/${SingleProduct._id}`} >
                <button className={style.btn_right_one__button}>
                <FaShoppingCart /> Add to Cart
                </button> 
              </Link> */}
                <Link to={`/checkout-page/${SingleProduct._id}`}>
                  <button className={style.btn_right_one__button}>
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className={style.related_things_container}
          id={`${Menus.related.id}`}
        >
          <span className={style.text_11}>Related things</span>
          <div className={style.card_container___related_things}>
            <OwlCarouselApp>
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
                  {relatedProduct && relatedProduct.length ? (
                    relatedProduct.map((value, index) => (
                      <RelatedCards data={value} key={index} />
                    ))
                  ) : (
                    <CardMedia
                      component="img"
                      image={img22}
                      alt="Profile image"
                      sx={{
                        width: "100%",
                        maxWidth: 260,
                        m: "auto",
                        p: "auto",
                        boxShadow: "0 1px 20px 0 rgb(0 0 0 / 10%)",
                      }}
                    />
                  )}
                </>
              )}
            </OwlCarouselApp>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
