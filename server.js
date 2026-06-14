require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const booksRoute = require("./routes/books");

const app = express();

// Body Parser Middleware
app.use(express.json());

// Request Logger Middleware
app.use((req, res, next) => {
    console.log(
        `${req.method} ${req.originalUrl} - ${new Date().toLocaleString()}`
    );
    next();
});

// Routes
app.use("/books", booksRoute);

// Home Route
app.get("/", (req, res) => {
    res.send("Online Bookstore API Running...");
});

// Invalid Route Handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, {
        family: 4
    })
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server Running on Port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });