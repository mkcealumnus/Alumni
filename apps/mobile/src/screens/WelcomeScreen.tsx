import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { colors, radii, spacing, typography } from "@alumnux/ui-tokens";

interface WelcomeScreenProps {
  onNavigateToLogin: () => void;
  onNavigateToRegister: (initialRole?: "STUDENT" | "ALUMNI") => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigateToLogin,
  onNavigateToRegister,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Brand Banner */}
        <View style={styles.heroSection}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>MKCE ALUMNI & STUDENT PLATFORM</Text>
          </View>
          <Text style={styles.heroTitle}>Alumnux</Text>
          <Text style={styles.heroSubtitle}>
            Bridging students and alumni through structured mentorship, industry guidance, and verified networking.
          </Text>
        </View>

        {/* Value Proposition Cards */}
        <View style={styles.featureList}>
          <View style={styles.featureCard}>
            <View style={styles.featureBullet}>
              <Text style={styles.featureIcon}>🎓</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Verified Directory</Text>
              <Text style={styles.featureDesc}>
                Explore alumni working across leading engineering and technology companies.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureBullet}>
              <Text style={styles.featureIcon}>🤝</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>1-on-1 Mentorship</Text>
              <Text style={styles.featureDesc}>
                Send guidance requests, get resume feedback, and receive career advice.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureBullet}>
              <Text style={styles.featureIcon}>🔒</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Secure & Shared Backend</Text>
              <Text style={styles.featureDesc}>
                Native token storage via Expo SecureStore and enterprise session security.
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onNavigateToLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Sign In to Account</Text>
          </TouchableOpacity>

          <View style={styles.secondaryButtonGroup}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => onNavigateToRegister("STUDENT")}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>Student Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, styles.alumniButton]}
              onPress={() => onNavigateToRegister("ALUMNI")}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>Alumni Register</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerNote}>
          Independent student & alumni network. No third-party data tracking.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.page,
  },
  container: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[6],
    justifyContent: "space-between",
    minHeight: "100%",
  },
  heroSection: {
    marginTop: spacing[4],
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent.subtle,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radii.sm,
    marginBottom: spacing[3],
    borderWidth: 1,
    borderColor: colors.accent.DEFAULT + "20",
  },
  badgeText: {
    color: colors.accent.DEFAULT,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: typography.sizes["4xl"],
    fontWeight: "800",
    color: colors.primary.DEFAULT,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: typography.sizes.base,
    color: colors.secondary.DEFAULT,
    lineHeight: 22,
    marginTop: spacing[2],
  },
  featureList: {
    marginVertical: spacing[6],
    gap: spacing[3],
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    padding: spacing[4],
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  featureBullet: {
    width: 44,
    height: 44,
    borderRadius: radii.base,
    backgroundColor: colors.page,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing[3],
  },
  featureIcon: {
    fontSize: 22,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    color: colors.primary.DEFAULT,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    lineHeight: 18,
  },
  actionSection: {
    gap: spacing[3],
    marginTop: "auto",
  },
  primaryButton: {
    backgroundColor: colors.accent.DEFAULT,
    paddingVertical: spacing[4],
    borderRadius: radii.md,
    alignItems: "center",
  },
  primaryButtonText: {
    color: colors.accent.foreground,
    fontSize: typography.sizes.base,
    fontWeight: "700",
  },
  secondaryButtonGroup: {
    flexDirection: "row",
    gap: spacing[3],
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: spacing[3],
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  alumniButton: {
    borderColor: colors.primary.DEFAULT,
  },
  secondaryButtonText: {
    color: colors.primary.DEFAULT,
    fontSize: typography.sizes.sm,
    fontWeight: "600",
  },
  footerNote: {
    textAlign: "center",
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    marginTop: spacing[4],
  },
});
