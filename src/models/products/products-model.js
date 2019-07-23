'use strict';

const Model = require('../mongo.js');
const schema = require('./products-schema.js');


/**
 * class Products 
 * extends from class Model in mongo.js
 * @class Products
 * @extends {Model}
 */

class Products extends Model {
  constructor() { super(schema); }
}

module.exports = Products;
