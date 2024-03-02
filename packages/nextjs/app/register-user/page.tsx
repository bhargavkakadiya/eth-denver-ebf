"use client";

import { useRouter } from "next/navigation";
import { Wallet, hashMessage } from "ethers";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "~~/components/scaffold-eth/Input/TextInput";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function Home() {
  const methods = useForm({
    defaultValues: {
      team: "0",
    },
  });
  const router = useRouter();

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "EBF",
    functionName: "registerUser",
    args: ["", "", "0x", "0x"],
    onBlockConfirmation: txnReceipt => {
      router.push("/"); // forward to correct page
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
        args: [data.name, data.homeTown, msgHash as `0x${string}`, signature as `0x${string}`],
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="max-w-lg mx-auto bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          style={{ backgroundColor: "#212638", color: "white" }}
        >
          <div className="mb-4">
            <TextInput name="name" label="Name" type="text" />
            <TextInput name="homeTown" label="HomeTown" type="text" />
          </div>

          <div className="flex justify-center mt-5">
            <button
              className="bg-primary hover:bg-secondary hover:shadow-md focus:!bg-secondary  py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col justify-center m-1"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <span className="loading loading-spinner loading-sm"></span> : <>Register</>}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
