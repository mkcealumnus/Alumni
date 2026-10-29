import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle } from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
} from "../tokens";

interface SectionHeaderProps {
  title: string;
  category?: string;
  badgeCount?: number;
  actionText?: string;
  onActionPress?: () => void;
  style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  category,
  badgeCount,
  actionText,
  onActionPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {category ? `${category} ` : "// "}
          {title}
        </Text>
        {badgeCount !== undefined && (
          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>{badgeCount}</Text>
          </View>
        )}
      </View>

      {actionText && onActionPress && (
        <TouchableOpacity
          onPress={onActionPress}
          activeOpacity={0.7}
          style={styles.actionBtn}
        >
          <Text style={styles.actionText}>{actionText} →</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[3],
    marginTop: BRUTAL_SPACING[4],
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: BRUTAL_SPACING[2],
  },
  title: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    letterSpacing: BRUTAL_TYPOGRAPHY.letterSpacing.tracked,
    textTransform: "uppercase",
  },
  counterBadge: {
    backgroundColor: BRUTAL_COLORS.accent,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: BRUTAL_COLORS.ink,
  },
  counterText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.ink,
  },
  actionBtn: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  actionText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.ink,
    letterSpacing: 0.5,
  },
});
