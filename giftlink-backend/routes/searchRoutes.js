const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Step 1: Define the search endpoint base router logic
router.get('/', async (req, res, next) => {
    try {
        // Task 1: Connect to MongoDB and retrieve the gifts collection database reference
        const db = await connectToDatabase();
        const collection = db.collection("gifts");

        // Initialize a clean query mapping placeholder configuration object
        let query = {};

        // Task 2: Check if the name exists, is not empty, and apply evaluation regex matching parameters
        if (req.query.name && req.query.name.trim() !== "") {
            query.name = { $regex: req.query.name, $options: "i" };
        }

        // Task 3: Add the other three dynamic filter properties seamlessly to the query object
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.condition) {
            query.condition = req.query.condition;
        }
        if (req.query.age_years) {
            // Ensure data maps down cleanly as numerical variables matching schema traits
            query.age_years = { $lte: parseFloat(req.query.age_years) };
        }

        // Task 4: Fetch filtered gifts records out matching criteria metrics array rows
        const gifts = await collection.find(query).toArray();

        // Send back search matching elements array back directly as a network payload array response
        res.json(gifts);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
