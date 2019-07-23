'use strict';

const Model = require('../mongo.js');
const schema = require('./categories-schema.js');


/**
 * class Categories
 * extends from class Model in mongo.js
 * @class Categories
 * @extends {Model}
 */
class Categories extends Model {
  constructor() { super(schema); }
}

module.exports = Categories;
