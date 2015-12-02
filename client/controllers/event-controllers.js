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
          $scope.eventForm = {};
          //$scope.events.push({ 'eventName' : $scope.eventForm.eventName});
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);
