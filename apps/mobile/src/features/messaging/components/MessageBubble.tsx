import React from "react";
import { StyleSheet, View, Text } from "react-native";
import type { ChatMessage } from "@alumnux/types";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  BRUTAL_SHADOWS,
} from "../../../design-system/tokens";

interface MessageBubbleProps {
  message: ChatMessage;
  isOutgoing: boolean;
  showSenderName?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOutgoing,
  showSenderName = false,
}) => {
  const formatTime = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <View
      style={[
        styles.wrapper,
        isOutgoing ? styles.wrapperOutgoing : styles.wrapperIncoming,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isOutgoing ? styles.bubbleOutgoing : styles.bubbleIncoming,
        ]}
      >
        {/* Sender Name for Received Messages in Group Context */}
        {showSenderName && !isOutgoing && (
          <Text style={styles.senderHeader}>{message.senderName}</Text>
        )}

        <Text
          style={[
            styles.messageText,
            isOutgoing ? styles.textOutgoing : styles.textIncoming,
          ]}
        >
          {message.content}
        </Text>

        <View style={styles.footerRow}>
          <Text
            style={[
              styles.timeText,
              isOutgoing ? styles.timeOutgoing : styles.timeIncoming,
            ]}
          >
            {formatTime(message.createdAt)}
          </Text>

          {isOutgoing && (
            <Text style={styles.statusIndicator}>
              {message.status === "read" ? "✓✓" : "✓"}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: BRUTAL_SPACING[1],
    paddingHorizontal: BRUTAL_SPACING[4],
  },
  wrapperOutgoing: {
    alignItems: "flex-end",
  },
  wrapperIncoming: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "82%",
    paddingHorizontal: BRUTAL_SPACING[3],
    paddingVertical: BRUTAL_SPACING[2],
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
  },
  bubbleOutgoing: {
    backgroundColor: BRUTAL_COLORS.INK,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 0,
  },
  bubbleIncoming: {
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    ...BRUTAL_SHADOWS.subtle,
  },
  senderHeader: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  messageText: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    lineHeight: 20,
  },
  textOutgoing: {
    color: BRUTAL_COLORS.SURFACE,
  },
  textIncoming: {
    color: BRUTAL_COLORS.INK,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: BRUTAL_SPACING[1],
    gap: 4,
  },
  timeText: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.medium,
  },
  timeOutgoing: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  timeIncoming: {
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
  statusIndicator: {
    fontSize: 10,
    color: BRUTAL_COLORS.ACCENT,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
  },
});
