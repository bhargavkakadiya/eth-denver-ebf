"use client";

import React, { useRef, useState } from "react";

const baseUrl="https://ipfs.io/ipfs/"
const ChildComponent = ({
  name,
  circleRef,
  isModalOpen,
  setIsModalOpen,
  setModelDetails,
  child,
}: {
  name: any;
  circleRef: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  setModelDetails: any;
  child: any;
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

  console.log("child", `(${baseUrl}${child.ipfsURI})`);
  return (
    <>
      <div
        className="relative accent-content rounded-full w-80 h-80 flex items-center justify-center transition-all duration-300 ease-in-out z-0 "
        onClick={openModal}
        style={{backgroundImage: `url(${baseUrl}${child.ipfsURI})`, backgroundSize: "cover"}}
      >
        <p className="text-white text-sm z-10">{name}</p>
        {Array.from({ length: 6 }).map((_, index) => {
          //    {child.tags.map((_: any, index: number) => { // TODO remove the above line and uncomment this line
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

export default ChildComponent;
