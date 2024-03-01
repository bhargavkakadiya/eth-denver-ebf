"use client";

import React, { use, useEffect, useRef, useState } from "react";
import BubbleUI from "../components/Bubble/BubbleElement";
import ChildComponent from "./ChildComponent";
import Modal from "./Modal";
import "./myComponent.css";
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

  const { address, isConnected } = useAccount({});

  const [childElements, setChildElements] = useState([]);

  const { data: userData } = useScaffoldContractRead({
    contractName: "EBF",
    functionName: "getAllProjects",
  });

  useEffect(() => {
    setChildElements(userData as any);
  }, [userData]);

  const circleRef = useRef(null); // Reference to the circle element
  const [modelDetails, setModelDetails] = useState({} as any);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div ref={circleRef}>
      <BubbleUI options={options} className="myBubbleUI">
        {childElements.map((child: { projectName: string; tags: string[] }, index) => (
          <ChildComponent
            key={index}
            name={child.projectName}
            circleRef={circleRef}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setModelDetails={setModelDetails}
         child={child}

          />
        ))}
      </BubbleUI>

      <div style={{ backdropFilter: "blur(5px)" }}>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={modelDetails.name}
          data={Array.from({ length: 6 })}
        />
      </div>
    </div>
  );
}
