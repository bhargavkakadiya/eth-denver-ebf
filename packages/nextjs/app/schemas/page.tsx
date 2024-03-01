"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextInput from "../../components/scaffold-eth/Input/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { VeraxSdk } from '@verax-attestation-registry/verax-sdk'
import { getPublicClient } from '@wagmi/core'
import { useAccount } from "wagmi";
import { waitForTransaction } from '@wagmi/core'
import { Address, Hex, createPublicClient, decodeEventLog, http, parseAbi } from "viem";


export default function Home() {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const methods = useForm();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  const { address, isConnected } = useAccount({
  });

  const onSubmit = async (formData) => {
    if (!isConnected || !address) {
        setErrorMessage('Please connect your wallet.');
        return;
    }

    console.log("Form data submitted", formData);
    const schemaString = formData.schemaString; // Assuming this is a string like "(string username, string teamname, uint16 points, bool active)"

    // Assuming VeraxSdk is initialized and connected properly
    const sdkConf = VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND;
    const veraxSdk = new VeraxSdk(sdkConf, address);

    try {
        const schemaId = await veraxSdk.schema.getIdFromSchemaString(schemaString);
        try {
            const alreadyExists = await veraxSdk.schema.getSchema(schemaId);
            setErrorMessage('Schema already exists');
            return; // Stop the execution if schema already exists
        } catch (schemaError) {
            // If the schema does not exist, create a new schema
            console.log('Schema does not exist, creating new schema.');
            const txHash = await veraxSdk.schema.create(
                formData.name, // Name of the schema
                formData.description, // Schema description
                formData.context, // Schema context
                schemaString, // The actual schema string
            );
            console.log("Schema creation initiated, transaction hash:", txHash);

            // Wait for the transaction to be confirmed
            try {
                const receipt = await waitForTransactionReceipt(getPublicClient(), { hash: txHash });
                console.log("Transaction confirmed, receipt:", receipt);
                setConfirmationMessage('Schema has been successfully created.'); // Set confirmation message
                setErrorMessage(''); // Clear any previous error message
                // Redirect or further actions after successful schema creation
            } catch (confirmationError) {
                console.error("Error waiting for transaction:", confirmationError);
                setErrorMessage('Transaction failed to confirm.');
            }
        }
    } catch (error) {
        console.error("Error in schema creation process:", error);
        setErrorMessage(error.message || 'An unknown error occurred');
    }
};

return (
  <div className="container mx-auto px-4 py-8">
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-lg mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" style={{ backgroundColor: "#212638", color: "white" }}>
        <TextInput name="name" label="Schema Name" type="text" />
        <TextInput name="description" label="Description" type="text" />
        <TextInput name="context" label="Context URL" type="text" />
        <TextInput name="schemaString" label="Schema String" type="text" placeholder="(string username, string teamname, uint16 points, bool active)" />
        {confirmationMessage && <div className="text-green-500 mb-4">{confirmationMessage}</div>}
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <div className="flex justify-center">
          <button className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1" type="submit" disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Create Schema</>}
          </button>
        </div>
      </form>
    </FormProvider>
  </div>
);
}