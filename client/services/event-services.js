angular.module('myApp').factory('EventService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    //define functions
    function addEvent(eventName, eventDate) {
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/event/add', {eventName: eventName, eventDate: eventDate})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }

    function getEvents() {
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('event/get')
        .success(function (data, status) {
          if(status === 200){ //&& data.status
            deferred.resolve(data);
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      return deferred.promise;
    }

    // return available functions for use in controllers
    return ({
      addEvent: addEvent,
      getEvents: getEvents
    });
}]);
