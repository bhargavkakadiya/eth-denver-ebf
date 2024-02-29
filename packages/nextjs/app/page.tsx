"use client";

import Bubble from "../components/Bubble";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 w-full h-full">
        <Bubble />
      </div>
    </>
  );
};

export default Home;
