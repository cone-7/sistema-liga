(function () {
  'use strict';

  angular
    .module('teams')
    .controller('TeamsController', TeamsController);

  TeamsController.$inject = ['$scope', '$state', '$window', 'teamResolve', 'Authentication', 'Notification', 'CategoriesService'];

  function TeamsController($scope, $state, $window, team, Authentication, Notification, CategoriesService) {
    var vm = this;

    vm.team = team;
    vm.categories = CategoriesService.query();
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.formatLabel = formatLabel;

    // Remove existing Categories
    function remove() {
      if ($window.confirm('¿Seguro de eliminar?')) {
        vm.team.$remove(function() {
          $state.go('teams.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Equipo borrado!' });
        });
      }
    }

    function formatLabel($model) {
      if (vm.categories.length === 0 && vm.team.categorie)
        return vm.team.categorie.title;
      else {
        for (var i = 0; i < vm.categories.length; i++) {
          if ($model === vm.categories[i]._id) {
            return vm.categories[i].title;
          }
        }
      }
    }

    // Save Team
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.teamForm');
        return false;
      }

      vm.team.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('teams.list');
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Acción exitosa!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> No se pudo guardar!' });
      }
    }
  }
}());
