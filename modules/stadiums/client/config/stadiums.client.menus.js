(function () {
  'use strict';

  angular
    .module('stadiums')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Estadios',
      state: 'stadiums',
      resolve: {
        aboutResolve: null
      },
      type: 'item',
      roles: ['visit']
    });

    // menuService.addSubMenuItem('topbar', 'stadiums', {
    //   title: 'Tabla General',
    //   state: 'stadiums.table',
    //   roles: ['*']
    // });

    // menuService.addSubMenuItem('topbar', 'stadiums', {
    //   title: 'Sancionados',
    //   state: 'stadiums.sanctioned',
    //   roles: ['*']
    // });

  }
}());
