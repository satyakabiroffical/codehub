import { useMediaQuery } from "@mui/material";
import ProductArray from "Context/Contex";
import { ProductContext } from "Context/Contex";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

export default function Examples({ value }) {
  const id = ProductContext(ProductArray);
  const setTechnologyId = id.setTechnologyId;
  const navigate = useNavigate();
  const matches = useMediaQuery(" (max-width:870px)");
  return (
    <>
      <div
        className="card m-3"
        style={{ width: `${matches ? "100%" : "25rem"}`, height: "100%" }}
      >
        <div
          style={{
            width: `${matches ? "100%" : "25rem"}`,
            height: "15rem",
            position: "relative",
          }}
        >
          <div
            onClick={() => {
              setTechnologyId(value._id);
              navigate(`/filter-page`);
            }}
            style={{ cursor: "pointer" }}
          >
            <img
              alt="..."
              className="img-raised"
              src={value?.image}
              onError={(e) =>
                (e.target.src = require("assets/img/landing-page.png"))
              }
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: `${matches ? "1%" : "15px"}`,
              right: `${matches ? "1%" : "30px"}`,
              color: "white",
              fontSize: `${matches ? "12px" : "18px"}`,
              fontWeight: "700",
              backgroundColor: "GrayText",
              padding: "0.3rem",
              border: "5px solid GrayText",
              borderRadius: "10px",
            }}
          >
            {value?.name}
          </div>
          <Button
            className="btn-simple btn-round"
            color="primary"
            onClick={() => {
              setTechnologyId(value._id);
              navigate("/filter-page");
            }}
            style={{ position: "absolute", bottom: "5px", left: "13px" }}
          >
            View Technology
          </Button>
        </div>
      </div>
    </>
  );
}
