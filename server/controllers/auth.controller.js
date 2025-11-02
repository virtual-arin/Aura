import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/token.js";

//Signup
export const signup = async (req, res) => {
  try {
    const { name, email, gender, password } = req.body;

    if (!name || !email || !password || !gender) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exist!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be a minimum of 8 character" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      gender,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });

    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    console.log("An error occurred while signing up ", error);
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log("An error occurred while logging in ", error);
  }
};

//Logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(201).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("An error occurred while logging out ", error);
  }
};
