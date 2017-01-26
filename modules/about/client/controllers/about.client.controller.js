(function () {
  'use strict';

  angular
    .module('about')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope', 'Authentication'];

  function AboutController($scope, about, Authentication) {
    var vm = this;

    vm.about = about;
    vm.authentication = Authentication;

  }
}());
