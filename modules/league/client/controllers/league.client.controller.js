(function () {
  'use strict';

  angular
    .module('league')
    .controller('LeagueController', LeagueController);

  LeagueController.$inject = ['$scope', 'Authentication'];

  function LeagueController($scope, league, Authentication) {
    var vm = this;

    vm.league = league;
    vm.authentication = Authentication;

  }
}());
