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
        template: '<ui-view/>',
        data: {
          visible: true
        }
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
        },
        resolve: {
          categorieResolve: getCategorie
        }
      })
      .state('categories.create', {
        url: '/create',
        templateUrl: '/modules/categories/client/views/form-categories.html',
        controller: 'CategoriesController',
        controllerAs: 'vm',
        resolve: {
          categorieResolve: newCategorie
        },
        data: {
          roles: ['admin']
        }
      });
  }

  getCategorie.$inject = ['$stateParams', 'CategoriesService'];

  function getCategorie($stateParams, CategoriesService) {
    return CategoriesService.get({
      categorieId: $stateParams.categorieId
    }).$promise;
  }

  newCategorie.$inject = ['CategoriesService'];

  function newCategorie(CategoriesService) {
    return new CategoriesService();
  }
}());
