(function () {
  'use strict';

  angular
    .module('about')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Acerca de',
      state: 'about',
      resolve: {
        aboutResolve: null
      },
      type: 'dropdown',
      roles: ['visit']
    });

    menuService.addSubMenuItem('topbar', 'about', {
      title: 'Historia',
      state: 'about.history',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'about', {
      title: 'Directiva',
      state: 'about.directiva',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'about', {
      title: 'Valores',
      state: 'about.valores',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'about', {
      title: 'Reglamento',
      state: 'about.regulation',
      roles: ['*']
    });

  }
}());
