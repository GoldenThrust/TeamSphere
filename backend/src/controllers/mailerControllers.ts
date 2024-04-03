import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import mail from "../config/mailservice";
import { emailInfo } from "../../shared/interfaces/interface"
class MailerController {
  async sendMail(req: Request, res: Response) {
    const user = await User.findById(res.locals.jwtData.id);
    const { emails, id } = req.body;

    const name = user?.firstname + " " + user?.lastname;

      const data: emailInfo = {
        name,
        emails,
        id,
      };
      mail.sendInvite(data);

    res.status(201).send({});
  }
}

const mailer = new MailerController();
export default mailer;
