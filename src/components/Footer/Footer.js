import { Box, Typography, useMediaQuery } from "@mui/material";
import LabelBottomNavigation from "components/BottomBar/OneNew";
import ProductArray from "Context/Contex";
import { ProductContext } from "Context/Contex";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

import style from "./footer.module.css";

function Copyright() {
  return (
    <Typography variant="body2" color="#fff">
      {"© Sk CodeHub Brand of Satya Kabir E-solutions Private Limited "}
      {new Date().getFullYear()}

      {"."}
    </Typography>
  );
}

export default function Footer() {
  const matches = useMediaQuery(" (max-width:870px)");
  const data = ProductContext(ProductArray);
  const policy = data.policy;
  const categorys = data.category.slice(0, 8);
  const getCategoryData = data.getCategoryData;
  const setCategoriesId = data.setCategoriesId;
  const getPolicyDetails = data.getPolicyDetails;
  const company = data.company;
  const getCompany = data.getCompany;
  useEffect(() => {
    getCategoryData();
    getCompany();
    getPolicyDetails();
  }, []);
  // console.log(policy, "company");
  const [emailAdd, setEmailAdd] = useState("");
  return (
    <>
      {matches ? (
        <LabelBottomNavigation />
      ) : (
        <footer className="footer">
          <Container>
            <Row>
              <Col md="6">
                <h2 className="title">
                  Get updates on your
                  <br /> favourite web And Apps •
                </h2>
                <div className={style.search}>
                  <input
                    className={style.searchInput2}
                    type={"email"}
                    placeholder="Email address"
                    value={emailAdd}
                    onChange={(e) => {
                      setEmailAdd(e.target.value);
                    }}
                  />
                  <img
                    className={style.arrow}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      if (emailAdd !== "") {
                        setEmailAdd("");
                        toast.success("Email send successfully", {
                          position: "top-center",
                          autoClose: true,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "colored",
                        });
                      }
                    }}
                    src={require("assets/img/Group 2000.png")}
                    alt="....."
                  />
                </div>
              </Col>
              <Col md="2">
                <Nav>
                  <NavItem>
                    <h5 className="title">License</h5>
                  </NavItem>

                  {policy &&
                    policy.length > 0 &&
                    policy.map((value, index) => (
                      <NavItem key={index}>
                        <NavLink
                          to={`/page/${value?.name}/${value._id}`}
                          tag={Link}
                        >
                          {value.name}
                        </NavLink>
                      </NavItem>
                    ))}
                  <NavItem>
                    <NavLink to={"/contactUs-page"} tag={Link}>
                      Contact-Us
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink to='/policy-page' tag={Link}>
                      Privacy Policy
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to='/refundPolicy-page' tag={Link}>
                      Refund Policy
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to='/support-page' tag={Link}>
                      Support
                    </NavLink>
                  </NavItem> */}
                </Nav>
              </Col>
              <Col md="2">
                <Nav>
                  <NavItem>
                    <h5 className="title">More Category</h5>
                  </NavItem>
                  {categorys &&
                    categorys.length > 0 &&
                    categorys.slice(0, 4).map((value, index) => (
                      <NavItem key={index}>
                        <NavLink
                          to={`/filter-page`}
                          tag={Link}
                          onClick={() => setCategoriesId(value._id)}
                        >
                          {value.name}
                        </NavLink>
                      </NavItem>
                    ))}
                </Nav>
              </Col>

              <Col md="2">
                <h3 className="title">Follow us:</h3>
                <div className="btn-wrapper profile">
                  {/* <Button
                    className="btn-icon btn-neutral btn-round btn-simple"
                    color="default"
                    to="/"
                    id="tooltip622135962"
                    target="_blank"
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip622135962">
                    Follow us
                  </UncontrolledTooltip>
                  <Button 
                    className="btn-icon btn-neutral btn-round btn-simple"
                    color="default"
                    to={`${company?.facebookLink}`}
                    id="tooltip230450801"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-square" />
                  </Button>

                  <UncontrolledTooltip delay={0} target="tooltip230450801">
                    Like us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-neutral btn-round btn-simple"
                    color="default"
                    to="/"
                    id="tooltip318450378"
                    target="_blank"
                  >
                    <i className="fab fa-linkdin" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip318450378">
                    Follow us
                  </UncontrolledTooltip> */}
                  <a
                    href={`${company?.facebookLink}`}
                    target={"_blank"}
                    id={"tooltip622135962"}
                  >
                    <img
                      src={require("./png/003-facebook.png")}
                      alt=".."
                      style={{
                        width: "30px ",
                        height: "30px",
                        objectFit: "contain",
                        borderRadius: "50%",
                        margin: "0.3rem",
                      }}
                    />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip622135962">
                    facebookLink
                  </UncontrolledTooltip>
                  <a
                    href={`${company?.whatsappLink}`}
                    target={"_blank"}
                    id={"tooltip622135961232"}
                  >
                    <img
                      src={require("./png/whatsapp.png")}
                      alt=".."
                      style={{
                        width: "30px ",
                        height: "30px",
                        objectFit: "contain",
                        borderRadius: "50%",
                        margin: "0.3rem",
                      }}
                    />
                  </a>
                  <UncontrolledTooltip delay={0} target="tooltip622135961232">
                    whatsappLink
                  </UncontrolledTooltip>
                  <a
                    href={`${company?.linkedinLink}`}
                    target={"_blank"}
                    id={"tooltip622135961232123"}
                  >
                    <img
                      src={require("./png/002-linkedin.png")}
                      alt=".."
                      style={{
                        width: "30px ",
                        height: "30px",
                        objectFit: "contain",
                        borderRadius: "50%",
                        margin: "0.3rem",
                      }}
                    />
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip622135961232123"
                  >
                    linkedinLink
                  </UncontrolledTooltip>
                  <a
                    href={`${company?.twitterLink}`}
                    target={"_blank"}
                    id={"tooltip6221359612321237777"}
                  >
                    <img
                      src={require("./png/inst.png")}
                      alt=".."
                      style={{
                        width: "30px ",
                        height: "30px",
                        objectFit: "contain",
                        borderRadius: "50%",
                        margin: "0.3rem",
                      }}
                    />
                  </a>
                  <UncontrolledTooltip
                    delay={0}
                    target="tooltip6221359612321237777"
                  >
                    Instagram Link
                  </UncontrolledTooltip>
                </div>
              </Col>
            </Row>
            <Box
              component="footer"
              sx={{
                py: 3,
                px: 2,
                mb: "5rem",
              }}
            >
              <Copyright />
            </Box>
          </Container>
        </footer>
      )}
    </>
  );
}
