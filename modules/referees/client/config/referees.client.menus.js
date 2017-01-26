(function () {
  'use strict';

  angular
    .module('referees')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

  }
}());
