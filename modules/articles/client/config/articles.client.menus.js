(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'directiva', {
      title: 'List Articles',
      state: 'articles.list',
      roles: ['*']
    });
  }
}());
