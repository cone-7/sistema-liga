(function (app) {
  'use strict';

  app.registerModule('statistics', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('statistics.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
