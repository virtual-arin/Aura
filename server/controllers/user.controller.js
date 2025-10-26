import apiResponse from "../API/gemini.js";
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

//Ask AI
export const askAura = async (req, res) => {
  try {
    const { instruction } = req.body;
    const user = await User.findById(req.userId);
    const userName = user.name;
    const result = await apiResponse(userName, instruction);

    const jsonMatch = result.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      res
        .status(400)
        .json({ message: "I'm sorry, I'm a little confused by what you said" });
    }

    const apiResult = jsonMatch[0];
  } catch (error) {}
};
