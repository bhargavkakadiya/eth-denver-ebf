"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextInput from "../../components/scaffold-eth/Input/TextInput";
import { NFTStorage } from "nft.storage";
import { FormProvider, useForm } from "react-hook-form";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function Home() {
  const methods = useForm();
  const router = useRouter();

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
    args: ["", "", ""],
    value: BigInt(0),
    onBlockConfirmation: () => {
      router.push("/"); // forward to correct page
    },
  });

  const onSubmit = (formData: any) => {
    const handleSubmission = ({ ipfsCID, ipfsCIDmust }: { ipfsCID: string; ipfsCIDmust: boolean }) => {
      console.log("handling write");
      console.log("Form data submitted", formData);
      console.log("IPFS CID", ipfsCID);
      if (ipfsCIDmust) {
        if (!ipfsCID) {
          console.error("IPFS CID not found");
          return;
        } else {
          writeAsync({
            args: [formData.name, formData.place, ipfsCID],
          });
        }
      }
    };

    if (selectedImage && selectedImage.imageFile) {
      const client = new NFTStorage({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY || "",
      });
      client
        .storeBlob((selectedImage as any).imageFile)
        .then(cid => {
          console.log("IPFS CID", cid);
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
          className="max-w-lg mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <TextInput name="name" label="Name" type="text" />
            <TextInput name="place" label="Type" type="text" />
            <br />
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">PlaceImage</label>
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
                <p className="block text-gray-700 text-sm font-bold mb-2">Preview</p>
                <Image
                  src={selectedImage.previewURL}
                  alt="Preview"
                  className="max-w-xs max-h-64"
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
