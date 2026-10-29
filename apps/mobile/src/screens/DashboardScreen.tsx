import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  BRUTAL_COLORS,
  BRUTAL_BORDERS,
  BRUTAL_RADII,
  BRUTAL_SHADOWS,
  BRUTAL_SPACING,
  BRUTAL_TYPOGRAPHY,
  BrutalButton,
  BrutalCard,
  BrutalBadge,
  SectionHeader,
  Avatar,
} from "../design-system";
import { useMobileAuth } from "../context/AuthContext";
import {
  INITIAL_CAREER_OPPORTUNITIES,
  INITIAL_EVENTS,
  INITIAL_ADMIN_VERIFICATION_QUEUE,
} from "../lib/mockData";

interface DashboardScreenProps {
  onNavigateTab: (tab: "dashboard" | "directory" | "mentorship" | "careers" | "events" | "profile" | "admin") => void;
  onSelectAlumni?: (alumniId: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigateTab,
}) => {
  const { user, profile } = useMobileAuth();
  const isAlumni = user?.role === "ALUMNI";
  const isAdmin = user?.role === "ADMIN";

  const firstName = profile?.fullName?.split(" ")[0] || "Member";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Editorial Welcome Header */}
      <View style={styles.heroRow}>
        <View style={styles.heroTextGroup}>
          <Text style={styles.greetingTag}>// AUTHENTICATED PORTAL</Text>
          <Text style={styles.heroGreeting}>Hey, {firstName}</Text>
          <Text style={styles.heroSubtitle}>
            {isAdmin
              ? "Trustee Platform Governance & Verification"
              : isAlumni
              ? `${profile?.currentRole || "Alumni"} @ ${profile?.currentCompany || "Industry"}`
              : `${profile?.departmentCode || "Engineering"} • Class of ${profile?.graduationYear || 2026}`}
          </Text>
        </View>
        <Avatar
          name={profile?.fullName || user?.email || "U"}
          size="large"
          variant={isAdmin ? "surface" : isAlumni ? "accent" : "surface"}
        />
      </View>

      {/* Verification & Trust Banner */}
      <BrutalCard
        variant={isAdmin ? "dark" : user?.isVerified ? "accent" : "muted"}
        padding={4}
        style={styles.verificationCard}
      >
        <View style={styles.verificationRow}>
          <View style={styles.verificationBadgeCol}>
            <BrutalBadge
              label={
                isAdmin
                  ? "TRUSTEE CONSOLE"
                  : user?.isVerified
                  ? "VERIFIED MEMBER"
                  : "PENDING VERIFICATION"
              }
              variant={isAdmin ? "warning" : user?.isVerified ? "dark" : "warning"}
              size="small"
            />
          </View>
          <Text
            style={[
              styles.verificationText,
              isAdmin && { color: BRUTAL_COLORS.textInverse },
            ]}
          >
            {isAdmin
              ? "3-Trustee Platform Integrity & Oversight"
              : isAlumni
              ? "Anna University Degree Verified"
              : "MKCE Institutional Record Confirmed"}
          </Text>
        </View>
      </BrutalCard>

      {/* Quick Numbers Bar */}
      <View style={styles.metricGrid}>
        <BrutalCard variant="surface" padding={3} style={styles.metricCard}>
          <Text style={styles.metricNumber}>
            {isAdmin ? INITIAL_ADMIN_VERIFICATION_QUEUE.length : "140+"}
          </Text>
          <Text style={styles.metricLabel}>
            {isAdmin ? "PENDING REVIEWS" : "ALUMNI NETWORK"}
          </Text>
        </BrutalCard>

        <BrutalCard variant="surface" padding={3} style={styles.metricCard}>
          <Text style={styles.metricNumber}>
            {INITIAL_CAREER_OPPORTUNITIES.length}
          </Text>
          <Text style={styles.metricLabel}>ACTIVE JOBS</Text>
        </BrutalCard>

        <BrutalCard variant="surface" padding={3} style={styles.metricCard}>
          <Text style={styles.metricNumber}>
            {INITIAL_EVENTS.length}
          </Text>
          <Text style={styles.metricLabel}>SESSIONS</Text>
        </BrutalCard>
      </View>

      {/* Admin Review Spotlight if Trustee */}
      {isAdmin && (
        <View style={styles.sectionWrapper}>
          <SectionHeader
            title="TRUSTEE QUEUE"
            badgeCount={INITIAL_ADMIN_VERIFICATION_QUEUE.length}
            actionText="OPEN CONSOLE"
            onActionPress={() => onNavigateTab("admin")}
          />
          <BrutalCard variant="surface" padding={4} onPress={() => onNavigateTab("admin")}>
            <View style={styles.adminQueuePreview}>
              <View style={styles.queueIconBox}>
                <Text style={styles.queueIcon}>🛡</Text>
              </View>
              <View style={styles.queueTextGroup}>
                <Text style={styles.queueTitle}>Document Verification Queue</Text>
                <Text style={styles.queueDesc}>
                  {INITIAL_ADMIN_VERIFICATION_QUEUE.length} student ID cards and alumni degree certificates awaiting verification.
                </Text>
              </View>
              <Text style={styles.queueArrow}>→</Text>
            </View>
          </BrutalCard>
        </View>
      )}

      {/* Mentorship Spotlight Section */}
      <View style={styles.sectionWrapper}>
        <SectionHeader
          title={isAlumni ? "MENTORSHIP INBOX" : "1-ON-1 MENTORSHIP"}
          actionText="VIEW ALL"
          onActionPress={() => onNavigateTab("mentorship")}
        />

        <BrutalCard variant="surface" padding={4} onPress={() => onNavigateTab("mentorship")}>
          <View style={styles.mentorshipHeaderRow}>
            <BrutalBadge
              label={isAlumni ? "INCOMING REQUESTS" : "LIVE STATUS"}
              variant="accent"
              size="small"
            />
            <Text style={styles.mentorshipTimestamp}>UPDATED TODAY</Text>
          </View>

          <Text style={styles.mentorshipTitle}>
            {isAlumni
              ? "Priya Dharshini (CSE '26) requested System Design guidance"
              : "Off-Campus Interview Prep with Jordan Vance (Stripe)"}
          </Text>
          <Text style={styles.mentorshipSnippet}>
            {isAlumni
              ? "Topic: Distributed Systems & preparation for campus tech interviews."
              : "Your request is currently ACCEPTED. Schedule details sent via institutional email."}
          </Text>

          <View style={styles.mentorshipActionRow}>
            <BrutalButton
              title={isAlumni ? "OPEN INBOX TO REVIEW" : "CHECK MENTORSHIP HUB"}
              onPress={() => onNavigateTab("mentorship")}
              variant="primary"
              size="compact"
              fullWidth
            />
          </View>
        </BrutalCard>
      </View>

      {/* Job Referral Preview Section */}
      <View style={styles.sectionWrapper}>
        <SectionHeader
          title="CAREER REFERRALS"
          badgeCount={INITIAL_CAREER_OPPORTUNITIES.length}
          actionText="SEE ALL JOBS"
          onActionPress={() => onNavigateTab("careers")}
        />

        {INITIAL_CAREER_OPPORTUNITIES.slice(0, 2).map((opp) => (
          <BrutalCard
            key={opp.id}
            variant="surface"
            padding={4}
            style={styles.jobCard}
            onPress={() => onNavigateTab("careers")}
          >
            <View style={styles.jobHeaderRow}>
              <Text style={styles.jobCompany}>{opp.organization}</Text>
              <BrutalBadge label={opp.opportunityType} variant="neutral" size="small" />
            </View>
            <Text style={styles.jobTitle}>{opp.title}</Text>
            <Text style={styles.jobCompensation}>{opp.compensation} • {opp.location}</Text>
            <View style={styles.jobReferrerRow}>
              <Text style={styles.jobReferrer}>
                Referrer: <Text style={styles.boldReferrer}>{opp.postedByName} ({opp.postedByRole})</Text>
              </Text>
            </View>
          </BrutalCard>
        ))}
      </View>

      {/* Upcoming Events Preview */}
      <View style={styles.sectionWrapper}>
        <SectionHeader
          title="UPCOMING EVENTS & AMAS"
          badgeCount={INITIAL_EVENTS.length}
          actionText="ALL EVENTS"
          onActionPress={() => onNavigateTab("events")}
        />

        {INITIAL_EVENTS.slice(0, 1).map((ev) => (
          <BrutalCard
            key={ev.id}
            variant="muted"
            padding={4}
            style={styles.eventCard}
            onPress={() => onNavigateTab("events")}
          >
            <View style={styles.eventHeaderRow}>
              <BrutalBadge label={ev.format} variant="dark" size="small" />
              <Text style={styles.eventDate}>{ev.date}</Text>
            </View>
            <Text style={styles.eventTitle}>{ev.title}</Text>
            <Text style={styles.eventSpeaker}>
              Host: {ev.speakerName} ({ev.speakerRole} @ {ev.speakerCompany})
            </Text>
          </BrutalCard>
        ))}
      </View>

      {/* Quick Launchpad Buttons */}
      <View style={styles.launchpadBox}>
        <Text style={styles.launchpadTitle}>// EXPLORE ALUMNUX FEATURES</Text>
        <View style={styles.launchpadGrid}>
          <TouchableOpacity
            style={styles.launchpadItem}
            onPress={() => onNavigateTab("directory")}
            activeOpacity={0.7}
          >
            <Text style={styles.launchpadEmoji}>🔍</Text>
            <Text style={styles.launchpadLabel}>ALUMNI DIRECTORY</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.launchpadItem}
            onPress={() => onNavigateTab("careers")}
            activeOpacity={0.7}
          >
            <Text style={styles.launchpadEmoji}>💼</Text>
            <Text style={styles.launchpadLabel}>JOB BOARD</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.launchpadItem}
            onPress={() => onNavigateTab("events")}
            activeOpacity={0.7}
          >
            <Text style={styles.launchpadEmoji}>📅</Text>
            <Text style={styles.launchpadLabel}>SESSIONS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.launchpadItem}
            onPress={() => onNavigateTab("profile")}
            activeOpacity={0.7}
          >
            <Text style={styles.launchpadEmoji}>👤</Text>
            <Text style={styles.launchpadLabel}>MY PROFILE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingTop: BRUTAL_SPACING[4],
    paddingBottom: BRUTAL_SPACING[10],
  },
  heroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[4],
  },
  heroTextGroup: {
    flex: 1,
    marginRight: BRUTAL_SPACING[3],
  },
  greetingTag: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    letterSpacing: 1,
    marginBottom: 2,
  },
  heroGreeting: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes["3xl"],
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.textSecondary,
    marginTop: 2,
  },
  verificationCard: {
    marginBottom: BRUTAL_SPACING[4],
  },
  verificationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: BRUTAL_SPACING[2],
  },
  verificationBadgeCol: {
    alignSelf: "flex-start",
  },
  verificationText: {
    flex: 1,
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.ink,
  },
  metricGrid: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
    marginBottom: BRUTAL_SPACING[4],
  },
  metricCard: {
    flex: 1,
    alignItems: "center",
  },
  metricNumber: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xl,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
  },
  metricLabel: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.textSecondary,
    letterSpacing: 0.5,
    marginTop: 2,
    textAlign: "center",
  },
  sectionWrapper: {
    marginBottom: BRUTAL_SPACING[3],
  },
  adminQueuePreview: {
    flexDirection: "row",
    alignItems: "center",
  },
  queueIconBox: {
    width: 38,
    height: 38,
    backgroundColor: BRUTAL_COLORS.warning,
    borderWidth: 1.5,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    justifyContent: "center",
    alignItems: "center",
    marginRight: BRUTAL_SPACING[3],
  },
  queueIcon: {
    fontSize: 18,
  },
  queueTextGroup: {
    flex: 1,
  },
  queueTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
  },
  queueDesc: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  queueArrow: {
    fontSize: 18,
    fontWeight: "900",
    color: BRUTAL_COLORS.ink,
    marginLeft: BRUTAL_SPACING[2],
  },
  mentorshipHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[2],
  },
  mentorshipTimestamp: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.textMuted,
  },
  mentorshipTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    marginBottom: 4,
    lineHeight: 20,
  },
  mentorshipSnippet: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: BRUTAL_SPACING[3],
  },
  mentorshipActionRow: {
    marginTop: BRUTAL_SPACING[1],
  },
  jobCard: {
    marginBottom: BRUTAL_SPACING[3],
  },
  jobHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[1],
  },
  jobCompany: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  jobTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    marginBottom: 4,
  },
  jobCompensation: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.ink,
    marginBottom: BRUTAL_SPACING[2],
  },
  jobReferrerRow: {
    borderTopWidth: 1,
    borderTopColor: BRUTAL_COLORS.muted,
    paddingTop: BRUTAL_SPACING[2],
  },
  jobReferrer: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    color: BRUTAL_COLORS.textSecondary,
  },
  boldReferrer: {
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.ink,
  },
  eventCard: {
    marginBottom: BRUTAL_SPACING[3],
  },
  eventHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[1],
  },
  eventDate: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.bold,
    color: BRUTAL_COLORS.textSecondary,
  },
  eventTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    color: BRUTAL_COLORS.ink,
    marginBottom: 4,
  },
  eventSpeaker: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.xs,
    color: BRUTAL_COLORS.textSecondary,
  },
  launchpadBox: {
    backgroundColor: BRUTAL_COLORS.surface,
    borderWidth: BRUTAL_BORDERS.width,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[4],
    marginTop: BRUTAL_SPACING[3],
    ...BRUTAL_SHADOWS.base,
  },
  launchpadTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.black,
    letterSpacing: 1,
    color: BRUTAL_COLORS.ink,
    marginBottom: BRUTAL_SPACING[3],
  },
  launchpadGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: BRUTAL_SPACING[2],
  },
  launchpadItem: {
    width: "48%",
    backgroundColor: BRUTAL_COLORS.background,
    borderWidth: BRUTAL_BORDERS.thin,
    borderColor: BRUTAL_COLORS.ink,
    borderRadius: BRUTAL_RADII.standard,
    padding: BRUTAL_SPACING[3],
    alignItems: "center",
    justifyContent: "center",
  },
  launchpadEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  launchpadLabel: {
    fontSize: BRUTAL_TYPOGRAPHY.sizes.micro,
    fontWeight: BRUTAL_TYPOGRAPHY.weights.heavy,
    color: BRUTAL_COLORS.ink,
    letterSpacing: 0.5,
  },
});
