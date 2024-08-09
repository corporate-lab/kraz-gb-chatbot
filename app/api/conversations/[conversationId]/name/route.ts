import { type NextRequest } from "next/server";
import { getInfo } from "@/app/api/utils/common";
import { generationConversationName } from "@/service/index";

export async function POST(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  try {
    await getInfo(request); // We still call this to ensure user authentication
    const data = await generationConversationName(params.conversationId);

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating conversation name:", error);
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
