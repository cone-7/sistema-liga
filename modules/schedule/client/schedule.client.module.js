(function (app) {
  'use strict';

  app.registerModule('schedule', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('schedule.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
