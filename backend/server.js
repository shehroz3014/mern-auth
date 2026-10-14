
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error("MONGODB_URI or JWT_SECRET is missing in .env");
  process.exit(1);
}

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "My MERN backend is running!" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

app.use("/api/auth", authRoutes);

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Atlas connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
