import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  ScreenHeader,
  BrutalButton,
  BrutalInput,
  BrutalCard,
  BrutalBadge,
} from "../design-system";
import { useMobileAuth } from "../context/AuthContext";
import { signupSchema } from "@alumnux/schemas";

interface RegisterScreenProps {
  initialRole?: "STUDENT" | "ALUMNI";
  onBack: () => void;
  onNavigateToLogin: () => void;
}

const DEPARTMENTS = [
  { code: "CSE", name: "Computer Science & Engineering" },
  { code: "IT", name: "Information Technology" },
  { code: "ECE", name: "Electronics & Communication" },
  { code: "EEE", name: "Electrical & Electronics" },
  { code: "MECH", name: "Mechanical Engineering" },
  { code: "AIDS", name: "AI & Data Science" },
];

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
  const [departmentCode, setDepartmentCode] = useState("CSE");
  const [graduationYear, setGraduationYear] = useState("2026");
  const [rollNumber, setRollNumber] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [currentRole, setCurrentRole] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setErrorMessage(null);

    const yearNum = parseInt(graduationYear, 10) || 2026;
    const payload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
      role,
      departmentCode,
      graduationYear: yearNum,
      ...(role === "STUDENT" && rollNumber.trim() ? { rollNumber: rollNumber.trim() } : {}),
      ...(role === "ALUMNI" && currentCompany.trim() ? { currentCompany: currentCompany.trim() } : {}),
      ...(role === "ALUMNI" && currentRole.trim() ? { currentRole: currentRole.trim() } : {}),
    };

    // Client-side schema validation
    const validation = signupSchema.safeParse(payload);
    if (!validation.success) {
      const firstIssue = validation.error.issues[0]?.message || "Validation failed. Please verify your details.";
      setErrorMessage(firstIssue);
      return;
    }

    setIsLoading(true);
    const result = await signup(payload);
    setIsLoading(false);

    if (!result.success) {
      setErrorMessage(result.error || "Registration failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardContainer}
      >
        <ScreenHeader
          title="CREATE ACCOUNT"
          subtitle="Join the verified community of students and alumni"
          onBack={onBack}
          categoryTag="REGISTRATION INTAKE"
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Error Banner */}
          {errorMessage && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorIcon}>⚠</Text>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          {/* Role Selector Tabs */}
          <View style={styles.roleSelectorBox}>
            <Text style={styles.roleSelectorTitle}>SELECT YOUR ROLE TYPE</Text>
            <View style={styles.roleTabsRow}>
              <TouchableOpacity
                style={[
                  styles.roleTab,
                  role === "STUDENT" && styles.roleTabActiveStudent,
                ]}
                onPress={() => setRole("STUDENT")}
                activeOpacity={0.8}
              >
                <Text style={styles.roleEmoji}>🎓</Text>
                <Text
                  style={[
                    styles.roleTabText,
                    role === "STUDENT" && styles.roleTabTextActive,
                  ]}
                >
                  CURRENT STUDENT
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleTab,
                  role === "ALUMNI" && styles.roleTabActiveAlumni,
                ]}
                onPress={() => setRole("ALUMNI")}
                activeOpacity={0.8}
              >
                <Text style={styles.roleEmoji}>💼</Text>
                <Text
                  style={[
                    styles.roleTabText,
                    role === "ALUMNI" && styles.roleTabTextActive,
                  ]}
                >
                  GRADUATED ALUMNI
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Fields Card */}
          <BrutalCard variant="surface" padding={5} style={styles.formCard}>
            <BrutalInput
              label="FULL NAME"
              placeholder="e.g. Priyadharshini Ramesh"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              required
            />

            <BrutalInput
              label="INSTITUTIONAL EMAIL"
              placeholder="name@student.demo or user@company.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              required
            />

            <BrutalInput
              label="CREATE PASSWORD (MIN 8 CHARS)"
              placeholder="••••••••••••"
              value={password}
              onChangeText={setPassword}
              isPassword
              helperText="Must include uppercase, lowercase, and numbers"
              required
            />

            {/* Department Selection Pills */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>ENGINEERING DEPARTMENT *</Text>
              <View style={styles.deptPillsRow}>
                {DEPARTMENTS.map((dept) => {
                  const isSelected = departmentCode === dept.code;
                  return (
                    <TouchableOpacity
                      key={dept.code}
                      style={[
                        styles.deptPill,
                        isSelected && styles.deptPillSelected,
                      ]}
                      onPress={() => setDepartmentCode(dept.code)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.deptPillText,
                          isSelected && styles.deptPillTextSelected,
                        ]}
                      >
                        {dept.code}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <BrutalInput
              label={role === "STUDENT" ? "EXPECTED GRADUATION YEAR" : "PASSED OUT YEAR"}
              placeholder={role === "STUDENT" ? "2026" : "2019"}
              value={graduationYear}
              onChangeText={setGraduationYear}
              keyboardType="number-pad"
              required
            />

            {role === "STUDENT" ? (
              <BrutalInput
                label="COLLEGE ROLL NUMBER"
                placeholder="e.g. 2022CSE1084"
                value={rollNumber}
                onChangeText={setRollNumber}
                autoCapitalize="characters"
              />
            ) : (
              <>
                <BrutalInput
                  label="CURRENT COMPANY / EMPLOYER"
                  placeholder="e.g. Google, Stripe, Zoho"
                  value={currentCompany}
                  onChangeText={setCurrentCompany}
                />
                <BrutalInput
                  label="PROFESSIONAL ROLE TITLE"
                  placeholder="e.g. Senior Software Engineer"
                  value={currentRole}
                  onChangeText={setCurrentRole}
                />
              </>
            )}

            <BrutalButton
              title="COMPLETE REGISTRATION"
              onPress={handleSubmit}
              loading={isLoading}
              variant="primary"
              fullWidth
              style={styles.submitBtn}
            />
          </BrutalCard>

          {/* Switch to Login */}
          <View style={styles.footerRow}>
            <Text style={styles.footerPrompt}>ALREADY HAVE AN ACCOUNT?</Text>
            <BrutalButton
              title="SIGN IN INSTEAD"
              onPress={onNavigateToLogin}
              variant="outline"
              size="compact"
              fullWidth
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingBottom: BRUTAL_SPACING[8],
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF2F2",
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.danger,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
    gap: BRUTAL_SPACING[2],
    ...BRUTAL_SHADOWS.sm,
  },
  errorIcon: {
    fontSize: 16,
    color: BRUTAL_COLORS.dangerInk,
    fontWeight: "900",
  },
  errorText: {
    flex: 1,
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.dangerInk,
  },
  roleSelectorBox: {
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
    ...BRUTAL_SHADOWS.sm,
  },
  roleSelectorTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    letterSpacing: 1,
    color: BRUTAL_COLORS.ink,
    marginBottom: BRUTAL_SPACING[2],
  },
  roleTabsRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
  },
  roleTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: BRUTAL_SPACING[3],
    borderWidth: BRUTAL_BORDERS.thin,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    backgroundColor: BRUTAL_COLORS.background,
    gap: BRUTAL_SPACING[1],
  },
  roleTabActiveStudent: {
    backgroundColor: BRUTAL_COLORS.success,
    borderWidth: 2,
    ...BRUTAL_SHADOWS.sm,
  },
  roleTabActiveAlumni: {
    backgroundColor: BRUTAL_COLORS.accent,
    borderWidth: 2,
    ...BRUTAL_SHADOWS.sm,
  },
  roleEmoji: {
    fontSize: 16,
  },
  roleTabText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.ink,
  },
  roleTabTextActive: {
    color: BRUTAL_COLORS.ink,
  },
  formCard: {
    marginBottom: BRUTAL_SPACING[4],
  },
  fieldGroup: {
    marginBottom: BRUTAL_SPACING[4],
  },
  fieldLabel: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.ink,
    letterSpacing: BRUTAL_TYPOGRAPHY.letterSpacing.tracked,
    marginBottom: BRUTAL_SPACING[2],
  },
  deptPillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: BRUTAL_SPACING[2],
  },
  deptPill: {
    paddingHorizontal: BRUTAL_SPACING[3],
    paddingVertical: 6,
    borderRadius: BRUTAL_RADII.micro,
    borderWidth: 1.5,
    borderColor: BRUTAL_COLORS.ink,
    backgroundColor: BRUTAL_COLORS.background,
  },
  deptPillSelected: {
    backgroundColor: BRUTAL_COLORS.accent,
    ...BRUTAL_SHADOWS.sm,
  },
  deptPillText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.ink,
  },
  deptPillTextSelected: {
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
  },
  submitBtn: {
    marginTop: BRUTAL_SPACING[3],
  },
  footerRow: {
    alignItems: "center",
    marginTop: BRUTAL_SPACING[2],
  },
  footerPrompt: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.textSecondary,
    letterSpacing: 1,
    marginBottom: BRUTAL_SPACING[2],
  },
});
