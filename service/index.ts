import type {
  IOnCompleted,
  IOnData,
  IOnError,
  IOnFile,
  IOnMessageEnd,
  IOnMessageReplace,
  IOnNodeFinished,
  IOnNodeStarted,
  IOnThought,
  IOnWorkflowFinished,
  IOnWorkflowStarted,
} from "./base";
import { get, post, ssePost } from "./base";
import type { Feedbacktype } from "@/types/app";

export const sendChatMessage = async (
  body: Record<string, any>,
  callbacks: {
    onData: IOnData;
    onCompleted: IOnCompleted;
    onFile: IOnFile;
    onThought: IOnThought;
    onMessageEnd: IOnMessageEnd;
    onMessageReplace: IOnMessageReplace;
    onError: IOnError;
    getAbortController?: (abortController: AbortController) => void;
    onWorkflowStarted: IOnWorkflowStarted;
    onNodeStarted: IOnNodeStarted;
    onNodeFinished: IOnNodeFinished;
    onWorkflowFinished: IOnWorkflowFinished;
  }
) => {
  try {
    console.log("Sending chat message:", body);
    const response = await ssePost(
      "chat-messages",
      {
        body: {
          ...body,
          response_mode: "streaming",
        },
      },
      callbacks
    );
    console.log("Chat message response:", response);
    return response;
  } catch (error) {
    console.error("Error in sendChatMessage:", error);
    callbacks.onError(error instanceof Error ? error.message : String(error));
    throw error;
  }
};

export const fetchConversations = async () => {
  try {
    const response = await get("conversations", {
      params: { limit: 100, first_id: "" },
    });
    console.log("Conversations response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

export const fetchChatList = async (conversationId: string) => {
  try {
    if (!conversationId) {
      throw new Error("Conversation ID is missing");
    }
    const response = (await get("messages", {
      params: { conversation_id: conversationId, limit: 20, last_id: "" },
    })) as { data: any }; // Type assertion here
    if (!response.data) {
      throw new Error("No data received from the server");
    }
    return response;
  } catch (error) {
    console.error("Error in fetchChatList:", error);
    if (
      error instanceof Error &&
      typeof error === "object" &&
      "response" in error &&
      error.response &&
      typeof error.response === "object"
    ) {
      console.error("Response data:", (error.response as any).data);
      console.error("Response status:", (error.response as any).status);
    }
    throw error;
  }
};

// init value. wait for server update
export const fetchAppParams = async () => {
  try {
    const response = await get("parameters");
    console.log("App parameters response:", response);
    return response;
  } catch (error) {
    console.error("Error fetching app parameters:", error);
    throw error;
  }
};

export const updateFeedback = async ({
  url,
  body,
}: {
  url: string;
  body: Feedbacktype;
}) => {
  return post(url, { body });
};

export const generationConversationName = async (id: string) => {
  try {
    const response = await post(`conversations/${id}/name`, {
      body: { auto_generate: true },
    });
    const data = response as { data: { name: string } };
    if (!data.data) {
      throw new Error("No data received from the server");
    }
    return data.data;
  } catch (error) {
    console.error("Error generating conversation name:", error);
    if ((error as any).response) {
      console.error("Response data:", (error as any).response.data);
      console.error("Response status:", (error as any).response.status);
    }
    // Instead of throwing the error, return a default name
    return { name: "New Conversation" };
  }
};
