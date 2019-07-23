'use strict';

const uuid = require('uuid/v4');

class Model {

  constructor() {
    this.database = [];
  }

  /**
   * Get method
   * takes an ID and then searches through the database for records whose ID matches, and returns as a promise that response
   * @param {*} id
   * @returns resolved promise
   * @memberof Model
   */
  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  /**
   * Create method
   * takes an entry, gives it a random ID, cleans the entry (removes illegal characters, etc), then pushes the entry into the database
   * @param {*} entry
   * @returns resolved promise
   * @memberof Model
   */
  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  /**
   * Update method
   * takes an entry and ID, cleans the entry, maps the database for a similar ID, and then if the ID matches, it updates the item with the record 
   * @param {*} id
   * @param {*} entry
   * @returns resolved promise
   * @memberof Model
   */
  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  /**
   * Delete method
   * takes in an ID, searches for the record with that ID, and then deletes it
   * @param {*} id
   * @returns resolved promise
   * @memberof Model
   */
  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  /**
   * Sanitize method
   * cleans the record, removes illegal characters from the record
   * @param {*} entry
   * @returns valid record
   * @memberof Model
   */
  sanitize(entry) {

    let valid = true;
    let record = {};
    let schema = this.schema();

    Object.keys(schema).forEach(field => {
      if (schema[field].required) {
        if (entry[field]) {
          record[field] = entry[field];
        } else {
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }

}

module.exports = Model;
