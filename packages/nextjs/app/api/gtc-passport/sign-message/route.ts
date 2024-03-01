import axios from "axios";

export async function GET() {
  const messageAndNonce = await fetchMessageAndNonce();

  return Response.json(messageAndNonce);
}

async function fetchMessageAndNonce() {
  const axiosSigningMessageConfig = {
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_SCORER_API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.get("https://api.scorer.gitcoin.co/registry/signing-message", axiosSigningMessageConfig);
  console.log("logging data", data);
  return data;
}
