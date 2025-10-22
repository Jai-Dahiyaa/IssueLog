import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendTestEmail = async (to, subject, message) => {
  const mailOptions = {
    from: `"TaskBridge 🔧" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html:`
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <h2 style="color: #2c3e50;">🔐 Your One-Time Password (OTP)</h2>
    <p>Hello,</p>
    <p>You initiated a signup process on <strong>TaskBridge</strong>.</p>
    <p>Please use the following OTP to verify your identity. This code is valid for <strong>5 minutes</strong>.</p>
    <div style="font-size: 28px; font-weight: bold; background-color: #ecf0f1; padding: 12px; text-align: center; border-radius: 8px; margin: 20px 0;">
      ${message}
    </div>
    <p>Or click the button below to verify directly:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="{verifyLink}" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
        ✅ Verify OTP — Click Here
      </a>
    </div>
    <p>If you did not request this, you can safely ignore this email.</p>
    <hr style="margin-top: 30px;">
    <p style="font-size: 12px; color: #7f8c8d;">This is an automated message from TaskBridge. Please do not reply.</p>
  </div>
`,
  };

  await transporter.sendMail(mailOptions);
};

export default sendTestEmail;
