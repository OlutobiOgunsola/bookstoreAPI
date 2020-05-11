/** Initialize Controller
 *  @type Controller
 *  @kind class
 *  @extends Phonebookmodel
 */

const BookStoreModel = require('../models/bookKeeperModel');

// Get All Books
// Get Books by Id
// Get Books by Collection
// Insert Book
// Search Book
// Edit Book
// Delete book by Id
// Delete book by collection
module.exports = class {
  /** Initialize database using constructor */
  constructor() {
    this.BookStoreDB = new BookStoreModel();
  }

  /** getAllBooks
   *  @param {Object} _req - the request object
   *  @param {Object} res - the response object
   *  @param {Object} _next - the next middleware in stack
   *  @returns the list of books in db
   */

  // eslint-disable-next-line require-jsdoc
  getAllBooks(_req, res, next) {
    /** Send books to the response via res object */
    this.BookStoreDB.select()
      .then(books => {
        res.status(200).json({
          message: 'Success, all books found',
          books,
        });
      })
      .catch(err => {
        res.status(400).json({
          message: 'An error has occured while fetching data',
          err,
        });
        next(err);
      });
  }

  /** getBookById
   *  @param {Object} req - the request object
   *  @param {Object} res - the response objejct
   *  @param {Object} next - the next middleware in stack
   *  @returns {Object} book - object
   */
  getBookById(req, res, next) {
    const { id } = req.params;
    /** Send book to response object */
    this.BookStoreDB.select(id)
      .then(book => {
        res.status(200).json({
          message: `Success, book ${book.title} found`,
          book,
        });
      })
      .catch(err => {
        res.status(400).json({
          message: `An error occured while fetching book`,
          err,
        });
        next(err);
      });
  }
  /** getBooksByCollection
   *  @param {Object} req - the request object
   *  @param {Object} res - the response object
   *  @param {Object} next - the next middleeware in stack
   *  @returns {Object} collection - book collection
   */

  // eslint-disable-next-line require-jsdoc
  getBooksByCollection(req, res, next) {
    /** Destructure collection from request object */
    const { collection } = req.params;
    /** Select books by collection
     */
    this.BookStoreDB.find(['collection'], collection, ['title', 'author', 'description'])
      .then(collectionfound => {
        res.status(200).json({
          message: `Collection found`,
          collectionfound,
        });
      })
      .catch(err =>
        res.status(400).json({
          message: `Collection not found`,
          err,
        }),
      );
  }

  /** insertBook
   *  @param {Object} req - the request object
   *  @param {Object} res - the response object
   *  @param {Object} next - the next middleware in stack
   *  @returns {Object} object - Book inserted into db
   */

  // eslint-disable-next-line require-jsdoc
  insertBook(req, res, next) {
    const book = req.body;
    /** Insert book into db */
    this.BookStoreDB.insert(book)
      .then(insertedBook => {
        res.status(200).json({
          message: `Book inserted successfully`,
          success: true,
          insertedBook,
        });
      })
      .catch(next);
    // .then(
    //   this.BookStoreDB.select().then(allBooks => {
    //     res.status(200).json({
    //       success: true,
    //       message: 'List of books after new book insert',
    //       allBooks,
    //     });
    //   }),
    // )
    // .catch(err => {
    //   res.status(400).json({
    //     message: `An error occured while trying to get all books after successfully inserting new book`,
    //     err,
    //   });
    //   next(err);
    // });
  }

  /** editBook
   *  @param {Object} req - the request object
   *  @param {Object} res - the response object
   *  @param {Object} next - the next object
   *  @returns {Object} editedBook - the book edited by id
   */
  editBookById(req, res, next) {
    const { id } = Number.parseInt(req.params);
    const update = req.body;
    this.BookStoreDB.updateById(id, update)
      .then(updatedBook => {
        res.status(200).json({
          success: true,
          message: `Book ${id} updated`,
          updatedBook,
        });
      })
      .catch(next);
  }
  /** deleteBook
   *  @param {Object} req - the request object
   *  @param {Object} res - the response object
   *  @param {Object} next - the next object
   *  @returns {Object} allBooks - the new book db
   */

  deleteBook(req, res, next) {
    const { id } = Number.parseInt(req.params.id);
    this.BookStoreDB.deleteById(id)
      .then(remainingBooks => {
        res.status(200).json({
          success: true,
          message: `Deleted book ${id}`,
          remainingBooks,
        });
      })
      .catch(next);
  }
};
