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

interface LoginScreenProps {
  onBack: () => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onNavigateToRegister,
}) => {
  const { login, loginAsDemo } = useMobileAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const result = await login({ email, password });
    setIsLoading(false);

    if (!result.success) {
      setErrorMessage(result.error || "Authentication failed. Check your credentials.");
    }
  };

  const handleApplyPreset = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardContainer}
      >
        <ScreenHeader
          title="SIGN IN"
          subtitle="Access verified student-alumni guidance and networking"
          onBack={onBack}
          categoryTag="SECURE AUTH"
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

          {/* Form Card */}
          <BrutalCard variant="surface" padding={5} style={styles.formCard}>
            <BrutalInput
              label="INSTITUTIONAL / ACCOUNT EMAIL"
              placeholder="e.g. name@student.demo or user@alumnux.org"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              required
            />

            <BrutalInput
              label="ACCOUNT PASSWORD"
              placeholder="••••••••••••"
              value={password}
              onChangeText={setPassword}
              isPassword
              required
            />

            <BrutalButton
              title="AUTHENTICATE & ENTER"
              onPress={handleSubmit}
              loading={isLoading}
              variant="primary"
              fullWidth
              style={styles.submitBtn}
            />
          </BrutalCard>

          {/* Quick 1-Click Credentials Accordion */}
          <View style={styles.presetsBox}>
            <View style={styles.presetsHeader}>
              <Text style={styles.presetsTitle}>// QUICK PRESETS FOR REVIEW</Text>
              <BrutalBadge label="AUTO-FILL" variant="accent" size="small" />
            </View>

            <TouchableOpacity
              style={styles.presetRow}
              onPress={() => handleApplyPreset("student@alumnux.demo", "Student@123")}
              activeOpacity={0.7}
            >
              <View style={styles.presetBadgeCol}>
                <BrutalBadge label="STUDENT" variant="success" size="small" />
              </View>
              <View style={styles.presetTextCol}>
                <Text style={styles.presetName}>Alex Rivera (CSE '26)</Text>
                <Text style={styles.presetCreds}>student@alumnux.demo • Student@123</Text>
              </View>
              <Text style={styles.presetArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.presetRow}
              onPress={() => handleApplyPreset("alumni@alumnux.demo", "Alumni@123")}
              activeOpacity={0.7}
            >
              <View style={styles.presetBadgeCol}>
                <BrutalBadge label="ALUMNI" variant="accent" size="small" />
              </View>
              <View style={styles.presetTextCol}>
                <Text style={styles.presetName}>Jordan Vance (Stripe '18)</Text>
                <Text style={styles.presetCreds}>alumni@alumnux.demo • Alumni@123</Text>
              </View>
              <Text style={styles.presetArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.presetRow}
              onPress={() => handleApplyPreset("admin@alumnux.demo", "Admin@123")}
              activeOpacity={0.7}
            >
              <View style={styles.presetBadgeCol}>
                <BrutalBadge label="TRUSTEE" variant="warning" size="small" />
              </View>
              <View style={styles.presetTextCol}>
                <Text style={styles.presetName}>Arunachalam (Trustee Infra)</Text>
                <Text style={styles.presetCreds}>admin@alumnux.demo • Admin@123</Text>
              </View>
              <Text style={styles.presetArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Registration Action */}
          <View style={styles.footerRow}>
            <Text style={styles.footerPrompt}>DON'T HAVE AN ACCOUNT?</Text>
            <BrutalButton
              title="CREATE AN ACCOUNT"
              onPress={onNavigateToRegister}
              variant="outline"
              size="compact"
              fullWidth
              style={styles.registerBtn}
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
  formCard: {
    marginBottom: BRUTAL_SPACING[5],
  },
  submitBtn: {
    marginTop: BRUTAL_SPACING[2],
  },
  presetsBox: {
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[4],
    marginBottom: BRUTAL_SPACING[5],
    ...BRUTAL_SHADOWS.base,
  },
  presetsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[3],
    borderBottomWidth: 1.5,
    borderBottomColor: BRUTAL_COLORS.ink,
    paddingBottom: BRUTAL_SPACING[2],
  },
  presetsTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    letterSpacing: 1,
    color: BRUTAL_COLORS.ink,
  },
  presetRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: BRUTAL_SPACING[2],
    borderBottomWidth: 1,
    borderBottomColor: BRUTAL_COLORS.muted,
  },
  presetBadgeCol: {
    width: 80,
  },
  presetTextCol: {
    flex: 1,
    marginLeft: BRUTAL_SPACING[2],
  },
  presetName: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.ink,
  },
  presetCreds: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    color: BRUTAL_COLORS.textSecondary,
    marginTop: 1,
  },
  presetArrow: {
    fontSize: 16,
    fontWeight: "900",
    color: BRUTAL_COLORS.ink,
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
  registerBtn: {
    width: "100%",
  },
});
