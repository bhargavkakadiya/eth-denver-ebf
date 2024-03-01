"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { data: userData } = useScaffoldContractRead({
    contractName: "EBF",
    functionName: "users",
    args: [address],
  });

  console.log(userData);

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      {isConnected && userData && (
        <div className="bg-white p-4">
          <h1 className="text-2xl font-bold">Player Info</h1>
          <div className="flex space-x-4">
            <div className="mb-1">
              <div className="mb-1">
                <div className="mb-2">
                  <h4 className="mb-1">
                    <strong>Name:</strong> {String(userData[1])}
                  </h4>
                </div>
                <div className="mb-2">
                  <h4 className="mb-1">
                    <strong>Hometown:</strong> {String(userData[2])}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
