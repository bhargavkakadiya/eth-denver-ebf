import React, { useEffect, useState } from "react";


interface IconsList{
    name: string;
    icon: JSX.Element;
}

const IconSelection = ({ selectedIcons, setSelectedIcons,iconsList }: { selectedIcons: string[]; setSelectedIcons: any; iconsList:IconsList[] }) => {
  const toggleSelection = (iconName: string) => {
    console.log("toggleSelection", iconName);
    setSelectedIcons((prevSelection: string[]) => {
      if (prevSelection.includes(iconName)) {
        return prevSelection.filter(name => name !== iconName);
      } else {
        return [...prevSelection, iconName];
      }
    });
  };

  return (
    <div className="icon-grid">
      {iconsList.map(({ name, icon }) => (
        <div
          key={name}
          className={`icon-item `}
          onClick={() => toggleSelection(name)}
          style={{ cursor: "pointer", margin: "10px", display: "inline-block" }}
        >
          <div className={`${selectedIcons.includes(name) ? "rounded-md bg-white" : ""}`}>{icon}</div>

          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};

export default IconSelection;
