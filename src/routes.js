const addBookHandler = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/src/books.js',
        handler: addBookHandler,
    },
];

module.exports = routes;