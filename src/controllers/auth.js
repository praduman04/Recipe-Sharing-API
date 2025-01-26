import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username/Email and password are required.",
      });
    }

    const user = await UserModel.findOne({
      $or: [
        {
          username: username,
        },
        { email: username },
      ],
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "USER NOT FOUND.",
      });
    }
    const isValidPassword = await bcrypt.compare(password,user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }
    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });
    return res.status(200).json({
      success: true,
      message: "LOGGED IN SUCCESSFULLY.",
      data: {
        id: user._id,
        name: user.name,
        username: user.username,
        token: token,
      },
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
        success: false,
        message: "An error occurred during login. Please try again.",
    });
  }
};
