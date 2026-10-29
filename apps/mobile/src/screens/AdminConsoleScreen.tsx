import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  ScreenHeader,
  SearchField,
  BrutalCard,
  BrutalBadge,
  BrutalButton,
  BrutalInput,
  Avatar,
  EmptyState,
} from "../design-system";
import { useMobileAuth } from "../context/AuthContext";
import {
  INITIAL_ADMIN_VERIFICATION_QUEUE,
  MobileVerificationItem,
} from "../lib/mockData";

const STATUS_FILTERS = ["ALL", "PENDING", "NEEDS_REVIEW", "VERIFIED", "REJECTED"];

export const AdminConsoleScreen: React.FC = () => {
  const { user } = useMobileAuth();
  const isAdmin = user?.role === "ADMIN";

  const [queue, setQueue] = useState<MobileVerificationItem[]>(
    INITIAL_ADMIN_VERIFICATION_QUEUE
  );
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<MobileVerificationItem | null>(null);

  // Review notes state in modal
  const [reviewNotes, setReviewNotes] = useState("");

  const filteredQueue = useMemo(() => {
    return queue.filter((item) => {
      if (selectedFilter !== "ALL" && item.status !== selectedFilter) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.fullName.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.departmentCode.toLowerCase().includes(q) ||
        (item.rollNumber && item.rollNumber.toLowerCase().includes(q)) ||
        (item.currentCompany && item.currentCompany.toLowerCase().includes(q))
      );
    });
  }, [queue, selectedFilter, searchQuery]);

  // Restricted Access Guard
  if (!isAdmin) {
    return (
      <View style={styles.container}>
        <ScreenHeader
          title="ADMIN CONSOLE"
          categoryTag="// RESTRICTED ACCESS"
          subtitle="Independent Senior Alumni Trustee Platform Governance."
        />
        <View style={styles.deniedContainer}>
          <Text style={styles.deniedIcon}>🔒</Text>
          <Text style={styles.deniedTitle}>TRUSTEE AUTHORIZATION REQUIRED</Text>
          <Text style={styles.deniedDesc}>
            This console is restricted to the 3 designated Senior Alumni Trustees governing MKCE Alumnux. Your account role ({user?.role || "GUEST"}) does not have verification review privileges.
          </Text>
        </View>
      </View>
    );
  }

  const handleUpdateStatus = (
    newStatus: "VERIFIED" | "NEEDS_REVIEW" | "REJECTED"
  ) => {
    if (!activeItem) return;

    setQueue((prev) =>
      prev.map((item) =>
        item.id === activeItem.id
          ? {
              ...item,
              status: newStatus,
              reviewNotes: reviewNotes.trim() || item.reviewNotes,
            }
          : item
      )
    );

    const actionText =
      newStatus === "VERIFIED"
        ? "Approved & Verified"
        : newStatus === "NEEDS_REVIEW"
        ? "Flagged for Resubmission"
        : "Rejected";

    Alert.alert(
      "Trustee Decision Recorded",
      `Credential for ${activeItem.fullName} marked as ${actionText}. Audit log updated and candidate notified.`
    );

    setActiveItem(null);
    setReviewNotes("");
  };

  const renderQueueItem = ({ item }: { item: MobileVerificationItem }) => {
    const isVerified = item.status === "VERIFIED";
    const isNeedsReview = item.status === "NEEDS_REVIEW";
    const isPending = item.status === "PENDING";

    return (
      <BrutalCard
        style={styles.card}
        accentStrip="left"
        accentColor={
          isVerified
            ? BRUTAL_COLORS.SUCCESS
            : isNeedsReview
            ? BRUTAL_COLORS.WARNING
            : isPending
            ? BRUTAL_COLORS.ACCENT
            : BRUTAL_COLORS.DANGER
        }
        onPress={() => {
          setActiveItem(item);
          setReviewNotes(item.reviewNotes || "");
        }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.typeTag}>
            <Text style={styles.typeText}>{item.accountType}</Text>
          </View>
          <BrutalBadge
            label={item.status}
            variant={
              isVerified
                ? "success"
                : isNeedsReview
                ? "warning"
                : isPending
                ? "accent"
                : "destructive"
            }
          />
        </View>

        <Text style={styles.candidateName}>{item.fullName}</Text>
        <Text style={styles.candidateMeta}>
          {item.email} • {item.departmentCode} (Class of {item.graduationYear})
        </Text>

        {item.rollNumber ? (
          <Text style={styles.detailMeta}>Roll Number: {item.rollNumber}</Text>
        ) : null}
        {item.currentCompany ? (
          <Text style={styles.detailMeta}>
            Employer: {item.currentCompany} ({item.currentRole})
          </Text>
        ) : null}

        <View style={styles.docBanner}>
          <Text style={styles.docIcon}>📄</Text>
          <View style={styles.docInfo}>
            <Text style={styles.docType}>{item.documentType}</Text>
            <Text style={styles.docFileName}>{item.fileName}</Text>
          </View>
        </View>

        {item.reviewNotes ? (
          <View style={styles.notesBox}>
            <Text style={styles.notesLabel}>// TRUSTEE AUDIT NOTE</Text>
            <Text style={styles.notesText}>{item.reviewNotes}</Text>
          </View>
        ) : null}

        <View style={styles.actionRow}>
          <BrutalButton
            label="INSPECT CREDENTIALS ➔"
            variant="dark"
            onPress={() => {
              setActiveItem(item);
              setReviewNotes(item.reviewNotes || "");
            }}
            style={styles.inspectBtn}
          />
        </View>
      </BrutalCard>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="TRUSTEE QUEUE"
        categoryTag="// PLATFORM GOVERNANCE"
        subtitle="Independent verification review queue for student identity and alumni degree credentials."
      />

      <View style={styles.searchSection}>
        <SearchField
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name, roll no, email..."
        />

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillsContainer}
        >
          {STATUS_FILTERS.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterPill,
                  isActive && styles.filterPillActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    isActive && styles.filterPillTextActive,
                  ]}
                >
                  {filter.replace("_", " ")}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredQueue}
        keyExtractor={(item) => item.id}
        renderItem={renderQueueItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title="NO VERIFICATIONS IN QUEUE"
            description="All candidate submissions for this filter status have been resolved and audited."
            actionLabel="SHOW ALL RECORDS"
            onAction={() => {
              setSearchQuery("");
              setSelectedFilter("ALL");
            }}
          />
        }
      />

      {/* Verification Review Modal */}
      {activeItem && (
        <Modal
          visible={!!activeItem}
          animationType="slide"
          transparent
          onRequestClose={() => setActiveItem(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderTag}>
                  <Text style={styles.modalHeaderCategory}>
                    // TRUSTEE VERIFICATION DOSSIER
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setActiveItem(null)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.modalBody}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.modalCandidateRow}>
                  <Avatar name={activeItem.fullName} size={48} />
                  <View style={styles.modalCandidateInfo}>
                    <Text style={styles.modalCandidateName}>
                      {activeItem.fullName}
                    </Text>
                    <Text style={styles.modalCandidateEmail}>
                      {activeItem.email}
                    </Text>
                    <View style={styles.modalBadgeRow}>
                      <BrutalBadge
                        label={activeItem.accountType}
                        variant="accent"
                      />
                      <BrutalBadge
                        label={`${activeItem.departmentCode} • '${String(activeItem.graduationYear).slice(-2)}`}
                        variant="outline"
                      />
                    </View>
                  </View>
                </View>

                {/* Candidate Institutional Info */}
                <View style={styles.infoGrid}>
                  <View style={styles.infoCol}>
                    <Text style={styles.infoLabel}>SUBMITTED AT</Text>
                    <Text style={styles.infoValue}>
                      {new Date(activeItem.submittedAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.infoDivider} />
                  <View style={styles.infoCol}>
                    <Text style={styles.infoLabel}>
                      {activeItem.accountType === "STUDENT"
                        ? "CAMPUS ROLL NUMBER"
                        : "VERIFIED EMPLOYER"}
                    </Text>
                    <Text style={styles.infoValue}>
                      {activeItem.rollNumber || activeItem.currentCompany || "N/A"}
                    </Text>
                  </View>
                </View>

                {/* Secure Document Vault Inspection Box */}
                <Text style={styles.modalSectionTitle}>
                  // ENCRYPTED CREDENTIAL VAULT
                </Text>
                <View style={styles.vaultBox}>
                  <View style={styles.vaultTop}>
                    <Text style={styles.vaultIcon}>🔒</Text>
                    <View style={styles.vaultTitleWrapper}>
                      <Text style={styles.vaultDocTitle}>
                        {activeItem.documentType}
                      </Text>
                      <Text style={styles.vaultDocName}>
                        {activeItem.fileName}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.previewSimulation}>
                    <Text style={styles.simText}>
                      [MKCE TRUSTEE SECURE PREVIEW RENDERER]
                    </Text>
                    <Text style={styles.simSubtext}>
                      {activeItem.accountType === "STUDENT"
                        ? "• College ID barcode matches registered roll number.\n• Academic term active for 2026 session.\n• Authorized MKCE Dean signature detected."
                        : "• Anna University hologram verified against central register.\n• Degree in Information Technology conferred 2019.\n• Cumulative CGPA and registration serial match records."}
                    </Text>
                  </View>
                </View>

                {/* Trustee Review Note */}
                <Text style={styles.modalSectionTitle}>
                  // TRUSTEE DECISION NOTES
                </Text>
                <BrutalInput
                  label="INTERNAL AUDIT & FEEDBACK LOG"
                  value={reviewNotes}
                  onChangeText={setReviewNotes}
                  placeholder="e.g. Verified against Anna University records, approved for active alumni directory."
                  multiline
                  numberOfLines={3}
                />

                {/* Trustee Action Buttons */}
                <View style={styles.modalActions}>
                  <BrutalButton
                    label="APPROVE VERIFICATION ✓"
                    variant="primary"
                    fullWidth
                    onPress={() => handleUpdateStatus("VERIFIED")}
                  />
                  <View style={{ height: BRUTAL_SPACING[2] }} />
                  <BrutalButton
                    label="FLAG FOR RESUBMISSION ⚠️"
                    variant="secondary"
                    fullWidth
                    onPress={() => handleUpdateStatus("NEEDS_REVIEW")}
                  />
                  <View style={{ height: BRUTAL_SPACING[2] }} />
                  <BrutalButton
                    label="REJECT CREDENTIAL ✕"
                    variant="destructive"
                    fullWidth
                    onPress={() => handleUpdateStatus("REJECTED")}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
  },
  deniedContainer: {
    padding: BRUTAL_SPACING[6],
    alignItems: "center",
    justifyContent: "center",
    marginTop: BRUTAL_SPACING[10],
  },
  deniedIcon: {
    fontSize: 54,
    marginBottom: BRUTAL_SPACING[4],
  },
  deniedTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.lg,
    fontWeight: BRUTAL_TYPOGRAPHY.black,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 1,
    marginBottom: BRUTAL_SPACING[2],
    textAlign: "center",
  },
  deniedDesc: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 320,
  },
  searchSection: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingBottom: BRUTAL_SPACING[3],
  },
  filterPillsContainer: {
    paddingVertical: BRUTAL_SPACING[2],
    gap: BRUTAL_SPACING[2],
  },
  filterPill: {
    paddingHorizontal: BRUTAL_SPACING[3],
    paddingVertical: BRUTAL_SPACING[2],
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    marginRight: BRUTAL_SPACING[2],
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
  listContent: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingBottom: BRUTAL_SPACING[10],
  },
  card: {
    marginBottom: BRUTAL_SPACING[4],
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[2],
  },
  typeTag: {
    backgroundColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 2,
  },
  typeText: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SURFACE,
    letterSpacing: 1,
  },
  candidateName: {
    fontSize: BRUTAL_TYPOGRAPHY.lg,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    marginBottom: 2,
  },
  candidateMeta: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    marginBottom: BRUTAL_SPACING[2],
  },
  detailMeta: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    marginBottom: 2,
  },
  docBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[2],
    marginVertical: BRUTAL_SPACING[2],
    gap: BRUTAL_SPACING[2],
  },
  docIcon: {
    fontSize: 20,
  },
  docInfo: {
    flex: 1,
  },
  docType: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 0.5,
  },
  docFileName: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
  notesBox: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[2],
    marginBottom: BRUTAL_SPACING[2],
  },
  notesLabel: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 1,
    marginBottom: 2,
  },
  notesText: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.INK,
  },
  actionRow: {
    marginTop: BRUTAL_SPACING[2],
  },
  inspectBtn: {
    height: 42,
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
  modalHeaderTag: {
    backgroundColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 2,
  },
  modalHeaderCategory: {
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
  modalCandidateRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[3],
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[4],
  },
  modalCandidateInfo: {
    flex: 1,
  },
  modalCandidateName: {
    fontSize: BRUTAL_TYPOGRAPHY.xl,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  modalCandidateEmail: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    marginBottom: BRUTAL_SPACING[1],
  },
  modalBadgeRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
  },
  infoGrid: {
    flexDirection: "row",
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
    ...BRUTAL_SHADOWS.subtle,
  },
  infoCol: {
    flex: 1,
  },
  infoDivider: {
    width: 2,
    backgroundColor: BRUTAL_COLORS.INK,
    marginHorizontal: BRUTAL_SPACING[3],
  },
  infoLabel: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 1,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  modalSectionTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 1.5,
    marginBottom: BRUTAL_SPACING[2],
    marginTop: BRUTAL_SPACING[2],
  },
  vaultBox: {
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
    ...BRUTAL_SHADOWS.subtle,
  },
  vaultTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: BRUTAL_SPACING[2],
    marginBottom: BRUTAL_SPACING[3],
  },
  vaultIcon: {
    fontSize: 24,
  },
  vaultTitleWrapper: {
    flex: 1,
  },
  vaultDocTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  vaultDocName: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
  previewSimulation: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
  },
  simText: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 1,
    marginBottom: BRUTAL_SPACING[2],
  },
  simSubtext: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.INK,
    lineHeight: 18,
  },
  modalActions: {
    paddingVertical: BRUTAL_SPACING[4],
    borderTopWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
  },
});
