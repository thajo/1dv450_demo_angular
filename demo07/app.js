angular
  .module("demo8App", ['ngMap ']) // you must inject the ngRoute (included as a separate js-file)
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
      // The module give me some stuff to configure
      localStorageServiceProvider
          .setPrefix('demo7app')
          .setStorageType('sessionStorage')
          .setNotify(true, true)
    })
    .constant('API', { // here I also can declare constants
      'key': "sdkjalsdjlasjdlkajsdljs", // bad practice!? Key on client....
      'url': "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/", // base url
      'format': 'application/json' // Default representation we want
    })
    .constant('LocalStorageConstants', {
      'playersKey' : 'p', // just some keys for sessionStorage-keys
      'teamsKey'   : 't'
    });
