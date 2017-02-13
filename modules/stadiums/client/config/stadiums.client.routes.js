(function () {
  'use strict';

  angular
    .module('stadiums.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('stadiums', {
        url: '/stadiums',
        templateUrl: '/modules/stadiums/client/views/view-stadiums.client.view.html',
        controller: 'StadiumsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Stadiums',
          visible: true
        }
      });
  }
}());
