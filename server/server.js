// server/server.js
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const peopleRoutes = require("./routes/server"); // راوتر الأشخاص

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/people", peopleRoutes);

// ممكن تضيفي health check بسيط
app.get("/", (req, res) => {
  res.json({ message: "Memora API is running" });
});

// هنا لا نعمل listen
// فقط نصدّر app ليستخدمه index.js
module.exports = app;
