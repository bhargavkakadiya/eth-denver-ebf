import * as React from "react";
import { useState } from "react";
import TextInput from "./scaffold-eth/Input/TextInput";
import BasicTooltip from "./tooltip/CloseIcon";
import Slider from "./tooltip/Slider";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import { FormProvider, useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  color: "white",
  backgroundColor: "#212638",
};

export default function NestedModal({ open, setOpen }: { open: boolean; setOpen: any }) {
  const [value, setSelectedValue] = useState(0);
  const methods = useForm();
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", alignContent: "center" }}></div>
          <BasicTooltip onClose={onClose} />
        </div>
        <Divider />
        <FormProvider {...methods}>
          <form
            className="max-w-lg mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
            style={{ backgroundColor: "#212638", color: "white" }}
          >
            <TextInput name="name" label="Name" type="text" />
            <Divider />

            <div className="justify-center align-middle items-center self-center ">
              {<Slider value={value} setSelectedValue={setSelectedValue} />}
            </div>

            <div
              className={`bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1`}
              onClick={() => setOpen(false)}
            >
              Submit
            </div>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
}
