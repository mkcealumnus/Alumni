import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { registerRootComponent } from "expo";
import { colors, radii, spacing, typography } from "@alumnux/ui-tokens";
import { MobileAuthProvider, useMobileAuth } from "./src/context/AuthContext";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { RegisterScreen } from "./src/screens/RegisterScreen";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { DirectoryScreen } from "./src/screens/DirectoryScreen";
import { MentorshipScreen } from "./src/screens/MentorshipScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";

type AuthScreenState = "welcome" | "login" | "register";
type AppTab = "dashboard" | "directory" | "mentorship" | "profile";

function NavigationRoot() {
  const { isAuthenticated, isLoading, user } = useMobileAuth();

  // Auth flow state
  const [authScreen, setAuthScreen] = useState<AuthScreenState>("welcome");
  const [registerRole, setRegisterRole] = useState<"STUDENT" | "ALUMNI">("STUDENT");

  // Authenticated tab state
  const [activeTab, setActiveTab] = useState<AppTab>("dashboard");

  if (isLoading) {
    return (
      <SafeAreaView style={styles.splashContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.splashCard}>
          <Text style={styles.splashTitle}>Alumnux</Text>
          <Text style={styles.splashSubtitle}>
            Restoring native session credentials...
          </Text>
          <ActivityIndicator
            size="large"
            color={colors.accent.DEFAULT}
            style={styles.splashSpinner}
          />
        </View>
      </SafeAreaView>
    );
  }

  // Unauthenticated Flow
  if (!isAuthenticated) {
    if (authScreen === "login") {
      return (
        <LoginScreen
          onBack={() => setAuthScreen("welcome")}
          onNavigateToRegister={() => {
            setRegisterRole("STUDENT");
            setAuthScreen("register");
          }}
        />
      );
    }

    if (authScreen === "register") {
      return (
        <RegisterScreen
          initialRole={registerRole}
          onBack={() => setAuthScreen("welcome")}
          onNavigateToLogin={() => setAuthScreen("login")}
        />
      );
    }

    return (
      <WelcomeScreen
        onNavigateToLogin={() => setAuthScreen("login")}
        onNavigateToRegister={(role = "STUDENT") => {
          setRegisterRole(role);
          setAuthScreen("register");
        }}
      />
    );
  }

  // Authenticated Navigation Flow
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />

      {/* Persistent App Header */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <Text style={styles.brandText}>Alumnux</Text>
          <View style={styles.roleChip}>
            <Text style={styles.roleChipText}>{user?.role}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setActiveTab("profile")}
          style={styles.headerProfileBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.headerAvatarText}>
            {(user?.email || "U").charAt(0).toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Screen Container */}
      <View style={styles.screenContainer}>
        {activeTab === "dashboard" && <DashboardScreen onNavigateTab={setActiveTab} />}
        {activeTab === "directory" && <DirectoryScreen />}
        {activeTab === "mentorship" && <MentorshipScreen />}
        {activeTab === "profile" && <ProfileScreen />}
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "dashboard" && styles.tabItemActive]}
          onPress={() => setActiveTab("dashboard")}
          activeOpacity={0.7}
        >
          <Text style={styles.tabIcon}>🏠</Text>
          <Text
            style={[
              styles.tabLabel,
              activeTab === "dashboard" && styles.tabLabelActive,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === "directory" && styles.tabItemActive]}
          onPress={() => setActiveTab("directory")}
          activeOpacity={0.7}
        >
          <Text style={styles.tabIcon}>🔍</Text>
          <Text
            style={[
              styles.tabLabel,
              activeTab === "directory" && styles.tabLabelActive,
            ]}
          >
            Directory
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === "mentorship" && styles.tabItemActive]}
          onPress={() => setActiveTab("mentorship")}
          activeOpacity={0.7}
        >
          <Text style={styles.tabIcon}>🤝</Text>
          <Text
            style={[
              styles.tabLabel,
              activeTab === "mentorship" && styles.tabLabelActive,
            ]}
          >
            Mentorship
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === "profile" && styles.tabItemActive]}
          onPress={() => setActiveTab("profile")}
          activeOpacity={0.7}
        >
          <Text style={styles.tabIcon}>👤</Text>
          <Text
            style={[
              styles.tabLabel,
              activeTab === "profile" && styles.tabLabelActive,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <MobileAuthProvider>
      <NavigationRoot />
    </MobileAuthProvider>
  );
}

registerRootComponent(App);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.page,
  },
  splashContainer: {
    flex: 1,
    backgroundColor: colors.page,
    justifyContent: "center",
    alignItems: "center",
  },
  splashCard: {
    backgroundColor: colors.surface,
    padding: spacing[6],
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    width: "85%",
    maxWidth: 360,
  },
  splashTitle: {
    fontSize: typography.sizes["3xl"],
    fontWeight: "800",
    color: colors.primary.DEFAULT,
  },
  splashSubtitle: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    marginTop: spacing[1],
  },
  splashSpinner: {
    marginTop: spacing[5],
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  brandText: {
    fontSize: typography.sizes.lg,
    fontWeight: "800",
    color: colors.primary.DEFAULT,
  },
  roleChip: {
    backgroundColor: colors.accent.subtle,
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  roleChipText: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    color: colors.accent.DEFAULT,
  },
  headerProfileBtn: {
    width: 32,
    height: 32,
    borderRadius: radii.full,
    backgroundColor: colors.primary.DEFAULT,
    justifyContent: "center",
    alignItems: "center",
  },
  headerAvatarText: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    color: colors.primary.foreground,
  },
  screenContainer: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing[2],
    paddingBottom: spacing[3],
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  tabItemActive: {
    opacity: 1,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    fontWeight: "600",
  },
  tabLabelActive: {
    color: colors.accent.DEFAULT,
    fontWeight: "700",
  },
});
