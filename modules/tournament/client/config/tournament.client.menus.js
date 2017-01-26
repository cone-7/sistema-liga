(function () {
  'use strict';

  angular
    .module('tournament')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
