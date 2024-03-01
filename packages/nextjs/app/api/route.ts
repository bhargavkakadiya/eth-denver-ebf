export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  const data = { message: "Hello, api!" };
  return Response.json({ data });
}
