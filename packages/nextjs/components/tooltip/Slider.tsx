"use client";

import * as React from "react";
import Slider from "@mui/material/Slider";

type SxPropProps = {
  value: number;
  setSelectedValue: (value: number) => void; // Ensuring setSelectedValue is a function that accepts a number
};

const SxProp: React.FC<SxPropProps> = ({ value, setSelectedValue }) => {
  return (
    <Slider
    value={value}
    defaultValue={30}
    onChange={(event, newValue) => {
      // Material-UI Slider uses a different pattern for the onChange event
      setSelectedValue(newValue as number); // Casting newValue to number to ensure type safety
    }}
    sx={{
      width: 500, // Assuming this is a custom style and 'sx' prop is supported by your Slider component
      color: "success.main", // This also assumes 'color' supports such value
    }}
  />
  );
}

export default SxProp;

