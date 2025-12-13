// server/routes/personRoutes.js

import express from 'express';
import asyncHandler from 'express-async-handler'; 
import Person from '../models/Person.js'; 

const router = express.Router();

router.post("/api/people/:personId/events", async (req, res) => {
  try {
    const { personId } = req.params;
    const { type, eventDate, note, icon, location } = req.body;

    const person = await Person.findById(personId);
    if (!person) return res.status(404).json({ error: "Person not found" });

    const newEvent = {
      type,
      eventDate,
      note: note || "",
      icon: icon || "🎂",
      location: location || "",
    };

    person.events.push(newEvent);
    await person.save();

    res.status(201).json({ message: "Event added", events: person.events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/', asyncHandler(async (req, res) => { 
    const people = await Person.find({}); 
    res.status(200).json(people);
}));



router.put('/:id', asyncHandler(async (req, res) => {
  const { name, relation } = req.body;

  const updatedPerson = await Person.findByIdAndUpdate(
    req.params.id,
    { name, relation },
    { new: true }
  );

  if (!updatedPerson) {
    res.status(404);
    throw new Error('Person not found');
  }

  res.status(200).json(updatedPerson);
}));


router.post('/', asyncHandler(async (req, res) => {
    const { name, relation, user } = req.body; 

    if (!name || !user) {
        res.status(400);
        throw new Error('Name and User ID are required.');
    }

    // Create a new Person document
    const newPerson = new Person({
        name,
        relation,
        user 
    });

    // Save the person to the database
    const savedPerson = await newPerson.save();

    // Respond with the newly created person data
    res.status(201).json(savedPerson);


    console.log("REQ BODY:", req.body);
    console.log("REQ PARAMS:", req.params);


}));

export default router;