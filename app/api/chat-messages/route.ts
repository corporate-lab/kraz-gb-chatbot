import { type NextRequest } from "next/server";
import { client, getInfo } from "@/app/api/utils/common";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received chat message request:", body);
    const {
      inputs,
      query,
      files,
      conversation_id: conversationId,
      response_mode: responseMode,
    } = body;
    const { user } = await getInfo(request);
    console.log("User:", user);
    const res = await client.createChatMessage(
      inputs,
      query,
      user,
      responseMode,
      conversationId,
      files
    );
    console.log("Chat message response:", res);

    if (res.body instanceof ReadableStream) {
      console.log("Returning streaming response");
      return new Response(res.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Handle non-streaming response
    const safeData = {
      id: res.data?.id,
      conversation_id: res.data?.conversation_id,
      content: res.data?.content,
    };
    console.log("Returning non-streaming response:", safeData);

    return new Response(JSON.stringify(safeData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in chat-messages API:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
