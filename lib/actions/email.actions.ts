import nodemailer from "nodemailer";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendEmail(email: string): Promise<string> {
  if (!process.env.PASS) {
    throw new Error("SMTP password environment variable is not configured");
  }

  try {
    const otp = generateOTP();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vermapiyush823@gmail.com",
        pass: process.env.PASS,
      },
    });

    // Verify SMTP connection
    await transporter.verify().catch((error) => {
      console.error("SMTP Verification failed:", error);
      throw new Error("Failed to establish SMTP connection");
    });

    const mailOptions = {
      from: '"Shree Balaji Jewellers" <vermapiyush823@gmail.com>',
      to: email,
      subject: "Your OTP Code for Verification",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #d4af37;">Shree Balaji Jewellers</h2>
          <p>Dear Customer,</p>
          <p>We are delighted to have you with us! To proceed with your request, please use the following OTP for verification:</p>
          <p style="font-size: 24px; font-weight: bold; color: #d4af37; text-align: center;">${otp}</p>
          <p>This OTP is valid for the next 1 minute. Please do not share it with anyone.</p>
          <p>If you have any questions or concerns, feel free to contact us.</p>
          <p style="margin-top: 20px;">Best Regards,</p>
          <p><strong>Shree Balaji Jewellers</strong></p>
          <p style="font-size: 12px; color: #999;">This is an automated message. Please do not reply to this email.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return otp;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to send email"
    );
  }
}
