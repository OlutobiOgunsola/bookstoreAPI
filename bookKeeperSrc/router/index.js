const { Router } = require('express');

const BookStoreController = require('../controllers/BookStoreController');
/** Router
 *  @type BookStoreRouter
 *  @kind class
 *  @return {Object Router}
 */

module.exports = class BookStoreRouter extends BookStoreController {
  /** Initialize Constructor */
  constructor() {
    super();

    /** Router
     *  @type Router
     *  @kind Router
     *  @return Router
     */
    return Router()
      .get('/', (req, res, next) => {
        res.status(200).json({
          message: 'Welcome to bookstore',
        });
      })
      .get('/books', this.getAllBooks.bind(this))
      .get('/books/:id', this.getBookById.bind(this))
      .get('/books/collection/:collection', this.getBooksByCollection.bind(this))
      .post('/books/new', this.insertBook.bind(this))
      .put('/books/:id', this.editBookById.bind(this))
      .delete('/books/:id', this.deleteBook.bind(this));
  }
};
