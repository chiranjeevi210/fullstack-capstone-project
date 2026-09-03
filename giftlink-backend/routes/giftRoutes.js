const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Step 2: Implement the /api/gifts endpoint to get all gifts
router.get('/', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: Use the collection() method to retrieve the gifts collection
        const collection = db.collection("gifts");

        // Task 3: Fetch all gifts and convert to JSON array
        const gifts = await collection.find({}).toArray();

        // Task 4: Return the gifts using the res.json method
        res.json(gifts);
    } catch (e) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Step 3: Implement the /api/gifts/:id endpoint to get a specific gift
router.get('/:id', async (req, res) => {
    try {
        // Task 1: Connect to MongoDB
        const db = await connectToDatabase();

        // Task 2: Use the collection() method to retrieve the gifts collection
        const collection = db.collection("gifts");

        const id = req.params.id;

        // Task 3: Find a specific gift by ID using the collection.findOne method
        const gift = await collection.findOne({ id: id });

        if (!gift) {
            return res.status(404).send("Gift not found");
        }

        res.json(gift);
    } catch (e) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
