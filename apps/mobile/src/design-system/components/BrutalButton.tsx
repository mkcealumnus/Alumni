import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
} from "../tokens";

export type BrutalButtonVariant =
  | "primary"     // Acid Lime (#D7FF3F) with ink border & hard shadow
  | "secondary"   // White with ink border & hard shadow
  | "dark"        // Solid Ink (#171717) with white text & lime shadow
  | "destructive" // Coral red (#FF8C82) with ink border
  | "outline"     // Transparent with ink border
  | "ghost";      // No border, text only

export type BrutalButtonSize = "normal" | "compact" | "small";

interface BrutalButtonProps {
  title?: string;
  label?: string;
  onPress?: () => void;
  variant?: BrutalButtonVariant;
  size?: BrutalButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  title,
  label,
  onPress,
  variant = "primary",
  size = "normal",
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
  iconPosition = "left",
}) => {
  const buttonTitle = title || label || "";

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };

  const [isPressed, setIsPressed] = useState(false);

  // Background and border styling per variant
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: disabled ? BRUTAL_COLORS.muted : BRUTAL_COLORS.accent,
          borderColor: BRUTAL_COLORS.ink,
        };
      case "secondary":
        return {
          backgroundColor: disabled ? BRUTAL_COLORS.muted : BRUTAL_COLORS.surface,
          borderColor: BRUTAL_COLORS.ink,
        };
      case "dark":
        return {
          backgroundColor: disabled ? BRUTAL_COLORS.textSecondary : BRUTAL_COLORS.ink,
          borderColor: BRUTAL_COLORS.ink,
        };
      case "destructive":
        return {
          backgroundColor: disabled ? BRUTAL_COLORS.muted : BRUTAL_COLORS.danger,
          borderColor: BRUTAL_COLORS.ink,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: BRUTAL_COLORS.ink,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderColor: "transparent",
          borderWidth: 0,
        };
    }
  };

  const getTextColor = (): string => {
    if (disabled) return BRUTAL_COLORS.textMuted;
    switch (variant) {
      case "dark":
        return BRUTAL_COLORS.textInverse;
      case "destructive":
        return BRUTAL_COLORS.ink;
      default:
        return BRUTAL_COLORS.ink;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case "small":
        return {
          height: 32,
          paddingHorizontal: BRUTAL_SPACING[3],
        };
      case "compact":
        return {
          height: 40,
          paddingHorizontal: BRUTAL_SPACING[4],
        };
      case "normal":
      default:
        return {
          height: 48,
          paddingHorizontal: BRUTAL_SPACING[5],
        };
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case "small":
        return {
          fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
          fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
        };
      case "compact":
        return {
          fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
          fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
        };
      case "normal":
      default:
        return {
          fontSize: BRUTAL_TYPOGRAPHY.sizes.base,
          fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
        };
    }
  };

  // Tactile press simulation: shadow flattens, button translates 2px
  const shadowStyle = disabled || variant === "ghost"
    ? BRUTAL_SHADOWS.none
    : isPressed
    ? {
        ...BRUTAL_SHADOWS.sm,
        transform: [{ translateX: 1 }, { translateY: 1 }],
      }
    : BRUTAL_SHADOWS.base;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={disabled || loading}
      onPress={handlePress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        styles.base,
        getSizeStyle(),
        getVariantStyle(),
        shadowStyle,
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "dark" ? BRUTAL_COLORS.accent : BRUTAL_COLORS.ink}
        />
      ) : (
        <View style={styles.contentRow}>
          {icon && iconPosition === "left" && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text
            style={[
              styles.text,
              getTextSize(),
              { color: getTextColor() },
              textStyle,
            ]}
          >
            {buttonTitle}
          </Text>
          {icon && iconPosition === "right" && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderWidth: BRUTAL_BORDERS.width,
    borderRadius: BRUTAL_RADII.standard,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  fullWidth: {
    width: "100%",
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    letterSpacing: BRUTAL_TYPOGRAPHY.letterSpacing.normal,
    textTransform: "uppercase",
  },
  iconLeft: {
    marginRight: BRUTAL_SPACING[2],
  },
  iconRight: {
    marginLeft: BRUTAL_SPACING[2],
  },
  disabled: {
    opacity: 0.6,
  },
});
