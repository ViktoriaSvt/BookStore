const express = require("express");
const { Client } = require('@elastic/elasticsearch');
const { getAllBooks, getBookById, createBook } = require("../services/bookService");
const { Book } = require("../models/Book");
const { getUser } = require("../services/userService");
const { logUser } = require("../services/authService");



const router = express.Router();

const client = new Client({
    node: 'http://localhost:9200', 
});

router.get("/", async (req, res) => {
    try {
        const books = await getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

router.get("/:bookId", async (req, res) => {
    const bookId = req.params.bookId
    const book = await getBookById(bookId)

    res.status(200).json(book)
})

router.post('/create', async (req, res) => {
    const data = req.body;
    const token = req.cookies.accessToken;

    console.log('book data', data);
    console.log('token', token);
    

    const user =await getUser(token, res)

  
    const book = await createBook(data, user._id)

    console.log('new book: ', book);

    return res.status(201).json({
        book,
    });

})

router.post("/search", async (req, res) => {

    const myQuery = req.query.query;

    if (!myQuery) {
        return res.status(400).json({ error: "Query parameter 'query' is required." });
    }

    const esResponse = await client.search({
        index: 'books',
        body: {
            query: {
                multi_match: {
                    query: myQuery,
                    fields: ['title^3', 'author^2', 'description'],
                    fuzziness: 'AUTO',
                },
            },
        },
    });

    const results = esResponse.hits.hits.map(hit => ({
        ...hit._source, 
        _id: hit._id 
      }));

    console.log(results);
    res.status(200).json(results);

})



module.exports = router;
