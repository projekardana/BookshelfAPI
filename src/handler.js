const { nanoid } = require("nanoid");
const books = require('./books');

const addBookHandler = (request, h) => {
    const {name, author, year, summary, publisher, pageCount, readPage, reading} = request.payload;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount ){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
       id,
       name, 
       author,
       year,
       summary,
       publisher,
       pageCount, 
       readPage, 
       finished,
       reading,
       insertedAt,
       updatedAt,
    };
    books.push(newBook);

    const response = h.response({
        status: 'success',
        message:'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    });
    response.code(201);
    return response;
};

// Kriteria Keempat Menampilkan Seluruh Buku
const getAllBookHandler = (request, h) => {
    const response = h.response({
        status: 'success',
        data: {
            books: books.length > 0 
            ? books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })) : [],
        },
    });
    response.code(200);
    return response;
};

// Menampilkan Detail Keselurhan Buku
const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.find((b) => b.id === bookId);

    if (book){
        const response = h.response({
            status: 'success',
            data: {
                book: {
                    id: book.id,
                    name: book.name,
                    year: book.year,
                    author: book.author,
                    summary: book.summary,
                    publisher: book.publisher,
                    pageCount: book.pageCount,
                    readPage: book.readPage,
                    finished: book.finished,
                    reading: book.reading,
                    insertedAt: book.insertedAt,
                    updatedAt: book.updatedAt,
                },
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    
    response.code(404);
    return response;
};

// Mengubah Buku dengan Method PUT
const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
        const response = h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. Id tidak ditemukan",
        });
        response.code(404);
        return response;
    } else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    } else if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
        response.code(400);
        return response;
    }

        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };
        
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        });

        response.code(200);
        return response;
    };

// API Menghapus Data
const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success', 
            message: 'Buku berhasil dihapus',
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });

    response.code(404);
    return response;
};

module.exports = { addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler};