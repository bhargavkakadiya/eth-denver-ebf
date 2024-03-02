import React from "react";
import Image from "next/image";

const Air = ({width,height}:{width:number,height:number,color:"white"}) => {
  return (
    <div>
      <Image width={width} height={height} src="https://img.icons8.com/ios/50/ffffff/air-element.png" alt="air-element" />
    </div>
  );
};

export default Air;
