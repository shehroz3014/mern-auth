
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const User = require("../models/User");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { message: "Too many attempts. Try again later." },
});

function createToken(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    issuer: "mern-auth-api",
    audience: "mern-auth-client",
  });
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 1000,
};

router.post("/signup", authLimiter, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2 || cleanName.length > 50) {
      return res.status(400).json({
        message: "Name must be between 2 and 50 characters.",
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({
        message: "Password must be at least 8 characters and at most 72 UTF-8 bytes.",
      });
    }

    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
    });

    res.cookie("token", createToken(user._id.toString()), cookieOptions);

    return res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    console.error("Signup error:", error.message);
    return res.status(500).json({ message: "Unable to create account." });
  }
});

router.post("/login", authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: cleanEmail }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    res.cookie("token", createToken(user._id.toString()), cookieOptions);

    return res.json({
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Unable to log in." });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.json({ message: "Logged out successfully." });
});

function requireAuth(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Please log in first." });
  }

  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "mern-auth-api",
      audience: "mern-auth-client",
    });

    next();
  } catch {
    return res.status(401).json({
      message: "Session is invalid or expired. Please log in again.",
    });
  }
}

router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.auth.sub).select("name email createdAt");

    if (!user) {
      return res.status(401).json({ message: "User account not found." });
    }

    return res.json({ user });
  } catch (error) {
    console.error("Profile error:", error.message);
    return res.status(500).json({ message: "Unable to load profile." });
  }
});

module.exports = router;
