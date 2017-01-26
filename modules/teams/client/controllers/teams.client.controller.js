(function () {
  'use strict';

  angular
    .module('teams')
    .controller('TeamsController', TeamsController);

  TeamsController.$inject = ['$scope', 'Authentication'];

  function TeamsController($scope, teams, Authentication) {
    var vm = this;

    vm.teams = teams;
    vm.authentication = Authentication;

  }
}());
