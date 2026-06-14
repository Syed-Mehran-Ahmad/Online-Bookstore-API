require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const booksRoute = require('./routes/books');

const app = express();

// Middleware
app.use(express.json());

app.use('/books', booksRoute);

// Test Route
app.get("/", (req, res) => {
  res.send("Online Bookstore API Running...");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
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