// server/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// مثال لتسجيل مستخدم
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  // هنا تحفظين في قاعدة البيانات
  // Model.create({ email, password: hashedPassword });

  res.json({ message: "User registered successfully" });
});

// مثال لتسجيل دخول
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // هنا تبحثين المستخدم من قاعدة البيانات
  // let user = await User.findOne({ email });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

export default router; 
