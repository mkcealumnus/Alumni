import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  ScreenHeader,
  BrutalCard,
  BrutalBadge,
  BrutalButton,
  BrutalInput,
  EmptyState,
  LoadingState,
  ConfirmDialog,
} from "../design-system";
import { mobileApi } from "../lib/api";
import { useMobileAuth } from "../context/AuthContext";
import type { MentorshipRequest } from "@alumnux/types";

export interface MentorshipScreenProps {
  onOpenChat?: (partnerId: string, topic?: string, mentorshipRequestId?: string) => void;
}

export const MentorshipScreen: React.FC<MentorshipScreenProps> = ({ onOpenChat }) => {
  const { user } = useMobileAuth();
  const isAlumni = user?.role === "ALUMNI";

  const [activeTab, setActiveTab] = useState<"requests" | "find">("requests");
  const [requests, setRequests] = useState<MentorshipRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Request Form Modal State
  const [newModalVisible, setNewModalVisible] = useState(false);
  const [recipientName, setRecipientName] = useState("Jordan Vance (Stripe)");
  const [recipientId, setRecipientId] = useState("alumni-demo-jordan");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Action Dialog State
  const [confirmDialog, setConfirmDialog] = useState<{
    visible: boolean;
    requestId: string;
    action: "ACCEPTED" | "DECLINED" | "CANCELLED";
    title: string;
    description: string;
  }>({
    visible: false,
    requestId: "",
    action: "ACCEPTED",
    title: "",
    description: "",
  });

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const data = await mobileApi.getMentorshipRequests();
      if (data && data.length > 0) {
        setRequests(data);
      } else {
        // Fallback sample requests
        setRequests([
          {
            id: "req-01",
            requesterId: "student-demo-alex",
            recipientId: "alumni-demo-jordan",
            topicId: "Distributed Systems & System Design",
            message: "Hi Jordan, I am preparing for off-campus backend drives. Would love 20 mins of guidance on system design interviews.",
            status: "ACCEPTED",
            createdAt: "2026-10-25T10:30:00Z",
            updatedAt: "2026-10-26T08:15:00Z",
          },
          {
            id: "req-02",
            requesterId: "student-demo-alex",
            recipientId: "alum-101",
            topicId: "Cloud Architecture & Resume Critique",
            message: "Hello Karthik, seeking feedback on my distributed systems resume for junior cloud architect roles at AWS.",
            status: "PENDING",
            createdAt: "2026-10-28T14:20:00Z",
            updatedAt: "2026-10-28T14:20:00Z",
          },
        ]);
      }
    } catch {
      setRequests([
        {
          id: "req-01",
          requesterId: "student-demo-alex",
          recipientId: "alumni-demo-jordan",
          topicId: "Distributed Systems & System Design",
          message: "Hi Jordan, I am preparing for off-campus backend drives. Would love 20 mins of guidance on system design interviews.",
          status: "ACCEPTED",
          createdAt: "2026-10-25T10:30:00Z",
          updatedAt: "2026-10-26T08:15:00Z",
        },
        {
          id: "req-02",
          requesterId: "student-demo-alex",
          recipientId: "alum-101",
          topicId: "Cloud Architecture & Resume Critique",
          message: "Hello Karthik, seeking feedback on my distributed systems resume for junior cloud architect roles at AWS.",
          status: "PENDING",
          createdAt: "2026-10-28T14:20:00Z",
          updatedAt: "2026-10-28T14:20:00Z",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleUpdateStatus = async () => {
    const { requestId, action } = confirmDialog;
    setConfirmDialog((prev) => ({ ...prev, visible: false }));

    try {
      await mobileApi.updateMentorshipStatus(requestId, action);
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: action } : r))
      );
    } catch {
      // Local optimistic update
      setRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: action } : r))
      );
    }
  };

  const handleCreateRequest = async () => {
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      const newReq = await mobileApi.createMentorshipRequest({
        recipientId,
        topicId: topic.trim() || "General Career Guidance",
        message: message.trim(),
      });
      setRequests((prev) => [newReq, ...prev]);
      setNewModalVisible(false);
      setMessage("");
      setTopic("");
    } catch {
      const mockReq: MentorshipRequest = {
        id: `req-${Date.now()}`,
        requesterId: user?.id || "student-demo",
        recipientId,
        topicId: topic.trim() || "Career & Resume Review",
        message: message.trim(),
        status: "PENDING",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setRequests((prev) => [mockReq, ...prev]);
      setNewModalVisible(false);
      setMessage("");
      setTopic("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: MentorshipRequest["status"]) => {
    const s = (status || "").toUpperCase();
    switch (s) {
      case "ACCEPTED":
        return <BrutalBadge label="ACCEPTED" variant="success" size="small" />;
      case "DECLINED":
        return <BrutalBadge label="DECLINED" variant="danger" size="small" />;
      case "CANCELLED":
        return <BrutalBadge label="CANCELLED" variant="neutral" size="small" />;
      case "PENDING":
      default:
        return <BrutalBadge label="PENDING REVIEW" variant="warning" size="small" />;
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={isAlumni ? "MENTORSHIP INBOX" : "MENTORSHIP HUB"}
        subtitle={
          isAlumni
            ? "Review and respond to guidance requests from engineering students"
            : "Connect 1-on-1 with industry graduates for career acceleration"
        }
        categoryTag="1-ON-1 GUIDANCE"
      />

      {/* Action Header Strip */}
      <View style={styles.headerActionStrip}>
        <View style={styles.statusCountTag}>
          <Text style={styles.statusCountText}>
            {requests.length} ACTIVE REQUESTS
          </Text>
        </View>

        {!isAlumni && (
          <BrutalButton
            title="+ NEW REQUEST"
            onPress={() => setNewModalVisible(true)}
            size="small"
            variant="primary"
          />
        )}
      </View>

      {/* Main Request Feed */}
      {isLoading ? (
        <LoadingState message="Retrieving mentorship request queue..." />
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              title="NO MENTORSHIP REQUESTS"
              description="No active mentorship connections found. Explore the directory to find a verified mentor."
              actionText={isAlumni ? undefined : "FIND A MENTOR"}
              onActionPress={isAlumni ? undefined : () => setNewModalVisible(true)}
            />
          }
          renderItem={({ item }) => (
            <BrutalCard variant="surface" padding={4} style={styles.requestCard}>
              <View style={styles.cardTopRow}>
                {getStatusBadge(item.status)}
                <Text style={styles.dateStamp}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>

              <Text style={styles.topicTitle}>{item.topicId || "Career Guidance"}</Text>
              <Text style={styles.messageBody}>{item.message}</Text>

              {/* Action Buttons for Alumni (Accept / Decline) */}
              {isAlumni && (item.status || "").toUpperCase() === "PENDING" && (
                <View style={styles.actionButtonGroup}>
                  <View style={styles.btnCol}>
                    <BrutalButton
                      title="DECLINE"
                      onPress={() =>
                        setConfirmDialog({
                          visible: true,
                          requestId: item.id,
                          action: "DECLINED",
                          title: "DECLINE REQUEST",
                          description: "Decline this mentorship request? The student will be notified politely.",
                        })
                      }
                      variant="destructive"
                      size="small"
                      fullWidth
                    />
                  </View>
                  <View style={styles.btnCol}>
                    <BrutalButton
                      title="ACCEPT REQUEST"
                      onPress={() =>
                        setConfirmDialog({
                          visible: true,
                          requestId: item.id,
                          action: "ACCEPTED",
                          title: "ACCEPT MENTORSHIP",
                          description: "Accept this mentorship request? An introduction will be created.",
                        })
                      }
                      variant="primary"
                      size="small"
                      fullWidth
                    />
                  </View>
                </View>
              )}

              {/* Action for Students (Cancel Pending Request) */}
              {!isAlumni && (item.status || "").toUpperCase() === "PENDING" && (
                <View style={styles.cancelRow}>
                  <TouchableOpacity
                    onPress={() =>
                      setConfirmDialog({
                        visible: true,
                        requestId: item.id,
                        action: "CANCELLED",
                        title: "CANCEL REQUEST",
                        description: "Cancel this pending mentorship request?",
                      })
                    }
                    activeOpacity={0.7}
                  >
                    <Text style={styles.cancelText}>CANCEL REQUEST ✕</Text>
                  </TouchableOpacity>
                </View>
              )}
              {/* Direct Messaging for Accepted Mentorship Connections */}
              {(item.status || "").toUpperCase() === "ACCEPTED" && (
                <View style={styles.acceptedChatRow}>
                  <BrutalButton
                    title={isAlumni ? "OPEN CHAT WITH STUDENT 💬" : "MESSAGE MENTOR 💬"}
                    onPress={() => {
                      const partnerId = isAlumni ? item.requesterId : item.recipientId;
                      if (partnerId) {
                        onOpenChat?.(partnerId, item.topicId, item.id);
                      }
                    }}
                    variant="primary"
                    size="small"
                    fullWidth
                  />
                </View>
              )}
            </BrutalCard>
          )}
        />
      )}

      {/* New Mentorship Request Modal */}
      <Modal
        visible={newModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setNewModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.formDialogCard}>
            <View style={styles.formHeaderRow}>
              <Text style={styles.formTitle}>// CREATE GUIDANCE REQUEST</Text>
              <TouchableOpacity
                onPress={() => setNewModalVisible(false)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <BrutalInput
              label="SELECT RECIPIENT ALUMNI"
              value={recipientName}
              editable={false}
              helperText="Preselected mentor from alumni roster"
            />

            <BrutalInput
              label="DISCUSSION TOPIC *"
              placeholder="e.g. Distributed Systems & Mock Interviews"
              value={topic}
              onChangeText={setTopic}
              required
            />

            <BrutalInput
              label="YOUR MESSAGE & SPECIFIC QUESTIONS *"
              placeholder="Explain your background, target companies, and specific guidance you're seeking..."
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              style={styles.textArea}
              required
            />

            <View style={styles.dialogButtonRow}>
              <View style={styles.btnCol}>
                <BrutalButton
                  title="CANCEL"
                  onPress={() => setNewModalVisible(false)}
                  variant="secondary"
                  size="compact"
                  fullWidth
                />
              </View>
              <View style={styles.btnCol}>
                <BrutalButton
                  title="SUBMIT REQUEST"
                  onPress={handleCreateRequest}
                  loading={isSubmitting}
                  variant="primary"
                  size="compact"
                  fullWidth
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        visible={confirmDialog.visible}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmLabel={confirmDialog.action === "DECLINED" ? "DECLINE" : "PROCEED"}
        isDestructive={confirmDialog.action === "DECLINED" || confirmDialog.action === "CANCELLED"}
        onConfirm={handleUpdateStatus}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, visible: false }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.background,
  },
  headerActionStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: BRUTAL_SPACING[5],
    marginBottom: BRUTAL_SPACING[3],
  },
  statusCountTag: {
    backgroundColor: BRUTAL_COLORS.muted,
    paddingHorizontal: BRUTAL_SPACING[3],
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.micro,
  },
  statusCountText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    letterSpacing: 0.5,
    color: BRUTAL_COLORS.ink,
  },
  listContent: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingBottom: BRUTAL_SPACING[10],
  },
  requestCard: {
    marginBottom: BRUTAL_SPACING[3],
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[2],
  },
  dateStamp: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.textMuted,
  },
  topicTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.base,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    marginBottom: 4,
  },
  messageBody: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: BRUTAL_SPACING[3],
  },
  actionButtonGroup: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
    borderTopWidth: 1,
    borderTopColor: BRUTAL_COLORS.muted,
    paddingTop: BRUTAL_SPACING[3],
  },
  btnCol: {
    flex: 1,
  },
  cancelRow: {
    borderTopWidth: 1,
    borderTopColor: BRUTAL_COLORS.muted,
    paddingTop: BRUTAL_SPACING[2],
    alignItems: "flex-end",
  },
  cancelText: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.dangerInk,
    letterSpacing: 0.5,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(23, 23, 23, 0.7)",
    justifyContent: "center",
    padding: BRUTAL_SPACING[5],
  },
  formDialogCard: {
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[5],
    ...BRUTAL_SHADOWS.lg,
  },
  formHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[4],
  },
  formTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    letterSpacing: 1,
    color: BRUTAL_COLORS.ink,
  },
  closeBtn: {
    width: 28,
    height: 28,
    backgroundColor: BRUTAL_COLORS.muted,
    borderWidth: 1.5,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnText: {
    fontSize: 12,
    fontWeight: "900",
    color: BRUTAL_COLORS.ink,
  },
  textArea: {
    height: 70,
    textAlignVertical: "top",
  },
  dialogButtonRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
    marginTop: BRUTAL_SPACING[2],
  },
  acceptedChatRow: {
    marginTop: BRUTAL_SPACING[3],
  },
});
