const { addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/src/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/src/books',
        handler: getAllBookHandler,
    },
    {
        method: 'GET',
        path: '/src/books/{bookId}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/src/books/{bookId}',
        handler: editBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/src/books/{bookId}',
        handler: deleteBookByIdHandler,
    },
];

module.exports = routes;