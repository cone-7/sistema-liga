(function () {
  'use strict';

  angular
    .module('referees')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Arbitros',
      state: 'referees',
      resolve: {
        aboutResolve: null
      },
      type: 'item',
      roles: ['admin']
    });

    // menuService.addSubMenuItem('topbar', 'referees', {
    //   title: 'Tabla General',
    //   state: 'referees.table',
    //   roles: ['*']
    // });

    // menuService.addSubMenuItem('topbar', 'referees', {
    //   title: 'Sancionados',
    //   state: 'referees.sanctioned',
    //   roles: ['*']
    // });

  }
}());
