import React from "react";
import { StyleSheet, View, Text, Modal, TouchableWithoutFeedback } from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
} from "../tokens";
import { BrutalButton } from "./BrutalButton";

interface ConfirmDialogProps {
  visible: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
  destructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  title,
  description,
  confirmLabel = "CONFIRM",
  cancelLabel = "CANCEL",
  onConfirm,
  onCancel,
  isDestructive = false,
  destructive = false,
}) => {
  const isDest = isDestructive || destructive;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.dialogCard}>
              <View style={styles.headerStrip}>
                <Text style={styles.headerTag}>// SYSTEM CONFIRMATION</Text>
              </View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>

              <View style={styles.buttonRow}>
                <View style={styles.btnFlex}>
                  <BrutalButton
                    title={cancelLabel}
                    onPress={onCancel}
                    variant="secondary"
                    size="compact"
                  />
                </View>
                <View style={styles.btnFlex}>
                  <BrutalButton
                    title={confirmLabel}
                    onPress={onConfirm}
                    variant={isDest ? "destructive" : "primary"}
                    size="compact"
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(23, 23, 23, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    padding: BRUTAL_SPACING[5],
  },
  dialogCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[5],
    ...BRUTAL_SHADOWS.lg,
  },
  headerStrip: {
    backgroundColor: BRUTAL_COLORS.muted,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: BRUTAL_COLORS.ink,
    alignSelf: "flex-start",
    marginBottom: BRUTAL_SPACING[3],
    borderRadius: BRUTAL_RADII.micro,
  },
  headerTag: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    letterSpacing: 1,
    color: BRUTAL_COLORS.ink,
  },
  title: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.lg,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    marginBottom: BRUTAL_SPACING[2],
  },
  description: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    color: BRUTAL_COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: BRUTAL_SPACING[5],
  },
  buttonRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[3],
  },
  btnFlex: {
    flex: 1,
  },
});
