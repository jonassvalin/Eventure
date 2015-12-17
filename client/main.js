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
  $routeProvider
    .when('/', {
      templateUrl: 'views/pages/home.html',
      controller: 'eventController',
      access: {restricted: true}
    })
    .when('/login', {
      templateUrl: 'views/pages/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'views/pages/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .when('/eventPage/:name', {
      templateUrl: 'views/pages/event.html',
      controller: 'eventPageController',
      access: {restricted: true}
    })
    .otherwise({redirectTo: '/login'});
});
