import nodemailer from "nodemailer";

export async function sendEmail(email: string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vermapiyush823@gmail.com",
      pass: process.env.PASS,
    },
  });

  var mailOptions = {
    from: "vermapiyush@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
