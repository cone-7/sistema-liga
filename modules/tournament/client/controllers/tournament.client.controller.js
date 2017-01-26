(function () {
  'use strict';

  angular
    .module('tournament')
    .controller('TournamentController', TournamentController);

  TournamentController.$inject = ['$scope', 'Authentication'];

  function TournamentController($scope, tournament, Authentication) {
    var vm = this;

    vm.tournament = tournament;
    vm.authentication = Authentication;

  }
}());
