'use strict';

/**
 * Module dependencies
 */
var categoriesPolicy = require('../policies/categories.server.policy'),
  categories = require('../controllers/categories.server.controller');

module.exports = function (app) {
  // Categories collection routes
  app.route('/api/categories').all(categoriesPolicy.isAllowed)
    .get(categories.list)
    .post(categories.create);

  // Single categorie routes
  app.route('/api/categories/:categorieId').all(categoriesPolicy.isAllowed)
    .get(categories.read)
    .put(categories.update)
    .delete(categories.delete);

  // Finish by binding the categorie middleware
  app.param('categorieId', categories.categorieByID);
};
