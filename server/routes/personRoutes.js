// server/routes/personRoutes.js

import express from 'express';
// import Person from '../models/Person.js'; 
import asyncHandler from 'express-async-handler'; // 💡 نوصي بإضافة هذا للاستخدام الآمن للـ async/await
import Person from '../models/Person.js'; 

const router = express.Router();

// @desc    Fetch all people (currently unprotected)
// @route   GET /api/people
// @access  Public (Will be Private later)
router.get('/', asyncHandler(async (req, res) => { // 💡 استخدام asyncHandler
    // In the final version, you will filter by req.user.id
    const people = await Person.find({}); 
    res.status(200).json(people);
}));

// @desc    Create a new person
// @route   POST /api/people
// @access  Public (Will be Private later)
router.post('/', asyncHandler(async (req, res) => { // 💡 استخدام asyncHandler
    const { name, relation, user } = req.body; 
    // ملاحظة: تم تغيير 'owner' إلى 'user' ليتوافق مع موديل Person.js

    // Basic validation based on Person Schema (name and user/owner are required)
    if (!name || !user) {
        res.status(400);
        throw new Error('Name and User ID are required.');
    }

    // Create a new Person document
    const newPerson = new Person({
        name,
        relation,
        // The field name 'user' is used here to match your Mongoose schema
        user 
    });

    // Save the person to the database
    const savedPerson = await newPerson.save();

    // Respond with the newly created person data
    res.status(201).json({ 
        message: 'Person created successfully!', 
        person: savedPerson 
    });

}));

export default router;