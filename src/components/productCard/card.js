import { useMediaQuery } from "@mui/material";
import axios from "axios";
import ProductArray from "Context/Contex";
import { ProductContext } from "Context/Contex";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Card = ({ value, filter }) => {
  const matches = useMediaQuery("(max-width:600px)");
  const matches1 = useMediaQuery("(max-width:300px)");
  const drowerCart = ProductContext(ProductArray);
  const setState = drowerCart.setState;

  const setGetCartItems = drowerCart.getCartItems;
  // console.log(value, "kgkjhkjh");
  const handleClickCart = async (url) => {
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
  };

  // console.log(value);
  return (
    <>
      <div
        className="card m-3"
        style={{ width: `${matches ? "80%" : "18rem"}` }}
      >
        <div
          style={{ width: `${matches ? "100%" : "18rem"}`, height: "10.5rem" }}
        >
          {!filter ? (
            <Link to={`/product-page/${value._id}`}>
              <img
                src={`${process.env.REACT_APP_URI}${value?.thumbnail}`}
                onError={(e) =>
                  (e.target.src = require("assets/img/websiteDefaults.jpg"))
                }
                style={{ width: "100%", height: "100%" }}
                className="card-img-top"
                alt="..."
              />
            </Link>
          ) : (
            <Link onClick={() => setState(true)}>
              <img
                src={`${process.env.REACT_APP_URI}/${
                  value?.file && value?.file.length && value?.file[0]
                }`}
                onError={(e) =>
                  (e.target.src = require("assets/img/websiteDefaults.jpg"))
                }
                style={{ width: "100%", height: "100%" }}
                className="card-img-top"
                alt="..."
              />
            </Link>
          )}
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title text-capital">{value?.title} </h5>
            <h4 className="card-title">₹ {value.price}</h4>
          </div>
          <p className="card-text">Some quick example card's content.</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex justify-content-between align-items-start">
              <img
                width={matches1 ? 15 : 20}
                height={matches1 ? 15 : 20}
                src={require("assets/img/favouriteo.png")}
                alt="..."
              />{" "}
              <p className="ml-1 card-title">{value.rating} /5</p>
            </div>
            {!filter ? (
              <Link
                to={`/product-page/${value._id}`}
                style={{ padding: "10px" }}
                className="btn btn-primary"
              >
                Buy Now
              </Link>
            ) : (
              <Link
                onClick={() => {
                  handleClickCart(value._id);
                  setState(true);
                }}
                style={{ padding: "10px" }}
                className="btn btn-primary"
              >
                Cart
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
