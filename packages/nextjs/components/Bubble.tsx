// myComponent.js
"use client";

import React from "react";
import BubbleUI from "../components/Bubble/BubbleElement";
import "./myComponent.css";
import "react-bubble-ui/dist/index.css";

// myComponent.js

function ChildComponent({ name }: { name: any }) {
  return (
    <div className="relative bg-primary rounded-full w-80 h-80 flex items-center justify-center">
      <p className="text-white text-lg">{name}</p>
      {/* Array to create 6 smaller circles */}
      {Array.from({ length: 6 }).map((_, index) => {
        // Calculate angle in radians for each circle (60 degrees apart)
        const angle = (Math.PI / 3) * index; // 2*PI/6 * index
        // Calculate position for each circle
        // Adjust the '75' value to position the smaller circles closer or further from the center
        const position = {
          left: `calc(50% + ${75 * Math.cos(angle)}px - 1.25rem)`, // 1.25rem is half the width/height of the smaller circles to center them
          top: `calc(50% + ${75 * Math.sin(angle)}px - 1.25rem)`,
        };
        return <div key={index} className="absolute bg-secondary rounded-full w-12 h-12" style={position}></div>;
      })}
    </div>
  );
}
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
