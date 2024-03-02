"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import iconsList from "../../components/iconsList";
import TextInput from "../../components/scaffold-eth/Input/TextInput";
import { NFTStorage } from "nft.storage";
import { FormProvider, useForm } from "react-hook-form";
import IconSelection from "~~/components/IconSelect";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const client = new NFTStorage({
  token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || "",
});

export default function Home() {
  const methods = useForm();
  const router = useRouter();
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [selectedImage, setSelectedImage] = useState<{
    imageFile: File | null;
    previewURL: string | null;
  } | null>(null);

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setSelectedImage({
        imageFile: img,
        previewURL: URL.createObjectURL(img),
      });
    }
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "EBF",
    functionName: "createProject",
    args: ["", "", [""], ""],
    value: BigInt(0),
    onBlockConfirmation: () => {
      // router.push("/"); // forward to correct page
    },
  });

  const onSubmit = (formData: any) => {
    const handleSubmission = ({ ipfsCID, ipfsCIDmust }: { ipfsCID: string; ipfsCIDmust: boolean }) => {
      if (ipfsCIDmust) {
        if (!ipfsCID) {
          console.error("IPFS CID not found");
          return;
        } else {
          writeAsync({
            args: [formData.name, formData.place, selectedIcons, ipfsCID],
          });
        }
      }
    };

    if (selectedImage && selectedImage.imageFile) {
      client
        .storeBlob((selectedImage as any).imageFile)
        .then(cid => {
          handleSubmission({
            ipfsCID: cid,
            ipfsCIDmust: true,
          });
        })
        .catch(error => {
          console.error("Error storing blob:", error);
        });
    } else {
      handleSubmission({
        ipfsCID: "",
        ipfsCIDmust: false,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-lg mx-auto shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          style={{ backgroundColor: "#212638", color: "white" }}
        >
          <div className="mb-4">
            <TextInput name="name" label="Name" type="text" />
            <TextInput name="description" label="Description" type="text/area" />

            <IconSelection selectedIcons={selectedIcons} setSelectedIcons={setSelectedIcons} iconsList={iconsList} select={false}/>
            <br />
            <div className="mb-4">
              <label className="block white text-sm font-bold mb-2">PlaceImage</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
              />
            </div>
            {/* Image Preview */}
            {selectedImage && selectedImage.previewURL && (
              <div className="mb-4">
                <p className="block white text-sm font-bold mb-2">Preview</p>
                <Image src={selectedImage.previewURL} alt="Preview" width={200} height={200} />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary  py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Create Project</>}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
