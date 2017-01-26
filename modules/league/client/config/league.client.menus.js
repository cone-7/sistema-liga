(function () {
  'use strict';

  angular
    .module('league')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('topbar', {
    //   title: 'Torneos',
    //   state: 'league',
    //   type: 'item',
    //   roles: ['*']
    // });

  }
}());
