import React from "react";
import Image from "next/image";
const Soil = ({width,height}:{width:number,height:number}) => {
  return (
    <div>
      <Image width={width} height={height} src="https://img.icons8.com/dotty/80/soil.png" alt="soil" />
    </div>
  );
};

export default Soil;
