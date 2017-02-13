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
          pageTitle: 'Statistics',
          visible: true
        }
      });
  }

}());
