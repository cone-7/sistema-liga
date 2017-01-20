(function () {
  'use strict';

  angular
    .module('teams')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Equipos',
      state: 'teams.list',
      resolve: {
        aboutResolve: null
      },
      type: 'item',
      roles: ['admin']
    });
  }
}());
