"use client";

import React from 'react';
import { useEffect, useRef } from "react";
import cytoscape from 'cytoscape';

type AttestationNode = {
    id: string;
    label: string;
    type: 'project' | 'projectAttester' | 'attesterAttester';
};

type AttestationEdge = {
    source: string;
    target: string;
    score: number;
};

interface AttestationsGraphProps {
    nodes: AttestationNode[];
    edges: AttestationEdge[];
}

const AttestationsGraph: React.FC<AttestationsGraphProps> = ({ nodes, edges }) => {
    const cyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cyRef.current) {
            const cy = cytoscape({
                container: cyRef.current,
                elements: [
                    ...nodes.map(node => ({ data: { id: node.id, label: node.label, type: node.type } })),
                    ...edges.map(edge => ({
                        data: {
                            source: edge.source,
                            target: edge.target,
                            label: `Score: ${edge.score}`,
                            score: edge.score // Add score here to use it in styling
                        }
                    }))
                ],
                style: [
                    {
                        selector: 'node[type = "project"]',
                        style: {
                            'background-color': '#0074D9', // Color for project nodes
                            'label': 'data(label)',
                            'text-valign': 'center',
                            'text-halign': 'center',
                            'text-outline-width': 0,
                            'text-outline-color': '#11479e',
                            'color': '#fff', // Make sure this is a contrasting color to your 'text-outline-color'
                            'font-size': '16px', // Increase font size for better readability
                            'text-margin-y': 10, // Adjust based on your preference
                            'text-background-opacity': 1, // Add a background to the text for better visibility
                            'text-background-shape': 'roundrectangle', // This can be 'rectangle', 'roundrectangle' etc.
                           // Adjust padding to ensure the background covers enough space around the text
                            'width': '80px',
                            'height': '80px',
                        }
                    },
                    {
                        selector: 'node[type = "projectAttester"]',
                        style: {
                            'background-color': '#FF4136', // Color for projectAttester nodes
                            'label': 'data(label)',
                            'text-valign': 'center',
                            'text-halign': 'center',
                            'text-outline-width': 0,
                            'text-outline-color': '#11479e',
                            'color': '#fff', // Make sure this is a contrasting color to your 'text-outline-color'
                            'font-size': '16px', // Increase font size for better readability
                            'text-margin-y': 10, // Adjust based on your preference
                            'text-background-opacity': 1, // Add a background to the text for better visibility
                            'text-background-shape': 'roundrectangle', // This can be 'rectangle', 'roundrectangle' etc.
                            // Adjust padding to ensure the background covers enough space around the text
                            'width': '60px',
                            'height': '60px',
                        }
                    },
                    {
                        selector: 'node[type = "attesterAttester"]',
                        style: {
                            'background-color': '#2ECC40', // Color for attesterAttester nodes
                            'label': 'data(label)',
                            'text-valign': 'center',
                            'text-halign': 'center',
                            'text-outline-width': 0,
                            'text-outline-color': '#11479e',
                            'color': '#fff', // Make sure this is a contrasting color to your 'text-outline-color'
                            'font-size': '16px', // Increase font size for better readability
                            'text-margin-y': 10, // Adjust based on your preference
                            'text-background-opacity': 1, // Add a background to the text for better visibility
                            'text-background-shape': 'roundrectangle', // This can be 'rectangle', 'roundrectangle' etc.
                         // Adjust padding to ensure the background covers enough space around the text
                            'width': '60px',
                            'height': '60px',
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'width': 'data(score)', // This will set the width of the edge based on its score
                            'line-color': '#9dbaea',
                            'target-arrow-color': '#9dbaea',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier',
                            'label': 'data(label)',
                            'text-rotation': 'autorotate',
                            'text-margin-x': 3,
                            'text-margin-y': 5,
                            'color': '#fff',
                            'font-size': '14px',
                            'text-outline-width': 2,
                            'text-outline-color': '#000',
                            // If you want a minimum width and only increase from there, use a function
                            // 'width': 'mapData(score, 1, 10, 2, 20)' // Example: Map score from 1-10 to width from 2-20
                        }
                    }
                ],
                layout: {
                    name: 'cose',
                    idealEdgeLength: 100,
                    nodeOverlap: 20,
                    refresh: 20,
                    fit: true,
                    padding: 50,
                    randomize: false,
                    componentSpacing: 100,
                    nodeRepulsion: 400000,
                    edgeElasticity: 100,
                    nestingFactor: 5,
                } as cytoscape.LayoutOptions,
            });

            return () => { cy.destroy(); };
        }
    }, [nodes, edges]);

    // Legend addition
    const Legend = () => (
        <div style={{ position: 'absolute', top: '10px', left: '10px', padding: '10px', borderRadius: '10px' }}>
            <div><span style={{ backgroundColor: '#0074D9', width: '30px', height: '30px', display: 'inline-block', marginRight: '5px' }}></span> Project</div>
            <div><span style={{ backgroundColor: '#FF4136', width: '30px', height: '30px', display: 'inline-block', marginRight: '5px' }}></span> Attestor</div>
             <div><span style={{ backgroundColor: '#2ECC40', width: '30px', height: '30px', display: 'inline-block', marginRight: '5px' }}></span> Certifier</div>
         </div>
    );

    return (
        <div style={{ position: 'relative', width: '100%', height: '700px' }}>
            <div ref={cyRef} style={{ width: '100%', height: '100%' }} />
            <Legend />
        </div>
    );
};

export default AttestationsGraph;