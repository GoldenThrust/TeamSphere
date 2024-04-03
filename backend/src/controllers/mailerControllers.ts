import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import mail from "../config/mailservice";
import { emailInfo } from "../shared/interfaces/interface"

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

      try {
        mail.sendInvite(data);
      } catch (e:any) {
        res.status(400).send({ message: e.message})
      }

    res.status(201).send({});
  }
}

const mailer = new MailerController();
export default mailer;
