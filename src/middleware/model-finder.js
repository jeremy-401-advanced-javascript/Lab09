'use strict';
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);

const modelsFolder = `${__dirname}/../models`;

/**
 * Load function
 * this function finds the model  
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const load = (req,res,next) => {
  let modelName = req.params.model.replace(/[^a-z0-9-_]/gi, '');
  const Model = require(`../models/${modelName}/${modelName}-model.js`);
  req.model = new Model();
  next();
};

/**
 * List function
 * reads the Models folder, filters the contents, and checks if it's a directory
 * @returns the folder with the model in it
 */
const list = () => {
  return readdir(modelsFolder)
    .then(contents =>
      contents.filter((entry) =>
        fs.lstatSync(`${modelsFolder}/${entry}`).isDirectory() && fs.statSync(`${modelsFolder}/${entry}/${entry}-model.js`)
      )
    )
    .catch(console.error);
};

module.exports = {load,list};
