import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  BRUTAL_SHADOWS,
} from "../../../design-system/tokens";

interface MessageComposerProps {
  onSend: (content: string) => Promise<void>;
  isSending?: boolean;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSend,
  isSending = false,
}) => {
  const insets = useSafeAreaInsets();
  const [content, setContent] = useState("");

  const handleSend = async () => {
    const trimmed = content.trim();
    if (!trimmed || isSending) return;

    setContent("");
    try {
      await onSend(trimmed);
    } catch {
      // Restore on failure
      setContent(trimmed);
    }
  };

  const canSend = content.trim().length > 0 && !isSending;

  return (
    <View
      style={[
        styles.composerContainer,
        { paddingBottom: Math.max(insets.bottom, BRUTAL_SPACING[3]) },
      ]}
    >
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={content}
          onChangeText={setContent}
          placeholder="Type your message..."
          placeholderTextColor={BRUTAL_COLORS.SECONDARY_TEXT}
          multiline
          maxLength={2000}
          editable={!isSending}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.sendBtn,
          canSend ? styles.sendBtnActive : styles.sendBtnDisabled,
        ]}
        onPress={handleSend}
        disabled={!canSend}
        activeOpacity={0.8}
      >
        {isSending ? (
          <ActivityIndicator size="small" color={BRUTAL_COLORS.INK} />
        ) : (
          <Text style={[styles.sendIcon, canSend && styles.sendIconActive]}>
            ➔
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  composerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderTopWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[4],
    paddingVertical: BRUTAL_SPACING[3],
    gap: BRUTAL_SPACING[2],
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[3],
    paddingVertical: Platform.OS === "ios" ? BRUTAL_SPACING[2] : 4,
    minHeight: 42,
    maxHeight: 100,
    justifyContent: "center",
  },
  input: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    color: BRUTAL_COLORS.INK,
    padding: 0,
    margin: 0,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnActive: {
    backgroundColor: BRUTAL_COLORS.ACCENT,
    ...BRUTAL_SHADOWS.subtle,
  },
  sendBtnDisabled: {
    backgroundColor: BRUTAL_COLORS.MUTED,
  },
  sendIcon: {
    fontSize: 18,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
  sendIconActive: {
    color: BRUTAL_COLORS.INK,
  },
});
