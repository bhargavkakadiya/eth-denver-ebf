import React from "react";
import Image from "next/image";

const Carbon = ({width,height}:{width:number,height:number}) => {
  return (
    <div>
      <Image
      width={width} height={height}
        src="https://img.icons8.com/external-bartama-outline-64-bartama-graphic/64/ffffff/external-carbon-pollution-outline-bartama-outline-64-bartama-graphic.png"
        alt="external-carbon-pollution-outline-bartama-outline-64-bartama-graphic"
      />
    </div>
  );
};

export default Carbon;
