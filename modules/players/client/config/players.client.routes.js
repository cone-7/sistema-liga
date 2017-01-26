(function () {
  'use strict';

  angular
    .module('players.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('players', {
        url: '/players',
        templateUrl: '/modules/players/client/views/view-players.cliente.view.html',
        controller: 'PlayersController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Players',
          visible: true
        }
      });
  }
}());
