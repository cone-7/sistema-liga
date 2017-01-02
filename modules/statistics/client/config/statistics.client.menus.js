(function () {
  'use strict';

  angular
    .module('statistics')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Estadisticas',
      state: 'statistics',
      resolve: {
        aboutResolve: null
      },
      type: 'dropdown',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'statistics', {
      title: 'Tabla General',
      state: 'statistics.table',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'statistics', {
      title: 'Sancionados',
      state: 'statistics.sanctioned',
      roles: ['*']
    });

  }
}());
