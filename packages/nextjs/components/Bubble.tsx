"use client";

import React, { use, useEffect, useRef, useState } from "react";
import BubbleUI from "../components/Bubble/BubbleElement";
import ChildComponent from "./ChildComponent";
import Modal from "./Modal";
import "./myComponent.css";
import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import "react-bubble-ui/dist/index.css";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export default function Bubble() {
  const options = {
    size: 330,
    minSize: 40,
    gutter: 30,
    provideProps: true,
    numCols: 6,
    fringeWidth: 140,
    yRadius: 150,
    xRadius: 300,
    cornerRadius: 150,
    showGuides: false,
    compact: true,
    gravitation: 5,
  };
  const { address, isConnected } = useAccount();
  const sdkConf = VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND;
  const veraxSdk = new VeraxSdk(sdkConf, address);
  const [attestations, setAttestations] = useState([] as any);
  function decodeAttestationData(encodedData: any) {
    try {
   

      const decodedData = veraxSdk.utils.decode("(uint256 tokenID, string impactType, uint256 score)", encodedData);
      return decodedData;
    } catch (error) {
      console.error("Decoding error:", error);
      return null; // or return an empty structure, depending on your needs
    }
  }
  const fetchAttestations = async (subject: string, schemaId: string) => {
    const GRAPHQL_URL =
      "https://api.goldsky.com/api/public/project_clqghnrbp9nx201wtgylv8748/subgraphs/verax/subgraph-testnet/gn";

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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const responseData = await response.json();

      if (responseData.data && responseData.data.attestations.length > 0) {
        const newAttestations = responseData.data.attestations.map((attestation: { attestationData: any }) => {
          const decodedData = decodeAttestationData(attestation.attestationData) as {
            tokenID: string;
            impactType: string;
            score: string;
          }[]; // Add type assertion here
          if (!decodedData) return attestation;


          return {
            ...attestation,
            tokenID: decodedData[0].tokenID,
            impactType: decodedData[0].impactType,
            score: decodedData[0].score,
          };
        });

       

        function groupByProperty(array: any, property: any) {
          return array.reduce((accumulator: any, item: any) => {
            const key = item[property];
            if (!accumulator[key]) {
              accumulator[key] = [];
            }
            accumulator[key].push(item);
            return accumulator;
          }, {});
        }

        const groupedData = groupByProperty(newAttestations, "tokenID");
      
        setAttestations(groupedData);
      }

      if (responseData.errors) {
        // Check if there is also data despite the errors
      } else {
        // If there's no data and no errors
      }
    } catch (error) {
      console.error("Error querying The Graph:", error);
    }
  };

  const [childElements, setChildElements] = useState([]);

  const { data: userData } = useScaffoldContractRead({
    contractName: "EBF",
    functionName: "getAllProjects",
  });

  const circleRef = useRef(null); // Reference to the circle element
  const [modelDetails, setModelDetails] = useState({} as any);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userData) {
   

      fetchAttestations(
        "0xb68093bb89f26a807626f5757db7246D6d2c6d59", // TODO update the contract address
        "0x569544812f876efa5b99dcc531c9e6af8ce9aae2731a4f28b3e04fa5771a22c3",
      );
    }
    setChildElements(userData as any);
  }, [userData]);
  return (
    <div ref={circleRef}>
      <BubbleUI options={options} className="myBubbleUI">
        {childElements?.map((child: {
          id: any; projectName: string; tags: string[] 
}, index) => {
       const childAttestations= attestations[child.id] || [];
   
          return (
            
              <ChildComponent
                key={index}
                name={child.projectName}
                circleRef={circleRef}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setModelDetails={setModelDetails}
                child={child}
                attestations={childAttestations}
              />
            
          );
        })}
      </BubbleUI>

      <div style={{ backdropFilter: "blur(5px)" }}>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modelDetails.projectName}
          data={Array.from({ length: 6 })}
          id={modelDetails.id}
          attestations={modelDetails.attestations}
        />
      </div>
    </div>
  );
}
