export const dynamic = "force-dynamic";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { client, getInfo, setSession } from "@/app/api/utils/common";
export async function GET(request: NextRequest) {
  const { user } = await getInfo(request);
  try {
    const { data } = await client.getConversations(user);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return NextResponse.json([]);
  }
}
