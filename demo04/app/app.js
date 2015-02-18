angular
  .module("demo4App", ['ngRoute']) // you must inject the ngRoute (included as a separate js-file)
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
        otherwise({
          redirectTo: '/'
        });
      
      $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
}); // This removes the hash-bang and use the Session history management >= IE10
  }]);