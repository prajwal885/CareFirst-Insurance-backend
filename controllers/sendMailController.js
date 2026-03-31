import { pool } from "../config/db.js";
import { sendEmail } from "../utils/sendEmail.js";

// SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // UPSERT (insert or update)
    await pool.query(
      `INSERT INTO otp_verifications (email, otp, expires_at, is_verified)
       VALUES ($1, $2, $3, false)
       ON CONFLICT (email)
       DO UPDATE SET otp=$2, expires_at=$3, is_verified=false`,
      [email, otp, expiresAt]
    );

    // Send Email
    await sendEmail(
      email,
      "OTP Verification",
      `<h3>Your OTP is: <b>${otp}</b></h3><p>Valid for 5 minutes</p>`
    );

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await pool.query(
      `SELECT * FROM otp_verifications WHERE email=$1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "OTP not found" });
    }

    const record = result.rows[0];

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > record.expires_at) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await pool.query(
      `UPDATE otp_verifications SET is_verified=true WHERE email=$1`,
      [email]
    );

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};