import * as React from "react";
import { useState } from "react";

import IconSelection from "./IconSelect";
import TextInput from "./scaffold-eth/Input/TextInput";
import BasicTooltip from "./tooltip/CloseIcon";
import Slider from "./tooltip/Slider";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import { Wallet, hashMessage } from "ethers";
import { FormProvider, useForm } from "react-hook-form";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 4,
  borderRadius: 2,
  color: "white",
  backgroundColor: "#212638",
};

export default function NestedModal({ open, setOpen ,tags,name}: { open: boolean; setOpen: any;tags:any,name:string }) {
  const methods = useForm();
  const onClose = () => {
    setOpen(false);
  };
  const [selectedIcons, setSelectedIcons] = useState([]);

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "EBF",
    functionName: "addTagstoProject",
    args: [BigInt(0), "abc", "0x", "0x"],
    value: BigInt(0),
    onBlockConfirmation: () => {
      setOpen(false);
    },
  });

  const onSubmit = async (data: any) => {
    const msg = `Register`;
    const msgHash = hashMessage(msg);

    const callAPI = await fetch("/api/register-user/sign-msg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        msgHash: msgHash,
      }),
    });
    const { signature } = await callAPI.json();

    if (msgHash && signature) {
      writeAsync({
        args: [BigInt(0), methods.getValues("name"), msgHash as `0x${string}`, signature as `0x${string}`],
      });
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", alignContent: "center" }}>{name}</div>
          <BasicTooltip onClose={onClose} />
        </div>

        <FormProvider {...methods}>
          <form
            className="max-w-lg mx-auto rounded-lg px-8 pt-6 pb-8 mb-4"
            style={{ backgroundColor: "#212638", color: "white" }}
          >
            <IconSelection selectedIcons={selectedIcons} setSelectedIcons={setSelectedIcons} iconsList={tags} select={true}/>
            <div
              className={`bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1`}
              onClick={onSubmit}
            >
              Submit
            </div>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
}
