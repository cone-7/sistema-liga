(function () {
  'use strict';

  angular
    .module('regulation')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('topbar', {
    //   title: 'Reglamento',
    //   state: 'regulation',
    //   resolve: {
    //     aboutResolve: null
    //   },
    //   type: 'item',
    //   roles: ['*']
    // });

  }
}());
