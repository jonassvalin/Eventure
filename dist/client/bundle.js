(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

angular.module('myApp').controller('eventController', ['$scope', '$location', 'EventService', function ($scope, $location, EventService) {
  EventService.getEvents().then(function (value) {
    $scope.events = value;
  }).catch(function () {
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

angular.module('myApp').controller('eventPageController', ['$scope', '$location', '$routeParams', 'EventService', function ($scope, $location, $routeParams, EventService) {
  EventService.getEventDetails($routeParams.name).then(function (eventData) {
    $scope.event = eventData;
  }).catch(function () {
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

},{}],2:[function(require,module,exports){
"use strict";

angular.module('myApp').controller('loginController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

  console.log(AuthService.getUserStatus());

  $scope.login = function () {

    // initial values
    $scope.error = false;
    $scope.disabled = true;

    // call login from service
    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
    // handle success
    .then(function () {
      $location.path('/overview');
      $scope.disabled = false;
      $scope.loginForm = {};
    })
    // handle error
    .catch(function () {
      $scope.error = true;
      $scope.errorMessage = "Invalid username and/or password";
      $scope.disabled = false;
      $scope.loginForm = {};
    });
  };

  $scope.register = function () {
    $location.path('/register');
  };
}]);

angular.module('myApp').controller('registerController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

  console.log(AuthService.getUserStatus());

  $scope.register = function () {

    // initial values
    $scope.error = false;
    $scope.disabled = true;

    // call register from service
    AuthService.register($scope.registerForm)
    // handle success
    .then(function () {
      $location.path('/login');
      $scope.disabled = false;
      $scope.registerForm = {};
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

angular.module('myApp').controller('sideBarController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

  AuthService.getUserDetails()
  // handle success
  .then(function (data) {
    $scope.userData = data;
    $scope.disabled = false;
  })
  // handle error
  .catch(function (data) {
    $scope.error = true;
    $scope.errorMessage = "Something went wrong!";
    $scope.disabled = false;
  });

  $scope.getClass = function (path) {
    if ($location.path().substr(0, path.length) === path) {
      return 'active';
    } else {
      return '';
    }
  };

  $scope.logout = function () {

    $scope.error = false;
    $scope.disabled = true;

    // call logout from service
    AuthService.logout().then(function () {
      $location.path('/login');
    });
  };
}]);

angular.module('myApp').controller('settingsController', ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

  // insert settings controller stuf

}]);

},{}],3:[function(require,module,exports){
"use strict";
/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
 */

angular.module('myApp').directive('ngReallyClick', [function () {
    return {
        restrict: 'A',
        link: function link(scope, element, attrs) {
            element.bind('click', function () {
                var message = attrs.ngReallyMessage;
                if (message && confirm(message)) {
                    scope.$apply(attrs.ngReallyClick);
                }
            });
        }
    };
}]);

},{}],4:[function(require,module,exports){
"use strict";

require('./main.js');
require('./services/auth-services.js');
require('./services/event-services.js');
require('./controllers/user-controllers.js');
require('./controllers/event-controllers.js');
require('./directives/ng-really.js');

},{"./controllers/event-controllers.js":1,"./controllers/user-controllers.js":2,"./directives/ng-really.js":3,"./main.js":5,"./services/auth-services.js":6,"./services/event-services.js":7}],5:[function(require,module,exports){
"use strict";

var myApp = angular.module('myApp', ['ngRoute']);

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && AuthService.isLoggedIn() === false) {
      $location.path('/login');
      $route.reload();
    }
  });
});

myApp.config(function ($routeProvider) {
  $routeProvider.when('/overview', {
    templateUrl: 'views/pages/overview.html',
    controller: 'eventController',
    access: { restricted: true }
  }).when('/login', {
    templateUrl: 'views/pages/login.html',
    controller: 'loginController',
    access: { restricted: false }
  }).when('/logout', {
    controller: 'logoutController',
    access: { restricted: true }
  }).when('/register', {
    templateUrl: 'views/pages/register.html',
    controller: 'registerController',
    access: { restricted: false }
  }).when('/eventPage/:name', {
    templateUrl: 'views/pages/event.html',
    controller: 'eventPageController',
    access: { restricted: true }
  }).when('/settings', {
    templateUrl: 'views/pages/settings.html',
    controller: 'settingsController',
    access: { restricted: true }
  }).otherwise({ redirectTo: '/login' });
});

},{}],6:[function(require,module,exports){
"use strict";

angular.module('myApp').factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

  // create user variable
  var user = null;

  //define functions
  function isLoggedIn() {
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  function getUserStatus() {
    return user;
  }

  function getUserDetails() {
    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.get('/user/userInfo')
    // handle success
    .success(function (data, status) {
      if (status === 200) {
        deferred.resolve(data);
      } else {
        deferred.reject(data);
      }
    })
    // handle error
    .error(function (data) {
      deferred.reject(data);
    });

    // return promise object
    return deferred.promise;
  }

  function login(username, password) {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/user/login', { username: username, password: password })
    // handle success
    .success(function (data, status) {
      if (status === 200 && data.status) {
        user = true;
        deferred.resolve();
      } else {
        user = false;
        deferred.reject();
      }
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

    // return promise object
    return deferred.promise;
  }

  function logout() {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a get request to the server
    $http.get('/user/logout')
    // handle success
    .success(function (data) {
      user = false;
      deferred.resolve();
    })
    // handle error
    .error(function (data) {
      user = false;
      deferred.reject();
    });

    // return promise object
    return deferred.promise;
  }

  function register(registerForm) {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/user/register', registerForm)
    // handle success
    .success(function (data, status) {
      if (status === 200 && data.status) {
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

  // return available functions for use in controllers
  return {
    isLoggedIn: isLoggedIn,
    getUserStatus: getUserStatus,
    getUserDetails: getUserDetails,
    login: login,
    logout: logout,
    register: register
  };
}]);

},{}],7:[function(require,module,exports){
"use strict";

angular.module('myApp').factory('EventService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

  //define functions
  function addEvent(eventForm) {
    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post('/event', eventForm)
    // handle success
    .success(function (data, status) {
      if (status === 200 && data.status) {
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

  function removeEvent(name) {
    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.delete('/event/' + name)
    // handle success
    .success(function (data, status) {
      if (status === 200) {
        deferred.resolve(data);
      } else {
        deferred.reject();
      }
    })
    // handle error
    .error(function (status) {
      deferred.reject();
    });

    // return promise object
    return deferred.promise;
  }

  function getEvents() {
    // create a new instance of deferred
    var deferred = $q.defer();

    // send a get request to the server
    $http.get('event').success(function (data, status) {
      if (status === 200) {
        //&& data.status
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

  function getEventDetails(name) {
    // create a new instance of deferred
    var deferred = $q.defer();

    // send a get request to the server

    $http.get('event/' + name).success(function (data, status) {
      if (status === 200) {
        //&& data.status
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
  return {
    addEvent: addEvent,
    removeEvent: removeEvent,
    getEvents: getEvents,
    getEventDetails: getEventDetails
  };
}]);

},{}]},{},[4]);
