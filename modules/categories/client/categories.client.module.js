(function (app) {
  'use strict';

  app.registerModule('categories', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  // app.registerModule('articles.admin', ['core.admin']);
  // app.registerModule('articles.admin.routes', ['core.admin.routes']);
  app.registerModule('categories.services');
  app.registerModule('categories.routes', ['ui.router', 'core.routes', 'categories.services', 'articles.services']);
}(ApplicationConfiguration));
