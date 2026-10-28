import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { colors, radii, spacing, typography } from "@alumnux/ui-tokens";
import type { UserRole, HealthCheckResponse } from "@alumnux/types";

export default function App() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000";
  const [selectedRole, setSelectedRole] = useState<UserRole>("STUDENT");
  const [apiStatus, setApiStatus] = useState<string>("checking...");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkApiHealth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/health`);
      if (response.ok) {
        const data: HealthCheckResponse = await response.json();
        setApiStatus(`Connected (${data.status.toUpperCase()} - v${data.version})`);
      } else {
        setApiStatus(`HTTP ${response.status}`);
      }
    } catch {
      setApiStatus("API Offline / Unreachable");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkApiHealth();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.page} />
      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PHASE 1 FOUNDATION</Text>
        </View>

        <Text style={styles.title}>Alumnux Mobile</Text>
        <Text style={styles.subtitle}>
          Independent Alumni & Student Career Guidance Platform
        </Text>

        <View style={styles.divider} />

        <View style={styles.infoSection}>
          <Text style={styles.label}>Configured API Base URL:</Text>
          <Text style={styles.value}>{apiUrl}</Text>

          <Text style={[styles.label, { marginTop: spacing[3] }]}>API Health Status:</Text>
          <View style={styles.statusRow}>
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.accent.DEFAULT} />
            ) : (
              <Text style={styles.statusText}>{apiStatus}</Text>
            )}
          </View>
        </View>

        <View style={styles.roleSelector}>
          <Text style={styles.label}>Select Workspace Preview Role:</Text>
          <View style={styles.buttonGroup}>
            {(["STUDENT", "ALUMNI", "ADMIN"] as const).map((role) => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.roleButton,
                  selectedRole === role && styles.roleButtonActive,
                ]}
                onPress={() => setSelectedRole(role)}
              >
                <Text
                  style={[
                    styles.roleButtonText,
                    selectedRole === role && styles.roleButtonTextActive,
                  ]}
                >
                  {role}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.refreshButton} onPress={checkApiHealth}>
          <Text style={styles.refreshButtonText}>Refresh API Health</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.page,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing[4],
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing[6],
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.accent.subtle,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: radii.sm,
    marginBottom: spacing[2],
  },
  badgeText: {
    color: colors.accent.DEFAULT,
    fontSize: typography.sizes.xs,
    fontWeight: "600",
  },
  title: {
    fontSize: typography.sizes["2xl"],
    fontWeight: "700",
    color: colors.primary.DEFAULT,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.secondary.DEFAULT,
    marginTop: spacing[1],
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing[4],
  },
  infoSection: {
    backgroundColor: colors.page,
    padding: spacing[3],
    borderRadius: radii.base,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  value: {
    fontSize: typography.sizes.sm,
    color: colors.primary.DEFAULT,
    marginTop: spacing[1],
    fontFamily: "monospace",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing[1],
  },
  statusText: {
    fontSize: typography.sizes.sm,
    fontWeight: "500",
    color: colors.semantic.success,
  },
  roleSelector: {
    marginTop: spacing[4],
  },
  buttonGroup: {
    flexDirection: "row",
    gap: spacing[2],
    marginTop: spacing[2],
  },
  roleButton: {
    flex: 1,
    paddingVertical: spacing[2],
    borderRadius: radii.base,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
  },
  roleButtonActive: {
    backgroundColor: colors.primary.DEFAULT,
    borderColor: colors.primary.DEFAULT,
  },
  roleButtonText: {
    fontSize: typography.sizes.xs,
    fontWeight: "600",
    color: colors.primary.DEFAULT,
  },
  roleButtonTextActive: {
    color: colors.primary.foreground,
  },
  refreshButton: {
    marginTop: spacing[5],
    backgroundColor: colors.accent.DEFAULT,
    paddingVertical: spacing[3],
    borderRadius: radii.base,
    alignItems: "center",
  },
  refreshButtonText: {
    color: colors.accent.foreground,
    fontWeight: "600",
    fontSize: typography.sizes.sm,
  },
});
