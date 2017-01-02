(function () {
  'use strict';

  angular
    .module('schedule')
    .controller('ScheduleController', ScheduleController);

  ScheduleController.$inject = ['$scope', 'Authentication'];

  function ScheduleController($scope, schedule, Authentication) {
    var vm = this;

    vm.schedule = schedule;
    vm.authentication = Authentication;

  }
}());
