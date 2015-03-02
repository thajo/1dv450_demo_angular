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
    // I take care of it in same controller...
    promise.success(function(data, status, headers, config) {
      // Just check what we get back
      console.log(data);
      console.log(status);
      console.log(config)
      
      // if we succeeded we got a token - can be used to autenticate us
      $rootScope.token = data.auth_token.substring(0, 20) +"...";
      $rootScope.isLoggedIn = true;
      
      
    });
    // Something went wrong...
    promise.error(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
      console.log(config)
      $rootScope.token = "No way, Jose!: " +data.error;
      $rootScope.isLoggedIn = false;
    });
  };
  
  

}).controller("TeamController", function($http) { // This controller is handling the list with teams
  var vm = this;
  var getConfig = {
    headers: {
      "Accept"   : "application/json",
      "X-APIkey" : "lksjadjas87dasidas9djööksaödaö",
    }
  }
  $http.get("http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/teams", getConfig).success(function(data) {
    //console.log(data);
    vm.teams = data;
  }).error(function(data, status) {
    //console.log(data);
    vm.alert = data.error;
  });
  
  // Havent implemented this (should try to do a DELETE and send the correct token )
  // No need for more validation here since the server is checking the token
  vm.removeTeam = function(team) {
     console.log(team);
  };
  
});

