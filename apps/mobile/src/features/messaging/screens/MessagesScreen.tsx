import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import type { Conversation } from "@alumnux/types";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  BRUTAL_SHADOWS,
} from "../../../design-system/tokens";
import { ScreenHeader } from "../../../design-system/components/ScreenHeader";
import { SearchField } from "../../../design-system/components/SearchField";
import { EmptyState } from "../../../design-system/components/EmptyState";
import { BrutalButton } from "../../../design-system/components/BrutalButton";
import { BrutalInput } from "../../../design-system/components/BrutalInput";
import { BrutalBadge } from "../../../design-system/components/BrutalBadge";
import { Avatar } from "../../../design-system/components/AvatarAndDivider";
import { ConversationRow } from "../components/ConversationRow";
import { useConversations } from "../hooks/useConversations";
import { useMobileAuth } from "../../../context/AuthContext";

const FILTER_TABS = ["ALL", "UNREAD", "ACTIVE"];

const DIRECTORY_MENTORS = [
  {
    id: "alumni-demo-jordan",
    name: "Jordan Vance",
    company: "Stripe",
    role: "Staff Platform Engineer",
    dept: "IT '18",
  },
  {
    id: "alum-101",
    name: "Karthik Subramanian",
    company: "AWS",
    role: "Staff Cloud Architect",
    dept: "CSE '17",
  },
  {
    id: "alum-102",
    name: "Praveen Kumar",
    company: "Zoho Corporation",
    role: "Principal Architect",
    dept: "CSE '16",
  },
];

