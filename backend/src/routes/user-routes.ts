import {Router} from "express";
import { userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controllers.js";
import {validate, signupValidator, loginValidator} from "../utils/validators.js"
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();


userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login",validate(loginValidator),userLogin);
userRoutes.get("/auth-status",verifyToken, verifyUser);
userRoutes.get("/logout",verifyToken, userLogout);
export default userRoutes;