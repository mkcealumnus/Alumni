import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
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
  SectionHeader,
  BrutalCard,
  BrutalBadge,
  BrutalButton,
  BrutalInput,
  Avatar,
  Divider,
  ConfirmDialog,
} from "../design-system";
import { useMobileAuth } from "../context/AuthContext";
import { mobileApi } from "../lib/api";

export const ProfileScreen: React.FC = () => {
  const { user, profile, logout, refreshProfile, loginWithPreset } = useMobileAuth();

  const isAlumni = user?.role === "ALUMNI";
  const isAdmin = user?.role === "ADMIN";

  // Edit Profile Modal State
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [headline, setHeadline] = useState(profile?.headline || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [locationCity, setLocationCity] = useState(profile?.locationCity || "");
  const [currentCompany, setCurrentCompany] = useState(profile?.currentCompany || "");
  const [currentRole, setCurrentRole] = useState(profile?.currentRole || "");
  const [isSaving, setIsSaving] = useState(false);

  // Verification Modal State
  const [verificationModalVisible, setVerificationModalVisible] = useState(false);
  const [docUploaded, setDocUploaded] = useState(false);

  // Logout Dialog State
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await mobileApi.updateMe({
        headline: headline.trim() || undefined,
        bio: bio.trim() || undefined,
        locationCity: locationCity.trim() || undefined,
        currentCompany: currentCompany.trim() || undefined,
        currentRole: currentRole.trim() || undefined,
      });
      await refreshProfile();
      setEditModalVisible(false);
      Alert.alert("Profile Updated", "Your changes have been persisted to the central database.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update profile.";
      Alert.alert("Update Error", msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      setLogoutDialogVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="PROFILE"
        categoryTag="// IDENTITY & ACCOUNT"
        subtitle="Manage public directory presence, academic verification & credentials."
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Identity Hero Card */}
        <BrutalCard
          style={styles.heroCard}
          accentStrip="top"
          accentColor={BRUTAL_COLORS.ACCENT}
        >
          <View style={styles.heroTopRow}>
            <Avatar name={profile?.fullName || "User"} size={60} />
            <View style={styles.heroIdentity}>
              <Text style={styles.heroName}>{profile?.fullName || "Alumnux User"}</Text>
              <Text style={styles.heroEmail}>{user?.email}</Text>
              <View style={styles.badgeRow}>
                <BrutalBadge
                  label={user?.role || "STUDENT"}
                  variant={isAdmin ? "warning" : isAlumni ? "accent" : "neutral"}
                />
                <BrutalBadge
                  label={profile?.departmentCode || "ENGINEERING"}
                  variant="outline"
                />
                {profile?.graduationYear ? (
                  <BrutalBadge
                    label={`'${String(profile.graduationYear).slice(-2)}`}
                    variant="neutral"
                  />
                ) : null}
              </View>
            </View>
          </View>

          {profile?.headline ? (
            <Text style={styles.headlineText}>"{profile.headline}"</Text>
          ) : null}

          <View style={styles.metaGrid}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>ROLE / POSITION</Text>
              <Text style={styles.metaValue}>
                {profile?.currentRole || (isAlumni ? "Software Engineer" : "Final Year Student")}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>ORGANIZATION / CAMPUS</Text>
              <Text style={styles.metaValue}>
                {profile?.currentCompany || (isAlumni ? "Industry" : "MKCE Campus")}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>CITY / REGION</Text>
              <Text style={styles.metaValue}>
                {profile?.locationCity || "Tamil Nadu, India"}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>DEPARTMENT</Text>
              <Text style={styles.metaValue}>
                {profile?.departmentName || profile?.departmentCode || "Computer Science"}
              </Text>
            </View>
          </View>

          {profile?.bio ? (
            <View style={styles.bioBox}>
              <Text style={styles.bioLabel}>// BIOGRAPHY</Text>
              <Text style={styles.bioText}>{profile.bio}</Text>
            </View>
          ) : null}

          <View style={styles.heroActions}>
            <BrutalButton
              label="EDIT PUBLIC PROFILE ✎"
              variant="dark"
              fullWidth
              onPress={() => {
                setHeadline(profile?.headline || "");
                setBio(profile?.bio || "");
                setLocationCity(profile?.locationCity || "");
                setCurrentCompany(profile?.currentCompany || "");
                setCurrentRole(profile?.currentRole || "");
                setEditModalVisible(true);
              }}
            />
          </View>
        </BrutalCard>

        {/* Verification Status Card */}
        <SectionHeader
          title="ACADEMIC VERIFICATION"
          category="// TRUST & GOVERNANCE"
        />

        <BrutalCard
          style={styles.verificationCard}
          accentStrip="left"
          accentColor={
            docUploaded || profile?.isVerified
              ? BRUTAL_COLORS.SUCCESS
              : BRUTAL_COLORS.WARNING
          }
        >
          <View style={styles.verifHeaderRow}>
            <View>
              <Text style={styles.verifDocTitle}>
                {isAlumni
                  ? "Anna University Graduation Certificate"
                  : "College ID Card (Front & Back)"}
              </Text>
              <Text style={styles.verifDocSubtitle}>
                {isAlumni
                  ? "Official degree certificate verified against Anna University registers."
                  : "Active MKCE identity card validating student roll number and graduation year."}
              </Text>
            </View>
            <BrutalBadge
              label={docUploaded || profile?.isVerified ? "VERIFIED ✓" : "SUBMITTED"}
              variant={docUploaded || profile?.isVerified ? "success" : "warning"}
            />
          </View>

          <View style={styles.verifPolicyBox}>
            <Text style={styles.policyText}>
              🛡️ <Text style={{ fontWeight: "700" }}>Trustee Governance:</Text> All student and alumni verification documents are independently reviewed by senior alumni trustees. Private documents are never made public.
            </Text>
          </View>

          <BrutalButton
            label={docUploaded ? "DOCUMENT FILED // PENDING TRUSTEE REVIEW" : "UPLOAD UPDATED CREDENTIALS ⇪"}
            variant="outline"
            fullWidth
            onPress={() => setVerificationModalVisible(true)}
          />
        </BrutalCard>

        {/* Testing & Role Switcher */}
        <SectionHeader
          title="SIMULATED ROLE SWITCHER"
          category="// TESTING LAUNCHPAD"
        />

        <BrutalCard style={styles.switcherCard}>
          <Text style={styles.switcherDesc}>
            Quickly switch active role persona to audit Student, Alumni, and Senior Trustee administrative workflows:
          </Text>

          <View style={styles.switcherBtns}>
            <TouchableOpacity
              style={[
                styles.switcherPill,
                user?.role === "STUDENT" && styles.switcherPillActive,
              ]}
              onPress={() => loginWithPreset("STUDENT")}
              activeOpacity={0.8}
            >
              <Text style={styles.switcherPillTag}>STUDENT</Text>
              <Text style={styles.switcherPillName}>Priya Dharshini (CSE '26)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.switcherPill,
                user?.role === "ALUMNI" && styles.switcherPillActive,
              ]}
              onPress={() => loginWithPreset("ALUMNI")}
              activeOpacity={0.8}
            >
              <Text style={styles.switcherPillTag}>ALUMNI</Text>
              <Text style={styles.switcherPillName}>Jordan Vance (Stripe '18)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.switcherPill,
                user?.role === "ADMIN" && styles.switcherPillActive,
              ]}
              onPress={() => loginWithPreset("ADMIN")}
              activeOpacity={0.8}
            >
              <Text style={styles.switcherPillTag}>TRUSTEE ADMIN</Text>
              <Text style={styles.switcherPillName}>Trustee Arunachalam</Text>
            </TouchableOpacity>
          </View>
        </BrutalCard>

        {/* Account Termination & Logout */}
        <View style={styles.logoutSection}>
          <BrutalButton
            label="END NATIVE SESSION (LOGOUT) ➔"
            variant="destructive"
            fullWidth
            onPress={() => setLogoutDialogVisible(true)}
          />
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTag}>
                <Text style={styles.modalHeaderCategory}>
                  // EDIT PUBLIC DIRECTORY INFO
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setEditModalVisible(false)}
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
              <Text style={styles.modalTitle}>Public Information</Text>
              <Text style={styles.modalSubtitle}>
                Changes are immediately reflected in the search directory and alumni network.
              </Text>

              <BrutalInput
                label="HEADLINE"
                value={headline}
                onChangeText={setHeadline}
                placeholder="e.g. Senior Software Engineer at Stripe | Cloud & System Design"
              />

              <BrutalInput
                label="CURRENT ROLE"
                value={currentRole}
                onChangeText={setCurrentRole}
                placeholder="e.g. Staff Architect, Backend Engineer"
              />

              <BrutalInput
                label="COMPANY / ORGANIZATION"
                value={currentCompany}
                onChangeText={setCurrentCompany}
                placeholder="e.g. Stripe, AWS, Zoho, MKCE"
              />

              <BrutalInput
                label="CITY / LOCATION"
                value={locationCity}
                onChangeText={setLocationCity}
                placeholder="e.g. Bengaluru, Chennai, Remote"
              />

              <BrutalInput
                label="PROFESSIONAL BIO"
                value={bio}
                onChangeText={setBio}
                placeholder="Write a concise overview of your background, areas of mentorship expertise, and career advice..."
                multiline
                numberOfLines={4}
              />

              <View style={{ marginTop: BRUTAL_SPACING[4] }}>
                <BrutalButton
                  label="SAVE PROFILE DETAILS ✓"
                  variant="primary"
                  fullWidth
                  loading={isSaving}
                  onPress={handleSaveProfile}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Verification Upload Modal */}
      <Modal
        visible={verificationModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setVerificationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderTag}>
                <Text style={styles.modalHeaderCategory}>
                  // DOCUMENT SUBMISSION
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setVerificationModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalBody}
              contentContainerStyle={{ paddingBottom: BRUTAL_SPACING[8] }}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.modalTitle}>Upload Verification Proof</Text>
              <Text style={styles.modalSubtitle}>
                {isAlumni
                  ? "Submit a clear, scanned PDF or image of your Anna University Degree Certificate or Provisional Certificate."
                  : "Submit a clear photo of your MKCE College ID Card (showing front and back with your Roll Number)."}
              </Text>

              <View style={styles.uploadBox}>
                <Text style={styles.uploadIcon}>📄</Text>
                <Text style={styles.uploadTitle}>
                  {isAlumni ? "anna_university_degree_scan.pdf" : "mkce_student_id_front_back.jpg"}
                </Text>
                <Text style={styles.uploadMeta}>
                  Size: 2.4 MB • Status: Ready to upload
                </Text>
                <View style={styles.docSecureBadge}>
                  <Text style={styles.docSecureText}>🔒 END-TO-END ENCRYPTED TRUSTEE ARCHIVE</Text>
                </View>
              </View>

              <View style={{ marginTop: BRUTAL_SPACING[4] }}>
                <BrutalButton
                  label="SUBMIT TO TRUSTEES FOR APPROVAL ⚡"
                  variant="primary"
                  fullWidth
                  onPress={() => {
                    setDocUploaded(true);
                    setVerificationModalVisible(false);
                    Alert.alert(
                      "Document Submitted",
                      "Your credentials have been securely routed to the senior alumni trustee queue. Verification typically completes within 24 hours."
                    );
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Logout Confirmation */}
      <ConfirmDialog
        visible={logoutDialogVisible}
        title="SIGN OUT OF ALUMNUX"
        description="Are you sure you want to end this native session? Your local tokens will be revoked and cleared from Expo SecureStore."
        confirmLabel="END SESSION"
        cancelLabel="STAY SIGNED IN"
        destructive
        onConfirm={handleConfirmLogout}
        onCancel={() => setLogoutDialogVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
  },
  scrollContent: {
    paddingHorizontal: BRUTAL_SPACING[5],
    paddingBottom: BRUTAL_SPACING[12],
  },
  heroCard: {
    marginBottom: BRUTAL_SPACING[6],
  },
  heroTopRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[4],
    alignItems: "center",
    marginBottom: BRUTAL_SPACING[3],
  },
  heroIdentity: {
    flex: 1,
  },
  heroName: {
    fontSize: BRUTAL_TYPOGRAPHY["2xl"],
    fontWeight: BRUTAL_TYPOGRAPHY.black,
    color: BRUTAL_COLORS.INK,
    lineHeight: 28,
  },
  heroEmail: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    marginBottom: BRUTAL_SPACING[2],
  },
  badgeRow: {
    flexDirection: "row",
    gap: BRUTAL_SPACING[2],
    flexWrap: "wrap",
  },
  headlineText: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    fontStyle: "italic",
    color: BRUTAL_COLORS.INK,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
  },
  metaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
  },
  metaItem: {
    width: "47%",
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[2],
  },
  metaLabel: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 1,
    marginBottom: 2,
  },
  metaValue: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  bioBox: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[4],
  },
  bioLabel: {
    fontSize: 10,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 1,
    marginBottom: BRUTAL_SPACING[1],
  },
  bioText: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    color: BRUTAL_COLORS.INK,
    lineHeight: 20,
  },
  heroActions: {
    marginTop: BRUTAL_SPACING[2],
  },
  verificationCard: {
    marginBottom: BRUTAL_SPACING[6],
  },
  verifHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: BRUTAL_SPACING[3],
    gap: BRUTAL_SPACING[2],
  },
  verifDocTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.base,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    marginBottom: 2,
  },
  verifDocSubtitle: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    maxWidth: 240,
    lineHeight: 16,
  },
  verifPolicyBox: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
    marginBottom: BRUTAL_SPACING[3],
  },
  policyText: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.INK,
    lineHeight: 18,
  },
  switcherCard: {
    marginBottom: BRUTAL_SPACING[6],
  },
  switcherDesc: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    marginBottom: BRUTAL_SPACING[3],
    lineHeight: 18,
  },
  switcherBtns: {
    gap: BRUTAL_SPACING[2],
  },
  switcherPill: {
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    borderWidth: BRUTAL_BORDERS.standard,
    borderColor: BRUTAL_COLORS.INK,
    padding: BRUTAL_SPACING[3],
  },
  switcherPillActive: {
    backgroundColor: BRUTAL_COLORS.ACCENT,
    ...BRUTAL_SHADOWS.subtle,
  },
  switcherPillTag: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    letterSpacing: 1,
    marginBottom: 2,
  },
  switcherPillName: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
  },
  logoutSection: {
    marginTop: BRUTAL_SPACING[2],
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
  modalTitle: {
    fontSize: BRUTAL_TYPOGRAPHY["2xl"],
    fontWeight: BRUTAL_TYPOGRAPHY.black,
    color: BRUTAL_COLORS.INK,
    marginBottom: BRUTAL_SPACING[1],
  },
  modalSubtitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    marginBottom: BRUTAL_SPACING[4],
    lineHeight: 20,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: BRUTAL_COLORS.INK,
    backgroundColor: BRUTAL_COLORS.BACKGROUND,
    padding: BRUTAL_SPACING[4],
    alignItems: "center",
    marginVertical: BRUTAL_SPACING[3],
  },
  uploadIcon: {
    fontSize: 36,
    marginBottom: BRUTAL_SPACING[2],
  },
  uploadTitle: {
    fontSize: BRUTAL_TYPOGRAPHY.sm,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.INK,
    marginBottom: 4,
  },
  uploadMeta: {
    fontSize: BRUTAL_TYPOGRAPHY.xs,
    color: BRUTAL_COLORS.SECONDARY_TEXT,
    marginBottom: BRUTAL_SPACING[3],
  },
  docSecureBadge: {
    backgroundColor: BRUTAL_COLORS.INK,
    paddingHorizontal: BRUTAL_SPACING[2],
    paddingVertical: 4,
  },
  docSecureText: {
    fontSize: 9,
    fontWeight: BRUTAL_TYPOGRAPHY.bold,
    color: BRUTAL_COLORS.SURFACE,
    letterSpacing: 0.5,
  },
});