interface MessagesScreenProps {
  onSelectConversation: (conversation: Conversation) => void;
}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({
  onSelectConversation,
}) => {
  const { user } = useMobileAuth();
  const {
    conversations,
    isLoading,
    isRefreshing,
    onRefresh,
    totalUnreadCount,
    startConversation,
  } = useConversations();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("ALL");

  // New Conversation Modal
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState(
    DIRECTORY_MENTORS[0].id
  );
  const [topic, setTopic] = useState("");
  const [isStarting, setIsStarting] = useState(false);

  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      // Filter tab
      if (activeFilter === "UNREAD" && (!c.unreadCount || c.unreadCount <= 0)) {
        return false;
      }
      if (activeFilter === "ACTIVE" && c.status !== "active") {
        return false;
      }

      // Query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.alumniName.toLowerCase().includes(q) ||
        c.studentName.toLowerCase().includes(q) ||
        (c.topic && c.topic.toLowerCase().includes(q)) ||
        (c.lastMessagePreview && c.lastMessagePreview.toLowerCase().includes(q))
      );
    });
  }, [conversations, activeFilter, searchQuery]);

  const handleStartNewConversation = async () => {
    setIsStarting(true);
    try {
      const conv = await startConversation({
        participantId: selectedPartnerId,
        topic: topic.trim() || "1-on-1 Guidance Session",
      });
      setNewModalVisible(false);
      setTopic("");
      onSelectConversation(conv);
    } catch {
      Alert.alert("Error", "Could not start conversation at this time.");
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="MESSAGES"
        categoryTag="// PRIVATE CHANNELS"
        subtitle="Your network, one conversation away."
        rightAction={
          <TouchableOpacity
            style={styles.newChatBtn}
            onPress={() => setNewModalVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.newChatBtnText}>+ NEW</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.searchSection}>
        <SearchField
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search conversations, contacts, topics..."
        />

        {/* Filter Pills with Unread Badge */}
        <View style={styles.filterRow}>
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.filterPill,
                  isActive && styles.filterPillActive,
                ]}
                onPress={() => setActiveFilter(tab)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    isActive && styles.filterPillTextActive,
                  ]}
                >
                  {tab}
                </Text>
                {tab === "UNREAD" && totalUnreadCount > 0 && (
                  <View style={styles.unreadCountChip}>
                    <Text style={styles.unreadCountText}>
                      {totalUnreadCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationRow
            conversation={item}
            currentUserId={user?.id || ""}
            onPress={onSelectConversation}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={BRUTAL_COLORS.INK}
            colors={[BRUTAL_COLORS.ACCENT]}
          />
        }
        ListEmptyComponent={
          <EmptyState
            title="NO CONVERSATIONS FOUND"
            description={
              searchQuery
                ? `No conversations match "${searchQuery}".`
                : "You don't have any direct messages yet. Connect with verified alumni in the Directory or request mentorship to begin."
            }
            actionLabel="+ START CONVERSATION"
            onAction={() => setNewModalVisible(true)}
          />
        }
      />

      {/* New Conversation Modal */}
      <Modal
        visible={newModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setNewModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTag}>
                <Text style={styles.modalTagText}>// INITIATE PRIVATE CHAT</Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setNewModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalBody}
              contentContainerStyle={{ paddingBottom: BRUTAL_SPACING[8] }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.modalTitle}>New Conversation</Text>
              <Text style={styles.modalSubtitle}>
                Select a verified alumni mentor from the network to initiate a confidential 1-on-1 dialogue.
              </Text>

              <Text style={styles.selectorLabel}>SELECT RECIPIENT</Text>
              <View style={styles.recipientList}>
                {DIRECTORY_MENTORS.map((m) => {
                  const isSelected = selectedPartnerId === m.id;
                  return (
                    <TouchableOpacity
                      key={m.id}
                      style={[
                        styles.recipientCard,
                        isSelected && styles.recipientCardSelected,
                      ]}
                      onPress={() => setSelectedPartnerId(m.id)}
                      activeOpacity={0.8}
                    >
                      <Avatar name={m.name} size={36} />
                      <View style={styles.recipientInfo}>
                        <Text style={styles.recipientName}>{m.name}</Text>
                        <Text style={styles.recipientRole}>
                          {m.role} @ {m.company}
                        </Text>
                      </View>
                      <BrutalBadge
                        label={isSelected ? "SELECTED ✓" : m.dept}
                        variant={isSelected ? "accent" : "neutral"}
                        size="small"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <BrutalInput
                label="CONVERSATION TOPIC / GOAL"
                value={topic}
                onChangeText={setTopic}
                placeholder="e.g. Distributed Queues, Resume Review, Off-Campus Referrals"
              />

              <View style={{ marginTop: BRUTAL_SPACING[4] }}>
                <BrutalButton
                  label="LAUNCH CONVERSATION ⚡"
                  variant="primary"
                  fullWidth
                  loading={isStarting}
                  onPress={handleStartNewConversation}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
  },
  newChatBtn: {
    backgroundColor: BRUTAL_COLORS.ACCENT,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[3],
    paddingVertical: BRUTAL_SPACING[2],
    ...BRUTAL_SHADOWS.subtle,
  },
  newChatBtnText: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 1,
  },
  searchSection: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingBottom: BRUTAL_SPACING[3],
  },
  filterRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
    marginTop: BRUTAL_SPACING[2],
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: BRUTAL_SPACING[3],
    paddingVertical: BRUTAL_SPACING[2],
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    gap: 4,
  },
  filterPillActive: {
    backgroundColor: BRUTAL_COLORS.ACCENT,
    ...BRUTAL_SHADOWS.subtle,
  },
  filterPillText: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 0.5,
  },
  filterPillTextActive: {
    color: BRUTAL_COLORS.INK,
  },
  unreadCountChip: {
    backgroundColor: BRUTAL_COLORS.INK,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 2,
  },
  unreadCountText: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SURFACE,
  },
  listContent: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingBottom: BRUTAL_SPACING[10],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderTopWidth: BRUTAL_BORDERS.standard,
    borderLeftWidth: BRUTAL_BORDERS.standard,
    borderRightWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingVertical: BRUTAL_SPACING[4],
    borderBottomWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
  },
  modalTag: {
    backgroundColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 2,
  },
  modalTagText: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.ACCENT,
    letterSpacing: 1,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    backgroundColor: BRUTAL_COLORS.SURFACE,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  modalBody: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingVertical: BRUTAL_SPACING[4],
  },
  modalTitle: {
    fontSize: BRUTAL_TYPOGRAPHY["2xl"],
    fontWeight: BRUTAL_TYPOGRAPHY.black,
    color: BRUTAL_COLORS.INK,
    marginBottom: BRUTAL_SPACING[1],
  },
  modalSubtitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    lineHeight: 20,
    marginBottom: BRUTAL_SPACING[4],
  },
  selectorLabel: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 1,
    marginBottom: BRUTAL_SPACING[2],
  },
  recipientList: {
    gap: BRUTAL_SPACING[2],
    marginBottom: BRUTAL_SPACING[4],
  },
  recipientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
    gap: BRUTAL_SPACING[3],
  },
  recipientCardSelected: {
    backgroundColor: BRUTAL_COLORS.ACCENT,
    ...BRUTAL_SHADOWS.subtle,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  recipientRole: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
});
