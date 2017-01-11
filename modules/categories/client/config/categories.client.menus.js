(function () {
  'use strict';

  angular
    .module('categories')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Categorias',
      state: 'categories.list',
      resolve: {
        aboutResolve: null
      },
      type: 'item',
      roles: ['admin']
    });

  }
}());
