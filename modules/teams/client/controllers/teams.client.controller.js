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
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.team.$remove(function() {
          $state.go('teams.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Categoria borrada!' });
        });
      }
    }

    function formatLabel($model) {
      if(vm.categories.length===0 && vm.team.categorie)
        return vm.team.categorie.title;
      else {
        for (var i=0; i< vm.categories.length; i++) {
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

      // Create a new article, or update the current instance
      console.log('aaaaaaaa');
      console.log(vm.team.categorie);
      console.log(vm.team.name);
      console.log(vm.team);
      vm.team.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('teams.list'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Categoria creada!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> No se pudo guardar!' });
      }
    }
  }
}());
