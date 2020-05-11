'use strict';

const BookKeeperModel = require('../../lib/JSONDatabase/index');

const Schema = {
  title: 'string',
  author: 'string',
  collection: 'string',
  description: 'string',
};

/** Initialize model for bookkeeper
 *  @type Model
 *  @kind Class
 *  @extends BookKeeperModel
 */

module.exports = class Model extends BookKeeperModel {
  /** Initialize constructor */
  constructor() {
    super('BookStore', Schema);
  }
};
