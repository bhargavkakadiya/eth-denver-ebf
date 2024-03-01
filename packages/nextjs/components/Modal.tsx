import React from "react";



const round = (number: number, decimalPlaces: number) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
};
const Modal = ({ isOpen, onClose, title, children, position }) => {
  if (!isOpen) return null;

  const modalStyle = {
    top: `${round(position.top, 2)}px`,
    left: `${round(position.left, 2)}px`,
  };

  return (
    <div
      className={` inset-0 bg-black flex justify-center items-center rounded-md  absolute z-50 w-65 h-65 `}
      style={modalStyle}
    >
      <div className=" text-white p-5 rounded-lg shadow-lg max-w-md ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
