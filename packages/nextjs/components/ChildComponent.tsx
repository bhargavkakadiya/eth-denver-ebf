"use client";

import React, { useRef, useState } from "react";
import iconsList from "./iconsList";

const baseUrl = "https://ipfs.io/ipfs/";
const ChildComponent = ({
  name,
  circleRef,
  isModalOpen,
  setIsModalOpen,
  setModelDetails,
  child,
  attestations,
}: {
  name: any;
  circleRef: any;
  isModalOpen: boolean;
  setIsModalOpen: any;
  setModelDetails: any;
  child: any;
  attestations: any;
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
        setModelDetails(child);
        setIsModalOpen(true);

        // const rect = event.target.getBoundingClientRect();

        // const xPosition = event.clientX - rect.left;
        // const yPosition = event.clientY - rect.top;
        // const position = { left: xPosition, top: yPosition };
      }
    }
  };

  const remainingTags = iconsList.filter(icon => !child?.tags?.includes(icon.name));

  const lastLength = child?.tags?.length;
  return (
    <>
      <div
        className="relative accent-content rounded-full w-80 h-80 flex items-center justify-center transition-all duration-300 ease-in-out z-0 border-2 border-accent-content"
        onClick={openModal}
      >
        <div
          className="rounded-full w-24 h-24  flex items-center justify-center"
          style={{ backgroundImage: `url(${baseUrl}${child.ipfsURI})`, backgroundSize: "cover" }}
        >
          <p className="text-white text-xl font-bold z-10 text-center" style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)" }}>
            {name}
          </p>
        </div>

        {child?.tags?.map((_: any, index: number) => {
          const angle = (Math.PI / 3) * index; // Distributing circles evenly 360/6 degrees apart
          const position = {
            left: `calc(50% + ${positioningRadius * Math.cos(angle)}px)`,
            top: `calc(50% + ${positioningRadius * Math.sin(angle)}px)`,
          };

          const icon = iconsList.filter(icon => icon.name === child.tags[index]);
          if (icon.length == 0) {
            return;
          }

          const average = attestations
            .filter((attestation: any) => attestation.impactType === child.tags[index])
            .reduce((acc: any, curr: any, _: any, arr: any) => acc + Number(curr.score) / arr.length, 0);

          return (
            <div
              key={index}
              className="absolute  rounded-full transition-all duration-300 ease-in-out z-50 border-accent-content border-2"
              style={{
                ...position,
                width: `${insideCircleSize}px`,
                height: `${insideCircleSize}px`,
                transform: "translate(-50%, -50%)",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                opacity: `${(average == 0 ? 1 : average) / 10})`,
                backgroundColor: icon[0].color,
              }}
            >
              {icon[0].icon}
            </div>
          );
        })}

        {remainingTags?.map((_: any, index: number) => {
          index = index + lastLength;
          const angle = (Math.PI / 3) * index; // Distributing circles evenly 360/6 degrees apart
          const position = {
            left: `calc(50% + ${positioningRadius * Math.cos(angle)}px)`,
            top: `calc(50% + ${positioningRadius * Math.sin(angle)}px)`,
          };

          return (
            <div
              key={index}
              className="absolute  rounded-full transition-all duration-300 ease-in-out z-50 border-accent-content border-2"
              style={{
                ...position,
                width: `${insideCircleSize}px`,
                height: `${insideCircleSize}px`,
                transform: "translate(-50%, -50%)",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              {remainingTags[index - lastLength]?.icon}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChildComponent;
