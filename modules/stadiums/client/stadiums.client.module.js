(function (app) {
  'use strict';

  app.registerModule('stadiums', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('stadiums.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
