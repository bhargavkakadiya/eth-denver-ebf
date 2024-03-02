"use client";

// Assuming you have this component
import { useContext, useEffect, useState } from "react";
import { verifyMessage } from "ethers";
import { useAccount } from "wagmi";
import { useSignMessage } from "wagmi";
import UserContext from "~~/components/Contexts/UserContext";
import { MyCreatedProjects } from "~~/components/MyCreatedProjects";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home = () => {
  const { user, setUser } = useContext<any>(UserContext);
  const { address, isConnected } = useAccount({});

  const [checkScore, setCheckScore] = useState(true);
  const [nonce, setNonce] = useState("");
  const [passportScore, setPassportScore] = useState(0);

  const { data: userData } = useScaffoldContractRead({
    contractName: "EBF",
    functionName: "users",
    args: [address],
  });

  // const { signMessage } = useSignMessage({
  //   async onSuccess(data, variables) {
  //     // Verify signature when sign message succeeds
  //     const address = verifyMessage(variables.message, data);

  //     const submitResponse = await fetch(`/api/gtc-passport/submit-passport`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         address: address, // Required: The user's address you'd like to score.
  //         community: process.env.NEXT_PUBLIC_SCORER_ID, // Required: get this from one of your scorers in the Scorer API dashboard https://scorer.gitcoin.co/
  //         signature: data, // Optional: The signature of the message returned in step #1
  //         nonce: nonce, // Optional: The nonce returned in Step #1
  //       }),
  //     });
  //     const submitResponseData = await submitResponse.json();

  //     const scoreResponseCall = await fetch(`/api/gtc-passport/fetch-score?address=${address}`);
  //     const scoreResponse = await scoreResponseCall.json();
  //     // Make sure to check the status
  //     if (scoreResponse.status === "ERROR" || scoreResponse.error !== null) {
  //       setPassportScore(0);
  //       alert(scoreResponse.error);
  //       return;
  //     }

  //     // Store the user's passport score for later use.
  //     // setPassportScore(scoreResponse.score || 0);
  //     // setUser(scoreResponse.score || 0);
  //     // setCheckScore(false);
  //   },
  // });

  // const fetchPassportScore = async () => {
  //   try {

  //     const scorerMessageResponseCall = await fetch(`/api/gtc-passport/sign-message`);

  //     if (!scorerMessageResponseCall.ok) {
  //       throw new Error("Failed to fetch scorer message");
  //     }
  //     const scorerMessageResponse = await scorerMessageResponseCall.json();
  //     setNonce(scorerMessageResponse.nonce);
  //     signMessage({ message: scorerMessageResponse.message });
  //   } catch (error) {
  //     console.error("Failed to fetch passport score:", error);
  //     // Handle the error appropriately in your application context
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     setPassportScore(user);
  //     setCheckScore(false);
  //     return;
  //   } else {
  //     fetchPassportScore();
  //   }
  // }, []);
  return (
    <>
      {address ? (
        <div>
          <div className="container mx-auto py-8 my-auto" style={{ backgroundColor: "#212638", color: "white" }}>
            {isConnected && userData && (
              <div className=" max-w-lg mx-auto px-20 pt-6 pb-8 mb-4 relative flex-col items-center   p-10 justify-center align-middle">
                <h1 className="text-2xl font-bold">Player Info </h1>
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
                      <div className="mb-2">
                        <h4 className="mb-1">
                          <strong>Passport Score:</strong> {passportScore}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="m-20">
            <MyCreatedProjects address={address} />
          </div>
        </div>
      ) : (
        <div>Connect your wallet to see your profile</div>
      )}
    </>
  );
};

export default Home;
