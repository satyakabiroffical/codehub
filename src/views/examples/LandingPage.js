import React, { useEffect, useState } from "react";
import HowItWork from "../../components/howitwork";
import { Row, Col } from "reactstrap";
import Category from "../../components/category";
import Gola from "components/gola";
import style from "./landing.module.css";
import img22 from "../../assets/img/Asset 2.svg";
import Cardo from "components/productCard/card";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import BottumNavBaar from "components/BoottomNavbar";
import {
  Button,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import waveline from "../../assets/img/Group 2098.png";

import Examples from "views/IndexSections/Examples";
import Card from "components/category/categoryCard";
import loadingIcons from "../../assets/img/loading.gif";
import OwlCarouselApp from "components/Carosel/OwlCarousel";
import Typer from "react-animated-typer";
import { TypeAnimation } from "react-type-animation";
import { Box } from "@mui/system";
import WhatsAppButton from "components/Login/WhatsaapButton";
import YouTubeVideos from "components/Youtube";
import SlickCarousel from "components/Carosel/Swiper";
import AliceCarousela from "components/Carosel/AliceCarousel";
import ReactOwlCarousel from "react-owl-carousel";
import YoutubeEmbed from "../../components/Youtube/NewIndex";
import NewIndex from "../../components/Youtube/NewIndex";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../components/Carosel/Owl.css";
import VideoCard from "components/Cards/videoCard";
import SwiperSlider from "../../components/Carosel/swiper/index";
import { SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [isLoadingToo, setIsLoadingToo] = useState(true);
  const userId = localStorage.getItem("id");
  const prodData = ProductContext(ProductArray);
  const categorys = prodData.category.slice(0, 8);
  const allTechno = prodData.allTechno;
  const banner = prodData.banner;
  const company = prodData.company;

  const getCategoryData = prodData.getCategoryData;
  const getProducts = prodData.getProducts;
  const getAllTypes = prodData.getAllTypes;
  const getCompany = prodData.getCompany;
  const getPolicyDetails = prodData.getPolicyDetails;
  const getAllBanner = prodData.getAllBanner;
  const getUserByUserId = prodData.getUserByUserId;
  const getALLProductsByTechnology = prodData.getALLProductsByTechnology;
  const getProductsByApps = prodData.getProductsByApps;
  const getProductsByWebsite = prodData.getProductsByWebsite;
  const apps = prodData.apps.slice(0, 8);
  const websites = prodData.websites.slice(0, 8);
  const Loading = prodData.isLoading;
  const allTypes = prodData.allTypes;
  useEffect(() => {
    getCategoryData();
    getProducts();
    getAllTypes();
    getCompany();
    getPolicyDetails();
    getAllBanner();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserByUserId(`${process.env.REACT_APP_URL}/getUserById/${userId}`);
    }
  }, [localStorage.getItem("token")]);
  // const productsData = prodData.allProducts.slice(0, 8);
  const Menus = prodData.nav;
  // console.log(banner, "banner");
  // console.log(allTechno, "allTechno");
  // console.log(websites, "websites");
  const matches = useMediaQuery(" (max-width:870px)");
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  React.useEffect(() => {
    document.body.classList.toggle("landing-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("landing-page");
    };
  }, []);
  useEffect(() => {
    getProductsByApps();
    getProductsByWebsite();
    getALLProductsByTechnology();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setIsLoadingToo(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if (matches) {
      // document.getElementsByClassName()
    }
  }, [matches]);
  return (
    <>
      {isLoadingToo && Loading && (
        <Box
          sx={{
            width: "100%",
            minHeigth: "120vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "30rem",
              height: "30rem",
            }}
          >
            <img
              src={loadingIcons}
              style={{ width: "100%", heigth: "100%", objectFit: "contain" }}
              alt="loading"
            />
            <Typography variant="body1" sx={{ color: "white" }}>
              Loading................
            </Typography>
          </Container>
        </Box>
      )}
      <>
        <BottumNavBaar />
        {!matches && <WhatsAppButton />}
        <div className="wrapper" id={`${Menus.home.id}`}>
          <div className="page-header">
            <img
              alt="..."
              className="path"
              src={require("assets/img/blob.png")}
              style={{ zIndex: 0 }}
            />
            <img
              alt="..."
              className="path2"
              src={require("assets/img/path2.png")}
              style={{ zIndex: 0 }}
            />
            <img
              alt="..."
              className="shapes triangle"
              src={require("assets/img/triunghiuri.png")}
              style={{ zIndex: 0 }}
            />
            <img
              alt="..."
              className="shapes wave"
              src={require("assets/img/waves.png")}
              style={{ zIndex: 0 }}
            />
            <img
              alt="..."
              className="shapes squares"
              src={require("assets/img/patrat.png")}
              style={{ zIndex: 0 }}
            />
            <img
              alt="..."
              className="shapes circle"
              src={require("assets/img/cercuri.png")}
              style={{ zIndex: 0 }}
            />
            <div style={{ height: "3.5rem", width: "100%" }}></div>
            <div
              className="container flex justify-content-center"
              style={{ display: "flex", height: "60vh" }}
            >
              <Row className="row-grid justify-content-between  text-left">
                <Col lg="8" md="6">
                  <span
                    className={style.BannerText}
                    style={{
                      fontSize: `${matches ? "3rem" : "4rem"}`,
                      textTransform: "capitalize",
                    }}
                  >
                    {banner?.title}
                    {/* Unlock Your Coding Potential with
                  <br style={{ display: `${!matches ? "none" : "block"}` }} />
                  <span
                    style={{ display: `${matches ? "none" : "inline-block"}` }}
                  >
                    {" "}
                    Codehub! */}
                    {/* </span> */}
                    {matches ? (
                      <Typer
                        heading={
                          <>
                            <br
                              style={{
                                display: `${matches ? "none" : "block"}`,
                              }}
                            />
                            <br />
                          </>
                        }
                        dataText={[
                          "Games..",
                          "Websites..",
                          "Apps..",
                          "Admin-Page..",
                          "Marketing..",
                          "Advertisements",
                          "Business development",
                          "Softwares..",
                          "Digital-Marketing",
                        ]}
                      />
                    ) : (
                      <>
                        <TypeAnimation
                          sequence={[
                            "Games...",
                            1000,
                            "Websites...",
                            1000,
                            "Apps...",
                            1000,
                            "Admin-Page...",
                            1000,
                            "Marketing...",
                            1000,
                            "Advertisements..",
                            1000,
                            "Business-Development",
                            1000,
                            "Softwares...",
                            1000,
                            "Digital-Marketing",
                            1000,
                          ]}
                          //  Replacing previous Text
                          style={{
                            fontSize: `${matches ? "1.5rem" : "2.5rem"}`,
                            fontStyle: "normal",
                            fontWeight: "700",
                            lineHeight: "50px",
                          }}
                          wrapper={"h5"}
                          repeat={Infinity}
                          speed={55}
                          deletionSpeed={99}
                        />
                      </>
                    )}
                  </span>

                  <p className="text-white mb-3">{banner?.description}</p>
                </Col>

                <Col lg="4" md="5">
                  {/* <SlickCarousel>
                  {img.map((value, i) => (
                    <img
                      src={value}
                      key={i}
                      alt="...."
                      style={{ height: "10rem", width: "100%" }}
                    />
                  ))}
                </SlickCarousel> */}
                  {/* <ResponsiveCarosel value={img} rate={true} /> */}

                  {/* asdkhifkuahfdkuihiauhdfdfggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg */}
                  {matches ? (
                    <div
                      style={{
                        width: "100%",
                        height: "8rem",
                        marginBottom: "0.6rem",
                      }}
                    >
                      <img
                        alt="..."
                        className="img-fluid"
                        src={`${process.env.REACT_APP_URI}/${banner.image}`}
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ) : (
                    <img
                      alt="..."
                      className="img-fluid"
                      src={`${process.env.REACT_APP_URI}/${banner.image}`}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  )}
                </Col>
              </Row>
            </div>

            <section
              className="section section-lg"
              style={{
                marginTop: `${matches ? "3rem" : 0}`,
                padding: `${matches ? "40px 0 " : "0"}`,
              }}
            >
              <section
                className="section "
                style={{
                  marginTop: `${matches ? "3rem" : 0}`,
                  padding: `${matches ? "40px 0 " : "0"}`,
                }}
              >
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  <span className={style.heading} style={{ marginTop: "3rem" }}>
                    See Types
                  </span>
                </div>
                <div
                  className="d-flex flex-wrap justify-content-center align-items-center"
                  style={{ width: "100%", padding: "1rem" }}
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
                    // <Category categorys={categorys} />
                    <div style={{ width: "95%" }}>
                      <OwlCarouselApp items={4} margin={50} autoWidth={true}>
                        {allTypes &&
                          allTypes.length > 0 &&
                          allTypes.map((data, index) => (
                            <Card value={data} key={index} rate={true} />
                          ))}
                      </OwlCarouselApp>
                    </div>
                  )}
                </div>
              </section>
            </section>
          </div>

          {/* <section
          className="section section-lg "
          style={{ display: `${matches ? "none" : "block"}` }}
        >
          <section className="section">
            <div className="container">
              <span
                className={style.heading}
                style={{ textAlign: "center", padding: "0.6rem" }}
              >
                “Revolutionize Your Code : Buy & Sell on Codehub!”
              </span>

              <span
                className={style.span}
                style={{ textAlign: "center", padding: "0.6rem" }}
              >
                {" "}
                “Stay Ahead of the Game with Codehub's Latest Updates in the Web
                and Mobile Apps that values improving people's lives through
                accessible design”
              </span>
              <div className="d-flex justify-content-center align-items-center mt-5">
                <img
                  alt="..."
                  className="img"
                  width={500}
                  src={require("assets/img/Group 1899.png")}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center flex-column">
                <img
                  style={{
                    position: "relative",
                    left: "3vh",
                  }}
                  alt="..."
                  className="img"
                  width={500}
                  src={require("assets/img/Group 2098.png")}
                />

                <div
                  className="d-flex justify-content-center align-items-center mt-n1"
                  style={{
                    transform: "rotateX(180deg)",
                    position: "relative",
                    top: "-143vh",
                    left: "2vh",
                  }}
                >
                  <img
                    alt="..."
                    className="img"
                    width={500}
                    src={require("assets/img/Group 2098.png")}
                  />
                </div>
              </div>
            </div>
          </section>
        </section> */}
          <Box>
            <span
              className={style.heading}
              style={{ textAlign: "center", padding: "0.6rem" }}
            >
              “Revolutionize Your Code : Buy & Sell on Codehub!”
            </span>

            <span
              className={style.span}
              style={{ textAlign: "center", padding: "0.6rem" }}
            >
              {" "}
              “Stay Ahead of the Game with Codehub's Latest Updates in the Web
              and Mobile Apps that values improving people's lives through
              accessible design”
            </span>
            <div className="d-flex justify-content-center align-items-center mt-5">
              <img
                alt="..."
                className="img"
                width={500}
                src={require("assets/img/Group 1899.png")}
              />
            </div>
            <Box
              sx={{
                height: "1rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <img src={waveline} alt=".." />
            </Box>

            <Box
              position={"relative"}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
                overflow: "hidden",
              }}
            >
              <Gola />
            </Box>
            <Box
              sx={{
                height: "1rem",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                transform: "rotateX(180deg)",
              }}
            >
              <img src={waveline} alt=".." />
            </Box>
          </Box>
          {websites && websites.length > 0 && (
            <section
              className="section section-lg"
              style={{
                marginTop: `${matches ? "1rem" : 0}`,
                padding: `${matches ? "40px 0 " : "0"}`,
              }}
            >
              <section className="section">
                <div className="d-flex flex-wrap justify-content-center align-items-center text-center">
                  <span
                    className={style.heading}
                    style={{ textAlign: "center", padding: "0.6rem" }}
                  >
                    Realized Projects by Codehub Community Newly Released
                    website
                  </span>
                </div>
                <div
                  className=" container d-flex justify-content-end align-items-end "
                  style={{ width: "100%" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to={"/WebsiteProduct-page"}
                  >
                    {" "}
                    view all
                  </Button>
                </div>
                <div className="d-flex flex-wrap justify-content-center align-items-center">
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
                      {websites &&
                        websites.length > 0 &&
                        websites.map((value, index) => (
                          <Cardo value={value} key={index} />
                        ))}
                    </>
                  )}
                </div>
              </section>
            </section>
          )}
          {categorys && categorys?.length > 0 && (
            <section id={`${Menus.category.id}`} className="section section-lg">
              <section className="section">
                <div className="d-flex flex-wrap justify-content-center align-items-center text-center">
                  <span
                    className={style.heading}
                    style={{ textAlign: "center", padding: "0.6rem" }}
                  >
                    Explore Our Diverse Range of Code Offerings Our Categories
                  </span>
                </div>
                <div
                  className=" container d-flex justify-content-end align-items-end "
                  style={{ width: "100%" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to={"/Categories-page"}
                  >
                    {" "}
                    view all
                  </Button>
                </div>
                <div className="d-flex flex-wrap justify-content-center align-items-center">
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
                    <Category categorys={categorys} />
                  )}
                </div>
              </section>
            </section>
          )}
          {apps && apps.length > 0 && (
            <section className="section section-lg">
              <section className="section">
                <div className="d-flex flex-wrap justify-content-center align-items-center text-center">
                  <span
                    className={style.heading}
                    style={{ textAlign: "center", padding: "0.6rem" }}
                  >
                    Codehub Community's Developed Apps in Action Newly Released
                    Apps
                  </span>
                </div>
                <div
                  className=" container d-flex justify-content-end align-items-end "
                  style={{ width: "100%" }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to={"/AppProducts-page"}
                  >
                    {" "}
                    view all
                  </Button>
                </div>
                <div className="d-flex flex-wrap justify-content-center align-items-center">
                  {Loading ? (
                    <CircularProgress
                      color="info"
                      value={40}
                      style={{
                        margin: "auto",
                        padding: "auto",
                      }}
                      className="d-flex flex-wrap justify-content-center align-items-center"
                    />
                  ) : (
                    <>
                      {apps &&
                        apps.length > 0 &&
                        apps.map((value, index) => (
                          <Cardo value={value} key={index} />
                        ))}
                    </>
                  )}
                </div>
              </section>
            </section>
          )}
          <section className="section section-lg" id={`${Menus.aboutUs.id}`}>
            <section className="section">
              <div className="d-flex flex-wrap justify-content-center align-items-center text-center ">
                <span
                  className={style.heading}
                  style={{ textAlign: "center", padding: "0.6rem" }}
                >
                  Effortless Code Trading: How Codehub Works
                </span>
              </div>
              <div className="d-flex flex-wrap justify-content-center align-items-center text-center">
                {/* gogo */}
                <HowItWork />
              </div>
            </section>
          </section>
          {allTechno && allTechno.length > 0 && (
            <>
              <span
                id={`${Menus.technology.id}`}
                className={style.heading}
                style={{ textAlign: "center", padding: "0.6rem" }}
              >
                {" "}
                Explore Our Diverse Range of Code Offerings Our Technology
              </span>
              <Box
                style={{
                  height: "18rem",
                  width: "100%",
                  overflow: "hidden",
                  marginBottom: "5rem",
                  padding: "0.6rem 0",
                  display: `${matches ? "none" : "block"}`,
                }}
              >
                <SwiperSlider items={3}>
                  {allTechno &&
                    allTechno.length > 0 &&
                    allTechno.map((value, index) => (
                      <SwiperSlide key={index}>
                        <Examples value={value} />{" "}
                      </SwiperSlide>
                    ))}
                </SwiperSlider>
              </Box>
              <Box
                style={{
                  height: "18rem",
                  width: "100%",
                  overflow: "hidden",
                  marginBottom: "5rem",
                  padding: "0.6rem 0",
                  display: `${matches ? "block" : "none"}`,
                }}
              >
                <SwiperSlider items={1}>
                  {allTechno &&
                    allTechno.length > 0 &&
                    allTechno.map((value, index) => (
                      <SwiperSlide key={index}>
                        <Examples value={value} />{" "}
                      </SwiperSlide>
                    ))}
                </SwiperSlider>
              </Box>
            </>
          )}

          {company?.youtubeLink && company?.youtubeLink?.length > 0 && (
            <>
              <span
                className={style.heading}
                style={{ textAlign: "center", padding: "0.6rem" }}
              >
                {" "}
                Explore Our Diverse Video's Offerings Our Technology
              </span>

              <Box
                style={{
                  height: "18rem",
                  width: "100%",
                  overflow: "hidden",
                  marginBottom: "5rem",
                  padding: "0.6rem 0",
                  display: `${matches ? "none" : "block"}`,
                }}
              >
                <SwiperSlider items={3}>
                  {company?.youtubeLink &&
                    company?.youtubeLink?.length > 3 &&
                    company?.youtubeLink?.map((value, index) => (
                      <SwiperSlide key={index}>
                        <VideoCard value={value} />
                      </SwiperSlide>
                    ))}
                </SwiperSlider>
              </Box>
              <Box
                style={{
                  height: "18rem",
                  width: "100%",
                  overflow: "hidden",
                  marginBottom: "5rem",
                  padding: "0.6rem 0",
                  display: `${matches ? "block" : "none"}`,
                }}
              >
                <SwiperSlider items={1}>
                  {company?.youtubeLink &&
                    company?.youtubeLink?.length > 3 &&
                    company?.youtubeLink?.map((value, index) => (
                      <SwiperSlide key={index}>
                        <VideoCard value={value} />
                      </SwiperSlide>
                    ))}
                </SwiperSlider>
              </Box>
            </>
          )}
          {/* <div
          style={{
            marginBottom: "5rem",
            // padding: "0.6rem 0",
          }}
        >
          {company?.youtubeLink && company?.youtubeLink?.length > 0 && (
            <AliceCarousela>
              {company?.youtubeLink &&
                company?.youtubeLink?.length > 0 &&
                company?.youtubeLink.map((value, index) => (
                  <YouTubeVideos value={value} key={index} />
                ))}
            </AliceCarousela>
          )}
        </div> */}
          {/* {company?.youtubeLink && company?.youtubeLink?.length > 0 && (
          <section
            style={{
              height: "18rem",
              width: "100%",
              overflow: "hidden",
              marginBottom: "5rem",
              padding: "0.6rem 0",
            }}
          >
            <OwlCarouselApp>
              {company?.youtubeLink &&
                company?.youtubeLink?.length > 0 &&
                company?.youtubeLink.map((value, index) => (
                  <YouTubeVideos value={value} key={index} />
                ))}
            </OwlCarouselApp>

           
          </section>
        )} */}
        </div>
      </>

      {/* {console.log(company, "company")} */}
    </>
  );
}
