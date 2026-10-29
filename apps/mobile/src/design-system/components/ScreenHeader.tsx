import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
} from "../tokens";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  rightAction?: React.ReactNode;
  categoryTag?: string;
  style?: ViewStyle;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack,
  rightElement,
  rightAction,
  categoryTag,
  style,
}) => {
  const finalRight = rightElement || rightAction;

  return (
    <View style={[styles.headerContainer, style]}>
      {/* Top Nav Row */}
      <View style={styles.topRow}>
        {onBack ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.8}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        ) : categoryTag ? (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>// {categoryTag}</Text>
          </View>
        ) : (
          <View />
        )}

        {finalRight && <View style={styles.rightWrapper}>{finalRight}</View>}
      </View>

      {/* Main Editorial Title & Subtitle */}
      <View style={styles.titleSection}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingTop: BRUTAL_SPACING[3],
    paddingBottom: BRUTAL_SPACING[4],
    backgroundColor: BRUTAL_COLORS.background,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[3],
    minHeight: 36,
  },
  backButton: {
    width: 38,
    height: 38,
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    justifyContent: "center",
    alignItems: "center",
    ...BRUTAL_SHADOWS.sm,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: "900",
    color: BRUTAL_COLORS.ink,
    lineHeight: 22,
  },
  categoryBadge: {
    backgroundColor: BRUTAL_COLORS.muted,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.micro,
  },
  categoryBadgeText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    letterSpacing: 1,
    color: BRUTAL_COLORS.ink,
    textTransform: "uppercase",
  },
  rightWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleSection: {
    marginTop: BRUTAL_SPACING[1],
  },
  title: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes["3xl"],
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.medium,
    color: BRUTAL_COLORS.textSecondary,
    lineHeight: 20,
    marginTop: BRUTAL_SPACING[1],
  },
});
