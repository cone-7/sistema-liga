(function () {
  'use strict';

  angular
    .module('players')
    .controller('PlayersController', PlayersController);

  PlayersController.$inject = ['$scope', 'Authentication'];

  function PlayersController($scope, players, Authentication) {
    var vm = this;

    vm.players = players;
    vm.authentication = Authentication;

  }
}());
