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
      EventService.addEvent($scope.eventForm.eventName, $scope.eventForm.eventDate)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.events.push({ 'eventName' : $scope.eventForm.eventName});
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

    $scope.removeEvent = function (eventName) {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      EventService.removeEvent(eventName)
        // handle success
        .then(function () {
          $location.path('/');
          $scope.disabled = false;
          $scope.events.splice( $scope.events.indexOf(eventName), 1 );
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Error: event could not be removed";
          $scope.disabled = false;
        });

    };

    $scope.goToEvent = function (eventName) {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      EventService.getEventDetails(eventName)
        // handle success
        .then(function (eventData) {
          $location.path('/event/' + eventName);
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Error: event page could not be retrieved";
          $scope.disabled = false;
        });

    };

}]);

angular.module('myApp').controller('eventPageController',
  ['$scope', '$location', '$routeParams', 'EventService',
  function ($scope, $location, $routeParams, EventService) {
    EventService.getEventDetails($routeParams.eventName)
      .then(function (eventData) {
        $scope.eventData = eventData;
      })
      .catch(function () {
        $scope.error = true;
        $scope.errorMessage = "Unable to retrieve data for this event";
        $scope.disabled = false;
      });

}]);
