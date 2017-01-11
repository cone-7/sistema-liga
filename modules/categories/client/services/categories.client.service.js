(function () {
  'use strict';

  angular
    .module('categories.services')
    .factory('CategoriesService', CategoriesService);

  CategoriesService.$inject = ['$resource', '$log'];

  function CategoriesService($resource, $log) {
    var Categorie = $resource('/api/categories/:categorieId', {
      categorieId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Categorie.prototype, {
      createOrUpdate: function () {
        var categorie = this;
        return createOrUpdate(categorie);
      }
    });

    return Categorie;

    function createOrUpdate(categorie) {
      if (categorie._id) {
        return categorie.$update(onSuccess, onError);
      } else {
        return categorie.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(categorie) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
