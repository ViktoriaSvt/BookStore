const { Book } = require("../models/Book");
const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://localhost:9200' });

async function getAllBooks() {
    console.log('retrieving books');
    
    const books = await Book.find().lean();

    console.log('books:', books);
    return books
}

async function getBookById(id) {
    const book = await Book.findById(id).lean()
    return book
}

async function createBook(data) {

    const bookData = {
        title: data.title,
        genre: data.genre,
        author: data.author,
        bannerImageUrl: data.bannerImageUrl || null,
        coverImageUrl: data.coverImageUrl || null,
        year: data.year,
        price: data.price,
        description: data.description,
        creatorId: null
    };

    const book = await Book.create(bookData)
    await addBookToElasticsearch(book)

    return book
}

async function addBookToElasticsearch(book) {
    await client.index({
        index: 'books',
        id: book._id.toString(),
        body: {
            title: book.title,
            author: book.author,
            genre: book.genre,
            description: book.description,
            year: book.year,
            price: book.price,
            bannerImageUrl: book.bannerImageUrl,
            coverImageUrl: book.coverImageUrl,
            creatorId: book.creatorId ? book.creatorId.toString() : null,
        },
    });
}

module.exports = { getAllBooks, getBookById, createBook, addBookToElasticsearch }



