(function (app) {
  'use strict';

  app.registerModule('teams', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  // app.registerModule('articles.admin', ['core.admin']);
  // app.registerModule('articles.admin.routes', ['core.admin.routes']);
  app.registerModule('teams.services');
  app.registerModule('teams.routes', ['ui.router', 'core.routes', 'teams.services']);
}(ApplicationConfiguration));
