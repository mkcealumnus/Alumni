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
  Alert,
} from "react-native";
import { colors, radii, spacing, typography } from "@alumnux/ui-tokens";
import { useMobileAuth } from "../context/AuthContext";

interface LoginScreenProps {
  onBack: () => void;
  onNavigateToRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onNavigateToRegister,
}) => {
  const { login } = useMobileAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    setErrorMessage(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your account password.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await login({ email: trimmedEmail, password });
      if (!result.success) {
        setErrorMessage(result.error || "Authentication failed. Check your credentials.");
      }
      // On success, AuthContext sets user and App.tsx automatically switches to authenticated tab navigation!
    } catch {
      setErrorMessage("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Password Reset",
      "Self-service password recovery is coordinated via institution administrative verification. Please reach out to your department coordinator or administrator at admin@mkcealumni.org.",
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.page} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top navigation bar */}
          <View style={styles.navBar}>
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Sign in with your Alumnux credentials to continue.
            </Text>
          </View>

          {/* Error Banner */}
          {errorMessage && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerText}>{errorMessage}</Text>
            </View>
          )}

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="name@mkce.ac.in"
                placeholderTextColor={colors.secondary.DEFAULT + "80"}
                value={email}
                onChangeText={(val) => {
                  setEmail(val);
                  if (errorMessage) setErrorMessage(null);
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.passwordLabelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  activeOpacity={0.7}
                >
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
                onChangeText={(val) => {
                  setPassword(val);
                  if (errorMessage) setErrorMessage(null);
                }}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPasswordButton}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.accent.foreground} size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer switcher */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account yet? </Text>
            <TouchableOpacity onPress={onNavigateToRegister} activeOpacity={0.7}>
              <Text style={styles.registerLink}>Sign up</Text>
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
    marginTop: spacing[3],
    marginBottom: spacing[6],
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
  passwordLabelRow: {
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
  forgotPasswordButton: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: colors.accent.DEFAULT,
    paddingVertical: spacing[4],
    borderRadius: radii.md,
    alignItems: "center",
    marginTop: spacing[2],
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
    marginTop: spacing[8],
  },
  footerText: {
    fontSize: typography.sizes.sm,
    color: colors.secondary.DEFAULT,
  },
  registerLink: {
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    color: colors.accent.DEFAULT,
  },
});
