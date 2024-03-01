import React from "react";
import Image from "next/image";

const Water = ({width,height}:{width:number,height:number}) => {
  return (
    <div>
      <Image width={width} height={height} src="https://img.icons8.com/ios/50/water.png" alt="water" />
    </div>
  );
};

export default Water;
