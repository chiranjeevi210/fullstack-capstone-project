const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

// Task 1: Import the giftRoutes and store in a constant called giftRoutes
const giftRoutes = require('./routes/giftRoutes');

app.use(express.json());

// Task 2: Add the giftRoutes to the server using the app.use() method
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
