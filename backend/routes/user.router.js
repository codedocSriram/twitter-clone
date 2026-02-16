import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
    followUnfollowUser,
    getSuggestedUsers,
    getUserProfile,
    updateUser,
} from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.get("/profile/:username", protectRoute, getUserProfile);
userRouter.post("/suggested", protectRoute, getSuggestedUsers);
userRouter.post("/follow/:id", protectRoute, followUnfollowUser);
userRouter.post("/update", protectRoute, updateUser);

export default userRouter;
