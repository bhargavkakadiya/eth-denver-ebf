import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import NestedModal from "./NestedModal";
import BasicTooltip from "./tooltip/CloseIcon";
import Slider from "./tooltip/Slider";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  color: "white",
  backgroundColor: "#212638",
};

export default function BasicModal({
  isOpen,
  onClose,
  title,

  data,
}: {
  isOpen: boolean;
  onClose: any;
  title: string;

  data: any;
}) {
  const [showSlider, setShowSlider] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [value, setSelectedValue] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setSelectedValue(3);
  }, [selectedIndex, showSlider]);
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: "flex", justifyContent: "space-between", margin: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", alignContent: "center" }}>
            <Image src="/public/favicon.png" alt="logo" width={16} height={16} />
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
          </div>
          <BasicTooltip onClose={onClose} />
        </div>
        <Divider color={"bg-primary"} />
        <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: "center" }}>
          <Typography id="modal-modal-description" sx={{ m: 2 }}>
            Description for the event goes here
          </Typography>

          <div
            className={`bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1`}
            onClick={() => setOpen(true)}
          >
            Add new benefits
          </div>
        </div>

        <Divider color={"bg-primary"} />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="space-y-4">
            {data.map((val: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span>Circle {index + 1}</span>
                <button
                  className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1"
                  onClick={() => {
                    setShowSlider(true);
                    setSelectedIndex((index as any) + 1);
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </Typography>
        <div className="justify-center align-middle items-center self-center ">
          {showSlider && <Slider value={value} setSelectedValue={setSelectedValue} />}
        </div>

        <NestedModal open={open} setOpen={setOpen} />
      </Box>
    </Modal>
  );
}
