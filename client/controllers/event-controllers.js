angular.module('myApp').controller('eventController',
  ['$scope', '$location', 'EventService',
  function ($scope, $location, EventService) {
    EventService.getEvents()
      .then(function (value) {
        $scope.events = value;
      })
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Unable to retrieve event list";
        $scope.disabled = false;
      });

    $scope.date = new Date();

    $scope.addEvent = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      EventService.addEvent($scope.eventForm)
        // handle success
        .then(function () {
          $location.path('/overview');
          $scope.disabled = false;
          $scope.events.push($scope.eventForm);
          $scope.eventForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Error: event could not be added";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

      };

    $scope.goToEvent = function (name) {

      // initial values
      $scope.error = false;
      $scope.disabled = true;
      $location.path('/eventPage/' + name);
    };

}]);

angular.module('myApp').controller('eventPageController',
  ['$scope', '$location', '$routeParams', 'EventService',
  function ($scope, $location, $routeParams, EventService) {
    EventService.getEventDetails($routeParams.name)
      .then(function (eventData) {
        $scope.event = eventData;
      })
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Unable to retrieve data for this event";
        $scope.disabled = false;
      });

      $scope.removeEvent = function (name) {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call register from service
        EventService.removeEvent(name)
          // handle success
          .then(function () {
            $location.path('/overview');
            $scope.disabled = false;
          })
          // handle error
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Error: event could not be removed";
            $scope.disabled = false;
          });

      };

}]);
