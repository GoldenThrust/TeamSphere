import { createTransport, Transporter } from "nodemailer";
import fs from "fs";
import { info } from "console";
import { emailInfo } from "../shared/interfaces/interface";

class MailService {
  transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      //@ts-ignore
      service: "Gmail",
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendInvite(Data: emailInfo) {
    const HTML = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invitation to Meet in Team Sphere</title>
      </head>
      <body>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333333;">Invitation to Meet in Team Sphere</h2>
              <p>Hi</p>
              <p>I hope you're doing well!</p>
              <p>I'm excited to invite you to join me in <a href="https://teamsphere-1-y8kv.onrender.com/room/${Data.id}">TeamSphere</a> a friendly chat and catch-up. Let's connect and discuss anything on your mind, whether it's work-related or just to catch up on life.</p>
              <p>Team Sphere provides a fantastic space for us to interact, collaborate, and share ideas effortlessly. I'm looking forward to seeing you there!</p>
              <p>Please let me know if this works for you, or if you need to suggest an alternative time. Your flexibility is greatly appreciated!</p>
              <p>If you have any questions about accessing Team Sphere or need assistance, feel free to reach out. I'm here to help!</p>
              <p>Looking forward to our chat!</p>
              <p>Best regards,<br>${Data.name}</p>
          </div>
      </body>
      </html>`;
    let emailArray;

    try {
      emailArray = Data.emails.split(",").map((email) => email.trim());
    } catch (e: any) {
      throw new Error(`Wrong mail format: ${e.message}`);
    }

    const mailOptions = {
      from: "TeamSphere",
      to: emailArray,
      subject: "Meet Me",
      html: HTML,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  }
}

const mail = new MailService();
export default mail;
