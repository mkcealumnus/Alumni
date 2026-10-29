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
  Avatar,
  EmptyState,
} from "../design-system";
import { useMobileAuth } from "../context/AuthContext";
import { INITIAL_EVENTS, MobileEvent } from "../lib/mockData";

const EVENT_FORMATS = [
  "ALL",
  "Virtual AMA",
  "Interactive Workshop",
  "Panel Discussion",
];

export const EventsScreen: React.FC = () => {
  const { user } = useMobileAuth();
  const [events, setEvents] = useState<MobileEvent[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("ALL");
  const [selectedEvent, setSelectedEvent] = useState<MobileEvent | null>(null);

  // RSVP map: eventId -> boolean
  const [rsvpMap, setRsvpMap] = useState<Record<string, boolean>>({
    "ev-01": true, // initial RSVP for demo
  });

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      if (selectedFormat !== "ALL" && ev.format !== selectedFormat) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        ev.title.toLowerCase().includes(q) ||
        ev.speakerName.toLowerCase().includes(q) ||
        ev.speakerCompany.toLowerCase().includes(q) ||
        ev.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [events, selectedFormat, searchQuery]);

  const handleToggleRsvp = (eventId: string, eventTitle: string) => {
    const isCurrentlyRsvpd = !!rsvpMap[eventId];

    if (isCurrentlyRsvpd) {
      setRsvpMap((prev) => ({ ...prev, [eventId]: false }));
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId ? { ...e, registeredCount: e.registeredCount - 1 } : e
        )
      );
      Alert.alert("Registration Withdrawn", `Your RSVP for "${eventTitle}" has been cancelled.`);
    } else {
      setRsvpMap((prev) => ({ ...prev, [eventId]: true }));
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e
        )
      );
      Alert.alert(
        "RSVP Confirmed ✓",
        `You are registered for "${eventTitle}". Calendar invite and access credentials have been scheduled to your primary email.`
      );
    }
  };

  const renderEventCard = ({ item }: { item: MobileEvent }) => {
    const isRsvpd = !!rsvpMap[item.id];

    return (
      <BrutalCard
        style={styles.card}
        accentStrip="top"
        accentColor={isRsvpd ? BRUTAL_COLORS.ACCENT : BRUTAL_COLORS.INK}
        onPress={() => setSelectedEvent(item)}
      >
        {/* Top Badges Row */}
        <View style={styles.cardHeader}>
          <View style={styles.dateTag}>
            <Text style={styles.dateText}>📅 {item.date.toUpperCase()}</Text>
          </View>
          <BrutalBadge
            label={item.format}
            variant={
              item.format === "Virtual AMA"
                ? "accent"
                : item.format === "Interactive Workshop"
                ? "warning"
                : "neutral"
            }
          />
        </View>

        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.timeTag}>⏰ {item.time}</Text>

        <Text style={styles.eventDesc} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Speaker Card */}
        <View style={styles.speakerBox}>
          <Avatar name={item.speakerName} size={32} />
          <View style={styles.speakerInfo}>
            <Text style={styles.speakerLabel}>KEYNOTE SPEAKER</Text>
            <Text style={styles.speakerName}>
              {item.speakerName} • {item.speakerRole} ({item.speakerCompany})
            </Text>
          </View>
        </View>

        {/* Footer Row */}
        <View style={styles.cardFooter}>
          <View style={styles.registeredBadge}>
            <Text style={styles.registeredText}>
              👥 {item.registeredCount} ATTENDEES
            </Text>
          </View>
          <View style={styles.actionBtnWrapper}>
            {isRsvpd ? (
              <BrutalButton
                label="CONFIRMED ✓"
                variant="primary"
                onPress={() => handleToggleRsvp(item.id, item.title)}
                style={styles.cardBtn}
              />
            ) : (
              <BrutalButton
                label="RESERVE SPOT →"
                variant="dark"
                onPress={() => handleToggleRsvp(item.id, item.title)}
                style={styles.cardBtn}
              />
            )}
          </View>
        </View>
      </BrutalCard>
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="EVENTS"
        categoryTag="// SESSIONS & WORKSHOPS"
        subtitle="Live AMAs, industry panels, and hands-on technical masterclasses with alumni."
      />

      <View style={styles.searchSection}>
        <SearchField
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search sessions, speakers, tech topics..."
        />

        {/* Format Selector Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillsContainer}
        >
          {EVENT_FORMATS.map((format) => {
            const isActive = selectedFormat === format;
            return (
              <TouchableOpacity
                key={format}
                style={[
                  styles.filterPill,
                  isActive && styles.filterPillActive,
                ]}
                onPress={() => setSelectedFormat(format)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    isActive && styles.filterPillTextActive,
                  ]}
                >
                  {format.toUpperCase()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={renderEventCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            title="NO SESSIONS MATCHED"
            description={`No scheduled events found for "${searchQuery}". Check back soon as new sessions are published weekly.`}
            actionLabel="SHOW ALL SESSIONS"
            onAction={() => {
              setSearchQuery("");
              setSelectedFormat("ALL");
            }}
          />
        }
      />

      {/* Event Details Modal */}
      {selectedEvent && (
        <Modal
          visible={!!selectedEvent}
          animationType="slide"
          transparent
          onRequestClose={() => setSelectedEvent(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderTag}>
                  <Text style={styles.modalHeaderCategory}>
                    // SESSION BRIEFING
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.modalCloseBtn}
                  onPress={() => setSelectedEvent(null)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.modalBody}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.modalBadges}>
                  <BrutalBadge label={selectedEvent.format} variant="accent" />
                  <BrutalBadge
                    label={`${selectedEvent.registeredCount} REGISTERED`}
                    variant="neutral"
                  />
                </View>

                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>

                {/* Timing Banner */}
                <View style={styles.timingCard}>
                  <View style={styles.timingCol}>
                    <Text style={styles.timingLabel}>SCHEDULED DATE</Text>
                    <Text style={styles.timingValue}>
                      {selectedEvent.date}
                    </Text>
                  </View>
                  <View style={styles.timingDivider} />
                  <View style={styles.timingCol}>
                    <Text style={styles.timingLabel}>SESSION TIME</Text>
                    <Text style={styles.timingValue}>
                      {selectedEvent.time}
                    </Text>
                  </View>
                </View>

                {/* Keynote Speaker */}
                <Text style={styles.modalSectionTitle}>// LEAD SPEAKER</Text>
                <View style={styles.modalSpeakerCard}>
                  <Avatar name={selectedEvent.speakerName} size={44} />
                  <View style={styles.modalSpeakerInfo}>
                    <Text style={styles.modalSpeakerName}>
                      {selectedEvent.speakerName}
                    </Text>
                    <Text style={styles.modalSpeakerRole}>
                      {selectedEvent.speakerRole} @ {selectedEvent.speakerCompany}
                    </Text>
                    <Text style={styles.modalSpeakerTag}>
                      Distinguished Alumnus • MKCE Network
                    </Text>
                  </View>
                </View>

                {/* Session Description */}
                <Text style={styles.modalSectionTitle}>// SYLLABUS & DISCUSSION</Text>
                <Text style={styles.modalDescText}>
                  {selectedEvent.description}
                </Text>

                {/* Logistics */}
                <Text style={styles.modalSectionTitle}>// ATTENDANCE LOGISTICS</Text>
                <View style={styles.logisticsCard}>
                  <Text style={styles.logisticsText}>
                    📡 <Text style={{ fontWeight: "700" }}>Live Stream URL:</Text> Direct Google Meet conference link is dispatched to your registered college email 60 minutes prior to session kick-off.
                  </Text>
                  <Text style={[styles.logisticsText, { marginTop: BRUTAL_SPACING[2] }]}>
                    💬 <Text style={{ fontWeight: "700" }}>Q&A Channel:</Text> Live audience microphone and typed chat queue will be active for interactive community questions.
                  </Text>
                </View>

                {/* Tags */}
                <Text style={styles.modalSectionTitle}>// TOPICS COVERED</Text>
                <View style={styles.tagsRow}>
                  {selectedEvent.tags.map((tag) => (
                    <View key={tag} style={styles.tagChip}>
                      <Text style={styles.tagChipText}>#{tag}</Text>
                    </View>
                  ))}
                </View>

                {/* Action Footer */}
                <View style={styles.modalFooter}>
                  {rsvpMap[selectedEvent.id] ? (
                    <BrutalButton
                      label="CANCEL REGISTRATION"
                      variant="destructive"
                      fullWidth
                      onPress={() => {
                        handleToggleRsvp(selectedEvent.id, selectedEvent.title);
                        setSelectedEvent(null);
                      }}
                    />
                  ) : (
                    <BrutalButton
                      label="CONFIRM FREE REGISTRATION ⚡"
                      variant="primary"
                      fullWidth
                      onPress={() => {
                        handleToggleRsvp(selectedEvent.id, selectedEvent.title);
                        setSelectedEvent(null);
                      }}
                    />
                  )}
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
  dateTag: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 2,
  },
  dateText: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 0.5,
  },
  eventTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.lg,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    marginBottom: BRUTAL_SPACING[1],
  },
  timeTag: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    marginBottom: BRUTAL_SPACING[3],
  },
  eventDesc: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    lineHeight: 20,
    marginBottom: BRUTAL_SPACING[3],
  },
  speakerBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[2],
    marginBottom: BRUTAL_SPACING[3],
    gap: BRUTAL_SPACING[2],
  },
  speakerInfo: {
    flex: 1,
  },
  speakerLabel: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 1,
  },
  speakerName: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: BRUTAL_SPACING[1],
  },
  registeredBadge: {
    backgroundColor: BRUTAL_COLORS.MUTED,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 4,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
  },
  registeredText: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    letterSpacing: 0.5,
  },
  actionBtnWrapper: {
    width: 150,
  },
  cardBtn: {
    height: 40,
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
  modalBadges: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
    marginBottom: BRUTAL_SPACING[2],
  },
  modalTitle: {
    fontSize: BRUTAL_TYPOGRAPHY["2xl"],
    fontWeight: BRUTAL_TYPOGRAPHY.black,
    color: BRUTAL_COLORS.INK,
    marginBottom: BRUTAL_SPACING[4],
  },
  timingCard: {
    flexDirection: "row",
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
    ...BRUTAL_SHADOWS.subtle,
  },
  timingCol: {
    flex: 1,
  },
  timingDivider: {
    width: 2,
    backgroundColor: BRUTAL_COLORS.INK,
    marginHorizontal: BRUTAL_SPACING[3],
  },
  timingLabel: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 1,
    marginBottom: 2,
  },
  timingValue: {
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
  modalSpeakerCard: {
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
  modalSpeakerInfo: {
    flex: 1,
  },
  modalSpeakerName: {
    fontSize: BRUTAL_TYPOGRAPHY.base,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  modalSpeakerRole: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
  },
  modalSpeakerTag: {
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
  logisticsCard: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
  },
  logisticsText: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.INK,
    lineHeight: 18,
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
});
