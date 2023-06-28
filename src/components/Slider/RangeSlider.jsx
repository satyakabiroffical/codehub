import React from "react";
import { Slider } from "@mui/material";

const RangeSlider = ({ setRange, range }) => {
  const changeValue = (event, value) => {
    setRange(value);
  };

  const getText = (valu) => `${range}`;
  const customMarks = [
    {
      value: 1000,
      label: "₹1k",
    },
    {
      value: 3000,
      label: "₹3k",
    },
    {
      value: 5000,
      label: "₹5k",
    },
    {
      value: 7500,
      label: "₹7.5k",
    },
    {
      value: 10000,
      label: "₹10k",
    },
  ];
  return (
    <>
      <span>Price : {range}</span>
      <Slider
        style={{ width: 250 }}
        min={1000}
        max={10000}
        step={1000}
        value={range}
        marks={customMarks}
        onChange={changeValue}
        valueLabelDisplay="auto"
        getAriaValueText={getText}
      />
    </>
  );
};

export default RangeSlider;
