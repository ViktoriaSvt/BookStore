const { Client } = require('@elastic/elasticsearch');
const { Book } = require('./models/Book');

const client = new Client({ node: 'http://localhost:9200' , log: 'trace'});
const mongoose = require('mongoose');

async function bulkIndexBooks() {



    const books = await Book.find().limit(100);
        // const books = await Book.find().limit(100); // Limit to 100 books



        // const body = books.flatMap(book => [
        //     {
        //         index: {
        //             _index: 'books',
        //             _id: book._id.toString(),
        //         },
        //     },
        //     {
        //         title: book.title,
        //         author: book.author,
        //         genre: book.genre,
        //         description: book.description,
        //         year: book.year,
        //         price: book.price,
        //         bannerImageUrl: book.bannerImageUrl,
        //         coverImageUrl: book.coverImageUrl,
        //         creatorId: book.creatorId ? book.creatorId.toString() : null,
        //     },
        // ]);

        console.log('body found');

        const body = [
            { index: { _index: 'books', _id: '1' } },
            { title: 'Test Book', author: 'Test Author', genre: 'Test Genre' },
            { index: { _index: 'books', _id: '2' } },
            { title: 'Another Book', author: 'Another Author', genre: 'Fiction' }
        ];

        const { body: bulkResponse, statusCode } = await client.bulk({
            refresh: true,
            body,
            timeout: '5m'
        });

        console.log('Bulk response:', bulkResponse);
        console.log('Status code:', statusCode);



        //     const { body: bulkResponse, statusCode } = await client.bulk({
        //         refresh: true,
        //         body,
        //         timeout: '5m',  // increase timeout to 5 minutes
        //     });
        //     console.log('Bulk response:', bulkResponse);  // Log the bulk response
        //     console.log('Status code:', statusCode);      // Log the status code

        //     if (!bulkResponse) {
        //         console.log('Bulk response is undefined or null');
        //         return;
        //     }

        //     if (bulkResponse.errors) {
        //         console.log('Errors during bulk indexing:', bulkResponse.errors);
        //     } else {
        //         console.log('Bulk indexing completed successfully');
        //     }
        // } catch (error) {
        //     console.error('Error during bulk indexing:', error);
        // }
    }





bulkIndexBooks();
