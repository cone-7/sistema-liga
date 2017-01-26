(function () {
  'use strict';

  angular
    .module('league.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('league', {
        url: '/league',
        templateUrl: '/modules/league/client/views/view-league.client.view.html',
        controller: 'LeagueController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Role',
          visible: true
        }
      });
  }
}());
