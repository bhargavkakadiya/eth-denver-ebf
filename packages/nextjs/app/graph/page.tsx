"use client";

import AttestationsGraph from './AttestationGraph'; // Adjust the import path as necessary
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

const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash); // Return positive values
};

// This is a mock structure, replace it with your actual fetching and parsing logic
const fetchDataAndCreateGraphData = async (veraxSdk) => {
    const GRAPHQL_URL = 'https://api.goldsky.com/api/public/project_clqghnrbp9nx201wtgylv8748/subgraphs/verax/subgraph-testnet/gn';
    const subject = '0xb68093bb89f26a807626f5757db7246d6d2c6d59';
    const schemaIds = ['0x569544812f876efa5b99dcc531c9e6af8ce9aae2731a4f28b3e04fa5771a22c3', '0x5214e29f9b3422dcb0e835acf629e90157b5ed54986de0ded15cbdce3a1cad3d'];
    const schemaDataMapper = veraxSdk.schema;
    const nodes = [];
    const edges = [];
    const attesterSet = new Set();

    for (const schemaId of schemaIds) {
        const mySchema = await schemaDataMapper.findOneById(schemaId);
        let query;
        if (schemaId === '0x569544812f876efa5b99dcc531c9e6af8ce9aae2731a4f28b3e04fa5771a22c3') {
            query = `
            {
              attestations(where: { subject: "${subject}", schemaId: "${schemaId}", revoked: false }) {
                id
                attestationData
                schemaString
                attester
              }
            }`;
        } else {
            query = `
            {
              attestations(where: { schemaId: "${schemaId}", revoked: false }) {
                id
                attestationData
                schemaString
                attester
                subject
              }
            }`;
        }

        const response = await fetch(GRAPHQL_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });

        const responseData = await response.json();
        console.log('schemaId ', schemaId, 'responseData ', responseData)
        if (responseData.data && responseData.data.attestations.length > 0) {
            responseData.data.attestations.forEach((attestation) => {
                const decodedData = veraxSdk.utils.decode(mySchema.schema, attestation.attestationData);
                const projectNodeId = `${decodedData[0].tokenID}`;
                
                const attesterNodeId = `${attestation.attester}`;
                const attesterattesterSubjectID = `${attestation.subject}`;

                // Add project node
                

                if (schemaId === '0x569544812f876efa5b99dcc531c9e6af8ce9aae2731a4f28b3e04fa5771a22c3') {
                    console.log('attesterNodeId', attesterNodeId)
                    if (!attesterSet.has(projectNodeId)) {
                        nodes.push({ id: projectNodeId, label: `Project ${decodedData[0].tokenID}`, type: 'project' });
                        attesterSet.add(projectNodeId);
                    }
                    if (!attesterSet.has(attesterNodeId)) {
                        nodes.push({ id: attesterNodeId, label: `Impact Attester ${attesterNodeId}`, type: 'projectAttester' });
                        attesterSet.add(attesterNodeId);
                    }
                    edges.push({ source: attesterNodeId, target: projectNodeId, score: decodedData[0].score });
                } else {
                    if (attesterattesterSubjectID != attesterNodeId) {
                    if (!attesterSet.has(attesterattesterSubjectID)) {
                        nodes.push({ id: attesterattesterSubjectID, label: `Impact Attestor ${attesterattesterSubjectID}`, type: 'projectAttester' });
                        attesterSet.add(attesterattesterSubjectID);
                    }

                    const existingNodeIndex = nodes.findIndex(node => node.id === attesterNodeId);

                    if (existingNodeIndex !== -1) {
                        // Node exists, update its type
                        nodes[existingNodeIndex].type = 'attesterAttester';
                        nodes[existingNodeIndex].label = `Attester Certifier ${attesterNodeId}`;
                    } else {
                        // Node does not exist, add new node
                        nodes.push({ id: attesterNodeId, label: `Attester Certifier ${attesterNodeId}`, type: 'attesterAttester' });
                        attesterSet.add(attesterNodeId);
                    }

                    edges.push({ source: attesterNodeId, target: attesterattesterSubjectID, score: decodedData[0].EBFAttesterScore });
                }
                }
                

                
            });
        }
    }

    return { nodes, edges };
};
  


  const TestGraph = () => {
    const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
    const { address, isConnected } = useAccount();
        const sdkConf = VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND;
        const veraxSdk = new VeraxSdk(sdkConf, address);

    useEffect(() => {
        const subject = '0xb68093bb89f26a807626f5757db7246d6d2c6d59';
        const schemaId = '0x569544812f876efa5b99dcc531c9e6af8ce9aae2731a4f28b3e04fa5771a22c3';
        fetchDataAndCreateGraphData(veraxSdk).then(data => {
            setGraphData(data);
        });
    }, []); // Add your dependencies

    return (
        <div>
            <h1>Attestations Graph</h1>
            <AttestationsGraph nodes={graphData.nodes} edges={graphData.edges} />
        </div>
    );
};

export default TestGraph;