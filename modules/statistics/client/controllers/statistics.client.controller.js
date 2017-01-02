(function () {
  'use strict';

  angular
    .module('statistics')
    .controller('StatisticsController', StatisticsController);

  StatisticsController.$inject = ['$scope', 'Authentication'];

  function StatisticsController($scope, statistics, Authentication) {
    var vm = this;

    vm.statistics = statistics;
    vm.authentication = Authentication;

  }
}());
