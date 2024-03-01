import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  // Fetch the score using the extracted parameters
  const data = await fetchScore(address);
  console.log(data);
  // Return the response as JSON
  return Response.json(data);
}

async function fetchScore(address) {
  const axiosGetScoreConfig = {
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_SCORER_API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.get(
    `https://api.scorer.gitcoin.co/registry/score/${process.env.NEXT_PUBLIC_SCORER_ID}/${address}`,
    axiosGetScoreConfig,
  );
  console.log("score data", data);
  return data;
}
