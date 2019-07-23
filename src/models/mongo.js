'use strict';

/**
 * 
 */
class Model {

  /**
   * 
   */
  constructor(schema) {
    this.schema = schema;
  }

  /**
   * jsonSchema method
   * does typeof check for functions
   * @param {*} _id
   * @returns whether or not it is a function   
   * @memberof Model
   */
  jsonSchema() {
    console.log(typeof this.schema.jsonSchema);
    return typeof this.schema.jsonSchema === 'function'
      ? this.schema.jsonSchema()
      : {};
  }

  /**
   * Get method
   * retrieve an object by ID if it exists in the database
   * @param {*} _id
   * @returns the object
   * @memberof Model
   */
  get(_id) {
    let queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }

  /**
   * Create method
   * creates a new record in database
   * @param {*} record
   * @returns new record
   * @memberof Model
   */
  create(record) {
    console.log('r',record);
    let newRecord = new this.schema(record);
    console.log('n', newRecord);
    return newRecord.save();
  }

  /**
   * Update method
   * finds the entry by ID and then updates it
   * @param {*} _id, record
   * @returns id, record, and if it is a new object
   * @memberof Model 
   */
  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
   * Delete method
   * finds the entry by ID and then deletes it from the database
   * @param {*} _id
   * @returns the ID of the deleted item
   * @memberof Model
   */
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }

}

module.exports = Model;
