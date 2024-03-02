import React from "react";
import Image from "next/image";

const Equity = ({ width, height }: { width: number; height: number }) => {
  return (
    <div>
      <Image
        width={width}
        height={height}
        src="https://img.icons8.com/external-icongeek26-outline-icongeek26/64/ffffff/external-equity-crowdfunding-icongeek26-outline-icongeek26.png"
        alt="external-equity-crowdfunding-icongeek26-outline-icongeek26"
      />
    </div>
  );
};

export default Equity;
