(function () {
  'use strict';

  describe('Categories Admin Controller Tests', function () {
    // Initialize global variables
    var CategoriesController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      CategoriesService,
      mockCategorie,
      Notification;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _CategoriesService_, _Notification_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      CategoriesService = _CategoriesService_;
      Notification = _Notification_;

      // Ignore parent template get on state transitions
      $httpBackend.whenGET('/modules/core/client/views/home.client.view.html').respond(200, '');

      // create mock categorie
      mockCategorie = new CategoriesService({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Article about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['admin']
      };

      // Initialize the Articles controller.
      CategoriesController = $controller('CategoriesController as vm', {
        $scope: $scope,
        categorieResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
      spyOn(Notification, 'error');
      spyOn(Notification, 'success');
    }));

    describe('vm.save() as create', function () {
      var sampleCategoriePostData;

      beforeEach(function () {
        // Create a sample article object
        sampleCategoriePostData = new CategoriesService({
          title: 'An Article about MEAN',
          content: 'MEAN rocks!'
        });

        $scope.vm.categorie = sampleCategoriePostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (CategoriesService) {
        // Set POST response
        $httpBackend.expectPOST('/api/categories', sampleCategoriePostData).respond(mockCategorie);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test Notification success was called
        expect(Notification.success).toHaveBeenCalledWith({ message: '<i class="glyphicon glyphicon-ok"></i> Categoria creada!' });
        // Test URL redirection after the article was created
        expect($state.go).toHaveBeenCalledWith('categories.list');
      }));

      it('should call Notification.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('/api/categories', sampleCategoriePostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect(Notification.error).toHaveBeenCalledWith({ message: errorMessage, title: '<i class="glyphicon glyphicon-remove"></i> No se pudo guardar!' });
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock article in $scope
        $scope.vm.categorie = mockCategorie;
      });

      it('should update a valid categorie', inject(function (CategoriesService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/categories\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test Notification success was called
        expect(Notification.success).toHaveBeenCalledWith({ message: '<i class="glyphicon glyphicon-ok"></i> Categoria creada!' });
        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('categories.list');
      }));

      it('should  call Notification.error if error', inject(function (CategoriesService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/categories\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect(Notification.error).toHaveBeenCalledWith({ message: errorMessage, title: '<i class="glyphicon glyphicon-remove"></i> No se pudo guardar!' });
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup articles
        $scope.vm.categorie = mockCategorie;
      });

      it('should delete the categorie and redirect to categorie', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/categories\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect(Notification.success).toHaveBeenCalledWith({ message: '<i class="glyphicon glyphicon-ok"></i> Categoria borrada!' });
        expect($state.go).toHaveBeenCalledWith('categories.list');
      });

      it('should should not delete the categorie and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
