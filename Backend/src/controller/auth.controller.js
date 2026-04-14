import { ENV } from "../lib/env.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";

export async function signup(req, res) {
  const { name, email, password, role, adminSecret } = req.body;
  try {
    if (!email || !password || !name || !role) {
      return res.status(400).json({ message: "All field are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    //Check existing user
    const emailRegex = /^[^\$@]+@[^\$@]+\.[^\$@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    // Default role
    let userRole = "PATIENT";

    // Role Handling
    if (req.body.isDoctor === true) {
      userRole = "DOCTOR";
    }

    if (role === "ADMIN") {
      if (adminSecret !== ENV.ADMIN_SECRET) {
        return res
          .status(400)
          .json({ message: "Not authorized to create admin" });
      }
      userRole = "ADMIN";
    }

    const newUser = await User.create({
      email,
      name,
      password,
      role: userRole,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      ENV.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks
      sameSite: "strict", // prevent CSRF attacks
      secure: ENV.NODE_ENV === "production",
    });

    // Create related profile
    if (userRole === "PATIENT") {
      await Patient.create({
        userId: newUser._id,
      });
    }

    if (userRole === "DOCTOR") {
      await Doctor.create({
        userId: newUser._id,
        isApproved: false,
      });
    }

    // Response
    res.status(200).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid email or password " });

    // Doctor approval check
    if (user.role === "DOCTOR") {
      const doctor = await Doctor.findOne({ userId: user._id });

      if (!doctor || !doctor.isApproved) {
        return res.status(400).json({ message: "Doctor not approved yet" });
      }
    }

    const token = jwt.sign({ userId: user._id }, ENV.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks
      sameSite: "strict", // prevent CSRF attacks
      secure: ENV.NODE_ENV === "production",
    });

   res.status(200).json({ success: true, user });

  } catch (error) {
     console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function onboard(req, res) {}
