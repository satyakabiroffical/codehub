import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";

import { CardMedia, InputBase, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AccountMenu from "components/menu";
import { Link,  useNavigate } from "react-router-dom";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import { useState } from "react";
import { useEffect } from "react";

function ResponsiveAppBar() {
  const [isSearch, setIsSearch] = React.useState("");

  const nav = ProductContext(ProductArray);
  const setSearch = nav.setSearch;
  const company = nav.company;
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width:870px)");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(isSearch);
      navigate(`/filter-page`);
     
    }
  };


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

  const [isShow, setIsShow] = useState(false);
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#171941" }}
      style={{
       
        transitionDuration: "800ms",
        // opacity: `${visible ? "1" : "0"}`,
        top: `${visible ? "0" : "-15%"}`,
      }}
    >
      {!matches ? (
        <Container
          maxWidth="xl"
          style={{ padding: `${matches ? "0 0.3rem" : "0 3rem"}` }}
        >
          <Toolbar disableGutters>
            {/* <Box
              style={{
                width: "10rem",

                height: "100%",
                padding: "0.6rem",
              }}
              sx={{ display: "flex" }}
            > */}
            <Link to="/" style={{ width: "10rem", objectFit: "contain" }}>
              <CardMedia
                component="img"
                height={50}
                sx={{ objectFit: "contain" }}
                image={company?.companyLogo}
                alt="Logo"
                onError={(e) =>
                  (e.target.src = require("assets/img/codehubLogo.png"))
                }
              />
            </Link>
            {/* </Box> */}

            <Box
              sx={{
                width: "52%",
                transitionDuration: "500ms",
                height: "2.5rem",
                marginLeft: { xs: "0", md: "5rem" },
                marginRight: { xs: "0", md: "5rem" },
                display: { xs: "none", md: "flex" },
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "  rgba(235, 234, 234, 0.3)",
                color: "#8a8888",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: " 0px 29px 56px rgb(106 53 159 / 51%)",
                borderRadius: "12px",
              }}
            >
              <InputBase
                sx={{ width: "80%", pl: 4 }}
                style={{
                  color: "#fff",
                  display: `${!isShow && matches ? "none" : "block"}`,
                }}
                placeholder="search website , apps and many more ..</>"
                inputProps={{ "aria-label": "search google maps" }}
                value={isSearch}
                onChange={(e) => setIsSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <SearchIcon />
            </Box>

            <AccountMenu />
          </Toolbar>
        </Container>
      ) : (
        <Container
          maxWidth="xl"
          style={{ padding: `${matches ? "0 0.3rem" : "0 3rem"}` }}
        >
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              style={{ width: "8rem", height: "100%" }}
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <CardMedia
                component="img"
                image={company?.companyLogo}
                onError={(e) =>
                  (e.target.src = require("assets/img/codehubLogo.png"))
                }
                alt="Logo"
                height={50}
                sx={{ objectFit: "contain" }}
              />
            </Box>
            <Box
              sx={{
                width: "52%",
                transitionDuration: "500ms",
                height: "2.5rem",
                // marginLeft: { xs: "0", md: "5rem" },
                // marginRight: { xs: "0", md: "5rem" },
                display: `${isShow ? "flex" : "none"}`,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "  rgba(235, 234, 234, 0.3)",
                color: "#8a8888",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: " 0px 29px 56px rgb(106 53 159 / 51%)",
                borderRadius: "12px",
              }}
            >
              <InputBase
                sx={{ width: "80%", pl: 4 }}
                style={{
                  color: "#fff",
                  display: `${!isShow && matches ? "none" : "block"}`,
                }}
                placeholder="search website , apps and many more ..</>"
                inputProps={{ "aria-label": "search google maps" }}
                value={isSearch}
                onChange={(e) => setIsSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SearchIcon
                onClick={() => {
                  if (matches) {
                    setIsShow(!isShow);
                  }
                }}
              />
              <AccountMenu />
            </Box>
          </Toolbar>
        </Container>
      )}
    </AppBar>
  );
}
export default ResponsiveAppBar;
