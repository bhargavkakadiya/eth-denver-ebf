"use client";

// Assuming you have this component
import { useEffect, useState } from "react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { verifyMessage } from "ethers";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useSignMessage } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { address, isConnected } = useAccount({
    onDisconnect() {
      setNonce("");
      setPassportScore(0);
    },
  });

  const [isMounted, setIsMounted] = useState(false);
  const [nonce, setNonce] = useState("");
  const [passportScore, setPassportScore] = useState(0);

  const { data: userData } = useScaffoldContractRead({
    contractName: "EBF",
    functionName: "users",
    args: [address],
  });

  const { signMessage } = useSignMessage({
    async onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data);

      const submitResponse = await fetch(`/api/gtc-passport/submit-passport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: address, // Required: The user's address you'd like to score.
          community: process.env.NEXT_PUBLIC_SCORER_ID, // Required: get this from one of your scorers in the Scorer API dashboard https://scorer.gitcoin.co/
          signature: data, // Optional: The signature of the message returned in step #1
          nonce: nonce, // Optional: The nonce returned in Step #1
        }),
      });
      const submitResponseData = await submitResponse.json();

      const scoreResponseCall = await fetch(`/api/gtc-passport/fetch-score?address=${address}`);
      const scoreResponse = await scoreResponseCall.json();
      // Make sure to check the status
      if (scoreResponse.status === "ERROR" || scoreResponse.error !== null) {
        setPassportScore(0);
        alert(scoreResponse.error);
        return;
      }

      // Store the user's passport score for later use.
      setPassportScore(scoreResponse.score || 0);
    },
  });

  // Refactor fetching logic for better error handling
  useEffect(() => {
    const fetchPassportScore = async () => {
      try {
        const scorerMessageResponseCall = await fetch(`/api/gtc-passport/sign-message`);
        if (!scorerMessageResponseCall.ok) {
          throw new Error("Failed to fetch scorer message");
        }
        const scorerMessageResponse = await scorerMessageResponseCall.json();
        setNonce(scorerMessageResponse.nonce);
        signMessage({ message: scorerMessageResponse.message });
      } catch (error) {
        console.error("Failed to fetch passport score:", error);
        // Handle the error appropriately in your application context
      }
    };

    if (address) {
      fetchPassportScore();
    }
  }, [address, signMessage]);

  // This isMounted check is needed to prevent hydration errors with next.js server side rendering.
  // See https://github.com/wagmi-dev/wagmi/issues/542 for more details.

  function renderContent() {
    if (isMounted && address) {
      if (!router.isFallback && !userData) {
        return <ErrorPage statusCode={404} />;
      }
      return (
        <div className="flex items-center flex-col flex-grow pt-10">
          {isConnected && userData && (
            <div className="bg-gray-200 p-4">
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
      );
    } else {
      return <div>Connect your wallet to see your profile</div>;
    }
  }

  return <>{renderContent()}</>;
};

export default Home;
