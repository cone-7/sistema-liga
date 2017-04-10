(function () {
  'use strict';

  describe('Teams Admin Controller Tests', function () {
    // Initialize global variables
    var TeamsController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      TeamsService,
      CategoriesService,
      mockTeam,
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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _TeamsService_, _Notification_, _CategoriesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      TeamsService = _TeamsService_;
      Notification = _Notification_;
      CategoriesService = _CategoriesService_;

      // Ignore parent template get on state transitions
      $httpBackend.whenGET('/modules/core/client/views/home.client.view.html').respond(200, '');

      // create mock team
      // mockCategorie = new CategoriesService({
      //   _id: '515a8422f6d0f87f0e407a33',
      //   title: 'An Article about MEAN',
      //   content: 'MEAN rocks!'
      // });

      mockCategorie = [
        '515a8422f6d0f87f0e407a33', 'SD', 'ASD'
      ];

      mockTeam = new TeamsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'An Article about MEAN'
      });

      // mockTeam.categorie = mockCategorie._id;

      // Mock logged in user
      Authentication.user = {
        roles: ['admin']
      };

      // Initialize the Articles controller.
      TeamsController = $controller('TeamsController as vm', {
        $scope: $scope,
        teamResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
      spyOn(Notification, 'error');
      spyOn(Notification, 'success');
    }));

    describe('vm.save() as create', function () {
      var sampleTeamPostData;

      beforeEach(function () {
        // Create a sample article object
        sampleTeamPostData = new TeamsService({
          name: 'Test',
          content: 'MEAN rocks!'
        });

        $scope.vm.team = sampleTeamPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (TeamsService) {
        // Set POST response
        $httpBackend.expectGET('/api/categories');
        $httpBackend.when('GET', '/api/categories').respond(mockCategorie);
        $httpBackend.expectPOST('/api/teams', sampleTeamPostData).respond(mockTeam);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test Notification success was called
        expect(Notification.success).toHaveBeenCalledWith({ message: '<i class="glyphicon glyphicon-ok"></i> Acción exitosa!' });
        // Test URL redirection after the article was created
        expect($state.go).toHaveBeenCalledWith('teams.list');
      }));

      it('should call Notification.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectGET('/api/categories').respond(mockCategorie);
        $httpBackend.expectPOST('/api/teams', sampleTeamPostData).respond(400, {
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
        $scope.vm.team = mockTeam;
      });

      it('should update a valid team', inject(function (TeamsService) {
        // Set PUT response
        $httpBackend.expectGET('/api/categories').respond(mockCategorie);
        $httpBackend.expectPUT(/api\/teams\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test Notification success was called
        expect(Notification.success).toHaveBeenCalledWith({ message: '<i class="glyphicon glyphicon-ok"></i> Acción exitosa!' });
        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('teams.list');
      }));

      it('should  call Notification.error if error', inject(function (TeamsService) {
        var errorMessage = 'error';
        $httpBackend.expectGET('/api/categories').respond(mockCategorie);
        $httpBackend.expectPUT(/api\/teams\/([0-9a-fA-F]{24})$/).respond(400, {
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
        $scope.vm.team = mockTeam;
      });

      it('should delete the team and redirect to team', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectGET('/api/categories').respond(mockCategorie);
        $httpBackend.expectDELETE(/api\/teams\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect(Notification.success).toHaveBeenCalledWith({ message: '<i class="glyphicon glyphicon-ok"></i> Equipo borrado!' });
        expect($state.go).toHaveBeenCalledWith('teams.list');
      });

      it('should should not delete the team and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
