"use client";

import React from "react";
// Ensure correct import from MUI
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

type SxPropProps = {
  value: number;
  setSelectedValue: (value: number) => void; // Ensuring setSelectedValue is a function that accepts a number
};

const SxProp: React.FC<SxPropProps> = ({ value, setSelectedValue }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", boxSizing: "border-box" }}
    >
      <Typography gutterBottom>Value: {value}</Typography>
      <Slider
        value={value}
        onChange={(event, newValue) => {
          setSelectedValue(newValue as number);
        }}
        defaultValue={3}
        aria-labelledby="input-slider"
        min={0}
        max={10}
        sx={{
          width: 300,
          color: "success.main",
        }}
      />
    </Box>
  );
};

export default SxProp;
