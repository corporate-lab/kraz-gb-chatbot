import { type NextRequest } from "next/server";
import { ChatClient } from "dify-client";
import { v4 } from "uuid";
import { API_KEY, API_URL, APP_ID } from "@/config";
import { getToken } from "next-auth/jwt";

const userPrefix = `user_${APP_ID}:`;

export const getInfo = async (request: NextRequest) => {
  const token = await getToken({ req: request });
  const userId = token?.email || token?.id || "anonymous";
  const sessionId = v4();
  return { sessionId, user: userId, userId };
};

export const setSession = (sessionId: string) => {
  return { "Set-Cookie": `session_id=${sessionId}` };
};

export const client = new ChatClient(API_KEY, API_URL || undefined);
