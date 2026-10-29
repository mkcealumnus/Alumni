import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { colors, radii, spacing, typography } from "@alumnux/ui-tokens";
import type { MentorshipRequest, MentorshipRequestStatus } from "@alumnux/types";
import { mobileApi } from "../lib/api";
import { useMobileAuth } from "../context/AuthContext";

export const MentorshipScreen: React.FC = () => {
  const { user } = useMobileAuth();
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<MentorshipRequestStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await mobileApi.getMentorshipRequests();
      setRequests(data);
    } catch {
      Alert.alert("Network Error", "Could not load mentorship requests.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchRequests();
  };

  const handleUpdateStatus = async (
    requestId: string,
    newStatus: "ACCEPTED" | "DECLINED" | "CANCELLED"
  ) => {
    setActionLoadingId(requestId);
    try {
      await mobileApi.updateMentorshipStatus(requestId, newStatus);
      Alert.alert("Status Updated", `Mentorship request has been marked as ${newStatus}.`);
      await fetchRequests();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update status.";
      Alert.alert("Action Failed", msg);
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusBadgeStyle = (status: MentorshipRequestStatus) => {
    switch (status) {
      case "accepted":
        return {
          bg: colors.semantic.successSubtle,
          border: colors.semantic.successBorder,
          text: colors.semantic.success,
        };
      case "declined":
        return {
          bg: colors.semantic.errorSubtle,
          border: colors.semantic.errorBorder,
          text: colors.semantic.error,
        };
      default:
        return {
          bg: colors.semantic.warningSubtle,
          border: colors.semantic.warningBorder,
          text: colors.semantic.warning,
        };
    }
  };

  const filteredRequests = selectedStatus === "all"
    ? requests
    : requests.filter((r) => r.status === selectedStatus);

  const renderItem = ({ item }: { item: MentorshipRequest }) => {
    const isRecipient = user?.id === item.alumniId;
    const isRequester = user?.id === item.studentId;
    const badge = getStatusBadgeStyle(item.status);
    const isPending = item.status === "pending";
    const isActioning = actionLoadingId === item.id;

    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View>
            <Text style={styles.roleLabel}>
              {isRecipient ? "Incoming Guidance Request" : "Outgoing Request"}
            </Text>
            <Text style={styles.personName}>
              Request ID: #{item.id.slice(0, 8)}
            </Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: badge.bg, borderColor: badge.border }]}>
            <Text style={[styles.statusText, { color: badge.text }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Message */}
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>"{item.message}"</Text>
        </View>

        {/* Timestamp */}
        <Text style={styles.timestampText}>
          Requested on {new Date(item.createdAt).toLocaleDateString()}
        </Text>

        {/* Action Controls for Recipient Alumnus */}
        {isRecipient && isPending && (
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.acceptButton, isActioning && styles.disabledButton]}
              onPress={() => handleUpdateStatus(item.id, "ACCEPTED")}
              disabled={isActioning}
              activeOpacity={0.8}
            >
              {isActioning ? (
                <ActivityIndicator size="small" color={colors.surface} />
              ) : (
                <Text style={styles.acceptButtonText}>Accept Mentorship</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.declineButton, isActioning && styles.disabledButton]}
              onPress={() => handleUpdateStatus(item.id, "DECLINED")}
              disabled={isActioning}
              activeOpacity={0.8}
            >
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Action Control for Requester to Cancel */}
        {isRequester && isPending && (
          <TouchableOpacity
            style={styles.cancelRequestButton}
            onPress={() => handleUpdateStatus(item.id, "CANCELLED")}
            disabled={isActioning}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelRequestText}>Cancel Request</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Mentorship Desk</Text>
          <Text style={styles.subtitle}>
            Manage 1-on-1 career guidance requests and updates.
          </Text>
        </View>

        {/* Status Filter Tabs */}
        <View style={styles.tabsContainer}>
          {(["all", "pending", "accepted", "declined"] as const).map((status) => {
            const active = selectedStatus === status;
            return (
              <TouchableOpacity
                key={status}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => setSelectedStatus(status)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {status.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Requests List */}
        {isLoading && !isRefreshing ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.accent.DEFAULT} />
            <Text style={styles.loadingText}>Fetching mentorship requests...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredRequests}
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
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>📬</Text>
                <Text style={styles.emptyTitle}>No Mentorship Requests</Text>
                <Text style={styles.emptyDesc}>
                  {user?.role === "STUDENT"
                    ? "Go to the Directory tab to browse alumni mentors and submit a guidance request."
                    : "No student mentorship requests have been received under this filter."}
                </Text>
              </View>
            }
          />
        )}
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
  header: {
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
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: spacing[4],
    marginVertical: spacing[3],
    gap: spacing[2],
  },
  tab: {
    flex: 1,
    paddingVertical: spacing[2],
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.base,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: colors.primary.DEFAULT,
    borderColor: colors.primary.DEFAULT,
  },
  tabText: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
    color: colors.secondary.DEFAULT,
  },
  tabTextActive: {
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
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  roleLabel: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    fontWeight: "500",
  },
  personName: {
    fontSize: typography.sizes.base,
    fontWeight: "700",
    color: colors.primary.DEFAULT,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: spacing[2],
    paddingVertical: 3,
    borderRadius: radii.sm,
    borderWidth: 1,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    fontWeight: "700",
  },
  messageBox: {
    backgroundColor: colors.page,
    padding: spacing[3],
    borderRadius: radii.base,
    marginTop: spacing[3],
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: typography.sizes.sm,
    color: colors.primary.DEFAULT,
    fontStyle: "italic",
    lineHeight: 20,
  },
  timestampText: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    marginTop: spacing[2],
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing[2],
    marginTop: spacing[3],
  },
  acceptButton: {
    flex: 2,
    backgroundColor: colors.semantic.success,
    paddingVertical: spacing[2],
    borderRadius: radii.base,
    alignItems: "center",
  },
  acceptButtonText: {
    color: colors.surface,
    fontWeight: "700",
    fontSize: typography.sizes.xs,
  },
  declineButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.semantic.errorBorder,
    paddingVertical: spacing[2],
    borderRadius: radii.base,
    alignItems: "center",
  },
  declineButtonText: {
    color: colors.semantic.error,
    fontWeight: "700",
    fontSize: typography.sizes.xs,
  },
  cancelRequestButton: {
    marginTop: spacing[3],
    alignSelf: "flex-start",
    paddingVertical: spacing[1],
  },
  cancelRequestText: {
    fontSize: typography.sizes.xs,
    color: colors.secondary.DEFAULT,
    textDecorationLine: "underline",
  },
  disabledButton: {
    opacity: 0.7,
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
    textAlign: "center",
    paddingHorizontal: spacing[6],
  },
});
