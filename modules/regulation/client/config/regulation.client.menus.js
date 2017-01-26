(function () {
  'use strict';

  angular
    .module('regulation')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    
  }
}());
