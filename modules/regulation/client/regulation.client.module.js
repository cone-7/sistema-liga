(function (app) {
  'use strict';

  app.registerModule('regulation', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('regulation.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
