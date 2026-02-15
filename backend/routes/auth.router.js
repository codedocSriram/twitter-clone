import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
    login,
    logout,
    signup,
    getMe,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/me", protectRoute, getMe);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
export default authRouter;
