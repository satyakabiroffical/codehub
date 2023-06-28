import ProductArray from "Context/Contex";
import { ProductContext } from "Context/Contex";
import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ value, rate }) => {
  const id = ProductContext(ProductArray);
  const setCategoriesId = id.setCategoriesId;
  const setTypeName = id.setTypeName;

  const navigate = useNavigate();
  return (
    <div className="card m-3" style={{ width: `${rate ? "15rem " : "18rem"}` }}>
      <div
        style={{
          width: `${rate ? "100% " : "100%"}`,
          height: `${rate ? "7rem" : "10rem"}`,
        }}
      >
        <img
          src={value?.image}
          style={{ width: "100%", height: "100%" }}
          onError={(e) =>
            (e.target.src = require("assets/img/websiteDefaults.jpg"))
          }
          className="card-img-top"
          alt="..."
        />
      </div>
      <button
        onClick={() => {
          if (rate) {
            setTypeName(value?._id);
            navigate("/filter-page");
          } else {
            setCategoriesId(value?._id);
            navigate("/filter-page");
          }
        }}
        style={{
          padding: "10px",
          position: "absolute",
          top: `${rate ? "45%" : "56%"}`,
          fontSize: `${rate ? "13px" : "11px"}`,
          left: `${rate ? "22%" : "50%"}`,
          border: "1px solid",
          background: "#2C1250",
        }}
        className="btn btn-primary"
      >
        {rate ? "View This Types" : "View This Category"}
      </button>
      <div className="card-body">
        <div className="d-flex justify-content-center align-items-center">
          <h6
            className="card-title"
            style={{ fontSize: `${rate ? "15px" : "20px"}` }}
          >
            {rate ? value?.name : value?.name}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Card;
