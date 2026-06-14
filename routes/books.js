const express = require('express');
const router = express.Router();

const Book = require('../models/Book');

// Test Route
router.get('/test', (req, res) => {
    res.send('Books Route Working');
});

// GET All Books + Search + Pagination
router.get('/', async (req, res) => {
    try {
        const { author, genre, page = 1, limit = 5 } = req.query;

        let filter = {};

        if (author) {
            filter.author = { $regex: author, $options: 'i' };
        }

        if (genre) {
            filter.genre = { $regex: genre, $options: 'i' };
        }

        const books = await Book.find(filter)
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET Single Book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// POST Add New Book
router.post('/', async (req, res) => {
    try {

        if (!req.body.title || !req.body.author || !req.body.price) {
            return res.status(400).json({
                message: 'Title, Author and Price are required'
            });
        }

        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            price: req.body.price,
            publishedDate: req.body.publishedDate,
            inStock: req.body.inStock
        });

        const savedBook = await book.save();

        res.status(201).json(savedBook);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// PUT Update Book
router.put('/:id', async (req, res) => {
    try {

        if (!req.body.title || !req.body.author || !req.body.price) {
            return res.status(400).json({
                message: 'Title, Author and Price are required'
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                price: req.body.price,
                publishedDate: req.body.publishedDate,
                inStock: req.body.inStock
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json(updatedBook);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE Book
router.delete('/:id', async (req, res) => {
    try {

        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            message: 'Book deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;