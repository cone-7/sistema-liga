(function () {
  'use strict';

  angular
    .module('schedule.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('schedule', {
        url: '/schedule',
        templateUrl: '/modules/schedule/client/views/view-schedule.client.view.html',
        controller: 'ScheduleController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Role',
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
