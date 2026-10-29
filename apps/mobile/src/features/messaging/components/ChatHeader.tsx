import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  BRUTAL_SHADOWS,
} from "../../../design-system/tokens";
import { Avatar } from "../../../design-system/components/AvatarAndDivider";

interface ChatHeaderProps {
  partnerName: string;
  partnerRole: string;
  topic?: string;
  onBack: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  partnerName,
  partnerRole,
  topic,
  onBack,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={onBack}
        activeOpacity={0.8}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Avatar name={partnerName} size={36} />

      <View style={styles.infoCol}>
        <Text style={styles.partnerName} numberOfLines={1}>
          {partnerName}
        </Text>
        <Text style={styles.partnerRole} numberOfLines={1}>
          {partnerRole}
        </Text>
      </View>

      <View style={styles.secureTag}>
        <Text style={styles.secureText}>🔒 1-ON-1</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderBottomWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[4],
    paddingVertical: BRUTAL_SPACING[3],
    gap: BRUTAL_SPACING[3],
    ...BRUTAL_SHADOWS.subtle,
    zIndex: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 16,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  infoCol: {
    flex: 1,
  },
  partnerName: {
    fontSize: BRUTAL_TYPOGRAPHY.base,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  partnerRole: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
  secureTag: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: 1,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  secureText: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 0.5,
  },
});
