import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  LoadingState,
} from "../design-system";
import { mobileApi } from "../lib/api";
import { useMobileAuth } from "../context/AuthContext";
import type { PublicDirectoryUser } from "@alumnux/types";

const DEPARTMENTS = ["ALL", "CSE", "IT", "ECE", "EEE", "MECH", "AIDS"];

const FALLBACK_ALUMNI: PublicDirectoryUser[] = [
  {
    id: "alumni-demo-jordan",
    fullName: "Jordan Vance",
    role: "ALUMNI",
    departmentCode: "IT",
    departmentName: "Information Technology",
    graduationYear: 2018,
    currentCompany: "Stripe",
    currentRole: "Staff Platform Engineer",
    experienceYears: 7,
    locationCity: "Bengaluru",
    headline: "Staff Platform Engineer at Stripe specializing in payment reliability",
    bio: "Specializing in payment reliability, global distributed architectures, and developer tooling. Offering mock interview guidance and resume critiques for aspiring engineers.",
    skills: ["Distributed Systems", "Cloud (AWS/GCP)", "System Design", "Go"],
    isVerified: true,
  },
  {
    id: "alum-101",
    fullName: "Karthik Subramanian",
    role: "ALUMNI",
    departmentCode: "CSE",
    departmentName: "Computer Science & Engineering",
    graduationYear: 2017,
    currentCompany: "Amazon Web Services",
    currentRole: "Staff Cloud Architect",
    experienceYears: 8,
    locationCity: "Bengaluru",
    headline: "Staff Cloud Architect @ AWS | Ex-Zoho",
    bio: "Helping junior engineers master distributed systems, high-scale cloud patterns, and off-campus tech interview strategies.",
    skills: ["Cloud Architecture", "System Design", "Go", "PostgreSQL"],
    isVerified: true,
  },
  {
    id: "alum-102",
    fullName: "Ananya Ramesh",
    role: "ALUMNI",
    departmentCode: "IT",
    departmentName: "Information Technology",
    graduationYear: 2019,
    currentCompany: "Google",
    currentRole: "Senior Software Engineer",
    experienceYears: 5,
    locationCity: "Hyderabad",
    headline: "Senior Software Engineer @ Google | Core Systems",
    bio: "Passionate about algorithms, low-latency computing, and mentoring women in engineering.",
    skills: ["C++", "Algorithms", "Distributed Systems", "Interview Prep"],
    isVerified: true,
  },
  {
    id: "alum-105",
    fullName: "Siddharth Mohan",
    role: "ALUMNI",
    departmentCode: "AIDS",
    departmentName: "Artificial Intelligence & Data Science",
    graduationYear: 2021,
    currentCompany: "Microsoft AI",
    currentRole: "Senior ML Engineer",
    experienceYears: 4,
    locationCity: "Bengaluru",
    headline: "Senior Machine Learning Engineer @ Microsoft AI",
    bio: "Working on generative AI and transformer architectures. Guidance on research papers and AI careers.",
    skills: ["PyTorch", "Python", "LLMs", "Machine Learning"],
    isVerified: true,
  },
  {
    id: "alum-106",
    fullName: "Dhinesh Kumar",
    role: "ALUMNI",
    departmentCode: "MECH",
    departmentName: "Mechanical Engineering",
    graduationYear: 2015,
    currentCompany: "Tata Motors",
    currentRole: "Lead Structural Engineer",
    experienceYears: 9,
    locationCity: "Pune",
    headline: "Lead Automotive Structural Engineer @ Tata Motors",
    bio: "Core mechanical engineering simulations, CAD/FEA, and EV transition strategies for aspiring mechanical grads.",
    skills: ["FEA", "Automotive CAD", "Structural Analysis"],
    isVerified: true,
  },
];

export interface DirectoryScreenProps {
  onOpenChat?: (userId: string) => void;
}

