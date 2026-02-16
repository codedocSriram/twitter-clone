import User from "../models/user.model.js";
import Notification from "../models/notification.models.js";
export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserProfile controller: ", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};

export const getSuggestedUsers = async (req, res) => {
    try {
    } catch (error) {}
};

export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);
        console.log(currentUser);
        if (!userToModify || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }
        if (id === req.user._id.toString()) {
            return res
                .status(400)
                .json({ error: "You can't follow/unfollow yourself" });
        }
        const isFollowing = currentUser.following.includes(id);
        if (isFollowing) {
            await User.findByIdAndUpdate(id, {
                $pull: { followers: req.user._id },
            });
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { following: id },
            });

            // todo: Return the id of the user as response

            res.status(200).json({ message: "Unfollowed sucessfully!" });
        } else {
            await User.findByIdAndUpdate(id, {
                $push: { followers: req.user._id },
            });
            await User.findByIdAndUpdate(req.user._id, {
                $push: { following: id },
            });
            const newNotification = new Notification({
                type: "follow",
                from: req.user._id,
                to: userToModify._id,
            });

            await newNotification.save();

            // todo: Return the id of the user as response

            res.status(200).json({ message: "Followed successfully" });
        }
    } catch (error) {
        console.log("Error in followUnfollow controller: ", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
    } catch (error) {}
};
