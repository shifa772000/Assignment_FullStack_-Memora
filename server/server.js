// server/server.js
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import peopleRoutes from "./routes/people.js"; // غيّري المسار إذا لديكم اسم مختلف

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/people", peopleRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "Memora API is running" });
});

// تصدير التطبيق ليستخدمه index.js
export default app;
