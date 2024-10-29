const { nanoid } = require("nanoid");
const books = require('./books');

const addBookHandler = (request, h) => {
    const {name, author, year, summary, publisher, pageCount, readPage, reading} = request.payload;

    const newBook = {
       id: nanoid(16),
       name, 
       year,
       author,
       summary,
       publisher,
       pageCount, 
       readPage, 
       finished:  pageCount === readPage, 
       reading: finished,
       insertedAt: new Date().toISOString(),
       updatedAt: insertedAt,
    };

    if (readPage > pageCount ){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan Buku. readpage tidak boleh lebih besar dari pagecount'
        });
        response.code(400);
        return response;
    }

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

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
};

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        books,
    },
});

const getBooksByIdHandler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((n) => n.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBooksByIdHandler };