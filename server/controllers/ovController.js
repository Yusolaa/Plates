import User from "../models/User.js";
import jwt from "jsonwebtoken";
import verifyGoogleToken from "../utils/googleAuth.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const sigInWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: "Token missing" });

    const googleUser = await verifyGoogleToken(token);

    let user = await User.findOne({ googleId: googleUser.sub });
    if (!user) {
      // Create user if not exist
      user = await User.create({
        googleId: googleUser.sub,
        email: googleUser.email,
        name: googleUser.name,
        profile_picture: googleUser.profile_picture,
      });
    }

    // Generate JWT
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return successResponse(res, { token: jwtToken, user }, "Login successful");
  } catch (error) {
    return errorResponse(res, "Invalid Google token", 401);
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-googleId");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { sigInWithGoogle, getProfile };
