var u;
angular.module('demo6App', [])
.controller('ExampleController', function($http) {
  var vm = this;
  vm.email = "john.haggerud@lnu.se";
  vm.isLoggedIn = false;
  
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
      vm.isLoggedIn = true;
      
      console.log(data);
      console.log(status);
      console.log(config)
      
      // if we succeeded we got a token - can be used to autenticate us
      vm.token = data.auth_token
      
    });
    
    promise.error(function(data, status, headers, config) {
      console.log(data);
      console.log(status);
      console.log(config)
    });
  };
  
  vm.removeTeam = function(team) {
    console.log(team);
  };

});
