import { CircularProgress } from "@mui/material";
import React from "react";
import Card from "./categoryCard";
const index = ({ categorys }) => {
  return (
    <>
      {categorys && categorys.length ? (
        categorys.map((value, index) => <Card value={value} key={index} />)
      ) : (
        <CircularProgress color="info" value={40} />
      )}
    </>
  );
};

export default index;
