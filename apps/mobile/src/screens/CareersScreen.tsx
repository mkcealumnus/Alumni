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
  EmptyState,
  Avatar,
  Divider,
} from "../design-system";
import { useMobileAuth } from "../context/AuthContext";
import {
  INITIAL_CAREER_OPPORTUNITIES,
  MobileCareerOpportunity,
} from "../lib/mockData";

const FILTER_TYPES = ["ALL", "Full-time", "Internship", "Referral", "Remote"];

export const CareersScreen: React.FC = () => {
  const { user, profile } = useMobileAuth();
  const isAlumni = user?.role === "ALUMNI";

  const [opportunities, setOpportunities] = useState<MobileCareerOpportunity[]>(
    INITIAL_CAREER_OPPORTUNITIES
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [selectedOpportunity, setSelectedOpportunity] =
    useState<MobileCareerOpportunity | null>(null);

  // Apply state
  const [hasAppliedMap, setHasAppliedMap] = useState<Record<string, boolean>>({});

  // Alumni Post Opportunity Modal
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newOrg, setNewOrg] = useState(profile?.currentCompany || "");
  const [newWorkMode, setNewWorkMode] = useState<"Remote" | "Hybrid" | "Onsite">("Hybrid");
  const [newType, setNewType] = useState<"Full-time" | "Internship" | "Referral">("Referral");
  const [newComp, setNewComp] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newReqs, setNewReqs] = useState("");

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      // Type / WorkMode filter
      if (selectedFilter === "Remote" && item.workMode !== "Remote") {
        return false;
      }
      if (
        selectedFilter !== "ALL" &&
        selectedFilter !== "Remote" &&
        item.opportunityType !== selectedFilter
      ) {
        return false;
      }

      // Query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.postedByName.toLowerCase().includes(q) ||
        item.departmentTag.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [opportunities, selectedFilter, searchQuery]);

  const handleApply = (opp: MobileCareerOpportunity) => {
    setHasAppliedMap((prev) => ({ ...prev, [opp.id]: true }));
    Alert.alert(
      "Referral Request Sent",
      `Your profile and academic credentials have been sent directly to ${opp.postedByName} (${opp.postedByCompany}) for internal referral review. You will receive email notifications on updates.`
    );
    setSelectedOpportunity(null);
  };

  const handleCreateOpportunity = () => {
    if (!newTitle.trim() || !newOrg.trim() || !newDesc.trim()) {
      Alert.alert("Missing Fields", "Please provide role title, company name, and description.");
      return;
    }

    const created: MobileCareerOpportunity = {
      id: `opp-${Date.now()}`,
      title: newTitle.trim(),
      organization: newOrg.trim(),
      location: newWorkMode === "Remote" ? "India (Remote)" : "Bengaluru / Chennai",
      workMode: newWorkMode,
      opportunityType: newType,
      departmentTag: profile?.departmentCode || "Engineering",
      description: newDesc.trim(),
      requirements: newReqs
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      compensation: newComp.trim() || "Competitive Industry Standard",
      postedByName: profile?.fullName || "Alumnus Contributor",
      postedByRole: profile?.currentRole || "Senior Engineer",
      postedByCompany: newOrg.trim(),
      postedByYear: profile?.graduationYear || 2018,
      postedDate: new Date().toISOString().split("T")[0],
      deadline: "Rolling Application",
      tags: [newOrg.trim(), newType, newWorkMode],
    };

    setOpportunities([created, ...opportunities]);
    setPostModalVisible(false);
    setNewTitle("");
    setNewDesc("");
    setNewReqs("");
    setNewComp("");

    Alert.alert("Opportunity Published", "Your referral opportunity is now live on the student network!");
  };

  const renderOpportunityCard = ({ item }: { item: MobileCareerOpportunity }) => {
    const isApplied = !!hasAppliedMap[item.id];

    return (
      <BrutalCard
        style={styles.card}
        accentStrip="left"
        accentColor={
          item.opportunityType === "Referral"
            ? BRUTAL_COLORS.ACCENT
            : item.opportunityType === "Internship"
            ? BRUTAL_COLORS.WARNING
            : BRUTAL_COLORS.MUTED
        }
        onPress={() => setSelectedOpportunity(item)}
      >
        <View style={styles.cardTopRow}>
          <View style={styles.orgBadge}>
            <Text style={styles.orgText}>{item.organization.toUpperCase()}</Text>
          </View>
          <View style={styles.badgeGroup}>
            <BrutalBadge
              label={item.opportunityType}
              variant={
                item.opportunityType === "Referral"
                  ? "accent"
                  : item.opportunityType === "Internship"
                  ? "warning"
                  : "neutral"
              }
            />
            <BrutalBadge
              label={item.workMode}
              variant={item.workMode === "Remote" ? "success" : "neutral"}
            />
          </View>
        </View>

        <Text style={styles.oppTitle}>{item.title}</Text>
        <Text style={styles.oppDesc} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.compensationTag}>💰 {item.compensation}</Text>
          <Text style={styles.locationTag}>📍 {item.location}</Text>
        </View>

        {/* Referrer Banner */}
        <View style={styles.referrerBanner}>
          <Avatar name={item.postedByName} size={28} />
          <View style={styles.referrerInfo}>
            <Text style={styles.referrerLabel}>VERIFIED ALUMNI REFERRER</Text>
            <Text style={styles.referrerName}>
              {item.postedByName} • {item.postedByRole} ({item.postedByYear})
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <View style={styles.cardActionRow}>
          {isApplied ? (
            <BrutalButton
              label="REFERRAL PENDING // APPLIED"
              variant="outline"
              disabled
              style={styles.actionBtn}
            />
          ) : (
            <BrutalButton
              label={item.opportunityType === "Referral" ? "REQUEST REFERRAL ⚡" : "VIEW & APPLY →"}
              variant={item.opportunityType === "Referral" ? "primary" : "dark"}
              onPress={() => setSelectedOpportunity(item)}
              style={styles.actionBtn}
            />
          )}
        </View>
      </BrutalCard>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="CAREERS"
        categoryTag="// OPPORTUNITY BOARD"
        subtitle="Verified alumni job referrals, summer internships, and graduate placements."
        rightAction={
          isAlumni ? (
            <TouchableOpacity
              style={styles.postBtn}
              onPress={() => setPostModalVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.postBtnText}>+ POST</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <View style={styles.searchSection}>
        <SearchField
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search roles, companies, tech stack..."
        />

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillsContainer}
        >
          {FILTER_TYPES.map((filter) => {
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
                  {filter.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Opportunity List */}
      <FlatList
        data={filteredOpportunities}
        keyExtractor={(item) => item.id}
        renderItem={renderOpportunityCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title="NO OPPORTUNITIES FOUND"
            description={`No open positions matched "${searchQuery}" in filter "${selectedFilter}". Try adjusting your keywords.`}
            actionLabel="RESET FILTERS"
            onAction={() => {
              setSearchQuery("");
              setSelectedFilter("ALL");
            }}
          />
        }
      />

      {/* Opportunity Detail Modal */}
      {selectedOpportunity && (
        <Modal
          visible={!!selectedOpportunity}
          animationType="slide"
          transparent
          onRequestClose={() => setSelectedOpportunity(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderTag}>
                  <Text style={styles.modalHeaderCategory}>
                    // OPPORTUNITY DETAILS
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setSelectedOpportunity(null)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.modalBody}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.modalHero}>
                  <Text style={styles.modalOrg}>
                    {selectedOpportunity.organization.toUpperCase()}
                  </Text>
                  <Text style={styles.modalTitle}>
                    {selectedOpportunity.title}
                  </Text>
                  <View style={styles.modalBadgeRow}>
                    <BrutalBadge
                      label={selectedOpportunity.opportunityType}
                      variant="accent"
                    />
                    <BrutalBadge
                      label={selectedOpportunity.workMode}
                      variant="neutral"
                    />
                    <BrutalBadge
                      label={selectedOpportunity.departmentTag}
                      variant="outline"
                    />
                  </View>
                </View>

                <View style={styles.modalStatsCard}>
                  <View style={styles.statCol}>
                    <Text style={styles.statLabel}>COMPENSATION</Text>
                    <Text style={styles.statValue}>
                      {selectedOpportunity.compensation}
                    </Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statCol}>
                    <Text style={styles.statLabel}>LOCATION</Text>
                    <Text style={styles.statValue}>
                      {selectedOpportunity.location}
                    </Text>
                  </View>
                </View>

                {/* Referrer Details */}
                <Text style={styles.modalSectionTitle}>// ALUMNI REFERRER</Text>
                <View style={styles.modalReferrerBox}>
                  <Avatar name={selectedOpportunity.postedByName} size={40} />
                  <View style={styles.modalReferrerDetails}>
                    <Text style={styles.modalReferrerName}>
                      {selectedOpportunity.postedByName}
                    </Text>
                    <Text style={styles.modalReferrerRole}>
                      {selectedOpportunity.postedByRole} @ {selectedOpportunity.postedByCompany}
                    </Text>
                    <Text style={styles.modalReferrerGrad}>
                      Class of {selectedOpportunity.postedByYear} • Verified Alumnus
                    </Text>
                  </View>
                </View>

                {/* Description */}
                <Text style={styles.modalSectionTitle}>// OVERVIEW</Text>
                <Text style={styles.modalDescText}>
                  {selectedOpportunity.description}
                </Text>

                {/* Requirements */}
                <Text style={styles.modalSectionTitle}>// CANDIDATE CRITERIA</Text>
                {selectedOpportunity.requirements.map((req, idx) => (
                  <View key={idx} style={styles.reqRow}>
                    <Text style={styles.reqBullet}>■</Text>
                    <Text style={styles.reqText}>{req}</Text>
                  </View>
                ))}

                {/* Tags */}
                <Text style={styles.modalSectionTitle}>// TECH STACK & TAGS</Text>
                <View style={styles.tagsRow}>
                  {selectedOpportunity.tags.map((tag) => (
                    <View key={tag} style={styles.tagChip}>
                      <Text style={styles.tagChipText}>#{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalFooter}>
                  {hasAppliedMap[selectedOpportunity.id] ? (
                    <BrutalButton
                      label="REFERRAL REQUEST LOGGED ✓"
                      variant="outline"
                      disabled
                      fullWidth
                    />
                  ) : (
                    <BrutalButton
                      label={
                        selectedOpportunity.opportunityType === "Referral"
                          ? "SUBMIT FOR ALUMNI REFERRAL ⚡"
                          : "SUBMIT APPLICATION →"
                      }
                      variant="primary"
                      fullWidth
                      onPress={() => handleApply(selectedOpportunity)}
                    />
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      {/* Alumni Post Opportunity Modal */}
      <Modal
        visible={postModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setPostModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTag}>
                <Text style={styles.modalHeaderCategory}>
                  // ALUMNI REFERRAL DISPATCH
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setPostModalVisible(false)}
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
              <Text style={styles.modalTitle}>Post Job / Referral</Text>
              <Text style={styles.modalSubtitle}>
                Offer direct employee referrals or open vacancies at your company to verified students and junior alumni.
              </Text>

              <BrutalInput
                label="ROLE TITLE"
                value={newTitle}
                onChangeText={setNewTitle}
                placeholder="e.g. Associate Software Engineer, Cloud Intern"
              />

              <BrutalInput
                label="ORGANIZATION / COMPANY"
                value={newOrg}
                onChangeText={setNewOrg}
                placeholder="e.g. Stripe, Amazon, Zoho"
              />

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>OPPORTUNITY TYPE</Text>
                <View style={styles.selectorRow}>
                  {(["Referral", "Full-time", "Internship"] as const).map((t) => (
                    <TouchableOpacity
                      key={t}
                      style={[
                        styles.selectorBtn,
                        newType === t && styles.selectorBtnActive,
                      ]}
                      onPress={() => setNewType(t)}
                    >
                      <Text
                        style={[
                          styles.selectorText,
                          newType === t && styles.selectorTextActive,
                        ]}
                      >
                        {t}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>WORK MODE</Text>
                <View style={styles.selectorRow}>
                  {(["Remote", "Hybrid", "Onsite"] as const).map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={[
                        styles.selectorBtn,
                        newWorkMode === m && styles.selectorBtnActive,
                      ]}
                      onPress={() => setNewWorkMode(m)}
                    >
                      <Text
                        style={[
                          styles.selectorText,
                          newWorkMode === m && styles.selectorTextActive,
                        ]}
                      >
                        {m}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <BrutalInput
                label="COMPENSATION / STIPEND"
                value={newComp}
                onChangeText={setNewComp}
                placeholder="e.g. ₹12L – ₹16L CTC or ₹50,000 / month"
              />

              <BrutalInput
                label="ROLE OVERVIEW"
                value={newDesc}
                onChangeText={setNewDesc}
                placeholder="Explain the team scope, day-to-day work, and candidate expectations..."
                multiline
                numberOfLines={3}
              />

              <BrutalInput
                label="REQUIREMENTS (ONE PER LINE)"
                value={newReqs}
                onChangeText={setNewReqs}
                placeholder="Hands-on experience with Go / TypeScript&#10;Strong understanding of data structures&#10;Proactive communication"
                multiline
                numberOfLines={3}
              />

              <View style={{ marginTop: BRUTAL_SPACING[4] }}>
                <BrutalButton
                  label="PUBLISH REFERRAL OPPORTUNITY ⚡"
                  variant="primary"
                  fullWidth
                  onPress={handleCreateOpportunity}
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
  postBtn: {
    backgroundColor: BRUTAL_COLORS.ACCENT,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[3],
    paddingVertical: BRUTAL_SPACING[2],
    ...BRUTAL_SHADOWS.subtle,
  },
  postBtnText: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 1,
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
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[2],
  },
  orgBadge: {
    backgroundColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 2,
  },
  orgText: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SURFACE,
    letterSpacing: 1,
  },
  badgeGroup: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
  },
  oppTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.lg,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    marginBottom: BRUTAL_SPACING[1],
  },
  oppDesc: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    lineHeight: 20,
    marginBottom: BRUTAL_SPACING[3],
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: BRUTAL_SPACING[4],
    marginBottom: BRUTAL_SPACING[3],
  },
  compensationTag: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  locationTag: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
  referrerBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[2],
    marginBottom: BRUTAL_SPACING[3],
    gap: BRUTAL_SPACING[2],
  },
  referrerInfo: {
    flex: 1,
  },
  referrerLabel: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 1,
  },
  referrerName: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  cardActionRow: {
    marginTop: BRUTAL_SPACING[1],
  },
  actionBtn: {
    height: 44,
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
  modalHero: {
    marginBottom: BRUTAL_SPACING[4],
  },
  modalOrg: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 1.5,
    marginBottom: BRUTAL_SPACING[1],
  },
  modalTitle: {
    fontSize: BRUTAL_TYPOGRAPHY["2xl"],
    fontWeight: BRUTAL_TYPOGRAPHY.black,
    color: BRUTAL_COLORS.INK,
    marginBottom: BRUTAL_SPACING[2],
  },
  modalSubtitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    marginBottom: BRUTAL_SPACING[4],
    lineHeight: 20,
  },
  modalBadgeRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
    flexWrap: "wrap",
  },
  modalStatsCard: {
    flexDirection: "row",
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
    ...BRUTAL_SHADOWS.subtle,
  },
  statCol: {
    flex: 1,
  },
  statDivider: {
    width: 2,
    backgroundColor: BRUTAL_COLORS.INK,
    marginHorizontal: BRUTAL_SPACING[3],
  },
  statLabel: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 1,
    marginBottom: 2,
  },
  statValue: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
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
  modalReferrerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
    gap: BRUTAL_SPACING[3],
    ...BRUTAL_SHADOWS.subtle,
  },
  modalReferrerDetails: {
    flex: 1,
  },
  modalReferrerName: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  modalReferrerRole: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
  modalReferrerGrad: {
    fontSize: 10,
    color: BRUTAL_COLORS.INK,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    marginTop: 2,
  },
  modalDescText: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    color: BRUTAL_COLORS.INK,
    lineHeight: 22,
    marginBottom: BRUTAL_SPACING[4],
  },
  reqRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: BRUTAL_SPACING[2],
    marginBottom: BRUTAL_SPACING[2],
  },
  reqBullet: {
    fontSize: 10,
    color: BRUTAL_COLORS.ACCENT,
    marginTop: 3,
  },
  reqText: {
    flex: 1,
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    color: BRUTAL_COLORS.INK,
    lineHeight: 20,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: BRUTAL_SPACING[2],
    marginBottom: BRUTAL_SPACING[6],
  },
  tagChip: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 2,
  },
  tagChipText: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  modalFooter: {
    paddingVertical: BRUTAL_SPACING[4],
    borderTopWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
  },
  formGroup: {
    marginBottom: BRUTAL_SPACING[4],
  },
  formLabel: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 1,
    marginBottom: BRUTAL_SPACING[2],
  },
  selectorRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
  },
  selectorBtn: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.SURFACE,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    paddingVertical: BRUTAL_SPACING[3],
    alignItems: "center",
  },
  selectorBtnActive: {
    backgroundColor: BRUTAL_COLORS.ACCENT,
    ...BRUTAL_SHADOWS.subtle,
  },
  selectorText: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
  selectorTextActive: {
    color: BRUTAL_COLORS.INK,
  },
});
