(function () {
  'use strict';

  angular
    .module('tournament.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tournament', {
        url: '/tournament',
        templateUrl: '/modules/tournament/client/views/view-tournament.client.view.html',
        controller: 'TournamentController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Role',
          visible: true
        }
      });
  }

}());
