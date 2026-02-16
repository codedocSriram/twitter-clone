import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
    followUnfollowUser,
    getUserProfile,
    updateUserProfile,
} from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.get("/profile/:username", protectRoute, getUserProfile);
// userRouter.post("/suggested", protectRoute, getUserProfile);
userRouter.post("/follow/:id", protectRoute, followUnfollowUser);
userRouter.post("/update", protectRoute, updateUserProfile);

export default userRouter;
