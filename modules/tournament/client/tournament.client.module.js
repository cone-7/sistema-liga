(function (app) {
  'use strict';

  app.registerModule('tournament', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('tournament.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
