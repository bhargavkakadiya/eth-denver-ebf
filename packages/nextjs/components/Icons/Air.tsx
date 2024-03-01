import React from "react";
import Image from "next/image";

const Air = ({width,height}:{width:number,height:number}) => {
  return (
    <div>
      <Image width={width} height={height} src="https://img.icons8.com/ios/50/air-element.png" alt="air-element" />
    </div>
  );
};

export default Air;
