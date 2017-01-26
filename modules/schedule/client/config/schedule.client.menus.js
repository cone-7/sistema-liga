(function () {
  'use strict';

  angular
    .module('schedule')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Rol de juegos',
      state: 'schedule',
      type: 'item',
      roles: ['visit']
    });

  }
}());
