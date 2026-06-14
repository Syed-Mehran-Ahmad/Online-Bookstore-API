require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const booksRoute = require("./routes/books");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/books", booksRoute);

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Online Bookstore API is running"
    });
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });

/*
 IMPORTANT FOR VERCEL:
 ❌ DO NOT use app.listen()
 Vercel handles server automatically
*/

// Export for Vercel
module.exports = app;