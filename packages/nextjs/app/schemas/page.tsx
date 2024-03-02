"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "../../components/scaffold-eth/Input/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { VeraxSdk } from '@verax-attestation-registry/verax-sdk';
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "viem/actions";
import { getAccount, getEnsName, getPublicClient } from '@wagmi/core'
import {  useEffect } from "react";


export default function Home() {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [portalConfirmationMessage, setPortalConfirmationMessage] = useState('');
  const [issueConfirmationMessage, setIssueConfirmationMessage] = useState('');
  const [isPortalCreating, setIsPortalCreating] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);

  //to query attestations
  const [attestations, setAttestations] = useState([]);
  
  const schemaFormMethods = useForm();
  const attestationFormMethods = useForm();
  const router = useRouter();

  const { address, isConnected } = useAccount();

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "EBF",
    functionName: "createSchema", // Ensure your contract has this function or adjust accordingly
    args: ["", "", ""], // Update based on your contract's requirements
    value: BigInt(0),
    onBlockConfirmation: () => {
      router.push("/"); // Forward to the correct page
    },
  });

  const sdkConf = VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND;
  const veraxSdk = new VeraxSdk(sdkConf, address);

  const onSubmitSchema = async (formData) => {
    if (!isConnected || !address) {
        setErrorMessage('Please connect your wallet.');
        return;
    }

    console.log("Form data submitted", formData);
    const schemaString = formData.schemaString; // Assuming this is a string like "(string username, string teamname, uint16 points, bool active)"


    try {
        const schemaId = await veraxSdk.schema.getIdFromSchemaString(schemaString);
        try {
            const alreadyExists = await veraxSdk.schema.getSchema(schemaId);
            setErrorMessage('Schema ' + schemaId +  ' already exists');
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
            const transactionHash = txHash.transactionHash;
            console.log("Schema creation initiated, transaction hash:", transactionHash);

            // Wait for the transaction to be confirmed
            try {
              const receipt = await waitForTransactionReceipt(getPublicClient(), { hash: transactionHash });
                console.log("Transaction confirmed, receipt:", receipt);
                setConfirmationMessage('Schema ' + schemaId + ' has been successfully created.'); // Set confirmation message
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

const handleCreatePortal = async () => {
  if (!isConnected || !address) {
      setErrorMessage('Please connect your wallet to create a portal.');
      return;
  }

  setIsPortalCreating(true);
  setErrorMessage(''); // Clear previous errors

  try {
      const txHash = await veraxSdk.portal.deployDefaultPortal(
          [], // List of modules, empty in this case
          "Tutorial Portal", // Example name, replace with form data if needed
          "This Portal is used for the tutorial", // Example description
          true, // Assuming revocable is true
          "Verax Tutorial" // Example owner name
      );
      const transactionHash = txHash.transactionHash;
console.log("Extracted transaction hash:", transactionHash);

// Now use transactionHash instead of txHash for the waitForTransactionReceipt call
const receipt = await waitForTransactionReceipt(getPublicClient(), { hash: transactionHash });
      // Wait for the transaction to be confirmed
      // Assuming you have an ethers provider initialized

     const decodedLogs = decodeEventLog({
        abi: parseAbi(["event PortalRegistered(string name, string description, address portalAddress)"]),
        data: receipt.logs[0].data,
        topics: receipt.logs[0].topics,
     });
     const portalId = decodedLogs.args.portalAddress;
      console.log("Portal transaction confirmed, receipt:", receipt);
      console.log('portalId ', portalId)

  } catch (error) {
      console.error("Error creating portal:", error);
      setErrorMessage(error.message || 'An unknown error occurred while creating the portal.');
  } finally {
      setIsPortalCreating(false);
  }
};

const handleIssueAttestation = async (formData) => {
  if (!isConnected || !address) {
      setErrorMessage('Please connect your wallet to issue an attestation.');
      return;
  }

  setIsIssuing(true);
  setErrorMessage(''); // Clear previous errors

  try {
    console.log(formData.attestationAddress)
    console.log(formData.score)
    console.log(formData.impactType)


      const txHash = await veraxSdk.portal.attest(
          '0xF11ef82AC622114370B89e119f932D7ff6BFF78A', // This should be your portalId
          {
              schemaId: '0x569544812f876efa5b99dcc531c9e6af8ce9aae2731a4f28b3e04fa5771a22c3', // Correctly place schemaId here
              expirationDate: Math.floor(Date.now() / 1000) + 2592000, // 30 days from now
              subject: formData.attestationAddress,
              attestationData: [{tokenID: parseInt(formData.projectID), impactType: formData.impactType, score: parseInt(formData.score) }], // Rename 'address' to 'userAddress' or similar
          },
          [], // Additional options if any
      );
      const transactionHash = txHash.transactionHash;
      const receipt = await waitForTransactionReceipt(getPublicClient(), { hash: transactionHash });
     const attestationID = receipt.logs[0].topics[1];
     const attestation = await veraxSdk.attestation.getAttestation(attestationID);
     console.log(attestation)
      // Continue with your existing logic...
  } catch (error) {
      console.error("Error issuing attestation:", error);
      setErrorMessage(error.message || 'An unknown error occurred while issuing the attestation.');
  } finally {
      setIsIssuing(false);
  }
};


const fetchAttestations = async () => {
  const GRAPHQL_URL = 'https://api.thegraph.com/subgraphs/name/Consensys/linea-attestation-registry';

  const query = `
    {
      attestations(
        where: {
          subject: "0x6B93CC473ceC4A394413a8a97B31f9F8ea535708",
          schemaId: "0x569544812f876efa5b99dcc531c9e6af8ce9aae2731a4f28b3e04fa5771a22c3",
          revoked: false
        }
      ) {
        id
        attestationData
        decodedData
        schemaString
      }
    }`;

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const responseData = await response.json();
    setAttestations(responseData.data.attestations);
  } catch (error) {
    console.error('Error querying The Graph:', error);
    setErrorMessage('Error fetching attestations.');
  }
};


useEffect(() => {
  fetchAttestations();
}, []);


return (
  <div className="container mx-auto px-4 py-8">
    {/* Schema Creation Form */}
    <FormProvider {...schemaFormMethods}>
      <h2 className="text-lg font-semibold mb-4">Create Schema</h2>
      <form onSubmit={schemaFormMethods.handleSubmit(onSubmitSchema)} className="max-w-lg mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" style={{ backgroundColor: "#212638", color: "white" }}>
        <TextInput name="name" label="Schema Name" type="text" />
        <TextInput name="description" label="Description" type="text" />
        <TextInput name="context" label="Context URL" type="text" />
        <TextInput name="schemaString" label="Schema String" type="text" placeholder="(string username, string teamname, uint16 points, bool active)" />
        {confirmationMessage && <div className="text-green-500 mb-4">{confirmationMessage}</div>}
        <div className="flex justify-center">
          <button className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1" type="submit" disabled={isLoading}>
            {isLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Create Schema'}
          </button>
        </div>
      </form>
    </FormProvider>
    
    {/* Portal Creation Button */}
    <h2 className="text-lg font-semibold mb-4">Add Portal</h2>
    <div className="flex justify-center space-x-4 mb-8">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full m-1" onClick={handleCreatePortal} disabled={isPortalCreating}>
          {isPortalCreating ? 'Creating Portal...' : 'Add Portal'}
      </button>
    </div>
    {portalConfirmationMessage && <div className="text-green-500 mb-4">{portalConfirmationMessage}</div>}

    {/* Attestation Issuance Form */}
    <FormProvider {...attestationFormMethods}>
      <h2 className="text-lg font-semibold mb-4">Issue Attestation</h2>
      <form onSubmit={attestationFormMethods.handleSubmit(handleIssueAttestation)} className="max-w-lg mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" style={{ backgroundColor: "#212638", color: "white" }}>
          <TextInput name="attestationAddress" label="User Address" type="text" {...attestationFormMethods.register("attestationAddress")} placeholder="User's Ethereum address" />
          <TextInput name="projectID" label="Project ID" type="text" {...attestationFormMethods.register("projectID")} placeholder="Project ID" />
          <TextInput name="impactType" label="Impact Type" type="text" {...attestationFormMethods.register("impactType")} placeholder="Impact Type" />
          <TextInput name="score" label="Score" type="number" {...attestationFormMethods.register("score")} placeholder="Score value" />
          <div className="flex justify-center">
              <button className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1" type="submit" disabled={isIssuing}>
                  {isIssuing ? 'Issuing...' : 'Issue Attestation'}
              </button>
          </div>
      </form>
    </FormProvider>
    {issueConfirmationMessage && <div className="text-green-500 mb-4">{issueConfirmationMessage}</div>}
    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}


    <div className="attestations">
  <h2 className="text-lg font-semibold mb-4">Attestations</h2>
  {attestations.length > 0 ? (
    <div className="attestation-list">
      {attestations.map((attestation, index) => (
        <div key={index} className="attestation-item mb-4 p-4 shadow-md rounded-lg bg-white">
          <div><strong>ID:</strong> {attestation.id}</div>
          <div><strong>Data:</strong> {attestation.attestationData}</div>
          <div><strong>Decoded Data:</strong> {attestation.decodedData}</div>
          <div><strong>Schema String:</strong> {attestation.schemaString}</div>
        </div>
      ))}
    </div>
  ) : (
    <div>No attestations found.</div>
  )}
</div>
  </div>
);
}
