/**
Detta exempel använder två controllrar
Allt är definierat i samma fil vilket inte är best-practice men 
blir enklare att se

Applikationen använder rootscope för att överföra status mellan flera oliak kontrollrar
*/
angular.module('demo6App', [])
.controller('LoginController', function($http, $rootScope) {
  
  var vm = this;
  
  // I'm lazy!
  vm.email = "john.haggerud@lnu.se";
  
  // Using the rootScope so every controller can access this. Be carefull when using this
  $rootScope.isLoggedIn = false;
  
  // When user clicks the login button
  vm.login = function() {
    // create a packet of the users (written) credatial
    var data = {'email' : vm.email, 'password': vm.password};
    
    // Here is the url to my API-autentication entry - Send a POST with user credentials and get a JWT back
    var url = "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/auth";
    var config = {
      headers: {
          "X-APIkey" : "lksjadjas87dasidas9djööksaödaö",
          "Accept" : "application/json"
      }
    }
    // So we create a HTTP POST with the data
    var promise = $http.post(url, data, config);
    
    promise.success(function(data, status, headers, config) {
      
      console.log(data);
      console.log(status);
      console.log(config)
      
      // if we succeeded we got a token - can be used to autenticate us
      $rootScope.token = data.auth_token
      $rootScope.isLoggedIn = true;
      
    });
    
    promise.error(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
      console.log(config)
    });
  };
  
  

}).controller("TeamController", function($http) {
  var vm = this;
  var getConfig = {
    headers: {
      "Accept"   : "application/json",
      "X-APIkey" : "lksjadjas87dasidas9djööksaödaö",
    }
  }
  $http.get("http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/teams", getConfig).success(function(data) {
    vm.teams = data.teams;
  }).error(function(data, status) {
    vm.alert = data.error;
  });
  
  vm.removeTeam = function(team) {
    console.log(team);
  };
  
});

