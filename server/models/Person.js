// server/models/Person.js

import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true, // e.g., Birthday, Graduation, Anniversary
      trim: true,
    },
    icon: {
      type: String,
      default: "🎂",
    },
    // Stores the actual date
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
  { _id: false } // Embedded documents may not need their own _id
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
      trim: true, // e.g., sister, friend, colleague
    },
    // Link to the user who owns this data
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

const Person = mongoose.model("Person", PersonSchema);

export default Person;