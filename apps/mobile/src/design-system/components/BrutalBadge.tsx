import React from "react";
import { StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
} from "../tokens";

export type BrutalBadgeVariant =
  | "accent"    // Acid Lime
  | "success"   // Pastel Lime (Verified / Accepted)
  | "warning"   // Amber (Pending / Needs Review)
  | "danger"    // Coral Red (Rejected / Suspended)
  | "destructive" // Alias for danger
  | "info"      // Cyan
  | "neutral"   // White / Muted
  | "outline"   // Transparent with ink border
  | "dark";     // Solid Ink

interface BrutalBadgeProps {
  label: string;
  variant?: BrutalBadgeVariant;
  size?: "small" | "normal";
  pill?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const BrutalBadge: React.FC<BrutalBadgeProps> = ({
  label,
  variant = "accent",
  size = "normal",
  pill = true,
  style,
  textStyle,
  icon,
}) => {
  const getBadgeColors = (): { bg: string; border: string; text: string } => {
    switch (variant) {
      case "accent":
        return {
          bg: BRUTAL_COLORS.accent,
          border: BRUTAL_COLORS.ink,
          text: BRUTAL_COLORS.ink,
        };
      case "success":
        return {
          bg: BRUTAL_COLORS.success,
          border: BRUTAL_COLORS.ink,
          text: BRUTAL_COLORS.successInk,
        };
      case "warning":
        return {
          bg: BRUTAL_COLORS.warning,
          border: BRUTAL_COLORS.ink,
          text: BRUTAL_COLORS.warningInk,
        };
      case "danger":
      case "destructive":
        return {
          bg: BRUTAL_COLORS.danger,
          border: BRUTAL_COLORS.ink,
          text: BRUTAL_COLORS.dangerInk,
        };
      case "info":
        return {
          bg: BRUTAL_COLORS.info,
          border: BRUTAL_COLORS.ink,
          text: BRUTAL_COLORS.infoInk,
        };
      case "dark":
        return {
          bg: BRUTAL_COLORS.ink,
          border: BRUTAL_COLORS.ink,
          text: BRUTAL_COLORS.textInverse,
        };
      case "outline":
        return {
          bg: "transparent",
          border: BRUTAL_COLORS.ink,
          text: BRUTAL_COLORS.ink,
        };
      case "neutral":
      default:
        return {
          bg: BRUTAL_COLORS.surface,
          border: BRUTAL_COLORS.ink,
          text: BRUTAL_COLORS.ink,
        };
    }
  };

  const colors = getBadgeColors();

  return (
    <View
      style={[
        styles.badge,
        pill ? styles.pill : styles.rect,
        size === "small" ? styles.badgeSmall : styles.badgeNormal,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text
        style={[
          styles.text,
          size === "small" ? styles.textSmall : styles.textNormal,
          { color: colors.text },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    borderWidth: BRUTAL_BORDERS.thin,
  },
  pill: {
    borderRadius: BRUTAL_RADII.pill,
  },
  rect: {
    borderRadius: BRUTAL_RADII.micro,
  },
  badgeNormal: {
    paddingHorizontal: BRUTAL_SPACING[3],
    paddingVertical: 4,
  },
  badgeSmall: {
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 2,
  },
  iconWrapper: {
    marginRight: 4,
  },
  text: {
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  textNormal: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
  },
  textSmall: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
  },
});
