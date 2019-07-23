'use strict';

/**
 * error 404 middleware function
 * returns error: 'Resource Not Found' if route does not exist
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

module.exports = (req,res,next) => {
  let error = { error: 'Resource Not Found' };
  res.status(404).json(error).end();
};
