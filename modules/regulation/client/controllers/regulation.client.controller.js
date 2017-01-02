(function () {
  'use strict';

  angular
    .module('regulation')
    .controller('RegulationController', RegulationController);

  RegulationController.$inject = ['$scope', 'Authentication'];

  function RegulationController($scope, regulation, Authentication) {
    var vm = this;

    vm.regulation = regulation;
    vm.authentication = Authentication;

  }
}());
