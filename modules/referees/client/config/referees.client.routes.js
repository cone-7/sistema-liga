(function () {
  'use strict';

  angular
    .module('referees.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('referees', {
        url: '/referees',
        templateUrl: '/modules/referees/client/views/view-referees.client.view.html',
        controller: 'RefereesController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Referees',
          visible: true
        }
      });
  }

  // getArticle.$inject = ['$stateParams', 'DirectiveService'];

  // function getArticle($stateParams, ArticlesService) {
  //   return ArticlesService.get({
  //     articleId: $stateParams.articleId
  //   }).$promise;
  // }
}());
