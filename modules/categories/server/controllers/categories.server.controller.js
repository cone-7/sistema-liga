'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Categorie = mongoose.model('Categorie'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an categorie
 */
exports.create = function (req, res) {
  var categorie = new Categorie(req.body);
  categorie.user = req.user;
  console.log('categorie');
  categorie.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(categorie);
    }
  });
};

/**
 * Show the current categorie
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var categorie = req.categorie ? req.categorie.toJSON() : {};

  res.json(categorie);
};

/**
 * Update an categorie
 */
exports.update = function (req, res) {
  var categorie = req.categorie;

  categorie.title = req.body.title;
  categorie.content = req.body.content;

  categorie.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(categorie);
    }
  });
};

/**
 * Delete an categorie
 */
exports.delete = function (req, res) {
  var categorie = req.categorie;

  categorie.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(categorie);
    }
  });
};

/**
 * List of Categories
 */
exports.list = function (req, res) {
  Categorie.find().sort('-created').populate('user', 'displayName').exec(function (err, categorie) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(categorie);
    }
  });
};

/**
 * Categorie middleware
 */
exports.categorieByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Categorie is invalid'
    });
  }

  Categorie.findById(id).populate('user', 'displayName').exec(function (err, categorie) {
    if (err) {
      return next(err);
    } else if (!categorie) {
      return res.status(404).send({
        message: 'No categorie with that identifier has been found'
      });
    }
    req.categorie = categorie;
    next();
  });
};
