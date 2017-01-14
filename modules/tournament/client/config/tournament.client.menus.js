(function () {
  'use strict';

  angular
    .module('tournament')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Torneos',
      state: 'tournament',
      type: 'item',
      roles: ['*']
    });

  }
}());
