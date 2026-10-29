import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { colors, radii, spacing, typography } from "@alumnux/ui-tokens";
import { useMobileAuth } from "../context/AuthContext";
import { mobileApi } from "../lib/api";

export const ProfileScreen: React.FC = () => {
  const { user, profile, logout, refreshProfile } = useMobileAuth();

  const [headline, setHeadline] = useState(profile?.headline || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [locationCity, setLocationCity] = useState(profile?.locationCity || "");
  const [currentCompany, setCurrentCompany] = useState(profile?.currentCompany || "");
  const [currentRole, setCurrentRole] = useState(profile?.currentRole || "");

  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await mobileApi.updateMe({
        headline: headline.trim() || undefined,
        bio: bio.trim() || undefined,
        locationCity: locationCity.trim() || undefined,
        currentCompany: currentCompany.trim() || undefined,
        currentRole: currentRole.trim() || undefined,
      });
      await refreshProfile();
      Alert.alert("Success", "Your profile details have been saved.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update profile.";
      Alert.alert("Update Error", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to end this session? Your refresh session will be revoked on the server.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              await logout();
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.page} />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Profile Card Header */}
        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(profile?.fullName || "U").charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.userName}>{profile?.fullName}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <View style={styles.badgeRow}>
              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText}>{user?.role}</Text>
              </View>
              <Text style={styles.deptBadge}>
                {profile?.departmentName || profile?.departmentCode || "General"}
              </Text>
            </View>
          </View>
        </View>

        {/* Edit Profile Form */}
        <View style={styles.formSection}>
          <Text style={styles.sectionHeader}>Edit Public Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Professional Headline</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. AI Researcher | Former Systems Engineer"
              placeholderTextColor={colors.secondary.DEFAULT + "80"}
              value={headline}
              onChangeText={setHeadline}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Biography / Overview</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Share your interests, career path, or advice for juniors..."
              placeholderTextColor={colors.secondary.DEFAULT + "80"}
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City / Location</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Bengaluru, India"
              placeholderTextColor={colors.secondary.DEFAULT + "80"}
              value={locationCity}
              onChangeText={setLocationCity}
            />
          </View>

          {user?.role === "ALUMNI" && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Current Employer / Company</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Microsoft"
                  placeholderTextColor={colors.secondary.DEFAULT + "80"}
                  value={currentCompany}
                  onChangeText={setCurrentCompany}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Job Title / Designation</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Senior Software Engineer"
                  placeholderTextColor={colors.secondary.DEFAULT + "80"}
                  value={currentRole}
                  onChangeText={setCurrentRole}
                />
              </View>
            </>
          )}

          <TouchableOpacity
            style={[styles.saveButton, isSaving && styles.disabledButton]}
            onPress={handleSaveProfile}
            disabled={isSaving}
            activeOpacity={0.85}
          >
            {isSaving ? (
              <ActivityIndicator color={colors.accent.foreground} size="small" />
            ) : (
              <Text style={styles.saveButtonText}>Save Profile Changes</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Security & Account Controls */}
        <View style={styles.accountSection}>
          <Text style={styles.sectionHeader}>Session Security</Text>
          <Text style={styles.accountNote}>
            User ID: {user?.id}
          </Text>
          <Text style={styles.accountNote}>
            Account Status: {user?.status}
          </Text>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={isLoggingOut}
            activeOpacity={0.85}
          >
            {isLoggingOut ? (
              <ActivityIndicator color={colors.semantic.error} size="small" />
            ) : (
              <Text style={styles.logoutButtonText}>Revoke Session & Sign Out</Text>
            )}
          </TouchableOpacity>
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
    gap: spacing[4],
  },
  headerCard: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    padding: spacing[4],
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    gap: spacing[3],
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radii.base,
    backgroundColor: colors.accent.DEFAULT,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: typography.sizes["2xl"],
    fontWeight: "800",
    color: colors.accent.foreground,
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.sizes.lg,
    fontWeight: "800",
    color: colors.primary.DEFAULT,
  },
  userEmail: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    marginTop: 1,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    marginTop: spacing[2],
  },
  roleBadge: {
    backgroundColor: colors.primary.DEFAULT,
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  roleBadgeText: {
    color: colors.primary.foreground,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
  },
  deptBadge: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
  },
  formSection: {
    backgroundColor: colors.surface,
    padding: spacing[4],
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing[3],
  },
  sectionHeader: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    color: colors.secondary.DEFAULT,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: "600",
    color: colors.primary.DEFAULT,
  },
  input: {
    backgroundColor: colors.page,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.base,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    fontSize: typography.sizes.sm,
    color: colors.primary.DEFAULT,
  },
  textArea: {
    height: 80,
  },
  saveButton: {
    backgroundColor: colors.accent.DEFAULT,
    paddingVertical: spacing[3],
    borderRadius: radii.base,
    alignItems: "center",
    marginTop: spacing[2],
  },
  saveButtonText: {
    color: colors.accent.foreground,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.7,
  },
  accountSection: {
    backgroundColor: colors.surface,
    padding: spacing[4],
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing[2],
  },
  accountNote: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
  },
  logoutButton: {
    marginTop: spacing[3],
    backgroundColor: colors.semantic.errorSubtle,
    borderWidth: 1,
    borderColor: colors.semantic.errorBorder,
    paddingVertical: spacing[3],
    borderRadius: radii.base,
    alignItems: "center",
  },
  logoutButtonText: {
    color: colors.semantic.error,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
  },
});
