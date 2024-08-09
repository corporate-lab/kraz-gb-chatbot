import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { client, getInfo } from "@/app/api/utils/common";
export async function GET(request: NextRequest) {
  try {
    const { user } = await getInfo(request);
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversation_id");
    const limit = searchParams.get("limit") || "20";
    const lastId = searchParams.get("last_id") || "";
    if (!conversationId) {
      return NextResponse.json(
        { error: "conversation_id is required" },
        { status: 400 }
      );
    }
    const { data } = await client.getConversationMessages(
      user,
      conversationId,
      {
        limit: parseInt(limit),
        last_id: lastId,
      }
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
