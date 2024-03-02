import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import NestedModal from "./NestedModal";
import iconsList from "./iconsList";
import BasicTooltip from "./tooltip/CloseIcon";
import Slider from "./tooltip/Slider";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const baseUrl = "https://ipfs.io/ipfs/";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 750,
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
  child,
}: {
  isOpen: boolean;
  onClose: any;
  title: string;

  data: any;
  child: any;
}) {
  const [showSlider, setShowSlider] = useState(false);
  const [selectedIndexValue, setSelectedIndexValue] = useState(null);
  const [value, setSelectedValue] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setSelectedValue(3);
  }, [selectedIndexValue, showSlider]);

  useEffect(() => {

      setShowSlider(false);
      setSelectedIndexValue(null);
    
  }, [isOpen]);

  const remainingTags = iconsList.filter(icon => !child?.tags?.includes(icon.name));

  const lastLength = child?.tags?.length;
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", alignContent: "center", margin: "5px" }}>
            {child?.ipfsURI && (
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "10px",
                  position: "relative",
                }}
              >
                <Image
                  src={`${baseUrl}${child?.ipfsURI}`}
                  alt="logo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            )}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
          </div>

          <BasicTooltip onClose={onClose} />
        </div>
        <Divider color={"bg-secondary"} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            maxHeight: "400px",
          }}
        >
          <Typography id="modal-modal-description" sx={{ m: 2 }}>
            {child?.projectDescription}
          </Typography>

          {remainingTags?.length >0 &&<div
            className={`bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1`}
            onClick={() => setOpen(true)}
          >
            Add new benefits
          </div>}
        </div>

        <Divider color={"bg-secondary"} />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="space-y-4">
            {child?.tags?.map((val: any, index: number) => {
              const icon = iconsList.filter(icon => icon.name === child.tags[index]);
              if (icon.length == 0) {
                return;
              }
              return (
                <div
                  key={index}
                  className="flex justify-between items-center rounded-xl"
                  style={{
                    borderColor: selectedIndexValue === icon[0]?.name ? "white" : "transparent", // Use "transparent" to avoid collapsing borders
                    borderWidth: selectedIndexValue === icon[0]?.name ? "2px" : "0px", // Ensure units are included
                  }}
                  onClick={() => {
                    setShowSlider(true);
                    if (child?.tags && child.tags[index] !== undefined) {
                      setSelectedIndexValue(child.tags[index]);
                    }
                  }}
                >
                  <span className="p-1">{icon[0].icon}</span>
                  <button
                    className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1"
                    
                  >
                    +
                  </button>
                </div>
              );
            })}
          </div>
        </Typography>
        <div className="flex justify-center items-center">
          {showSlider && (
            <div className="flex flex-col items-center">
              <div>
                <Slider value={value} setSelectedValue={setSelectedValue} />
              </div>
              <div>
                <button
                  className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full justify-center items-center"
                  // TODO: Add the submit function call here
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>

        <NestedModal open={open} setOpen={setOpen} tags={remainingTags} name={title}/>
      </Box>
    </Modal>
  );
}
