require("dotenv").config();
const express = require('express');
const axios = require('axios');
const cors = require("cors");
const PORT = 3000;
const app = express();
const { connectDB } = require("./dbConn");
const Stock = require("./StockModel");

// Connect to DB
connectDB(process.env.DATABASE_URI);

const corsOptions = {
    origin: process.env.Connecting_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

app.get("/news", async (req, res) => {
    const url = "https://api.marketaux.com/v1/news/all?symbols=TSLA%2CAMZN%2CMSFT&filter_entities=true&language=en&api_token=SqCz7ZlA4O4Ci3342l8LZ6mUR7LPNi8HtFUC0ZfP";
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/stocks", async (req, res) => {
    const stocks = await Stock.find();
    res.json(stocks);
});

// Add route to fetch stock by name
app.get("/stocks/:name", async (req, res) => {
    const stockName = req.params.name;
    try {
        const stock = await Stock.findOne({ nameOfStock: stockName });
        if (stock) {
            res.json(stock);
        } else {
            res.status(404).json({ error: "Stock not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log("News API connected"));
