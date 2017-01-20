(function () {
  'use strict';

  angular
    .module('teams.routes')
    .config(routeConfig);

  function routeConfig($stateProvider) {
    $stateProvider
      .state('teams', {
        abstract: true,
        url: '/teams',
        template: '<ui-view/>'
      })
      .state('teams.list', {
        url: '',
        templateUrl: '/modules/teams/client/views/list-teams.html',
        controller: 'TeamsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Teams'
        }
      })
      .state('teams.edit', {
        url: '/:teamId/edit',
        templateUrl: '/modules/teams/client/views/form-teams.html',
        controller: 'TeamsController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          teamResolve: getTeam
        }
      })
      .state('teams.create', {
        url: '/create',
        templateUrl: '/modules/teams/client/views/form-teams.html',
        controller: 'TeamsController',
        controllerAs: 'vm',
        resolve: {
          teamResolve: newTeam
        },
        data: {
          roles: ['admin']
        }
      });
  }

  getTeam.$inject = ['$stateParams', 'TeamsService'];

  function getTeam($stateParams, TeamsService) {
    return TeamsService.get({
      teamId: $stateParams.teamId
    }).$promise;
  }

  newTeam.$inject = ['TeamsService'];

  function newTeam(TeamsService) {
    return new TeamsService();
  }
}());
