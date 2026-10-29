import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import { registerRootComponent } from "expo";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  BrutalBadge,
  Avatar,
} from "./src/design-system";
import { MobileAuthProvider, useMobileAuth } from "./src/context/AuthContext";
import { WelcomeScreen } from "./src/screens/WelcomeScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { RegisterScreen } from "./src/screens/RegisterScreen";
import { DashboardScreen } from "./src/screens/DashboardScreen";
import { DirectoryScreen } from "./src/screens/DirectoryScreen";
import { MentorshipScreen } from "./src/screens/MentorshipScreen";
import { CareersScreen } from "./src/screens/CareersScreen";
import { EventsScreen } from "./src/screens/EventsScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { AdminConsoleScreen } from "./src/screens/AdminConsoleScreen";
import type { Conversation } from "@alumnux/types";
import {
  MessagesScreen,
  ConversationScreen,
  useConversations,
} from "./src/features/messaging";

type AuthScreenState = "welcome" | "login" | "register";
export type AppTab =
  | "dashboard"
  | "directory"
  | "mentorship"
  | "messages"
  | "careers"
  | "events"
  | "profile"
  | "admin";

function NavigationRoot() {
  const { isAuthenticated, isLoading, user, profile } = useMobileAuth();

  // Auth flow navigation
  const [authScreen, setAuthScreen] = useState<AuthScreenState>("welcome");
  const [registerRole, setRegisterRole] = useState<"STUDENT" | "ALUMNI">("STUDENT");

  // Authenticated active tab & active 1-on-1 conversation
  const [activeTab, setActiveTab] = useState<AppTab>("dashboard");
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);

  // Background polling & conversations provider
  const { totalUnreadCount, startConversation } = useConversations();

  const handleOpenChatWithUser = async (
    participantId: string,
    topic?: string,
    mentorshipRequestId?: string
  ) => {
    try {
      const conv = await startConversation({
        participantId,
        topic,
        mentorshipRequestId,
      });
      setActiveConversation(conv);
    } catch (err) {
      console.warn("Could not initiate conversation:", err);
    }
  };

  // Session restoration loading screen
  if (isLoading) {
    return (
      <SafeAreaView style={styles.splashSafeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.splashContainer}>
          <View style={styles.splashCard}>
            <View style={styles.splashTag}>
              <Text style={styles.splashTagText}>// NATIVE INITIALIZATION</Text>
            </View>
            <Text style={styles.splashTitle}>ALUMNUX</Text>
            <Text style={styles.splashSubtitle}>
              Restoring authenticated tokens from Expo SecureStore...
            </Text>
            <View style={styles.splashSpinnerWrapper}>
              <ActivityIndicator size="large" color={BRUTAL_COLORS.INK} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Unauthenticated Public Flow
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

  // Authenticated Application Flow
  const isAdmin = user?.role === "ADMIN";
  const isAlumni = user?.role === "ALUMNI";

  // Build primary nano-brutalist navigation items:
  // 1. Home, 2. Directory, 3. Mentorship, 4. Messages, 5. Profile
  const navTabs: { id: AppTab; label: string; icon: string; badge?: number }[] = [
    { id: "dashboard", label: "HOME", icon: "⌂" },
    { id: "directory", label: "DIRECTORY", icon: "⚲" },
    { id: "mentorship", label: isAlumni ? "INBOX" : "MENTORS", icon: "🤝" },
    { id: "messages", label: "MESSAGES", icon: "💬", badge: totalUnreadCount },
    { id: "profile", label: "PROFILE", icon: "👤" },
    ...(isAdmin ? [{ id: "admin" as AppTab, label: "QUEUE", icon: "🛡" }] : []),
  ];

  // If a conversation is actively open, render full-screen 1-on-1 ConversationScreen
  if (activeConversation) {
    return (
      <SafeAreaView style={styles.mainSafeArea}>
        <StatusBar barStyle="dark-content" />
        <ConversationScreen
          conversation={activeConversation}
          onBack={() => setActiveConversation(null)}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.mainSafeArea}>
      <StatusBar barStyle="dark-content" />

      {/* Persistent Nano-Brutalist Header */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <Text style={styles.brandLogo}>ALUMNUX</Text>
          <View style={styles.networkTag}>
            <Text style={styles.networkTagText}>// MKCE</Text>
          </View>
          <BrutalBadge
            label={user?.role || "MEMBER"}
            variant={isAdmin ? "warning" : isAlumni ? "accent" : "neutral"}
          />
        </View>

        <TouchableOpacity
          onPress={() => setActiveTab("profile")}
          style={styles.avatarButton}
          activeOpacity={0.8}
        >
          <Avatar name={profile?.fullName || user?.email || "U"} size={32} />
        </TouchableOpacity>
      </View>

      {/* Active Screen View */}
      <View style={styles.screenContainer}>
        {activeTab === "dashboard" && (
          <DashboardScreen onNavigateTab={setActiveTab} />
        )}
        {activeTab === "directory" && (
          <DirectoryScreen onOpenChat={(userId) => handleOpenChatWithUser(userId)} />
        )}
        {activeTab === "mentorship" && (
          <MentorshipScreen
            onOpenChat={(partnerId, topic, reqId) =>
              handleOpenChatWithUser(partnerId, topic, reqId)
            }
          />
        )}
        {activeTab === "messages" && (
          <MessagesScreen onSelectConversation={setActiveConversation} />
        )}
        {activeTab === "careers" && <CareersScreen />}
        {activeTab === "events" && <EventsScreen />}
        {activeTab === "profile" && <ProfileScreen />}
        {activeTab === "admin" && <AdminConsoleScreen />}
      </View>

      {/* Persistent Bottom Tab Bar with Role-Aware Tabs & Unread Badge */}
      <View style={styles.tabBar}>
        <View style={styles.tabScrollContainer}>
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tabItem,
                  isActive && styles.tabItemActive,
                ]}
                onPress={() => {
                  setActiveConversation(null);
                  setActiveTab(tab.id);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.tabIconWrapper}>
                  <Text style={[styles.tabIcon, isActive && styles.tabIconActive]}>
                    {tab.icon}
                  </Text>
                  {tab.id === "messages" && (tab.badge ?? 0) > 0 && (
                    <View style={styles.tabBadge}>
                      <Text style={styles.tabBadgeText}>
                        {(tab.badge ?? 0) > 9 ? "9+" : tab.badge}
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.tabLabel,
                    isActive && styles.tabLabelActive,
                  ]}
                  numberOfLines={1}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
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
  mainSafeArea: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
  },
  splashSafeArea: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: BRUTAL_SPACING[6],
  },
  splashCard: {
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[6],
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    ...BRUTAL_SHADOWS.card,
  },
  splashTag: {
    backgroundColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 2,
    marginBottom: BRUTAL_SPACING[4],
  },
  splashTagText: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.ACCENT,
    letterSpacing: 1,
  },
  splashTitle: {
    fontSize: BRUTAL_TYPOGRAPHY["3xl"],
    fontWeight: BRUTAL_TYPOGRAPHY.black,
    color: BRUTAL_COLORS.INK,
    letterSpacing: -1,
    marginBottom: BRUTAL_SPACING[2],
  },
  splashSubtitle: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: BRUTAL_SPACING[4],
  },
  splashSpinnerWrapper: {
    padding: BRUTAL_SPACING[2],
  },
  topHeader: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: BRUTAL_SPACING[5],
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderBottomWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    ...BRUTAL_SHADOWS.subtle,
    zIndex: 10,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: BRUTAL_SPACING[2],
  },
  brandLogo: {
    fontSize: BRUTAL_TYPOGRAPHY.xl,
    fontWeight: BRUTAL_TYPOGRAPHY.black,
    color: BRUTAL_COLORS.INK,
    letterSpacing: -0.5,
  },
  networkTag: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: 1,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  networkTagText: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 0.5,
  },
  avatarButton: {
    padding: 2,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
  },
  tabBar: {
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderTopWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    paddingBottom: Platform.OS === "ios" ? 18 : 6,
    paddingTop: 6,
  },
  tabScrollContainer: {
    flexDirection: "row",
    paddingHorizontal: BRUTAL_SPACING[1],
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  tabItem: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: BRUTAL_SPACING[2],
    alignItems: "center",
    justifyContent: "center",
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: "transparent",
    marginHorizontal: 1,
  },
  tabItemActive: {
    backgroundColor: BRUTAL_COLORS.ACCENT,
    borderColor: BRUTAL_COLORS.INK,
    ...BRUTAL_SHADOWS.subtle,
  },
  tabIconWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    fontSize: 16,
    marginBottom: 2,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
  tabIconActive: {
    color: BRUTAL_COLORS.INK,
  },
  tabBadge: {
    position: "absolute",
    top: -4,
    right: -10,
    backgroundColor: BRUTAL_COLORS.ACCENT,
    borderWidth: 1.5,
    borderColor: BRUTAL_COLORS.INK,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  tabBadgeText: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.black,
    color: BRUTAL_COLORS.INK,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: BRUTAL_COLORS.INK,
  },
});
