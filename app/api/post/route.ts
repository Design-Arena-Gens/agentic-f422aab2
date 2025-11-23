import { NextRequest } from "next/server";
import { parseCreateMediaInput, publishImagePost } from "@/lib/instagram";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = parseCreateMediaInput(body);
    const id = await publishImagePost(input);
    return new Response(JSON.stringify({ ok: true, id }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unexpected server error";
    return new Response(JSON.stringify({ ok: false, error: message }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
}

