const express = require('express');
const app = express();
const dotenv = require('dotenv');

// 1. Initialize Environment Variables BEFORE importing routes
dotenv.config();

// 2. Global Body Parsing Middleware
app.use(express.json());

// 3. Import Router Definitions
const searchRoutes = require('./routes/searchRoutes');
const giftRoutes = require('./routes/giftRoutes');

// 4. Mount API Middleware Endpoint Targets 
app.use('/api/search', searchRoutes);
app.use('/api/gifts', giftRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// START THE SERVER SO IT LISTENS ON PORT 3080
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
