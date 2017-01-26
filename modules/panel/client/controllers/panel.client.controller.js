(function () {
  'use strict';

  angular
    .module('panel')
    .controller('PanelController', PanelController);

  PanelController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function PanelController($scope, $state, panel, Authentication, menuService) {
    var vm = this;

    vm.panel = panel;
    vm.authentication = Authentication;

    var state = "";
    var states = $state.get();
    vm.stateToShow = [];
    for(state in states)
      if (states[state].data)
        if (states[state].data.visible && states[state].name.indexOf('.') === -1 && states[state].name!=='settings')
          vm.stateToShow.push(states[state].name)
          //console.log(states[state].name.indexOf('.'));


  }
}());
