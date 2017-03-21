(function () {
  'use strict';

  angular
    .module('categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$scope', '$state', '$window', 'categorieResolve', 'Authentication', 'Notification'];

  function CategoriesController($scope, $state, $window, categorie, Authentication, Notification) {
    var vm = this;

    vm.categorie = categorie;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Categories
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.categorie.$remove(function() {
          $state.go('categories.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Categoria borrada!' });
        });
      }
    }

    // Save Categorie
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.categorieForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.categorie.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('categories.list'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Categoria creada!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> No se pudo guardar!' });
      }
    }
  }
}());
