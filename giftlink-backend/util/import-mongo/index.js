const express = require('express');
const natural = require('natural');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const logger = require('pino')();

// Initialize the Natural Sentiment Analyzer (using English Porter Stemmer)
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer('English', stemmer, 'afinn');

// Create a POST /sentiment endpoint
app.post('/sentiment', async (req, res) => {
    const { sentence } = req.body;

    if (!sentence || sentence.trim() === "") {
        logger.error("No sentence provided in request body");
        return res.status(400).json({ error: "Parameter 'sentence' is required and cannot be empty." });
    }

    try {
        // Tokenize the input sentence string into distinct word elements
        const tokenizer = new natural.WordTokenizer();
        const words = tokenizer.tokenize(sentence);

        // Calculate sentiment raw score values
        const score = analyzer.getSentiment(words);

        // Process response by mapping score bounds to tags
        let sentiment = 'neutral';
        if (score < 0) {
            sentiment = 'negative'; // If score is < 0, sentiment is negative
        } else if (score > 0.33) {
            sentiment = 'positive'; // If score is > 0.33, sentiment is positive
        } else {
            sentiment = 'neutral';  // If score is between 0 and 0.33, sentiment is neutral
        }

        logger.info(`Sentiment analysis complete. Score: ${score}, Sentiment: ${sentiment}`);
        res.status(200).json({ score: score, sentiment: sentiment });

    } catch (error) {
        logger.error(`Error during processing: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error during processing sentiment analysis." });
    }
});

// Start the server on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    logger.info(`Sentiment Analysis Service running on port ${PORT}`);
});
