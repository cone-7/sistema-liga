(function () {
  'use strict';

  angular
    .module('teams.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('teams', {
        url: '/teams',
        templateUrl: '/modules/teams/client/views/view-teams.client.view.html',
        controller: 'TeamsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Teams'
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
