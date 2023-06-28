import * as React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdDeleteSweep,
  MdOutlinePlayForWork,
  MdOutlineStar,
  MdSmartDisplay,
} from "react-icons/md";
import axios from "axios";
import { ProductContext } from "Context/Contex";
import ProductArray from "Context/Contex";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function CartCard({ data }) {
  const update = ProductContext(ProductArray);
  const setCartItems = update.getCartItems;

  const handleClick = (url) => {
    const userId = localStorage.getItem("id");

    axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}/removeCartProduct/${userId}/${url}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        // console.log(response);
        setCartItems(userId);
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
        // console.log(error)
        // alert(error.response.data.message);
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
  };
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/product-page/${data._id}`)}
      sx={{ width: 400, height: "100%" }}
      style={{
        backgroundColor: "var( --color-theme2)",
        color: "var( --color-main)",
        marginBottom: "0.9rem",
        marginLeft: "0.3rem",
        border: "1px solid var( --color-theme3)",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          width="100%"
          image={data?.file[0]}
          alt={data.file[0]}
          onError={(e) =>
            (e.target.src = require("assets/img/websiteDefaults.jpg"))
          }
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            bgcolor: "rgba(0, 0, 0, 0.84)",
            color: "white",
            padding: "0.3rem",
            alignItems: "center",
            justifyContent: "space-evenly",
            display: "flex",
          }}
        >
          <CardActions
            disableSpacing
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Tooltip title="Live Preview" placement="bottom" arrow>
              <IconButton
                aria-label="Live Preview"
                onClick={() => window.open(data?.livePreview)}
                style={{ color: "var( --color-main)", margin: "0 0.5rem" }}
              >
                <MdSmartDisplay />
              </IconButton>
            </Tooltip>

            <IconButton
              aria-label="ratting"
              style={{ color: "var( --color-main)", margin: "0 0.5rem" }}
            >
              <MdOutlineStar />
              <Typography variant="body2">{data.rating}</Typography>
            </IconButton>

            <Tooltip title="Delete" placement="bottom" arrow>
              <IconButton
                aria-label="Delete"
                onClick={() => handleClick(data._id)}
                style={{
                  color: "var( --color-main)",
                  margin: "0 0.5rem",
                }}
              >
                <MdDeleteSweep />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Box>
      </Box>
      <CardContent>
        <Typography variant="h6">{data.title}</Typography>
        <Typography variant="body2">Price : ₹ {data.price}</Typography>
      </CardContent>
    </Card>
  );
}
