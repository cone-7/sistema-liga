(function () {
  'use strict';

  angular
    .module('panel')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Gestion',
      state: 'panel',
      resolve: {
        aboutResolve: null
      },
      type: 'item',
      roles: ['admin']
    });

  }
}());
