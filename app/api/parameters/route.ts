import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { client, getInfo, setSession } from "@/app/api/utils/common";

export async function GET(request: NextRequest) {
  const { sessionId, user, userId } = await getInfo(request);
  try {
    client.setUserId(userId);
    const { data } = await client.getApplicationParameters(user);
    return NextResponse.json(data as object, {
      headers: setSession(sessionId),
    });
  } catch (error) {
    return NextResponse.json([]);
  }
}
