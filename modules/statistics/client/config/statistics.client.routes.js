(function () {
  'use strict';

  angular
    .module('statistics.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('statistics', {
        url: '/statistics',
        templateUrl: '/modules/statistics/client/views/view-statistics.client.view.html',
        controller: 'StatisticsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Statistics'
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
