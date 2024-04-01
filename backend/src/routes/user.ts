import { Router } from "express";
import userContollers from "../controllers/userControllers";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../middleware/validators";
import { verifyToken } from "../middleware/tokenManager";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });

const userRoutes = Router();

userRoutes.get("/", userContollers.getAllUsers);
userRoutes.post(
  "/create",
  upload.single('image'),
  validate(signupValidator),
  userContollers.userSignup
);
userRoutes.post("/login", validate(loginValidator), userContollers.userLogin);
userRoutes.post("/auth-status", verifyToken, userContollers.verifyUser);
userRoutes.post("/logout", verifyToken, userContollers.userLogout);

export default userRoutes;
