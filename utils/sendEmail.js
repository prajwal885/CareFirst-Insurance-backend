import nodemailer from "nodemailer";

export const sendEmail = async ({
  to,
  subject,
  html,
  cc,
  bcc,
  attachments,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,          // string or array
      subject,
      html,

      // optional fields
      cc,          // string or array
      bcc,         // string or array
      attachments, // array of files
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);
    return true;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
};