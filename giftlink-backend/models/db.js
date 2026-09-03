const { MongoClient } = require('mongodb');

let dbInstance = null;
const url = process.env.MONGO_URL || "mongodb://root:password@localhost:27017";
const dbName = "giftdb";

async function connectToDatabase() {
    // Task 1: Connect to MongoDB if no active instance exists
    if (!dbInstance) {
        const client = new MongoClient(url);
        await client.connect();
        
        // Task 2: Connect to database giftdb and store in variable dbInstance
        dbInstance = client.db(dbName);
    }
    
    // Task 3: Return the database instance
    return dbInstance;
}

module.exports = connectToDatabase;
