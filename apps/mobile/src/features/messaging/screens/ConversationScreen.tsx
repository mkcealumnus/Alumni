import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import type { Conversation, ChatMessage } from "@alumnux/types";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
} from "../../../design-system/tokens";
import { ChatHeader } from "../components/ChatHeader";
import { MessageBubble } from "../components/MessageBubble";
import { MessageComposer } from "../components/MessageComposer";
import { MessageDateSeparator } from "../components/MessageDateSeparator";
import { useMessages } from "../hooks/useMessages";
import { useMobileAuth } from "../../../context/AuthContext";

interface ConversationScreenProps {
  conversation: Conversation;
  onBack: () => void;
}

export const ConversationScreen: React.FC<ConversationScreenProps> = ({
  conversation,
  onBack,
}) => {
  const { user } = useMobileAuth();
  const { messages, isSending, sendMessage } = useMessages(conversation.id);

  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  const isStudent = user?.id === conversation.studentId;
  const partnerName = isStudent
    ? conversation.alumniName
    : conversation.studentName;
  const partnerRole = isStudent
    ? `${conversation.alumniRoleTitle || "Alumnus"} @ ${conversation.alumniCompany || "Industry"}`
    : `${conversation.studentDepartment || "Engineering"} • Class of ${conversation.studentGraduationYear || 2026}`;

  // Auto scroll to bottom
  const scrollToBottom = () => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ChatHeader
        partnerName={partnerName}
        partnerRole={partnerRole}
        topic={conversation.topic}
        onBack={onBack}
      />

      {conversation.topic ? (
        <View style={styles.trackBanner}>
          <Text style={styles.trackText}>
            // ACTIVE TRACK: {conversation.topic.toUpperCase()}
          </Text>
        </View>
      ) : null}

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const isOutgoing = item.senderId === user?.id;

            // Render date separator between messages on different days
            const showDateSeparator =
              index === 0 ||
              new Date(item.createdAt).toDateString() !==
                new Date(messages[index - 1].createdAt).toDateString();

            const dateStr = new Date(item.createdAt).toLocaleDateString([], {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <View>
                {showDateSeparator && <MessageDateSeparator date={dateStr} />}
                <MessageBubble
                  message={item}
                  isOutgoing={isOutgoing}
                />
              </View>
            );
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
        />

        <MessageComposer
          onSend={sendMessage}
          isSending={isSending}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
  },
  keyboardContainer: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
  },
  trackBanner: {
    backgroundColor: BRUTAL_COLORS.ACCENT,
    borderBottomWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[4],
    paddingVertical: 5,
  },
  trackText: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 1,
  },
  listContent: {
    paddingVertical: BRUTAL_SPACING[3],
    flexGrow: 1,
  },
});
