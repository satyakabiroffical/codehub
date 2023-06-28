import { CircularProgress } from "@mui/material";
import Card from "components/category/categoryCard";
import ProductArray from "Context/Contex";
import { ProductContext } from "Context/Contex";
import React from "react";
import { useEffect } from "react";
import style from "./landing.module.css";
const Categories = () => {
  const prodData = ProductContext(ProductArray);
  const categorys = prodData.category;
  const Loading = prodData.isLoading;
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div style={{ width: "100%", minHeight: "100vh", height: "auto" }}>
      <div className="d-flex flex-wrap justify-content-center align-items-center text-center my-2">
        <span
          className={style.heading}
          style={{ textAlign: "center", padding: "0.6rem" }}
        >
          Explore Our Diverse Range of Code Offerings Our Categories
        </span>
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
          // <Category categorys={categorys} />
          categorys &&
          categorys.length > 0 &&
          categorys.map((data, index) => <Card value={data} key={index} />)
        )}
      </div>
    </div>
  );
};

export default Categories;
