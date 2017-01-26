(function () {
  'use strict';

  angular
    .module('panel.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('panel', {
        url: '/panel',
        templateUrl: '/modules/panel/client/views/view-panel.client.view.html',
        controller: 'PanelController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Panel'
        }
      });
  }
}());
