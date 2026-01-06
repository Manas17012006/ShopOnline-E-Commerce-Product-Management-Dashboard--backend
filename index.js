const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const auth_route = require("./router/auth.route");
const user_route = require("./router/user.router");
const product_route = require("./router/product.route");
const order_route = require("./router/order.route");

// ---------- MIDDLEWARE ----------
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://shoponline-or9y.vercel.app",
    ],
    credentials: true,
  })
);

// ---------- CLOUDINARY ----------
cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

// ---------- MONGODB CONNECTION (SERVERLESS SAFE) ----------
let isConnected = false;

async function connectdb() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    throw err;
  }
}

// ---------- AUTO CONNECT PER REQUEST ----------
app.use(async (req, res, next) => {
  try {
    await connectdb();
    next();
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// ---------- ROUTES ----------
app.get("/", (req, res) => {
  res.send("API working");
});

app.use("/api/auth", auth_route);
app.use("/api/auth", user_route);
app.use("/api/product", product_route);
app.use("/api/order", order_route);



module.exports = app;
