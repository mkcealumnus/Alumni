import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
} from "../tokens";

export type BrutalCardVariant = "surface" | "accent" | "muted" | "dark";

interface BrutalCardProps {
  children: React.ReactNode;
  variant?: BrutalCardVariant;
  padding?: keyof typeof BRUTAL_SPACING;
  style?: ViewStyle;
  onPress?: () => void;
  accentStrip?: "top" | "left";
  accentColor?: string;
  accentStripColor?: string;
  accentStripPosition?: "top" | "left";
  noShadow?: boolean;
}

export const BrutalCard: React.FC<BrutalCardProps> = ({
  children,
  variant = "surface",
  padding = 4,
  style,
  onPress,
  accentStrip,
  accentColor,
  accentStripColor,
  accentStripPosition = "left",
  noShadow = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const finalStripPosition = accentStrip || accentStripPosition;
  const finalStripColor = accentColor || accentStripColor;


  const getBackgroundColor = (): string => {
    switch (variant) {
      case "accent":
        return BRUTAL_COLORS.accent;
      case "muted":
        return BRUTAL_COLORS.muted;
      case "dark":
        return BRUTAL_COLORS.ink;
      case "surface":
      default:
        return BRUTAL_COLORS.surface;
    }
  };

  const shadowStyle = noShadow
    ? BRUTAL_SHADOWS.none
    : onPress && isPressed
    ? {
        ...BRUTAL_SHADOWS.sm,
        transform: [{ translateX: 1 }, { translateY: 1 }],
      }
    : BRUTAL_SHADOWS.base;

  const cardContent = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: getBackgroundColor(),
          padding: BRUTAL_SPACING[padding],
        },
        shadowStyle,
        finalStripColor && finalStripPosition === "left" && {
          borderLeftWidth: 6,
          borderLeftColor: finalStripColor,
        },
        finalStripColor && finalStripPosition === "top" && {
          borderTopWidth: 6,
          borderTopColor: finalStripColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onPress}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        {cardContent}
      </TouchableOpacity>
    );
  }

  return cardContent;
};

const styles = StyleSheet.create({
  card: {
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_BORDERS.color,
    borderRadius: BRUTAL_RADII.standard,
    overflow: "hidden",
  },
});
