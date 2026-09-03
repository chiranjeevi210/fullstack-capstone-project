const express = require('express');
const natural = require('natural');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const logger = require('pino')();

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer('English', stemmer, 'afinn');

app.post('/sentiment', async (req, res) => {
    const { sentence } = req.body;

    if (!sentence || sentence.trim() === "") {
        logger.error("No sentence provided in request body");
        return res.status(400).json({ error: "Parameter 'sentence' is required and cannot be empty." });
    }

    try {
        const tokenizer = new natural.WordTokenizer();
        const words = tokenizer.tokenize(sentence);
        const score = analyzer.getSentiment(words);

        let sentiment = 'neutral';
        if (score < 0) {
            sentiment = 'negative';
        } else if (score > 0.33) {
            sentiment = 'positive';
        } else {
            sentiment = 'neutral';
        }

        logger.info(`Sentiment analysis complete. Score: ${score}, Sentiment: ${sentiment}`);
        res.status(200).json({ score: score, sentiment: sentiment });

    } catch (error) {
        logger.error(`Error during processing: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error during processing sentiment analysis." });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    logger.info(`Sentiment Analysis Service running on port ${PORT}`);
});
