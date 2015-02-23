angular
  .module("demo7App", ['ngRoute', 'LocalStorageModule']) // you must inject the ngRoute (included as a separate js-file)
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'partials/index.html'
        }).
        when('/players', {
          templateUrl: 'partials/player-list.html',
          controller: 'PlayerListController',
          controllerAs: 'players' // players could be seen as an instance of the controller, use it in the view!
        }).
        when('/player/:id', {
          templateUrl: 'partials/player-detail.html',
          controller: 'PlayerDetailController',
          controllerAs: 'player'
        }).
        when('/teams', {
          templateUrl: 'partials/team-list.html',
          controller: 'TeamListController',
          controllerAs: 'teams' // teams could be seen as an instance of the controller, use it in the view!
        }).
        otherwise({
          redirectTo: '/'
        });
      
      $locationProvider.html5Mode(true); // This removes the hash-bang and use the Session history management >= IE10
    }])
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider
          .setPrefix('demo5app')
          .setStorageType('sessionStorage')
          .setNotify(true, true)
    })
    .constant('API', {
      'key': "sdkjalsdjlasjdlkajsdljs",
      'url': "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/",
      'format': 'application/json'
    })
    .constant('LocalStorageConstants', {
      'playersKey' : 'p',
      'teamsKey'   : 't'
    });


;