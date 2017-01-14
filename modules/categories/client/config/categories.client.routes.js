(function () {
  'use strict';

  angular
    .module('categories.routes')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('categories', {
        abstract: true,
        url: '/categories',
        template: '<ui-view/>'
      })
      .state('categories.list', {
        url: '',
        templateUrl: '/modules/categories/client/views/list-categories.html',
        controller: 'CategoriesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Categories'
        }
      })
      .state('categories.edit', {
        url: '/:categorieId/edit',
        templateUrl: '/modules/categories/client/views/form-categories.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('categories.create', {
        url: '/create',
        templateUrl: '/modules/categories/client/views/form-categories.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      });
  }
}());
