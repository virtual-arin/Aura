import User from "../models/user.model.js";

//Get current user
export const currentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("An error occurred while fetching current user ", error);
  }
};
