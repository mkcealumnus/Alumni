import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Alert,
} from "react-native";
import { colors, radii, spacing, typography } from "@alumnux/ui-tokens";
import { ALLOWED_DEPARTMENTS } from "@alumnux/schemas";
import type { PublicDirectoryUser } from "@alumnux/types";
import { mobileApi } from "../lib/api";
import { useMobileAuth } from "../context/AuthContext";

export const DirectoryScreen: React.FC = () => {
  const { user } = useMobileAuth();
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState<string | "ALL">("ALL");
  const [users, setUsers] = useState<PublicDirectoryUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Mentorship request modal state
  const [targetMentor, setTargetMentor] = useState<PublicDirectoryUser | null>(null);
  const [mentorshipMessage, setMentorshipMessage] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  const fetchDirectory = useCallback(
    async (targetPage = 1, append = false) => {
      if (targetPage === 1 && !append) {
        setIsLoading(true);
      }
      try {
        const res = await mobileApi.getDirectory({
          page: targetPage,
          limit: 15,
          query: search.trim() || undefined,
          department: selectedDept === "ALL" ? undefined : selectedDept,
        });

        if (append) {
          setUsers((prev) => [...prev, ...res.data]);
        } else {
          setUsers(res.data);
        }
        if (res.meta) {
          setPage(res.meta.page);
          setTotalPages(res.meta.totalPages);
          setTotalCount(res.meta.totalItems);
        } else {
          setTotalCount(res.data.length);
        }
      } catch {
        Alert.alert("Network Error", "Could not load alumni directory at this time.");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [search, selectedDept]
  );

  useEffect(() => {
    fetchDirectory(1, false);
  }, [fetchDirectory]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchDirectory(1, false);
  };

  const handleLoadMore = () => {
    if (!isLoading && page < totalPages) {
      fetchDirectory(page + 1, true);
    }
  };

  const handleSendMentorshipRequest = async () => {
    if (!targetMentor) return;
    const msg = mentorshipMessage.trim();
    if (!msg || msg.length < 10) {
      Alert.alert("Validation", "Please provide a detailed mentorship request (at least 10 characters).");
      return;
    }

    setIsSubmittingRequest(true);
    try {
      await mobileApi.createMentorshipRequest({
        recipientId: targetMentor.id,
        message: msg,
      });
      Alert.alert(
        "Request Sent!",
        `Your mentorship guidance request has been delivered to ${targetMentor.fullName}. You can track status in the Mentorship tab.`
      );
      setTargetMentor(null);
      setMentorshipMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit request.";
      Alert.alert("Error", msg);
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  const renderItem = ({ item }: { item: PublicDirectoryUser }) => {
    const isAlumnus = item.role === "ALUMNI";
    const canRequest = user?.id !== item.id;

    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.fullName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{item.fullName}</Text>
              <View style={[styles.badge, isAlumnus ? styles.alumniBadge : styles.studentBadge]}>
                <Text style={[styles.badgeText, isAlumnus ? styles.alumniBadgeText : styles.studentBadgeText]}>
                  {item.role}
                </Text>
              </View>
            </View>
            {item.headline ? (
              <Text style={styles.headline}>{item.headline}</Text>
            ) : isAlumnus && item.currentRole ? (
              <Text style={styles.headline}>
                {item.currentRole} {item.currentCompany ? `at ${item.currentCompany}` : ""}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailText}>🏢 {item.departmentName || item.departmentCode || "Engineering"}</Text>
          {item.graduationYear && (
            <Text style={styles.detailText}>🎓 Class of {item.graduationYear}</Text>
          )}
          {item.locationCity && <Text style={styles.detailText}>📍 {item.locationCity}</Text>}
        </View>

        {item.bio && <Text style={styles.bioText}>{item.bio}</Text>}

        {canRequest && (
          <TouchableOpacity
            style={styles.mentorshipButton}
            onPress={() => setTargetMentor(item)}
            activeOpacity={0.8}
          >
            <Text style={styles.mentorshipButtonText}>+ Request Mentorship</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Alumni Directory</Text>
          <Text style={styles.subtitle}>
            {totalCount} verified members in the Alumnux network
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, role, or company..."
            placeholderTextColor={colors.secondary.DEFAULT + "80"}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => fetchDirectory(1, false)}
            returnKeyType="search"
          />
        </View>

        {/* Department Filter Chips */}
        <View style={styles.filterSection}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={["ALL", ...ALLOWED_DEPARTMENTS]}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.filterList}
            renderItem={({ item }) => {
              const active = selectedDept === item;
              return (
                <TouchableOpacity
                  style={[styles.filterChip, active && styles.filterChipActive]}
                  onPress={() => setSelectedDept(item)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Directory List */}
        {isLoading && page === 1 ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.accent.DEFAULT} />
            <Text style={styles.loadingText}>Loading network directory...</Text>
          </View>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={[colors.accent.DEFAULT]}
              />
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.4}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyTitle}>No Members Found</Text>
                <Text style={styles.emptyDesc}>
                  Try clearing your search query or department filter.
                </Text>
              </View>
            }
          />
        )}

        {/* Mentorship Request Modal */}
        <Modal
          visible={!!targetMentor}
          transparent
          animationType="slide"
          onRequestClose={() => setTargetMentor(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Request Mentorship Guidance</Text>
              <Text style={styles.modalSubtitle}>
                Sending to: <Text style={styles.modalHighlight}>{targetMentor?.fullName}</Text> ({targetMentor?.departmentName || targetMentor?.departmentCode})
              </Text>

              <Text style={styles.modalLabel}>Your guidance purpose & questions</Text>
              <TextInput
                style={styles.modalTextArea}
                placeholder="Briefly describe what guidance you are seeking (e.g. resume review, software engineering career advice, interview preparation)..."
                placeholderTextColor={colors.secondary.DEFAULT + "80"}
                value={mentorshipMessage}
                onChangeText={setMentorshipMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!isSubmittingRequest}
              />

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalCancelButton}
                  onPress={() => {
                    setTargetMentor(null);
                    setMentorshipMessage("");
                  }}
                  disabled={isSubmittingRequest}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalSubmitButton, isSubmittingRequest && styles.buttonDisabled]}
                  onPress={handleSendMentorshipRequest}
                  disabled={isSubmittingRequest}
                >
                  {isSubmittingRequest ? (
                    <ActivityIndicator size="small" color={colors.accent.foreground} />
                  ) : (
                    <Text style={styles.modalSubmitText}>Submit Request</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.page,
  },
  container: {
    flex: 1,
  },
  titleSection: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
  },
  pageTitle: {
    fontSize: typography.sizes["2xl"],
    fontWeight: "800",
    color: colors.primary.DEFAULT,
  },
  subtitle: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: spacing[4],
    marginTop: spacing[3],
  },
  searchInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
    fontSize: typography.sizes.sm,
    color: colors.primary.DEFAULT,
  },
  filterSection: {
    marginTop: spacing[2],
    marginBottom: spacing[2],
  },
  filterList: {
    paddingHorizontal: spacing[4],
    gap: spacing[2],
  },
  filterChip: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[2],
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.full,
  },
  filterChipActive: {
    backgroundColor: colors.primary.DEFAULT,
    borderColor: colors.primary.DEFAULT,
  },
  filterChipText: {
    fontSize: typography.sizes.xs,
    fontWeight: "600",
    color: colors.primary.DEFAULT,
  },
  filterChipTextActive: {
    color: colors.primary.foreground,
  },
  listContent: {
    paddingHorizontal: spacing[4],
    paddingBottom: spacing[8],
    gap: spacing[3],
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing[4],
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTop: {
    flexDirection: "row",
    gap: spacing[3],
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radii.base,
    backgroundColor: colors.accent.subtle,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: typography.sizes.lg,
    fontWeight: "700",
    color: colors.accent.DEFAULT,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: typography.sizes.base,
    fontWeight: "700",
    color: colors.primary.DEFAULT,
  },
  badge: {
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  badgeText: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
  },
  alumniBadge: {
    backgroundColor: colors.primary.DEFAULT,
  },
  alumniBadgeText: {
    color: colors.primary.foreground,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
  },
  studentBadge: {
    backgroundColor: colors.accent.subtle,
  },
  studentBadgeText: {
    color: colors.accent.DEFAULT,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
  },
  headline: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    marginTop: 2,
  },
  detailRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[3],
    marginTop: spacing[3],
    paddingTop: spacing[2],
    borderTopWidth: 1,
    borderTopColor: colors.border + "60",
  },
  detailText: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
  },
  bioText: {
    fontSize: typography.sizes.xs,
    color: colors.primary.DEFAULT,
    marginTop: spacing[2],
    lineHeight: 18,
  },
  mentorshipButton: {
    marginTop: spacing[3],
    backgroundColor: colors.accent.subtle,
    borderWidth: 1,
    borderColor: colors.accent.DEFAULT + "40",
    paddingVertical: spacing[2],
    borderRadius: radii.base,
    alignItems: "center",
  },
  mentorshipButtonText: {
    color: colors.accent.DEFAULT,
    fontSize: typography.sizes.xs,
    fontWeight: "700",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: spacing[3],
    fontSize: typography.sizes.sm,
    color: colors.secondary.DEFAULT,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: spacing[10],
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: spacing[2],
  },
  emptyTitle: {
    fontSize: typography.sizes.base,
    fontWeight: "700",
    color: colors.primary.DEFAULT,
  },
  emptyDesc: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.md,
    borderTopRightRadius: radii.md,
    padding: spacing[5],
    gap: spacing[3],
  },
  modalTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: "800",
    color: colors.primary.DEFAULT,
  },
  modalSubtitle: {
    fontSize: typography.sizes.sm,
    color: colors.secondary.DEFAULT,
  },
  modalHighlight: {
    fontWeight: "700",
    color: colors.primary.DEFAULT,
  },
  modalLabel: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    color: colors.primary.DEFAULT,
    textTransform: "uppercase",
    marginTop: spacing[2],
  },
  modalTextArea: {
    backgroundColor: colors.page,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.base,
    padding: spacing[3],
    fontSize: typography.sizes.sm,
    color: colors.primary.DEFAULT,
    height: 100,
  },
  modalActions: {
    flexDirection: "row",
    gap: spacing[3],
    marginTop: spacing[2],
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: spacing[3],
    borderRadius: radii.base,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  modalCancelText: {
    fontSize: typography.sizes.sm,
    color: colors.secondary.DEFAULT,
    fontWeight: "600",
  },
  modalSubmitButton: {
    flex: 1,
    backgroundColor: colors.accent.DEFAULT,
    paddingVertical: spacing[3],
    borderRadius: radii.base,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  modalSubmitText: {
    fontSize: typography.sizes.sm,
    color: colors.accent.foreground,
    fontWeight: "700",
  },
});
