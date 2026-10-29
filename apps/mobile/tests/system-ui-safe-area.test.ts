import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("System Status Bar, Navigation Bar & Safe Area Architecture", () => {
  const mobileDir = path.resolve(__dirname, "..");
  const appJsonPath = path.join(mobileDir, "app.json");
  const packageJsonPath = path.join(mobileDir, "package.json");

  it("configures app.json with androidStatusBar and androidNavigationBar", () => {
    const raw = fs.readFileSync(appJsonPath, "utf-8");
    const appConfig = JSON.parse(raw);
    const expo = appConfig.expo;

    expect(expo.androidStatusBar).toBeDefined();
    expect(expo.androidStatusBar.barStyle).toBe("dark-content");
    expect(expo.androidStatusBar.backgroundColor).toBe("#F7F6F2");
    expect(expo.androidStatusBar.translucent).toBe(true);

    expect(expo.androidNavigationBar).toBeDefined();
    expect(expo.androidNavigationBar.barStyle).toBe("dark-content");
    expect(expo.androidNavigationBar.backgroundColor).toBe("#FFFFFF");
  });

  it("includes required production dependencies in package.json", () => {
    const raw = fs.readFileSync(packageJsonPath, "utf-8");
    const pkg = JSON.parse(raw);

    expect(pkg.dependencies["react-native-safe-area-context"]).toBeDefined();
    expect(pkg.dependencies["expo-navigation-bar"]).toBeDefined();
    expect(pkg.dependencies["expo-status-bar"]).toBeDefined();
  });

  it("verifies App.tsx mounts SafeAreaProvider at the root", () => {
    const appContent = fs.readFileSync(path.join(mobileDir, "App.tsx"), "utf-8");
    expect(appContent).toContain("<SafeAreaProvider>");
    expect(appContent).toContain("</SafeAreaProvider>");
    expect(appContent).toContain("useSafeAreaInsets");
  });

  it("verifies screens use react-native-safe-area-context instead of legacy SafeAreaView", () => {
    const screensToCheck = [
      "src/screens/WelcomeScreen.tsx",
      "src/screens/LoginScreen.tsx",
      "src/screens/RegisterScreen.tsx",
      "src/features/messaging/screens/ConversationScreen.tsx",
    ];

    for (const screenPath of screensToCheck) {
      const fullPath = path.join(mobileDir, screenPath);
      const content = fs.readFileSync(fullPath, "utf-8");

      expect(content).toContain("react-native-safe-area-context");
      expect(content).toContain("useSafeAreaInsets");
      // Must not import SafeAreaView from "react-native"
      expect(content).not.toMatch(/from\s+["']react-native["'].*SafeAreaView/);
    }
  });

  it("verifies bottom tab bar uses dynamic bottom safe-area insets", () => {
    const appContent = fs.readFileSync(path.join(mobileDir, "App.tsx"), "utf-8");
    expect(appContent).toContain("paddingBottom: Math.max(insets.bottom, 6)");
  });

  it("verifies MessageComposer elevates above bottom navigation controls", () => {
    const composerContent = fs.readFileSync(
      path.join(mobileDir, "src/features/messaging/components/MessageComposer.tsx"),
      "utf-8"
    );
    expect(composerContent).toContain("useSafeAreaInsets");
    expect(composerContent).toContain("Math.max(insets.bottom, BRUTAL_SPACING[3])");
  });

  it("verifies modals apply bottom safe area insets to avoid button overlap", () => {
    const dirContent = fs.readFileSync(path.join(mobileDir, "src/screens/DirectoryScreen.tsx"), "utf-8");
    expect(dirContent).toContain("Math.max(insets.bottom, BRUTAL_SPACING[5])");

    const mentorContent = fs.readFileSync(path.join(mobileDir, "src/screens/MentorshipScreen.tsx"), "utf-8");
    expect(mentorContent).toContain("Math.max(insets.bottom, BRUTAL_SPACING[5])");

    const msgContent = fs.readFileSync(
      path.join(mobileDir, "src/features/messaging/screens/MessagesScreen.tsx"),
      "utf-8"
    );
    expect(msgContent).toContain("paddingBottom: insets.bottom");
  });
});
