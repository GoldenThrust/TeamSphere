import { Router } from "express";
import userContollers from "../controllers/userControllers";
import { verifyToken } from "../middleware/tokenManager";
import multer from "multer";
import mailer from "../controllers/mailerControllers";

const upload = multer({ dest: 'uploads/' });

const mailRoutes = Router();


mailRoutes.post("/sendmail", verifyToken, mailer.sendMail)

export default mailRoutes;