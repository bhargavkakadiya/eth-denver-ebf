import axios from "axios";
import { Wallet } from "ethers";

// export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: Request) {
  const { msgHash } = await req.json();

  const privateKey = process.env.PRIVATE_KEY || "";
  const wallet = new Wallet(privateKey);
  const signature = await wallet.signMessage(arrayify(msgHash));

  return Response.json({
    signature,
  });
}

function arrayify(msgHash: string): Uint8Array {
  return new Uint8Array(Buffer.from(msgHash.slice(2), "hex"));
}
