import React from "react";
import Image from "next/image";

const Diversity = ({width,height}:{width:number,height:number}) => {
  return (
    <div>
      <Image
        width={width} height={height}
        src="https://img.icons8.com/external-outline-geotatah/64/external-biodiversity-ecological-interaction-outline-geotatah.png"
        alt="external-biodiversity-ecological-interaction-outline-geotatah"
      />
    </div>
  );
};

export default Diversity;
