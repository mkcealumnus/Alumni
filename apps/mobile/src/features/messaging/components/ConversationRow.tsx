import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import type { Conversation } from "@alumnux/types";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  BRUTAL_SHADOWS,
} from "../../../design-system/tokens";
import { Avatar } from "../../../design-system/components/AvatarAndDivider";
import { UnreadBadge } from "./UnreadBadge";

interface ConversationRowProps {
  conversation: Conversation;
  currentUserId: string;
  onPress: (conversation: Conversation) => void;
}

export const ConversationRow: React.FC<ConversationRowProps> = ({
  conversation,
  currentUserId,
  onPress,
}) => {
  const isStudent = currentUserId === conversation.studentId;

  const partnerName = isStudent
    ? conversation.alumniName
    : conversation.studentName;

  const partnerRole = isStudent
    ? `${conversation.alumniRoleTitle || "Alumnus"} @ ${conversation.alumniCompany || "Industry"}`
    : `${conversation.studentDepartment || "Engineering"} • Class of ${conversation.studentGraduationYear || 2026}`;

  const hasUnread = (conversation.unreadCount || 0) > 0;

  // Format last message timestamp
  const formatTime = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const now = new Date();
    const diffHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

    if (diffHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        hasUnread && styles.cardUnread,
      ]}
      onPress={() => onPress(conversation)}
      activeOpacity={0.85}
    >
      <View style={styles.row}>
        <Avatar name={partnerName} size={44} />

        <View style={styles.contentCol}>
          <View style={styles.topRow}>
            <Text style={styles.partnerName} numberOfLines={1}>
              {partnerName}
            </Text>
            <Text style={styles.timestamp}>
              {formatTime(conversation.lastMessageAt)}
            </Text>
          </View>

          <Text style={styles.partnerRole} numberOfLines={1}>
            {partnerRole}
          </Text>

          {conversation.topic ? (
            <View style={styles.topicChip}>
              <Text style={styles.topicText} numberOfLines={1}>
                // MENTORSHIP: {conversation.topic.toUpperCase()}
              </Text>
            </View>
          ) : null}

          <View style={styles.previewRow}>
            <Text
              style={[
                styles.previewText,
                hasUnread && styles.previewTextUnread,
              ]}
              numberOfLines={2}
            >
              {conversation.lastMessagePreview || "No messages exchanged yet."}
            </Text>
            {hasUnread && <UnreadBadge count={conversation.unreadCount || 0} />}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[3],
    ...BRUTAL_SHADOWS.subtle,
  },
  cardUnread: {
    borderLeftWidth: 6,
    borderLeftColor: BRUTAL_COLORS.ACCENT,
  },
  row: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[3],
    alignItems: "flex-start",
  },
  contentCol: {
    flex: 1,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  partnerName: {
    fontSize: BRUTAL_TYPOGRAPHY.base,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    flex: 1,
    marginRight: BRUTAL_SPACING[2],
  },
  timestamp: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
  partnerRole: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    marginBottom: BRUTAL_SPACING[1],
  },
  topicChip: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: 1,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginBottom: BRUTAL_SPACING[2],
  },
  topicText: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 0.5,
  },
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: BRUTAL_SPACING[2],
  },
  previewText: {
    flex: 1,
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    lineHeight: 18,
  },
  previewTextUnread: {
    color: BRUTAL_COLORS.INK,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
  },
});
