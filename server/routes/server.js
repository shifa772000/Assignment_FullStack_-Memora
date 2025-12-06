// server/routes/server.js
const express = require("express");
const Person = require("../models/Person");

const router = express.Router();

// GET /api/people
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    console.error("GET /api/people error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/people
router.post("/", async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (err) {
    console.error("POST /api/people error:", err);
    res.status(400).json({ error: "Invalid data" });
  }
});

// PUT /api/people/:id
router.put("/:id", async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.json(person);
  } catch (err) {
    console.error("PUT /api/people/:id error:", err);
    res.status(400).json({ error: "Invalid id" });
  }
});

// DELETE /api/people/:id
router.delete("/:id", async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE /api/people/:id error:", err);
    res.status(400).json({ error: "Invalid id" });
  }
});

module.exports = router;
