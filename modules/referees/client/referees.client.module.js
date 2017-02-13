(function (app) {
  'use strict';

  app.registerModule('referees', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('referees.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
