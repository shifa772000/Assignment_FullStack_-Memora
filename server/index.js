// server/index.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./server.js"; // استدعاء إعدادات السيرفر

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// الاتصال بقاعدة البيانات + تشغيل الخادم
const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Connected Successfully!");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

startServer();
