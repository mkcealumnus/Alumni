import { mobileApi } from "../../../lib/api";
import type {
  Conversation,
  ChatMessage,
  CreateConversationRequest,
  SendMessageRequest,
} from "@alumnux/types";

export const messagingApi = {
  getConversations: async (): Promise<Conversation[]> => {
    return mobileApi.getConversations();
  },

  getConversationById: async (id: string): Promise<Conversation> => {
    return mobileApi.getConversationById(id);
  },

  createOrGetConversation: async (
    data: CreateConversationRequest
  ): Promise<Conversation> => {
    return mobileApi.createOrGetConversation(data);
  },

  getMessages: async (conversationId: string): Promise<ChatMessage[]> => {
    return mobileApi.getMessages(conversationId);
  },

  sendMessage: async (
    conversationId: string,
    data: SendMessageRequest
  ): Promise<ChatMessage> => {
    return mobileApi.sendMessage(conversationId, data);
  },

  markConversationRead: async (
    conversationId: string
  ): Promise<{ success: boolean }> => {
    return mobileApi.markConversationRead(conversationId);
  },
};
