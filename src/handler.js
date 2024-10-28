const { nanoid } = require("nanoid");
const books = require('./books');

const addBookHandler = (request, h) => {
    const {name, author, year, summary, publisher, pageCount, readPage, reading} = request.payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
       id, name, author, year, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if(isSuccess){
        const response = h.response({
            status: 'success',
            message:'Buku Berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Data Gagal Menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
};


module.exports = { addBookHandler };