import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";

// Middleware
import "dotenv/config";
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Passport configuration + Routes file
import "./config/google.js";
import "./config/github.js";
import authRoutes from "./routes/authRoute.js";
import taskRoutes from "./routes/taskRoute.js";
import utilsRoutes from "./routes/Utils.js";

//Routes
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);
app.use("/utils", utilsRoutes);

// Server + MongoDB
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error: ", err));

// Server check (Ignore it)
app.get("/", (req, res) => {
  mongoose.connection.readyState === 1
    ? res.send(
        `<h1>Server is Running</h1> <h1 style="color:green">✅ Database connnected successfully!!</h1>`
      )
    : res.send(
        `<h1>Server is Running</h1> <h1 style="color:red;">❌ Database not connnected! Please check the connection string and any errors.</h1>`
      );
});