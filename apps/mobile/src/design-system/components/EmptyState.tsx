import React from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
} from "../tokens";
import { BrutalButton } from "./BrutalButton";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionLabel?: string;
  onActionPress?: () => void;
  onAction?: () => void;
  icon?: string;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionLabel,
  onActionPress,
  onAction,
  icon = "◻",
  style,
}) => {
  const finalActionText = actionText || actionLabel;
  const finalOnAction = onActionPress || onAction;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconBox}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {finalActionText && finalOnAction && (
        <View style={styles.actionWrapper}>
          <BrutalButton
            title={finalActionText}
            onPress={finalOnAction}
            size="compact"
            variant="primary"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[6],
    alignItems: "center",
    justifyContent: "center",
    marginVertical: BRUTAL_SPACING[4],
    ...BRUTAL_SHADOWS.base,
  },
  iconBox: {
    width: 52,
    height: 52,
    backgroundColor: BRUTAL_COLORS.accent,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[3],
    ...BRUTAL_SHADOWS.sm,
  },
  iconText: {
    fontSize: 24,
    fontWeight: "900",
    color: BRUTAL_COLORS.ink,
  },
  title: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.base,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    textAlign: "center",
    marginBottom: BRUTAL_SPACING[1],
  },
  description: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 18,
    maxWidth: 280,
  },
  actionWrapper: {
    marginTop: BRUTAL_SPACING[4],
  },
});
