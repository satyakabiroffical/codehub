import ProductArray from "Context/Contex";
import { ProductContext } from "Context/Contex";
import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const MetaTags = () => {
  const prodData = ProductContext(ProductArray);
  const metatage = prodData.metatage;
  const metaId = prodData.metaId;
  const location = useLocation();

  return (
    <div className="application">
      {location.pathname === `/product-page/${metaId}` ? (
        <Helmet>
          {/* {console.log("lkadhngkjvakjfg")} */}
          <meta charSet="utf-8" />
          <meta
            name="keywords"
            content={`${metatage?.tag?.map(
              (data) => data
            )} ${metatage?.technologyId?.map((data) => data?.name)}`}
          ></meta>
          <meta
            name="description"
            content={`${metatage?.tag?.map(
              (data) => data
            )} ${metatage?.technologyId?.map((data) => data?.name)}`}
          ></meta>
          <title>{metatage?.title}</title>
        </Helmet>
      ) : (
        <Helmet>
          {/* {console.log("lkadhngkjvakjfg")} */}
          <meta charSet="utf-8" />
          <title>CodeHub</title>
        </Helmet>
      )}
    </div>
  );
};

export default MetaTags;
