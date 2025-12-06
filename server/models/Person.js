// models/Person.js
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true, // Birthday, Graduation, ...
      trim: true,
    },
    icon: {
      type: String,
      default: "🎂",
    },
    // نخزن التاريخ الحقيقي، ونحسب عدد الأيام المتبقية في الكود
    eventDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false } // لأن الحدث جزء من الشخص، لا نحتاج _id منفصل لكل حدث إلا إذا أردتِ ذلك
);

const PersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    relation: {
      type: String,
      required: true,
      trim: true, // sister, friend, brother...
    },
    // ربط بالشخص صاحب الحساب
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    events: {
      type: [EventSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Person", PersonSchema);
