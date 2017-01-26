(function () {
  'use strict';

  angular
    .module('regulation.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('regulation', {
        url: '/regulation',
        templateUrl: '/modules/regulation/client/views/view-regulation.cliente.view.html',
        controller: 'RegulationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Regulation',
          visible: true
        }
      });
  }
}());
