const { addBookHandler, getAllBooksHandler, getBooksByIdHandler } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/src/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/src/books',
        handler: getAllBooksHandler, 
    },
    {
        method: 'GET',
        path: '/src/books/{id}',
        handler: getBooksByIdHandler,
    },
];

module.exports = routes;