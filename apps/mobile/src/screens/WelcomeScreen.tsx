import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  BrutalButton,
  BrutalCard,
  BrutalBadge,
} from "../design-system";
import { useMobileAuth } from "../context/AuthContext";

interface WelcomeScreenProps {
  onNavigateToLogin: () => void;
  onNavigateToRegister: (role?: "STUDENT" | "ALUMNI") => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigateToLogin,
  onNavigateToRegister,
}) => {
  const { loginAsDemo } = useMobileAuth();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, BRUTAL_SPACING[8]) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Tag */}
        <View style={styles.topBar}>
          <BrutalBadge label="INDEPENDENT ALUMNI PLATFORM" variant="accent" />
          <Text style={styles.versionTag}>v2.0-NANO</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.brandTitle}>ALUMNUX</Text>
          <Text style={styles.brandTagline}>
            YOUR NETWORK.{"\n"}YOUR NEXT CHAPTER.
          </Text>
        </View>

        {/* Acid Lime Statement Card */}
        <BrutalCard variant="accent" padding={5} style={styles.statementCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTag}>// VERIFIED COMMUNITY</Text>
            <View style={styles.dotIndicator} />
          </View>
          <Text style={styles.statementText}>
            Direct 1-on-1 industry mentorship, off-campus referrals, and lifelong alumni collaboration.
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>VERIFIED</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1-on-1</Text>
              <Text style={styles.statLabel}>GUIDANCE</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>ZERO</Text>
              <Text style={styles.statLabel}>SPAM ADS</Text>
            </View>
          </View>
        </BrutalCard>

        {/* Core Pillars Feature List */}
        <View style={styles.pillarsSection}>
          <View style={styles.pillarRow}>
            <View style={styles.pillarBullet}>
              <Text style={styles.pillarBulletText}>01</Text>
            </View>
            <View style={styles.pillarTextGroup}>
              <Text style={styles.pillarTitle}>Alumni Discovery</Text>
              <Text style={styles.pillarDesc}>
                Search senior alumni across Google, AWS, Stripe, and Zoho by department and graduation year.
              </Text>
            </View>
          </View>

          <View style={styles.pillarRow}>
            <View style={styles.pillarBullet}>
              <Text style={styles.pillarBulletText}>02</Text>
            </View>
            <View style={styles.pillarTextGroup}>
              <Text style={styles.pillarTitle}>Structured Mentorship</Text>
              <Text style={styles.pillarDesc}>
                Send guidance requests with custom topics, resume critiques, and interview preparation.
              </Text>
            </View>
          </View>

          <View style={styles.pillarRow}>
            <View style={styles.pillarBullet}>
              <Text style={styles.pillarBulletText}>03</Text>
            </View>
            <View style={styles.pillarTextGroup}>
              <Text style={styles.pillarTitle}>Referral Opportunities</Text>
              <Text style={styles.pillarDesc}>
                Browse verified campus job referral listings with direct contact to alumni referrers.
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons Section */}
        <View style={styles.actionsSection}>
          <BrutalButton
            title="SIGN IN WITH ACCOUNT"
            onPress={onNavigateToLogin}
            variant="primary"
            fullWidth
          />

          <View style={styles.splitButtonRow}>
            <View style={styles.splitButtonCol}>
              <BrutalButton
                title="STUDENT JOIN"
                onPress={() => onNavigateToRegister("STUDENT")}
                variant="secondary"
                size="compact"
                fullWidth
              />
            </View>
            <View style={styles.splitButtonCol}>
              <BrutalButton
                title="ALUMNI JOIN"
                onPress={() => onNavigateToRegister("ALUMNI")}
                variant="secondary"
                size="compact"
                fullWidth
              />
            </View>
          </View>

          {/* Quick Demo Launch Bar */}
          <View style={styles.demoBox}>
            <Text style={styles.demoBoxTitle}>// 1-CLICK INSTANT PREVIEW</Text>
            <View style={styles.demoButtonsRow}>
              <BrutalButton
                title="STUDENT"
                onPress={() => loginAsDemo("STUDENT")}
                variant="dark"
                size="small"
                style={styles.demoBtn}
              />
              <BrutalButton
                title="ALUMNI"
                onPress={() => loginAsDemo("ALUMNI")}
                variant="dark"
                size="small"
                style={styles.demoBtn}
              />
              <BrutalButton
                title="TRUSTEE"
                onPress={() => loginAsDemo("ADMIN")}
                variant="dark"
                size="small"
                style={styles.demoBtn}
              />
            </View>
          </View>
        </View>

        <Text style={styles.footerCaption}>
          Alumnux Independent Community • Anna University Affiliated
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingTop: BRUTAL_SPACING[4],
    paddingBottom: BRUTAL_SPACING[8],
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[5],
  },
  versionTag: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    letterSpacing: 1,
  },
  heroSection: {
    marginBottom: BRUTAL_SPACING[4],
  },
  brandTitle: {
    fontSize: 44,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    letterSpacing: -1.5,
    lineHeight: 46,
  },
  brandTagline: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.lg,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.textSecondary,
    letterSpacing: 0.5,
    marginTop: BRUTAL_SPACING[2],
    lineHeight: 24,
  },
  statementCard: {
    marginVertical: BRUTAL_SPACING[3],
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[2],
  },
  cardTag: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    letterSpacing: 1,
    color: BRUTAL_COLORS.ink,
  },
  dotIndicator: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: BRUTAL_COLORS.ink,
  },
  statementText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.base,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.ink,
    lineHeight: 22,
    marginBottom: BRUTAL_SPACING[4],
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.thin,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    paddingVertical: BRUTAL_SPACING[2],
    paddingHorizontal: BRUTAL_SPACING[3],
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.base,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
  },
  statLabel: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.textSecondary,
    letterSpacing: 0.5,
    marginTop: 1,
  },
  statDivider: {
    width: 1.5,
    height: 24,
    backgroundColor: BRUTAL_COLORS.ink,
  },
  pillarsSection: {
    marginVertical: BRUTAL_SPACING[4],
    gap: BRUTAL_SPACING[3],
  },
  pillarRow: {
    flexDirection: "row",
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.thin,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[3],
    alignItems: "center",
    ...BRUTAL_SHADOWS.sm,
  },
  pillarBullet: {
    width: 36,
    height: 36,
    backgroundColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.micro,
    justifyContent: "center",
    alignItems: "center",
    marginRight: BRUTAL_SPACING[3],
  },
  pillarBulletText: {
    color: BRUTAL_COLORS.accent,
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
  },
  pillarTextGroup: {
    flex: 1,
  },
  pillarTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
  },
  pillarDesc: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.textSecondary,
    lineHeight: 17,
    marginTop: 2,
  },
  actionsSection: {
    marginTop: BRUTAL_SPACING[3],
    gap: BRUTAL_SPACING[3],
  },
  splitButtonRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[3],
  },
  splitButtonCol: {
    flex: 1,
  },
  demoBox: {
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[3],
    marginTop: BRUTAL_SPACING[2],
    ...BRUTAL_SHADOWS.sm,
  },
  demoBoxTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    letterSpacing: 1,
    marginBottom: BRUTAL_SPACING[2],
  },
  demoButtonsRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
  },
  demoBtn: {
    flex: 1,
  },
  footerCaption: {
    textAlign: "center",
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    color: BRUTAL_COLORS.textSecondary,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.medium,
    marginTop: BRUTAL_SPACING[6],
  },
});
