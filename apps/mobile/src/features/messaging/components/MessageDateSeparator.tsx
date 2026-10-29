import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
} from "../../../design-system/tokens";

interface MessageDateSeparatorProps {
  date: string;
}

export const MessageDateSeparator: React.FC<MessageDateSeparatorProps> = ({
  date,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.pill}>
        <Text style={styles.text}>// {date.toUpperCase()}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: BRUTAL_SPACING[4],
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: BRUTAL_COLORS.INK,
  },
  pill: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: 1,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[3],
    paddingVertical: 3,
    marginHorizontal: BRUTAL_SPACING[2],
  },
  text: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 1,
  },
});
