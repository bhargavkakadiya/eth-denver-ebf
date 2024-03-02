import React from "react";
import dynamic from "next/dynamic";

const Bubble = dynamic(() => import("../components/Bubble"), { ssr: false });

const Home = () => {
  return (
    <div className="flex items-center flex-col flex-grow pt-10 w-full h-full">
      <Bubble />
    </div>
  );
};

export default Home;
