import React from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  BRUTAL_SHADOWS,
} from "../../../design-system/tokens";

interface UnreadBadgeProps {
  count: number;
  style?: ViewStyle;
}

export const UnreadBadge: React.FC<UnreadBadgeProps> = ({ count, style }) => {
  if (count <= 0) return null;

  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>
        {count > 99 ? "99+" : count} NEW
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: BRUTAL_COLORS.ACCENT,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    ...BRUTAL_SHADOWS.subtle,
  },
  text: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 0.5,
  },
});
