import React from "react";
import { StyleSheet, View, Text, ActivityIndicator, ViewStyle } from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
} from "../tokens";
import { BrutalButton } from "./BrutalButton";

interface LoadingStateProps {
  message?: string;
  style?: ViewStyle;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading live data...",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.spinnerBox}>
        <ActivityIndicator size="small" color={BRUTAL_COLORS.ink} />
      </View>
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Something went wrong while fetching data.",
  onRetry,
  style,
}) => {
  return (
    <View style={[styles.errorContainer, style]}>
      <View style={styles.errorHeader}>
        <Text style={styles.errorIcon}>⚠</Text>
        <Text style={styles.errorTitle}>OPERATION FAILED</Text>
      </View>
      <Text style={styles.errorMessage}>{message}</Text>
      {onRetry && (
        <View style={styles.retryWrapper}>
          <BrutalButton
            title="TRY AGAIN"
            onPress={onRetry}
            size="small"
            variant="destructive"
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
    ...BRUTAL_SHADOWS.sm,
  },
  spinnerBox: {
    width: 44,
    height: 44,
    backgroundColor: BRUTAL_COLORS.accent,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[3],
    ...BRUTAL_SHADOWS.sm,
  },
  loadingText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.ink,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  errorContainer: {
    backgroundColor: "#FFF5F5",
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.danger,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[5],
    marginVertical: BRUTAL_SPACING[3],
    ...BRUTAL_SHADOWS.base,
  },
  errorHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: BRUTAL_SPACING[2],
    marginBottom: BRUTAL_SPACING[2],
  },
  errorIcon: {
    fontSize: 16,
    color: BRUTAL_COLORS.dangerInk,
  },
  errorTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.dangerInk,
    letterSpacing: 1,
  },
  errorMessage: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.ink,
    lineHeight: 18,
  },
  retryWrapper: {
    marginTop: BRUTAL_SPACING[3],
    alignSelf: "flex-start",
  },
});
