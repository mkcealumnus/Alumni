import { Router } from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import pool from "../config/db.js";
import { generateToken, authenticate } from "../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// ──────────────── MULTER CONFIG ────────────────
const uploadsDir = path.join(__dirname, "..", "uploads", "profiles");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const rollNumber = req.body.rollNumber;
    if (rollNumber) {
      cb(null, `${rollNumber}${ext}`);
    } else {
      cb(null, `profile_${Date.now()}${ext}`);
    }
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    if (
      allowed.test(file.mimetype) &&
      allowed.test(
        path.extname(file.originalname).toLowerCase().replace(".", ""),
      )
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, png, gif, webp) are allowed"));
    }
  },
});

// ──────────────── UPLOAD PROFILE IMAGE ────────────────
router.post("/upload-profile", authenticate, upload.single("profileImage"), async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    const profileImage = `/uploads/profiles/${req.file.filename}`;

    // Save the profile image URL to the user record
    await pool.query("UPDATE users SET profileImage = ? WHERE id = ?", [
      profileImage,
      req.user.id,
    ]);

    res.json({
      success: true,
      data: { profileImage, filename: req.file.filename },
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Upload failed." });
  }
});

// ──────────────── REGISTER ────────────────
router.post("/register", async (req, res) => {
  try {
    const {
      email,
      username,
      fullName,
      password,
      phone,
      countryCode,
      college,
      department,
      year,
      rollNumber,
      gender,
      dateOfBirth,
      address,
      bio,
      github,
      linkedin,
      hackerrank,
      leetcode,
      profileImage,
    } = req.body;

    if (!email || !username || !fullName || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Check if email or username exists
    const [existing] = await pool.query(
      "SELECT id FROM users WHERE email = ? OR username = ?",
      [email.toLowerCase(), username.toLowerCase()],
    );

    if (existing.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Email or username already exists." });
    }

    const validRoles = ['admin', 'alumni', 'student'];
    const userRole = req.body.role && validRoles.includes(req.body.role) ? req.body.role : 'student';

    // Insert user with plain text password
    const [result] = await pool.query(
      `INSERT INTO users (email, username, fullName, password, phone, countryCode, role, isVerified, isActive,
        college, department, year, rollNumber, gender, dateOfBirth, address, bio,
        github, linkedin, hackerrank, leetcode, profileImage)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        email.toLowerCase(),
        username.toLowerCase(),
        fullName,
        password,
        phone || null,
        countryCode || "+91",
        userRole,
        college || null,
        department || null,
        year || null,
        rollNumber || null,
        gender || null,
        dateOfBirth || null,
        address || null,
        bio || null,
        github || null,
        linkedin || null,
        hackerrank || null,
        leetcode || null,
        profileImage || null,
      ],
    );

    // Generate OTP for email verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await pool.query(
      "INSERT INTO otpCodes (userId, email, code, expiresAt) VALUES (?, ?, ?, ?)",
      [result.insertId, email.toLowerCase(), otp, expiresAt],
    );

    // Log activity
    await pool.query(
      "INSERT INTO activityLogs (userId, action, description) VALUES (?, ?, ?)",
      [result.insertId, "register", `New student registration: ${fullName}`],
    );

    const user = {
      id: result.insertId,
      email: email.toLowerCase(),
      role: "student",
      username: username.toLowerCase(),
    };
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "Registration successful! Please verify your email.",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName,
          role: "student",
        },
        otp, // In production, send via email instead
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during registration." });
  }
});

// ──────────────── LOGIN ────────────────
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Username and password are required.",
        });
    }

    const identifier = String(username || "").toLowerCase().trim();

    // Find user by username, email, or rollNumber
    const [users] = await pool.query(
      "SELECT * FROM users WHERE LOWER(username) = ? OR LOWER(email) = ? OR LOWER(rollNumber) = ?",
      [identifier, identifier, identifier],
    );

    if (users.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password." });
    }

    const user = users[0];

    if (!user.isActive) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Account is deactivated. Contact admin.",
        });
    }

    // Check password (supports plain text and legacy bcrypt hashes)
    const isMatch = (password === user.password) || (user.password && user.password.startsWith('$2') && await bcrypt.compare(password, user.password));
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password." });
    }

    // Generate token
    const token = generateToken(user);

    // Log activity
    await pool.query(
      "INSERT INTO activityLogs (userId, action, description, ipAddress) VALUES (?, ?, ?, ?)",
      [user.id, "login", `${user.role} login: ${user.fullName}`, req.ip],
    );

    res.json({
      success: true,
      message: "Login successful!",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          role: user.role,
          profileImage: user.profileImage,
          isVerified: user.isVerified,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login." });
  }
});

// ──────────────── FORGOT PASSWORD - SEND OTP ────────────────
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }

    const [users] = await pool.query(
      "SELECT id, email FROM users WHERE email = ?",
      [email.toLowerCase()],
    );

    if (users.length === 0) {
      // Don't reveal if email exists
      return res.json({
        success: true,
        message: "If the email exists, you will receive an OTP shortly.",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Invalidate old OTPs
    await pool.query(
      "UPDATE otpCodes SET isUsed = 1 WHERE email = ? AND isUsed = 0",
      [email.toLowerCase()],
    );

    await pool.query(
      "INSERT INTO otpCodes (userId, email, code, expiresAt) VALUES (?, ?, ?, ?)",
      [users[0].id, email.toLowerCase(), otp, expiresAt],
    );

    // In production, send via email using nodemailer
    console.log(`OTP for ${email}: ${otp}`);

    res.json({
      success: true,
      message: "If the email exists, you will receive an OTP shortly.",
      data: { otp }, // Remove in production - only for development
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ──────────────── VERIFY OTP ────────────────
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required." });
    }

    const [codes] = await pool.query(
      "SELECT * FROM otpCodes WHERE email = ? AND code = ? AND isUsed = 0 AND expiresAt > NOW() ORDER BY id DESC LIMIT 1",
      [email.toLowerCase(), otp],
    );

    if (codes.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP." });
    }

    // Mark OTP as used
    await pool.query("UPDATE otpCodes SET isUsed = 1 WHERE id = ?", [
      codes[0].id,
    ]);

    // Mark user as verified if registration OTP
    await pool.query("UPDATE users SET isVerified = 1 WHERE email = ?", [
      email.toLowerCase(),
    ]);

    res.json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ──────────────── RESET PASSWORD ────────────────
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email and new password are required.",
        });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 6 characters.",
        });
    }

    const [result] = await pool.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [newPassword, email.toLowerCase()],
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    await pool.query(
      "INSERT INTO activityLogs (userId, action, description) VALUES ((SELECT id FROM users WHERE email = ?), ?, ?)",
      [email.toLowerCase(), "password_reset", "Password was reset"],
    );

    res.json({ success: true, message: "Password reset successful!" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ──────────────── REFRESH TOKEN ────────────────
router.post("/refresh-token", authenticate, async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, email, username, fullName, role, profileImage, isVerified, isActive FROM users WHERE id = ? AND isActive = 1",
      [req.user.id],
    );

    if (users.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "User not found or inactive." });
    }

    const user = users[0];
    const newToken = generateToken(user);

    res.json({
      success: true,
      message: "Token refreshed.",
      data: {
        token: newToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          role: user.role,
          profileImage: user.profileImage,
          isVerified: user.isVerified,
        },
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ──────────────── GET CURRENT USER ────────────────
router.get("/me", authenticate, async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, email, username, fullName, phone, countryCode, role, profileImage, college, department, year, rollNumber, gender, dateOfBirth, address, bio, github, linkedin, hackerrank, leetcode, isVerified, isActive, createdAt, updatedAt FROM users WHERE id = ?",
      [req.user.id],
    );

    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.json({ success: true, data: { user: users[0] } });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ──────────────── UPDATE PROFILE ────────────────
router.put("/profile", authenticate, async (req, res) => {
  try {
    const userRole = req.user.role;

    // Students cannot directly edit their profile — they must raise a request
    if (userRole === 'student') {
      return res.status(403).json({ success: false, message: 'Students must raise an edit request to admin.' });
    }

    // Admin & Alumni can edit all profile fields directly
    const { fullName, phone, countryCode, profileImage, college, department, year, gender, dateOfBirth, address, bio, github, linkedin, hackerrank, leetcode } = req.body;

    await pool.query(
      `UPDATE users SET
        fullName = COALESCE(?, fullName),
        phone = COALESCE(?, phone),
        countryCode = COALESCE(?, countryCode),
        profileImage = COALESCE(?, profileImage),
        college = COALESCE(?, college),
        department = COALESCE(?, department),
        year = COALESCE(?, year),
        gender = COALESCE(?, gender),
        dateOfBirth = COALESCE(?, dateOfBirth),
        address = COALESCE(?, address),
        bio = COALESCE(?, bio),
        github = COALESCE(?, github),
        linkedin = COALESCE(?, linkedin),
        hackerrank = COALESCE(?, hackerrank),
        leetcode = COALESCE(?, leetcode)
      WHERE id = ?`,
      [fullName, phone, countryCode, profileImage, college, department, year, gender, dateOfBirth, address, bio, github, linkedin, hackerrank, leetcode, req.user.id],
    );

    const [updated] = await pool.query(
      "SELECT id, email, username, fullName, phone, countryCode, role, profileImage, college, department, year, rollNumber, gender, dateOfBirth, address, bio, github, linkedin, hackerrank, leetcode, isVerified, isActive, createdAt, updatedAt FROM users WHERE id = ?",
      [req.user.id],
    );

    res.json({
      success: true,
      message: "Profile updated successfully.",
      data: { user: updated[0] },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ──────────────── CHANGE PASSWORD ────────────────
router.put("/change-password", authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Current and new passwords are required.",
        });
    }

    const [users] = await pool.query(
      "SELECT password FROM users WHERE id = ?",
      [req.user.id],
    );
    const isMatch = (currentPassword === users[0].password) || (users[0].password && users[0].password.startsWith('$2') && await bcrypt.compare(currentPassword, users[0].password));

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect." });
    }

    await pool.query("UPDATE users SET password = ? WHERE id = ?", [
      newPassword,
      req.user.id,
    ]);

    res.json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

export default router;