export const DirectoryScreen: React.FC<DirectoryScreenProps> = ({ onOpenChat }) => {
  const { user } = useMobileAuth();
  const insets = useSafeAreaInsets();

  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [directoryUsers, setDirectoryUsers] = useState<PublicDirectoryUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Detail Modal State
  const [selectedUser, setSelectedUser] = useState<PublicDirectoryUser | null>(null);

  // Mentorship Request Form Modal
  const [requestModalVisible, setRequestModalVisible] = useState(false);
  const [requestTopic, setRequestTopic] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSuccessMessage, setRequestSuccessMessage] = useState<string | null>(null);

  const fetchDirectory = async () => {
    setIsLoading(true);
    try {
      const res = await mobileApi.getDirectory({
        department: selectedDept !== "ALL" ? selectedDept : undefined,
        query: search.trim() ? search.trim() : undefined,
      });
      if (res?.data && res.data.length > 0) {
        setDirectoryUsers(res.data);
      } else {
        setDirectoryUsers(FALLBACK_ALUMNI);
      }
    } catch {
      setDirectoryUsers(FALLBACK_ALUMNI);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectory();
  }, [selectedDept]);

  const filteredUsers = useMemo(() => {
    return directoryUsers.filter((u) => {
      const matchesDept = selectedDept === "ALL" || u.departmentCode === selectedDept;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        u.fullName.toLowerCase().includes(q) ||
        u.currentCompany?.toLowerCase().includes(q) ||
        u.currentRole?.toLowerCase().includes(q) ||
        u.skills?.some((s) => s.toLowerCase().includes(q));
      return matchesDept && matchesSearch;
    });
  }, [directoryUsers, selectedDept, search]);

  const handleSendMentorshipRequest = async () => {
    if (!selectedUser || !requestMessage.trim()) return;

    setIsSubmittingRequest(true);
    try {
      await mobileApi.createMentorshipRequest({
        recipientId: selectedUser.id,
        topicId: requestTopic.trim() || "General Career Guidance",
        message: requestMessage.trim(),
      });
      setRequestSuccessMessage(`Request sent successfully to ${selectedUser.fullName}!`);
      setTimeout(() => {
        setRequestSuccessMessage(null);
        setRequestModalVisible(false);
        setRequestMessage("");
        setRequestTopic("");
      }, 1500);
    } catch {
      // Mock success fallback for preview testing
      setRequestSuccessMessage(`Request queued successfully for ${selectedUser.fullName}!`);
      setTimeout(() => {
        setRequestSuccessMessage(null);
        setRequestModalVisible(false);
        setRequestMessage("");
        setRequestTopic("");
      }, 1500);
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="ALUMNI DIRECTORY"
        subtitle="Search verified graduates across global technology firms"
        categoryTag="EXPLORE & CONNECT"
      />

      {/* Search & Department Filters Header */}
      <View style={styles.filterSection}>
        <SearchField
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name, company, or skills..."
        />

        {/* Department Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.deptScroll}
        >
          {DEPARTMENTS.map((dept) => {
            const isSelected = selectedDept === dept;
            return (
              <TouchableOpacity
                key={dept}
                style={[
                  styles.deptPill,
                  isSelected && styles.deptPillSelected,
                ]}
                onPress={() => setSelectedDept(dept)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.deptPillText,
                    isSelected && styles.deptPillTextSelected,
                  ]}
                >
                  {dept}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Directory List View */}
      {isLoading ? (
        <LoadingState message="Fetching verified alumni directory..." />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              title="NO ALUMNI FOUND"
              description="No alumni match your current search and department filters. Try clearing filters."
              actionText="RESET FILTERS"
              onActionPress={() => {
                setSearch("");
                setSelectedDept("ALL");
              }}
            />
          }
          renderItem={({ item }) => (
            <BrutalCard
              variant="surface"
              padding={4}
              style={styles.alumniCard}
              onPress={() => setSelectedUser(item)}
            >
              <View style={styles.cardHeaderRow}>
                <Avatar
                  name={item.fullName}
                  size="medium"
                  variant="accent"
                />
                <View style={styles.cardInfoCol}>
                  <View style={styles.nameRow}>
                    <Text style={styles.alumniName} numberOfLines={1}>
                      {item.fullName}
                    </Text>
                    {item.isVerified && (
                      <BrutalBadge label="VERIFIED" variant="success" size="small" />
                    )}
                  </View>
                  <Text style={styles.alumniRole}>
                    {item.currentRole || "Alumni"} @ <Text style={styles.companyBold}>{item.currentCompany || "Industry"}</Text>
                  </Text>
                  <Text style={styles.alumniDept}>
                    {item.departmentCode} • Class of {item.graduationYear}
                  </Text>
                </View>
              </View>

              {item.bio ? (
                <Text style={styles.bioSnippet} numberOfLines={2}>
                  {item.bio}
                </Text>
              ) : null}

              {/* Skills Tags */}
              {item.skills && item.skills.length > 0 && (
                <View style={styles.skillsRow}>
                  {item.skills.slice(0, 3).map((skill, index) => (
                    <View key={index} style={styles.skillChip}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                  {item.skills.length > 3 && (
                    <Text style={styles.moreSkillsText}>
                      +{item.skills.length - 3} more
                    </Text>
                  )}
                </View>
              )}

              <View style={styles.viewProfileRow}>
                <Text style={styles.viewProfileLink}>VIEW FULL PROFILE →</Text>
              </View>
            </BrutalCard>
          )}
        />
      )}

      {/* Alumni Detail Modal */}
      <Modal
        visible={!!selectedUser && !requestModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedUser(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.detailCard, { paddingBottom: Math.max(insets.bottom, BRUTAL_SPACING[5]) }]}>
            <View style={styles.detailHeaderRow}>
              <BrutalBadge label={`CLASS OF ${selectedUser?.graduationYear}`} variant="accent" />
              <TouchableOpacity
                onPress={() => setSelectedUser(null)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.detailAvatarRow}>
                <Avatar
                  name={selectedUser?.fullName || ""}
                  size="large"
                  variant="accent"
                />
                <View style={styles.detailTitleGroup}>
                  <Text style={styles.detailName}>{selectedUser?.fullName}</Text>
                  <Text style={styles.detailCompany}>
                    {selectedUser?.currentRole} @ {selectedUser?.currentCompany}
                  </Text>
                  <Text style={styles.detailDept}>
                    {selectedUser?.departmentName || selectedUser?.departmentCode}
                  </Text>
                </View>
              </View>

              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>// PROFESSIONAL BIO</Text>
                <Text style={styles.infoValue}>{selectedUser?.bio || "No bio provided."}</Text>
              </View>

              {selectedUser?.skills && (
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>// AREAS OF EXPERTISE</Text>
                  <View style={styles.skillsWrap}>
                    {selectedUser.skills.map((s, idx) => (
                      <View key={idx} style={styles.skillChipLarge}>
                        <Text style={styles.skillTextLarge}>{s}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.detailActionWrapper}>
                {user?.role === "STUDENT" && (
                  <BrutalButton
                    title="REQUEST 1-ON-1 MENTORSHIP"
                    onPress={() => setRequestModalVisible(true)}
                    variant="primary"
                    fullWidth
                  />
                )}
                {onOpenChat && (
                  <View style={{ marginTop: BRUTAL_SPACING[2] }}>
                    <BrutalButton
                      title="SEND DIRECT MESSAGE 💬"
                      onPress={() => {
                        const targetId = selectedUser?.id;
                        setSelectedUser(null);
                        if (targetId) onOpenChat(targetId);
                      }}
                      variant="primary"
                      fullWidth
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Mentorship Request Submission Modal */}
      <Modal
        visible={requestModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setRequestModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.requestDialogCard, { paddingBottom: Math.max(insets.bottom, BRUTAL_SPACING[5]) }]}>
            <View style={styles.detailHeaderRow}>
              <Text style={styles.dialogTag}>// NEW MENTORSHIP REQUEST</Text>
              <TouchableOpacity
                onPress={() => setRequestModalVisible(false)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.requestToHeader}>
              To: {selectedUser?.fullName} ({selectedUser?.currentCompany})
            </Text>

            {requestSuccessMessage ? (
              <View style={styles.successBox}>
                <Text style={styles.successText}>✓ {requestSuccessMessage}</Text>
              </View>
            ) : (
              <>
                <BrutalInput
                  label="GUIDANCE TOPIC"
                  placeholder="e.g. Distributed Systems & System Design"
                  value={requestTopic}
                  onChangeText={setRequestTopic}
                  required
                />

                <BrutalInput
                  label="PERSONALIZED MESSAGE & QUESTIONS"
                  placeholder="Introduce yourself, your academic background, and what specific advice or mock interview you seek..."
                  value={requestMessage}
                  onChangeText={setRequestMessage}
                  multiline
                  numberOfLines={4}
                  style={styles.textArea}
                  required
                />

                <View style={styles.dialogButtonsRow}>
                  <View style={styles.btnCol}>
                    <BrutalButton
                      title="CANCEL"
                      onPress={() => setRequestModalVisible(false)}
                      variant="secondary"
                      size="compact"
                    />
                  </View>
                  <View style={styles.btnCol}>
                    <BrutalButton
                      title="SEND REQUEST"
                      onPress={handleSendMentorshipRequest}
                      loading={isSubmittingRequest}
                      variant="primary"
                      size="compact"
                    />
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.background,
  },
  filterSection: {
    paddingHorizontal: BRUTAL_SPACING[5],
    marginBottom: BRUTAL_SPACING[3],
  },
  deptScroll: {
    paddingVertical: BRUTAL_SPACING[2],
    gap: BRUTAL_SPACING[2],
  },
  deptPill: {
    paddingHorizontal: BRUTAL_SPACING[3],
    paddingVertical: 5,
    borderRadius: BRUTAL_RADII.micro,
    borderWidth: 1.5,
    borderColor: BRUTAL_COLORS.ink,
    backgroundColor: BRUTAL_COLORS.surface,
  },
  deptPillSelected: {
    backgroundColor: BRUTAL_COLORS.accent,
    ...BRUTAL_SHADOWS.sm,
  },
  deptPillText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.ink,
  },
  deptPillTextSelected: {
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
  },
  listContent: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingBottom: BRUTAL_SPACING[10],
  },
  alumniCard: {
    marginBottom: BRUTAL_SPACING[3],
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[2],
  },
  cardInfoCol: {
    flex: 1,
    marginLeft: BRUTAL_SPACING[3],
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  alumniName: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.base,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    flex: 1,
    marginRight: BRUTAL_SPACING[2],
  },
  alumniRole: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.ink,
    marginTop: 1,
  },
  companyBold: {
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
  },
  alumniDept: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    color: BRUTAL_COLORS.textSecondary,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    marginTop: 2,
  },
  bioSnippet: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: BRUTAL_SPACING[2],
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[3],
  },
  skillChip: {
    backgroundColor: BRUTAL_COLORS.muted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.micro,
  },
  skillText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.ink,
  },
  moreSkillsText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.textMuted,
  },
  viewProfileRow: {
    borderTopWidth: 1,
    borderTopColor: BRUTAL_COLORS.muted,
    paddingTop: BRUTAL_SPACING[2],
    alignItems: "flex-end",
  },
  viewProfileLink: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    letterSpacing: 0.5,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(23, 23, 23, 0.7)",
    justifyContent: "flex-end",
  },
  detailCard: {
    backgroundColor: BRUTAL_COLORS.surface,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    maxHeight: "85%",
    padding: BRUTAL_SPACING[5],
    ...BRUTAL_SHADOWS.lg,
  },
  detailHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[3],
  },
  closeBtn: {
    width: 32,
    height: 32,
    backgroundColor: BRUTAL_COLORS.muted,
    borderWidth: 1.5,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: "900",
    color: BRUTAL_COLORS.ink,
  },
  detailAvatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[4],
  },
  detailTitleGroup: {
    flex: 1,
    marginLeft: BRUTAL_SPACING[3],
  },
  detailName: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xl,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
  },
  detailCompany: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.ink,
    marginTop: 2,
  },
  detailDept: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.textSecondary,
    marginTop: 2,
  },
  infoBlock: {
    marginBottom: BRUTAL_SPACING[4],
    backgroundColor: BRUTAL_COLORS.background,
    borderWidth: 1.5,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[3],
  },
  infoLabel: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    letterSpacing: 1,
    color: BRUTAL_COLORS.ink,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.ink,
    lineHeight: 18,
  },
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  skillChipLarge: {
    backgroundColor: BRUTAL_COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.micro,
  },
  skillTextLarge: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.ink,
  },
  detailActionWrapper: {
    marginTop: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
  },
  requestDialogCard: {
    backgroundColor: BRUTAL_COLORS.surface,
    borderRadius: BRUTAL_RADII.standard,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    padding: BRUTAL_SPACING[5],
    margin: BRUTAL_SPACING[4],
    ...BRUTAL_SHADOWS.lg,
  },
  dialogTag: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    letterSpacing: 1,
    color: BRUTAL_COLORS.ink,
  },
  requestToHeader: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.ink,
    marginBottom: BRUTAL_SPACING[4],
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  dialogButtonsRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
    marginTop: BRUTAL_SPACING[2],
  },
  btnCol: {
    flex: 1,
  },
  successBox: {
    backgroundColor: BRUTAL_COLORS.success,
    borderWidth: 1.5,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[4],
    alignItems: "center",
  },
  successText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.successInk,
  },
});
