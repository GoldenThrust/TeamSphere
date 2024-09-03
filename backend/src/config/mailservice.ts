import { createTransport, Transporter } from "nodemailer";
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
    const HTML = ``;
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
