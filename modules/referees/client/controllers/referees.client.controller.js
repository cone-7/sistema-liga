(function () {
  'use strict';

  angular
    .module('referees')
    .controller('RefereesController', RefereesController);

  RefereesController.$inject = ['$scope', 'Authentication'];

  function RefereesController($scope, referees, Authentication) {
    var vm = this;

    vm.referees = referees;
    vm.authentication = Authentication;

  }
}());
