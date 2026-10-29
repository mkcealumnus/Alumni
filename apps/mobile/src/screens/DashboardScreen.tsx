import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { colors, radii, spacing, typography } from "@alumnux/ui-tokens";
import { useMobileAuth } from "../context/AuthContext";

interface DashboardScreenProps {
  onNavigateTab: (tab: "dashboard" | "directory" | "mentorship" | "profile") => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onNavigateTab }) => {
  const { user, profile } = useMobileAuth();

  const isStudent = user?.role === "STUDENT";
  const isAlumni = user?.role === "ALUMNI";

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.page} />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Welcome Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>{user?.role || "STUDENT"}</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{user?.status || "ACTIVE"}</Text>
            </View>
          </View>
          <Text style={styles.greeting}>Hello, {profile?.fullName || "Member"}</Text>
          <Text style={styles.subtitle}>
            {profile?.headline || (isStudent ? "Student exploring career paths" : "Alumnus mentoring future leaders")}
          </Text>
        </View>

        {/* Profile Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardHeaderTitle}>Academic & Career Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Department</Text>
              <Text style={styles.summaryValue}>
                {profile?.departmentName || profile?.departmentCode || "General"}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Graduation</Text>
              <Text style={styles.summaryValue}>
                {profile?.graduationYear ? `Class of ${profile.graduationYear}` : "N/A"}
              </Text>
            </View>
            {isAlumni && (
              <>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Current Company</Text>
                  <Text style={styles.summaryValue}>{profile?.currentCompany || "Not set"}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Role</Text>
                  <Text style={styles.summaryValue}>{profile?.currentRole || "Professional"}</Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Quick Action Navigation Grid */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => onNavigateTab("directory")}
            activeOpacity={0.8}
          >
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>🔍</Text>
            </View>
            <Text style={styles.actionTitle}>Alumni Directory</Text>
            <Text style={styles.actionDesc}>
              Search and connect with verified graduates across industries.
            </Text>
            <Text style={styles.actionLink}>Explore Network →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => onNavigateTab("mentorship")}
            activeOpacity={0.8}
          >
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>🤝</Text>
            </View>
            <Text style={styles.actionTitle}>Mentorship Desk</Text>
            <Text style={styles.actionDesc}>
              {isStudent
                ? "Send guidance requests and track status updates."
                : "Review and respond to incoming guidance requests."}
            </Text>
            <Text style={styles.actionLink}>View Requests →</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => onNavigateTab("profile")}
            activeOpacity={0.8}
          >
            <View style={styles.actionIconContainer}>
              <Text style={styles.actionIcon}>👤</Text>
            </View>
            <Text style={styles.actionTitle}>My Profile</Text>
            <Text style={styles.actionDesc}>
              Update headline, biography, location, and session controls.
            </Text>
            <Text style={styles.actionLink}>Edit Profile →</Text>
          </TouchableOpacity>
        </View>

        {/* Security & System Status */}
        <View style={styles.systemBox}>
          <Text style={styles.systemTitle}>Security & Session Status</Text>
          <Text style={styles.systemDetail}>
            • Authenticated with rotating refresh tokens (SHA-256 hashed on MySQL server).
          </Text>
          <Text style={styles.systemDetail}>
            • Credentials stored natively via Expo SecureStore.
          </Text>
        </View>
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
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[5],
    gap: spacing[5],
  },
  header: {
    backgroundColor: colors.surface,
    padding: spacing[5],
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  roleBadge: {
    backgroundColor: colors.primary.DEFAULT,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: radii.sm,
  },
  roleBadgeText: {
    color: colors.primary.foreground,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.semantic.successSubtle,
    borderWidth: 1,
    borderColor: colors.semantic.successBorder,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: radii.sm,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.semantic.success,
  },
  statusText: {
    color: colors.semantic.success,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
  },
  greeting: {
    fontSize: typography.sizes["2xl"],
    fontWeight: "800",
    color: colors.primary.DEFAULT,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.secondary.DEFAULT,
    marginTop: spacing[1],
  },
  summaryCard: {
    backgroundColor: colors.surface,
    padding: spacing[4],
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeaderTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    color: colors.secondary.DEFAULT,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing[3],
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[4],
  },
  summaryItem: {
    width: "46%",
  },
  summaryLabel: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
  },
  summaryValue: {
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    color: colors.primary.DEFAULT,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: "700",
    color: colors.primary.DEFAULT,
  },
  actionsGrid: {
    gap: spacing[3],
  },
  actionCard: {
    backgroundColor: colors.surface,
    padding: spacing[4],
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: radii.base,
    backgroundColor: colors.accent.subtle,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing[2],
  },
  actionIcon: {
    fontSize: 18,
  },
  actionTitle: {
    fontSize: typography.sizes.base,
    fontWeight: "700",
    color: colors.primary.DEFAULT,
  },
  actionDesc: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    marginTop: 2,
    lineHeight: 18,
  },
  actionLink: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    color: colors.accent.DEFAULT,
    marginTop: spacing[2],
  },
  systemBox: {
    backgroundColor: colors.surface,
    padding: spacing[4],
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  systemTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    color: colors.secondary.DEFAULT,
    textTransform: "uppercase",
    marginBottom: spacing[2],
  },
  systemDetail: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    lineHeight: 18,
    marginTop: 2,
  },
});
