import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ViewStyle,
} from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
} from "../tokens";

interface SearchFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  style?: ViewStyle;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
  onClear,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.searchIcon}>⌕</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={BRUTAL_COLORS.textMuted}
        selectionColor={BRUTAL_COLORS.ink}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            onChangeText("");
            onClear?.();
          }}
          style={styles.clearBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_BORDERS.color,
    borderRadius: BRUTAL_RADII.standard,
    paddingHorizontal: BRUTAL_SPACING[3],
    ...BRUTAL_SHADOWS.sm,
  },
  searchIcon: {
    fontSize: 20,
    fontWeight: "900",
    color: BRUTAL_COLORS.ink,
    marginRight: BRUTAL_SPACING[2],
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.medium,
    color: BRUTAL_COLORS.ink,
  },
  clearBtn: {
    width: 24,
    height: 24,
    borderRadius: 9999,
    backgroundColor: BRUTAL_COLORS.muted,
    borderWidth: 1,
    borderColor: BRUTAL_COLORS.ink,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: BRUTAL_SPACING[2],
  },
  clearText: {
    fontSize: 12,
    fontWeight: "bold",
    color: BRUTAL_COLORS.ink,
    lineHeight: 14,
  },
});
