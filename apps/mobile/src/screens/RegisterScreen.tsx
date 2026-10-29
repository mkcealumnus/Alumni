import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { colors, radii, spacing, typography } from "@alumnux/ui-tokens";
import { ALLOWED_DEPARTMENTS } from "@alumnux/schemas";
import { useMobileAuth } from "../context/AuthContext";

interface RegisterScreenProps {
  initialRole?: "STUDENT" | "ALUMNI";
  onBack: () => void;
  onNavigateToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  initialRole = "STUDENT",
  onBack,
  onNavigateToLogin,
}) => {
  const { signup } = useMobileAuth();
  const [role, setRole] = useState<"STUDENT" | "ALUMNI">(initialRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [departmentCode, setDepartmentCode] = useState<string>(ALLOWED_DEPARTMENTS[0]);
  const [graduationYear, setGraduationYear] = useState(
    role === "STUDENT" ? "2026" : "2020"
  );
  const [currentCompany, setCurrentCompany] = useState("");
  const [currentRole, setCurrentRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRoleChange = (newRole: "STUDENT" | "ALUMNI") => {
    setRole(newRole);
    setGraduationYear(newRole === "STUDENT" ? "2026" : "2020");
    if (errorMessage) setErrorMessage(null);
  };

  const handleRegister = async () => {
    setErrorMessage(null);

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const gradYearNum = parseInt(graduationYear, 10);

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }
    if (isNaN(gradYearNum) || gradYearNum < 1970 || gradYearNum > 2035) {
      setErrorMessage("Please enter a valid 4-digit graduation year.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup({
        email: trimmedEmail,
        password,
        role,
        fullName: trimmedName,
        departmentCode,
        graduationYear: gradYearNum,
        currentCompany: role === "ALUMNI" && currentCompany.trim() ? currentCompany.trim() : undefined,
        currentRole: role === "ALUMNI" && currentRole.trim() ? currentRole.trim() : undefined,
      });

      if (!result.success) {
        setErrorMessage(result.error || "Registration could not be completed.");
      }
      // On success, AuthContext triggers authenticated tab switch
    } catch {
      setErrorMessage("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top navigation */}
          <View style={styles.navBar}>
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join the official Alumnux community network.
            </Text>
          </View>

          {/* Role Switcher */}
          <View style={styles.roleTabs}>
            <TouchableOpacity
              style={[styles.roleTab, role === "STUDENT" && styles.roleTabActive]}
              onPress={() => handleRoleChange("STUDENT")}
              activeOpacity={0.8}
            >
              <Text style={[styles.roleTabText, role === "STUDENT" && styles.roleTabTextActive]}>
                Student
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleTab, role === "ALUMNI" && styles.roleTabActive]}
              onPress={() => handleRoleChange("ALUMNI")}
              activeOpacity={0.8}
            >
              <Text style={[styles.roleTabText, role === "ALUMNI" && styles.roleTabTextActive]}>
                Alumni / Graduate
              </Text>
            </TouchableOpacity>
          </View>

          {/* Error Banner */}
          {errorMessage && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{errorMessage}</Text>
            </View>
          )}

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Jane Doe"
                placeholderTextColor={colors.secondary.DEFAULT + "80"}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder={role === "STUDENT" ? "student@mkce.ac.in" : "alumni@company.com"}
                placeholderTextColor={colors.secondary.DEFAULT + "80"}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password (min 8 chars)</Text>
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <Text style={styles.visibilityToggle}>
                    {isPasswordVisible ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                placeholderTextColor={colors.secondary.DEFAULT + "80"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            {/* Department selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Academic Department</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.deptScroll}>
                <View style={styles.deptChipRow}>
                  {ALLOWED_DEPARTMENTS.map((dept) => {
                    const isSelected = departmentCode === dept;
                    return (
                      <TouchableOpacity
                        key={dept}
                        style={[styles.deptChip, isSelected && styles.deptChipActive]}
                        onPress={() => setDepartmentCode(dept)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.deptChipText, isSelected && styles.deptChipTextActive]}>
                          {dept}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            {/* Graduation Year */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Graduation Year</Text>
              <TextInput
                style={styles.input}
                placeholder="2026"
                placeholderTextColor={colors.secondary.DEFAULT + "80"}
                value={graduationYear}
                onChangeText={setGraduationYear}
                keyboardType="numeric"
                maxLength={4}
                editable={!isLoading}
              />
            </View>

            {/* Alumni-specific fields */}
            {role === "ALUMNI" && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Current Company / Employer</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Google, Zoho, Tata Elxsi"
                    placeholderTextColor={colors.secondary.DEFAULT + "80"}
                    value={currentCompany}
                    onChangeText={setCurrentCompany}
                    editable={!isLoading}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Current Job Title / Designation</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Senior Software Engineer"
                    placeholderTextColor={colors.secondary.DEFAULT + "80"}
                    value={currentRole}
                    onChangeText={setCurrentRole}
                    editable={!isLoading}
                  />
                </View>
              </>
            )}

            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.accent.foreground} size="small" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {role === "STUDENT" ? "Complete Student Registration" : "Join as Alumni"}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Switch to login */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={onNavigateToLogin} activeOpacity={0.7}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.page,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[8],
  },
  navBar: {
    paddingVertical: spacing[3],
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: spacing[1],
  },
  backButtonText: {
    fontSize: typography.sizes.sm,
    color: colors.primary.DEFAULT,
    fontWeight: "600",
  },
  header: {
    marginTop: spacing[2],
    marginBottom: spacing[4],
  },
  title: {
    fontSize: typography.sizes["3xl"],
    fontWeight: "800",
    color: colors.primary.DEFAULT,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
    color: colors.secondary.DEFAULT,
    marginTop: spacing[1],
  },
  roleTabs: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing[1],
    marginBottom: spacing[5],
  },
  roleTab: {
    flex: 1,
    paddingVertical: spacing[2],
    alignItems: "center",
    borderRadius: radii.base,
  },
  roleTabActive: {
    backgroundColor: colors.primary.DEFAULT,
  },
  roleTabText: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    color: colors.secondary.DEFAULT,
  },
  roleTabTextActive: {
    color: colors.primary.foreground,
  },
  errorBanner: {
    backgroundColor: colors.semantic.errorSubtle,
    borderWidth: 1,
    borderColor: colors.semantic.errorBorder,
    borderRadius: radii.base,
    padding: spacing[3],
    marginBottom: spacing[4],
  },
  errorBannerText: {
    color: colors.semantic.error,
    fontSize: typography.sizes.sm,
    fontWeight: "500",
  },
  form: {
    gap: spacing[4],
  },
  inputGroup: {
    gap: spacing[1],
  },
  label: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    color: colors.primary.DEFAULT,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  visibilityToggle: {
    fontSize: typography.sizes.xs,
    fontWeight: "600",
    color: colors.accent.DEFAULT,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    fontSize: typography.sizes.base,
    color: colors.primary.DEFAULT,
  },
  deptScroll: {
    marginTop: spacing[1],
  },
  deptChipRow: {
    flexDirection: "row",
    gap: spacing[2],
  },
  deptChip: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  deptChipActive: {
    backgroundColor: colors.accent.DEFAULT,
    borderColor: colors.accent.DEFAULT,
  },
  deptChipText: {
    fontSize: typography.sizes.xs,
    fontWeight: "600",
    color: colors.primary.DEFAULT,
  },
  deptChipTextActive: {
    color: colors.accent.foreground,
  },
  submitButton: {
    backgroundColor: colors.accent.DEFAULT,
    paddingVertical: spacing[4],
    borderRadius: radii.md,
    alignItems: "center",
    marginTop: spacing[3],
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: colors.accent.foreground,
    fontSize: typography.sizes.base,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing[6],
  },
  footerText: {
    fontSize: typography.sizes.sm,
    color: colors.secondary.DEFAULT,
  },
  loginLink: {
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    color: colors.accent.DEFAULT,
  },
});
