import React from "react";
import Image from "next/image";

const Forest = ({width,height}:{width:number,height:number}) => {
  return (
    <div>
      <Image width={width} height={height} src="https://img.icons8.com/wired/64/ffffff/forest.png" alt="forest" />
    </div>
  );
};
export default Forest;
