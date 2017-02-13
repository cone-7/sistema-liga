(function () {
  'use strict';

  angular
    .module('stadiums')
    .controller('StadiumsController', StadiumsController);

  StadiumsController.$inject = ['$scope', 'Authentication'];

  function StadiumsController($scope, stadiums, Authentication) {
    var vm = this;

    vm.stadiums = stadiums;
    vm.authentication = Authentication;

  }
}());
