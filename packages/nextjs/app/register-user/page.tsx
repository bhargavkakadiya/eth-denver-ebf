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
      console.log("txnReceipt", txnReceipt);
      router.push("/"); // forward to correct page
    },
  });

  const onSubmit = async (data: any) => {
    const msg = `Register`;
    const msgHash = hashMessage(msg);
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || "";
    const wallet = new Wallet(privateKey);
    const signature = await wallet.signMessage(arrayify(msgHash));

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
        >
          <div className="mb-4">
            <TextInput name="name" label="Name" type="text" />
            <TextInput name="homeTown" label="HomeTown" type="text" />
          </div>

          <div className="flex justify-center mt-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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

function arrayify(msgHash: string): Uint8Array {
  return new Uint8Array(Buffer.from(msgHash.slice(2), "hex"));
}
