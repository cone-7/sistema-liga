(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('topbar', {
    //   title: 'Directiva',
    //   state: 'directiva',
    //   type: 'item',
    //   roles: ['*']
    // });

    // menuService.addMenuItem('topbar', {
    //   title: 'Afiliate',
    //   state: 'Afiliate',
    //   roles: ['*']
    // });

    // menuService.addMenuItem('topbar', {
    //   title: 'Estatus',
    //   state: 'estatus',
    //   roles: ['*']
    // });

    // menuService.addMenuItem('topbar', {
    //   title: 'Valores',
    //   state: 'valores',
    //   roles: ['*']
    // });

    // menuService.addMenuItem('topbar', {
    //   title: 'Historia',
    //   state: 'historia',
    //   roles: ['*']
    // });

    // menuService.addMenuItem('topbar', {
    //   title: 'Rol de juegos',
    //   state: 'rol',
    //   roles: ['*']
    // });

    // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'directiva', {
    //   title: 'List Articles',
    //   state: 'articles.list',
    //   roles: ['*']
    // });
  }
}());
