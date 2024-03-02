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
import { ethers } from 'ethers';
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";



export default function Home() {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [portalConfirmationMessage, setPortalConfirmationMessage] = useState('');
  const [issueConfirmationMessage, setIssueConfirmationMessage] = useState('');
  const [isPortalCreating, setIsPortalCreating] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [subject, setSubject] = useState('');
const [schemaId, setSchemaId] = useState('');
const queryAttestationFormMethods = useForm();


  //to query attestations
  const [attestations, setAttestations] = useState([]);
  
  const schemaFormMethods = useForm();
  const attestationFormMethods = useForm();
  const attesterAttestationFormMethods = useForm();
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

const handleIssueAttesterAttestation = async (formData) => {
  if (!isConnected || !address) {
      setErrorMessage('Please connect your wallet to issue an attestation.');
      return;
  }

  setIsIssuing(true);
  setErrorMessage(''); // Clear previous errors

  try {
    console.log(formData.attestationAddress)
    console.log(formData.score)


      const txHash = await veraxSdk.portal.attest(
          '0xF11ef82AC622114370B89e119f932D7ff6BFF78A', // This should be your portalId
          {
              schemaId: '0x5214e29f9b3422dcb0e835acf629e90157b5ed54986de0ded15cbdce3a1cad3d', // Correctly place schemaId here
              expirationDate: Math.floor(Date.now() / 1000) + 2592000, // 30 days from now
              subject: formData.attestationAddress,
              attestationData: [{EBFAttesterScore: parseInt(formData.score) }], // Rename 'address' to 'userAddress' or similar
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


const fetchAttestations = async (subject, schemaId) => {
  const schemaDataMapper = veraxSdk.schema;
const mySchema = await schemaDataMapper.findOneById(schemaId);
console.log(mySchema.schema)
const GRAPHQL_URL = 'https://api.goldsky.com/api/public/project_clqghnrbp9nx201wtgylv8748/subgraphs/verax/subgraph-testnet/gn';
console.log(subject)
console.log(schemaId)
const query = `
{
  attestations(
    where: {
      subject: "${subject}",
      schemaId: "${schemaId}",
      revoked: false
    }
  ) {
    id
    attestationData
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

// Check if there are errors
if (responseData.errors) {
  console.error('GraphQL Errors:', responseData.errors);
  // Check if there is also data despite the errors
  if (responseData.data && responseData.data.attestations.length > 0) {
    console.log(responseData.data.attestations)
    const newAttestations = responseData.data.attestations.map(attestation => {
      const decodedData = veraxSdk.utils.decode(mySchema.schema, attestation.attestationData);
      return {
        ...attestation,
        decodedData, // Add the decoded data into each attestation object
      };
    });
    console.log('newAttestations', newAttestations)
    setAttestations(newAttestations);
    setErrorMessage('Partial data fetched with some GraphQL errors.');
  } else {
    console.log('GraphQL errors occurred with no data returned.');
  }
} else if (responseData.data && responseData.data.attestations.length > 0) {
  // If there's data and no errors
  console.log(responseData.data.attestations)
  const newAttestations = responseData.data.attestations.map(attestation => {
    const decodedData = veraxSdk.utils.decode(mySchema.schema, attestation.attestationData);
    return {
      ...attestation,
      decodedData, // Add the decoded data into each attestation object
    };
  });
  console.log(newAttestations)
/*   newAttestations.forEach((attestation, index) => {
    if (attestation.decodedData && attestation.decodedData.length > 0) {
        attestation.decodedData.forEach((decoded) => {
            console.log(`Attestation ${index + 1} Token ID:`, decoded.tokenID.toString());
        });
    }
}); */
  setAttestations(newAttestations);
} else {
  // If there's no data and no errors
  setErrorMessage('No attestations found.');
}
} catch (error) {
console.error('Error querying The Graph:', error);
setErrorMessage('Error fetching attestations.');
}
};




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
      <h2 className="text-lg font-semibold mb-4">Issue Project Attestation</h2>
      <form onSubmit={attestationFormMethods.handleSubmit(handleIssueAttestation)} className="max-w-lg mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" style={{ backgroundColor: "#212638", color: "white" }}>
          <TextInput name="attestationAddress" label="EBF Contract Address" type="text" {...attestationFormMethods.register("attestationAddress")} placeholder="Smart Contract address" />
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


    <FormProvider {...attesterAttestationFormMethods}>
  <h2 className="text-lg font-semibold mb-4">Issue Attester Attestation</h2>
  <form onSubmit={attesterAttestationFormMethods.handleSubmit(handleIssueAttesterAttestation)} className="max-w-lg mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" style={{ backgroundColor: "#212638", color: "white" }}>
      <TextInput name="attestationAddress" label="User Address" type="text" {...attesterAttestationFormMethods.register("attestationAddress")} placeholder="User's Ethereum address" />
      <TextInput name="score" label="Score" type="number" {...attesterAttestationFormMethods.register("score")} placeholder="Score value" />
      <div className="flex justify-center">
          <button className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1" type="submit" disabled={isIssuing}>
              {isIssuing ? 'Issuing...' : 'Issue Attestation'}
          </button>
      </div>
  </form>
</FormProvider>
    {issueConfirmationMessage && <div className="text-green-500 mb-4">{issueConfirmationMessage}</div>}
    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

    <FormProvider {...queryAttestationFormMethods}>
  <h2 className="text-lg font-semibold mb-4">Query Attestations</h2>
  <form className="max-w-lg mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" style={{ backgroundColor: "#212638", color: "white" }}
        onSubmit={queryAttestationFormMethods.handleSubmit((data) => {
          fetchAttestations(data.subject, data.schemaId);
        })}>
    <TextInput name="subject" label="Subject Address" {...queryAttestationFormMethods.register("subject")} placeholder="User's Ethereum address" />
    <TextInput name="schemaId" label="Schema ID" {...queryAttestationFormMethods.register("schemaId")} placeholder="Schema ID" />
    <div className="flex justify-center">
        <button className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1" type="submit">
            Query Attestations
        </button>
    </div>
  </form>
</FormProvider>


<div>
  <h2 className="text-lg font-semibold mb-4">Decoded Attestations</h2>
  {attestations.length > 0 ? (
    <div>
      {attestations.map((attestation, index) => (
        <div key={index} className="mb-4 p-4 rounded-lg shadow-md">
          <h3 className="font-semibold">Attestation {index + 1}</h3>
          {attestation.decodedData?.map((data, dataIndex) => (
            <div key={dataIndex}>
              {Object.entries(data).map(([key, value]) => (
                <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value.toString()}</p>
              ))}
            </div>
          ))}
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