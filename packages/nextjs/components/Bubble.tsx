/* eslint-disable prettier/prettier */
// myComponent.js
"use client";

import React from "react";
import BubbleUI from "../components/Bubble/BubbleElement";
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

const ChildComponent = ({ name }: { name: any }) => {
  const smallerCircleSize = 80;
  const mainCircleDiameter = 320;
  const mainCircleRadius = mainCircleDiameter / 2;
  const smallerCircleRadius = smallerCircleSize / 2;

  const positioningRadius = mainCircleRadius - smallerCircleRadius - 20;

  return (
    <>
      <div className="relative bg-primary rounded-full w-80 h-80 flex items-center justify-center ">
        <p className="text-white text-sm z-10">{name}</p>
        {Array.from({ length: 6 }).map((_, index) => {
          const angle = (Math.PI / 3) * index;
          const position = {
            left: `calc(50% + ${positioningRadius * Math.cos(angle)}px)`,
            top: `calc(50% + ${positioningRadius * Math.sin(angle)}px)`,
          };
          return (
            <div
              key={index}
              className="absolute bg-secondary rounded-full"
              style={{
                ...position,
                width: `${smallerCircleSize}px`,
                height: `${smallerCircleSize}px`,
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

  return (
    <BubbleUI options={options} className="myBubbleUI">
      {childElements.map((child, index) => (
        <ChildComponent key={index} name={child.name} />
      ))}
    </BubbleUI>
  );
}
