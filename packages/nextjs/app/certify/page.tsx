"use client";

import React, { useEffect, useState } from "react";
import TextInput from "../../components/scaffold-eth/Input/TextInput";
import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import { getPublicClient } from "@wagmi/core";
import { FormProvider, useForm } from "react-hook-form";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [isIssuing, setIsIssuing] = useState(false);
  const attesterAttestationFormMethods = useForm(); // Explicitly type the state to either be null or an instance of VeraxSdk
  const [veraxSdk, setVeraxSdk] = useState<VeraxSdk | null>(null);

  const handleIssueAttesterAttestation = async (formData: any) => {
    if (!isConnected || !address) {
      return;
    }
    setIsIssuing(true);

    try {
      console.log(formData.attestationAddress);
      console.log(formData.score);

      if (veraxSdk) {
        const txHash = await veraxSdk.portal.attest(
          "0xF11ef82AC622114370B89e119f932D7ff6BFF78A", // This should be your portalId
          {
            schemaId: "0x5214e29f9b3422dcb0e835acf629e90157b5ed54986de0ded15cbdce3a1cad3d", // Correctly place schemaId here
            expirationDate: Math.floor(Date.now() / 1000) + 2592000, // 30 days from now
            subject: formData.attestationAddress,
            attestationData: [{ EBFAttesterScore: parseInt(formData.score) }], // Rename 'address' to 'userAddress' or similar
          },
          [], // Additional options if any
        );
        const transactionHash = txHash.transactionHash;
        const receipt = await waitForTransactionReceipt(getPublicClient(), { hash: transactionHash as `0x` });
        const attestationID = receipt.logs[0].topics[1];
        const attestation = await veraxSdk.attestation.getAttestation(attestationID as `0x`);
        console.log(attestation);
        // Continue with your existing logic...
      }
    } catch (error) {
      console.error("Error issuing attestation:", error);
    } finally {
      setIsIssuing(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && address) {
      const sdkConf = VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND;
      const VeraxSdkInstance = new VeraxSdk(sdkConf, address);
      setVeraxSdk(VeraxSdkInstance);
    }
  }, [address]);

  return (
    <div className="container mx-auto px-4 py-8">
      <FormProvider {...attesterAttestationFormMethods}>
        <form
          onSubmit={attesterAttestationFormMethods.handleSubmit(handleIssueAttesterAttestation)}
          className="max-w-lg mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          style={{ backgroundColor: "#212638", color: "white" }}
        >
          <TextInput
            label="User Address"
            type="text"
            {...attesterAttestationFormMethods.register("attestationAddress")}
            placeholder="User's Ethereum address"
          />
          <TextInput
            label="Score"
            type="number"
            {...attesterAttestationFormMethods.register("score")}
            placeholder="Score value"
          />
          <div className="flex justify-center">
            <button
              className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1"
              type="submit"
              disabled={isIssuing}
            >
              {isIssuing ? "Issuing..." : "Attest to Attestor"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
