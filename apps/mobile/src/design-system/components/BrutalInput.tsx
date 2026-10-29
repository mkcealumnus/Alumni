import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  BRUTAL_SHADOWS,
} from "../tokens";

interface BrutalInputProps extends TextInputProps {
  label: string;
  error?: string;
  helperText?: string;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
  required?: boolean;
}

export const BrutalInput: React.FC<BrutalInputProps> = ({
  label,
  error,
  helperText,
  containerStyle,
  isPassword = false,
  required = false,
  value,
  onChangeText,
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  const hasError = !!error;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Input Label */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.requiredAsterisk}> *</Text>}
        </Text>
      </View>

      {/* Input Box with Hard Shadow when focused */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          hasError && styles.inputError,
        ]}
      >
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={BRUTAL_COLORS.textMuted}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor={BRUTAL_COLORS.ink}
          autoCapitalize="none"
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
            <Text style={styles.passwordToggleText}>
              {showPassword ? "HIDE" : "SHOW"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Error or Helper Text */}
      {hasError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠ {error}</Text>
        </View>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: BRUTAL_SPACING[4],
    width: "100%",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[2],
  },
  label: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.ink,
    letterSpacing: BRUTAL_TYPOGRAPHY.letterSpacing.tracked,
    textTransform: "uppercase",
  },
  requiredAsterisk: {
    color: BRUTAL_COLORS.dangerInk,
    fontWeight: "900",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_BORDERS.color,
    borderRadius: BRUTAL_RADII.standard,
    paddingHorizontal: BRUTAL_SPACING[3],
    ...BRUTAL_SHADOWS.sm,
  },
  inputFocused: {
    backgroundColor: BRUTAL_COLORS.surface,
    borderColor: BRUTAL_COLORS.ink,
    ...BRUTAL_SHADOWS.base,
  },
  inputError: {
    borderColor: BRUTAL_COLORS.danger,
    borderWidth: 2,
    backgroundColor: "#FFF5F5",
  },
  textInput: {
    flex: 1,
    height: "100%",
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.medium,
    color: BRUTAL_COLORS.ink,
  },
  passwordToggle: {
    backgroundColor: BRUTAL_COLORS.muted,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 4,
    borderRadius: BRUTAL_RADII.micro,
    borderWidth: 1,
    borderColor: BRUTAL_COLORS.ink,
  },
  passwordToggleText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.ink,
    letterSpacing: 0.5,
  },
  errorContainer: {
    marginTop: BRUTAL_SPACING[1],
  },
  errorText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.dangerInk,
  },
  helperText: {
    marginTop: BRUTAL_SPACING[1],
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.textSecondary,
  },
});
