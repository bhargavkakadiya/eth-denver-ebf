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
import { VeraxSdk } from "@verax-attestation-registry/verax-sdk";
import { getPublicClient } from "@wagmi/core";
import { waitForTransactionReceipt } from "viem/actions";
import { useAccount, useNetwork } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

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
  maxHeight: "90vh",
  overflowY: "auto",
};

export default function BasicModal({
  isOpen,
  onClose,
  title,

  data,
  id,
}: {
  isOpen: boolean;
  onClose: any;
  title: string;

  data: any;
  id: any;
}) {
  const [showSlider, setShowSlider] = useState(false);
  const [selectedIndexValue, setSelectedIndexValue] = useState(null);
  const [value, setSelectedValue] = useState(0); // score of slider
  const [open, setOpen] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [child, setChild] = useState<any>(null);
 


 

    const { data: userData } = useScaffoldContractRead({
      contractName: "EBF",
      functionName: "getProjectById",
      args: [ id && BigInt(id)], // Convert id to a bigint
    });

  useEffect(() => {
    if (userData && userData?.length > 0) {
      setChild(userData[0]);
    }
  }, [userData]);



  useEffect(() => {
    setSelectedValue(3);
  }, [selectedIndexValue, showSlider]);

  useEffect(() => {
    setShowSlider(false);
    setSelectedIndexValue(null);
 
  }, [isOpen]);

  const remainingTags = iconsList.filter(icon => !child?.tags?.includes(icon.name));

  const sdkConf =
    (chain?.id ?? 0) === 59144 ? VeraxSdk.DEFAULT_LINEA_MAINNET_FRONTEND : VeraxSdk.DEFAULT_LINEA_TESTNET_FRONTEND;
  const veraxSdk = new VeraxSdk(sdkConf, address);

  const handleIssueAttestation = async (formData: {
    attestationAddress: any;
    projectID: any;
    impactType: any;
    score: any;
  }) => {
    setIsIssuing(true);

    try {
      console.log(formData.attestationAddress);
      console.log(formData.score);

      const txHash = await veraxSdk.portal.attest(
        "0xF11ef82AC622114370B89e119f932D7ff6BFF78A", // This should be your portalId
        {
          schemaId: "0x569544812f876efa5b99dcc531c9e6af8ce9aae2731a4f28b3e04fa5771a22c3", // Correctly place schemaId here
          expirationDate: Math.floor(Date.now() / 1000) + 2592000, // 30 days from now
          subject: formData.attestationAddress,
          attestationData: [
            { tokenID: parseInt(formData.projectID), impactType: formData.impactType, score: parseInt(formData.score) },
          ], // Rename 'address' to 'userAddress' or similar
        },
        [], // Additional options if any
      );
      const transactionHash = txHash.transactionHash;
      const receipt = await waitForTransactionReceipt(getPublicClient(), { hash: transactionHash as `0xString` });
      const attestationID = receipt.logs[0].topics[1];
      const attestation = await veraxSdk.attestation.getAttestation(attestationID as `0xString`);
      console.log(attestation);
      // Continue with your existing logic...
    } catch (error) {
      console.error("Error issuing attestation:", error);
    } finally {
      setIsIssuing(false);
    }
  };

  const onAttest = () => {
    if (selectedIndexValue === null) {
      return;
    }
    const projectID = parseInt(child?.id); // 0n .. convert it to number
    const formData = {
      attestationAddress: address,
      projectID: projectID,
      impactType: selectedIndexValue,
      score: value,
    };
    console.log(formData);
    handleIssueAttestation(formData);
  };

  const closeModal = () => {
    setOpen(false);
    setChild({...child, tags: [...child.tags, selectedIndexValue]});
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              margin: "5px",
              marginBottom: "10px",
            }}
          >
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
            alignItems: "center", // Adjust alignment to ensure items start from the top
            maxHeight: "400px",
          }}
        >
          <div
            style={{
              maxHeight: "100px", // Set the maximum height for the description
              overflowY: "auto", // Enable vertical scrolling
              marginRight: "8px", // Add some space between the description and the benefits button
              padding: "8px", // Optional: Adds some padding inside the scrollable area
              maxWidth: "450px",
            }}
          >
            <Typography id="modal-modal-description" sx={{ m: 2 }}>
              {child?.projectDescription}
            </Typography>
          </div>

          {remainingTags?.length > 0 && (
            <div
              className={`bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1`}
              onClick={() => setOpen(true)}
              style={{
                flexDirection: "column",
                justifyContent: "center", // This ensures the button is centered vertically if needed
              }}
            >
              Add new benefits
            </div>
          )}
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
                  <span
                    className=" rounded-xl"
                    style={{
                      backgroundColor: selectedIndexValue === icon[0]?.name ? "white" : "transparent", // Use "transparent" to avoid collapsing borders
                    }}
                  >
                    {icon[0].icon}
                  </span>
                  <p>{icon[0].name}</p>
                  <button className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1">
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
                  onClick={onAttest}
                  // TODO: Add the submit function call here
                >
                  {isIssuing ? "Issuing..." : "Issue Attestation"}
                </button>
              </div>
            </div>
          )}
        </div>

        <NestedModal open={open} setOpen={setOpen} tags={remainingTags} name={title} closeModal={closeModal} id={id}/>
      </Box>
    </Modal>
  );
}
