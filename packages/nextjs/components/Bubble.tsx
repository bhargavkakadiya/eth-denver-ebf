/* eslint-disable prettier/prettier */
// myComponent.js
"use client";

import React, { useRef, useState } from "react";
import BubbleUI from "../components/Bubble/BubbleElement";
import Modal from "./Modal";
import "./myComponent.css";
import "react-bubble-ui/dist/index.css";

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

/* eslint-disable prettier/prettier */
// myComponent.js

const ChildComponent = ({
  name,
  circleRef,
  isModalOpen,
  setIsModalOpen,
  setModelDetails,
}: {
  name: any;
  circleRef: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  setModelDetails: any;
}) => {
  const smallerCircleSize = 80; // Size of the smaller circles
  const mainCircleDiameter = 320; // Diameter of the main circle
  const mainCircleRadius = mainCircleDiameter / 2; // Radius of the main circle
  const smallerCircleRadius = smallerCircleSize / 2; // Radius of the smaller circles

  const basePositioningRadius = mainCircleRadius - smallerCircleRadius - 20;

  const positioningRadius = basePositioningRadius;

  const insideCircleSize = smallerCircleSize;

  const openModal = () => {
    if (circleRef.current) {
      const circleBounds = circleRef.current.getBoundingClientRect();

      // Check if the circle meets the minimum size criteria (not too small)
      const meetsSizeCriteria = circleBounds.width >= 80 && circleBounds.height >= 80; // Minimum size criteria

      if (meetsSizeCriteria) {
        // Calculate modal position (to the right by default, or to the left if not enough space)

        if (isModalOpen) {
          setIsModalOpen(false);
        }
        setModelDetails({ name });
        setIsModalOpen(true);

        // const rect = event.target.getBoundingClientRect();

        // const xPosition = event.clientX - rect.left;
        // const yPosition = event.clientY - rect.top;
        // const position = { left: xPosition, top: yPosition };
      }
    }
  };

  return (
    <>
      <div
        className="relative accent-content rounded-full w-80 h-80 flex items-center justify-center transition-all duration-300 ease-in-out z-0"
        onClick={openModal}
      >
        <p className="text-white text-sm z-10">{name}</p>
        {Array.from({ length: 6 }).map((_, index) => {
          const angle = (Math.PI / 3) * index; // Distributing circles evenly 360/6 degrees apart
          const position = {
            left: `calc(50% + ${positioningRadius * Math.cos(angle)}px)`,
            top: `calc(50% + ${positioningRadius * Math.sin(angle)}px)`,
          };
          return (
            <div
              key={index}
              className="absolute bg-accent-content rounded-full transition-all duration-300 ease-in-out z-50"
              style={{
                ...position,
                width: `${insideCircleSize}px`,
                height: `${insideCircleSize}px`,
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
};
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

  const childElements = [
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    { name: "Bubble 1" },
    { name: "Bubble 2" },
    // Add more child elements as needed
  ];
  const circleRef = useRef(null); // Reference to the circle element
  const [modelDetails, setModelDetails] = useState({} as any);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div ref={circleRef}>
      <BubbleUI options={options} className="myBubbleUI">
        {childElements.map((child, index) => (
          <ChildComponent
            key={index}
            name={child.name}
            circleRef={circleRef}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setModelDetails={setModelDetails}
          />
        ))}
      </BubbleUI>

<div style={{backdropFilter: "blur(5px)"}}>
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
