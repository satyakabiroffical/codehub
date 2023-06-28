import { CircularProgress } from "@mui/material";
import Cardo from "components/productCard/card";
import ProductArray from "Context/Contex";
import { ProductContext } from "Context/Contex";
import { useEffect } from "react";
import style from "./landing.module.css";
const WebsiteProducts = () => {
  const prodData = ProductContext(ProductArray);
  const websites = prodData.websites;
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
          Realized Projects by Codehub Community Newly Released website
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
          websites &&
          websites.length > 0 &&
          websites.map((value, index) => <Cardo value={value} key={index} />)
        )}
      </div>
    </div>
  );
};

export default WebsiteProducts;
