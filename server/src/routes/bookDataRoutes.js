const express = require("express");
const { Client } = require('@elastic/elasticsearch');
const { getAllBooks, getBookById, createBook } = require("../services/bookService");
const { getUser } = require("../services/userService");




const router = express.Router();

const client = new Client({
    node: 'http://localhost:9200',
});

router.get("/", async (req, res, next) => {
    const books = await getAllBooks();

    if (!books) {
        const error = new Error("Failed to fetch books");
        return next(error);
    }

    res.status(200).json(books);

});

router.get("/:bookId", async (req, res) => {
    const bookId = req.params.bookId
    const book = await getBookById(bookId)

    if (!book) {
        const error = new Error("Failed to fetch book");
        return next(error);
    }

    res.status(200).json(book)
})

router.post('/create', async (req, res) => {
    const data = req.body;
    const token = req.cookies.accessToken;

    const user = await getUser(token, res)
    const book = await createBook(data, user._id)

    if (!book) {
        const error = new Error("Failed to create book. Something went wrong");
        return next(error);
    }

    return res.status(201).json({
        book,
    });

})

router.post("/search", async (req, res) => {

    const myQuery = req.query.query;

    if (!myQuery) {
        return res.status(400).json({ error: "Query parameter 'query' is required." });
    }

    await client.search({
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
    })
        .then(esResponse => {
            const results = esResponse.hits.hits.map(hit => ({
                ...hit._source,
                _id: hit._id
            }));

            res.status(200).json(results);
        })
        .catch(err => {
            const error = new Error("Search failed");
            error.status = 500;
            next(error);
        });
})



module.exports = router;
