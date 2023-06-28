import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";

import Typography from "@mui/material/Typography";
import { Box, Button, CardMedia, ListItemButton } from "@mui/material";

import { HiDocumentArrowDown } from "react-icons/hi2";
import DvrIcon from "@mui/icons-material/Dvr";
import { Link } from "react-router-dom";
export default function ListCard({ data, isShow }) {
  console.log(data);
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          // bgcolor: "#1f2251",
          background: `radial-gradient(ellipse at top, #292D61 30%, #171941 60%)`,
          boxShadow: "0 1px 20px 0 rgb(0 0 0 / 10%)",
          p: 1,
          m: 1,
        }}
      >
        <ListItem
          alignItems="flex-start"
          sx={{
            flexDirection: { sm: "column", xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              borderRadius: "2%",
              width: "100%",
              maxWidth: { xs: "100%", md: 360 },
              mr: 1,
              boxShadow: "0 1px 20px 0 rgb(0 0 0 / 10%)",
              mb: { sm: 1, md: 0 },
            }}
          >
            <img
              src={
                data?.thumbnail
                  ? `${process.env.REACT_APP_URI}${data?.thumbnail}`
                  : `${process.env.REACT_APP_URI}${data?.file[0]}`
              }
              onError={(e) => {
                e.onerror = null;
                e.target.src = require("../../assets/img/landing-page.png");
              }}
              alt="Product image"
              style={{ height: "100%", width: "100%" }}
            />
          </Box>

          <ListItemText
            sx={{
              ml: { sm: 0, md: 4 },
              mb: { sm: 1, md: 0 },
            }}
          >
            <Typography component="h3" variant="h4">
              {data?.title}
            </Typography>

            <Typography
              // sx={{ display: 'inline' }}
              component="h6"
              variant="h6"
            >
              by {data?.seller}
            </Typography>

            <Typography
              // sx={{ display: 'inline' }}
              component="h6"
              variant="body2"
            >
              type : {data?.type}
            </Typography>
            {data?.features &&
              data?.features.slice(0, 4).map((elm, index) => (
                <Typography
                  key={index}
                  // sx={{ display: 'inline' }}
                  component="h6"
                  variant="body2"
                >
                  {elm}
                </Typography>
              ))}
          </ListItemText>

          <ListItemButton sx={{ flexDirection: "column" }}>
            <Typography sx={{ mb: 2 }} component="h6" variant="body2">
              price : ₹{data?.price}
            </Typography>
            <Typography sx={{ mb: 2 }} component="h6" variant="body2">
              Last updated:{" "}
              {new Date(data?.updatedAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            {/* 
            <Buttoc
              style={{
                border: "1px solid var(--color-themeS)",
                backgroundColor: " #2c1250",
                boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                width: "7rem",
                height: "2.5rem",
                fontSize: "0.7rem",
                Padding: "0.5rem",
              }}
              variant="contained"
              tag={Link}
              onClick={() => window.open(`${data?.zipFile}`)}

            >
              <HiDocumentArrowDown
                style={{ fontSize: "1.5rem", color: "#fff" }}
              />
            </Buttoc> */}

            {isShow?.transactionId !== null ? (
              <Button
                onClick={() => {
                  window.open(
                    `${process.env.REACT_APP_URI}${data?.zipFile[0]}`
                  );
                  // console.log(items?.zipFile[0]);
                }}
                style={{
                  border: "1px solid var(--color-themeS)",
                  backgroundColor: " #2c1250",
                  boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                  width: "7rem",
                  height: "2.5rem",
                  fontSize: "0.7rem",
                  Padding: "0.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HiDocumentArrowDown
                  style={{ fontSize: "1.5rem", color: "#fff" }}
                />
              </Button>
            ) : null}
            {/* <Button
              style={{
                border: "1px solid var(--color-themeS)",
                backgroundColor: " #2c1250",
                boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                width: "7rem",
                height: "2.5rem",
                fontSize: "0.7rem",
                Padding: "0.5rem",
              }}
              variant="contained"
              tag={Link}
              onClick={() => window.open(`${data?.zipFile}`)}
              
            >
              <HiDocumentArrowDown
                style={{ fontSize: "1.5rem", color: "#fff" }}
              />
            </Button> */}
            <Button
              variant="contained"
              tag={Link}
              onClick={() => window.open(`${data?.livePreview}`)}
              style={{
                border: "1px solid var(--color-themeS)",
                backgroundColor: " #2c1250",
                boxShadow: "0 -2px 10px rgba(0, 0, 0, 1)",
                width: "7rem",
                height: "2.5rem",
                fontSize: "0.7rem",
                Padding: "0.5rem",
                marginTop: "0.6rem",
                color: "#fff",
              }}
            >
              <DvrIcon />
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
