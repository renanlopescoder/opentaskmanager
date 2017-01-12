var taskApp = angular.module('taskApp',['ngRoute','services','directives']);

taskApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {

  $routeProvider.when('/list', {
      templateUrl : 'views/task/task-progress-list.html',
      controller : 'TaskController'
   }).when('/listToday', {
       templateUrl : 'views/task/task-today-list.html',
       controller : 'TaskController'
    }).when('/', {
       templateUrl : 'views/login.html',
       controller : 'UserController'
    }).when('/list-done', {
       templateUrl : 'views/task/task-completed-list.html',
       controller : 'TaskController'
    }).when('/create', {
       templateUrl : 'views/create.html',
       controller : 'TaskController'
    }).when('/about', {
       templateUrl : 'views/about.html',
       controller : 'TaskController'
    }).when('/calendar', {
       templateUrl : 'views/calendar.html',
       controller : 'TaskController'
    })
   .otherwise ({ redirectTo: '/' });
}]);
