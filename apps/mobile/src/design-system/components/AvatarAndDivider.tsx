import React from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_TYPOGRAPHY,
} from "../tokens";

interface AvatarProps {
  name: string;
  size?: "small" | "medium" | "large" | number;
  variant?: "ink" | "accent" | "surface";
  role?: "STUDENT" | "ALUMNI" | "ADMIN";
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = "medium",
  variant = "accent",
  style,
}) => {
  const getInitials = (text: string): string => {
    if (!text) return "AL";
    const parts = text.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return text.slice(0, 2).toUpperCase();
  };

  const getDimension = (): number => {
    if (typeof size === "number") return size;
    switch (size) {
      case "small":
        return 32;
      case "large":
        return 56;
      case "medium":
      default:
        return 44;
    }
  };

  const getFontSize = (): number => {
    if (typeof size === "number") return Math.round(size * 0.36);
    switch (size) {
      case "small":
        return BRUTAL_TYPOGRAPHY.sizes.xs;
      case "large":
        return BRUTAL_TYPOGRAPHY.sizes.xl;
      case "medium":
      default:
        return BRUTAL_TYPOGRAPHY.sizes.sm;
    }
  };

  const getBgColor = (): string => {
    switch (variant) {
      case "ink":
        return BRUTAL_COLORS.ink;
      case "surface":
        return BRUTAL_COLORS.surface;
      case "accent":
      default:
        return BRUTAL_COLORS.accent;
    }
  };

  const getTextColor = (): string => {
    return variant === "ink" ? BRUTAL_COLORS.textInverse : BRUTAL_COLORS.ink;
  };

  const dimension = getDimension();

  return (
    <View
      style={[
        styles.avatar,
        {
          width: dimension,
          height: dimension,
          backgroundColor: getBgColor(),
        },
        style,
      ]}
    >
      <Text
        style={[
          styles.initials,
          {
            fontSize: getFontSize(),
            color: getTextColor(),
          },
        ]}
      >
        {getInitials(name)}
      </Text>
    </View>
  );
};

interface DividerProps {
  style?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({ style }) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  avatar: {
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_BORDERS.color,
    borderRadius: BRUTAL_RADII.standard,
    justifyContent: "center",
    alignItems: "center",
    ...BRUTAL_SHADOWS.sm,
  },
  initials: {
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    letterSpacing: 0.5,
  },
  divider: {
    height: BRUTAL_BORDERS.width,
    backgroundColor: BRUTAL_COLORS.ink,
    width: "100%",
    marginVertical: 12,
  },
});
