import { createTransport, Transporter } from "nodemailer";
import fs from "fs";
import { info } from "console";
import { emailInfo } from "../../shared/interfaces/interface"

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
    let modifiedHTML;
    fs.readFile("./src/utils/index.html", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading HTML file:", err);
        return;
      }

      const replacements = {
        Name: Data.name,
        ID: Data.id,
      };

      modifiedHTML = replaceText(data, replacements);
    });

    const emailArray = Data.emails.split(",").map(email => email.trim());

    const mailOptions = {
      from: "buynance631@gmail.com",
      to: emailArray,
      subject: "Meet Me",
      text: modifiedHTML,
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

function replaceText(htmlContent: string, replacements: any) {
  return htmlContent.replace(/{{(.*?)}}/g, (match, key) => {
    return replacements[key.trim()] || "";
  });
}

const mail = new MailService();
export default mail;
