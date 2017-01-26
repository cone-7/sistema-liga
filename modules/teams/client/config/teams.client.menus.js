(function () {
  'use strict';

  angular
    .module('teams')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('topbar', {
    //   title: 'Equipos',
    //   state: 'teams',
    //   resolve: {
    //     aboutResolve: null
    //   },
    //   type: 'item',
    //   roles: ['admin']
    // });

    // menuService.addSubMenuItem('topbar', 'teams', {
    //   title: 'Tabla General',
    //   state: 'teams.table',
    //   roles: ['*']
    // });

    // menuService.addSubMenuItem('topbar', 'teams', {
    //   title: 'Sancionados',
    //   state: 'teams.sanctioned',
    //   roles: ['*']
    // });

  }
}());
