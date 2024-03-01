import axios from "axios";

// export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(req: Request) {
  const { address, community, signature, nonce } = await req.json();

  const data = await submitPassport(address, community, signature, nonce);

  return Response.json(data);
}

async function submitPassport(address: `0x${string}`, community: any, signature: any, nonce: any) {
  const axiosSubmitPassportConfig = {
    headers: {
      "X-API-KEY": process.env.SCORER_API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const axiosSubmitPassportData = {
    address,
    community,
    signature,
    nonce,
  };

  const { data } = await axios.post(
    "https://api.scorer.gitcoin.co/registry/submit-passport",
    axiosSubmitPassportData,
    axiosSubmitPassportConfig,
  );

  return data;
}
