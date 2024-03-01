"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextInput from "../../components/scaffold-eth/Input/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { VeraxSdk } from '@verax-attestation-registry/verax-sdk'
import { getAccount, getEnsName, getPublicClient } from '@wagmi/core'
import { useAccount } from "wagmi";
import { waitForTransactionReceipt, getClient } from '@wagmi/core'
import { Address, createPublicClient, http, parseAbi } from "viem";


export default function Home() {
  const methods = useForm();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  const { address, isConnected } = useAccount({
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setSelectedImage({
        imageFile: img,
        previewURL: URL.createObjectURL(img),
      });
    }
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "EBF",
    functionName: "createSchema", // Ensure your contract has this function or adjust accordingly
    args: ["", "", ""], // Update based on your contract's requirements
    value: BigInt(0),
    onBlockConfirmation: () => {
      router.push("/"); // Forward to the correct page
    },
  });

  const onSubmit = async (formData) => {
    console.log("Form data submitted", formData);
    const schemaString = `(string username, string teamname, uint16 points, bool active)`; // Example, replace with user inputs if needed

    // Assuming VeraxSdk is initialized and connected properly
		const sdkConf = VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND
    console.log(address)
		const veraxSdk = new VeraxSdk(sdkConf, address)
    /* try {
      const txHash = await veraxSdk.schema.create(
        formData.name, // Name of the schema
        formData.description, // Schema description
        formData.context, // Schema context
        schemaString, // The actual schema string
      );
      console.log("Schema created with transaction hash:", txHash);
      // Wait for transaction to be confirmed, then redirect or update UI
    } catch (error) {
      console.error("Error creating schema:", error);
    } */

    const schemaId = (await veraxSdk.schema.getIdFromSchemaString(
			schemaString,
		)) as Hex
		const alreadyExists = (await veraxSdk.schema.getSchema(schemaId)) as boolean
		console.log('schemaId', schemaId)
		console.log('alreadyExists', alreadyExists)


    const txHash2 = await veraxSdk.portal.deployDefaultPortal(
			[],
			'Tutorial Portal',
			'This Portal is used for the tutorial',
			true,
			'Verax Tutorial',
		)

    const receipt = await waitForTransactionReceipt(getPublicClient(), {
      hash: txHash2,
   });
   const decodedLogs = decodeEventLog({
      abi: parseAbi(["event PortalRegistered(string name, string description, address portalAddress)"]),
      data: receipt.logs[0].data,
      topics: receipt.logs[0].topics,
   });
   const portalId = decodedLogs.args.portalAddress;
   console.log(portalId)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-lg mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" style={{ backgroundColor: "#212638", color: "white" }}>
          <TextInput name="name" label="Schema Name" type="text" />
          <TextInput name="description" label="Description" type="text" />
          <TextInput name="context" label="Context URL" type="text" />
          <TextInput name="schemaString" label="Schema String" type="text" placeholder="(string username, string teamname, uint16 points, bool active)" />
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
