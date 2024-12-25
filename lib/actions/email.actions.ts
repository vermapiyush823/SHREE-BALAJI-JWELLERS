import nodemailer from "nodemailer";

// Function to generate a 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send email with OTP
export async function sendEmail(email: string): Promise<string> {
  try {
    const otp = generateOTP();

    // Configure transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "vermapiyush823@gmail.com", // Sender's email
        pass: process.env.PASS, // Sender's email password (use environment variable)
      },
    });

    // Email content
    const mailOptions = {
      from: '"Shree Balaji Jewellers" <vermapiyush823@gmail.com>', // Sender name and email
      to: email, // Recipient email
      subject: "Your OTP Code for Verification", // Email subject
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

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return otp;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
