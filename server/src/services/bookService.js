const { Book } = require("../models/Book");


async function getAllBooks() {
    const books = await Book.find().lean();
    return books 
}

async function getBookById(id) {
    const book = await Book.findById(id).lean()
    return book
}

module.exports = { getAllBooks , getBookById}



