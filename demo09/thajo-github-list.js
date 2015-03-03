angular
.module('thajoGithubListModule', []) // The whole directive is in a module - Good for separation and testability
.directive('thajoGhl', function() {  // Start creating the directive to this module
  return {
    restrict: 'E',  // Restricted to be used as element - Bad for HTML5 validation
    require: '^ghlUsername', // The directive requires a attribute - Must have an own controller see below
    scope: {
      ghlUsername: '@',  // Holding the username for the repos to be downloaded - two-way databinding
      ghlRepos: '@'      // Holding an array with http-links to the repos - two-way databinding
    },
    template: htmlTemplate, // The HTML is declared below - for readability only
    link: function(scope, iElement, iAttrs, ctrl) { // The linkfunctions gives us all information about the DOM - elemets, attributs ect
      scope.getRepos(iAttrs.ghlUsername);  // The linkfunktion is called when all the DOM stuff is made - good place to call the API
    },
    controller: ['$scope', '$http', function($scope, $http) { // The controller is the directives controller - Gives us a scope - Is called 
                                                              // in pre-link phase - Good place to get data
      $scope.getRepos = function(username) {
        var url = "https://api.github.com/users/" +username +"/repos"; // Bulding the url to the API
        var repoURLs = [];
        
        $http.get(url, { cache: true}).success(function(repos) { // A simple get request
          angular.forEach(repos, function(repo) { // We get a list of repos - loop through
            repoURLs.push(repo.html_url); // and just put the html_url in the array (check the repos variable for your self)
          });
         $scope.ghlRepos = repoURLs; // We got the scope of the directive so update the array
        }).error(function(error) {
          console.log(data);
        });
      }
    }]
  }
}
  )
.directive('ghlUsername', function() { // This is just so we can use required on ghlUsername - Need to return a own controller...wierd..
  return {
    controller: function($scope) {} // Just a empty controller
  }
});

// Ugly but i wanted all in same file
var htmlTemplate  =   '<h1>Open repos for the user: {{ghlUsername}}</h1>';
htmlTemplate      +=  '<p data-ng-repeat="repo in ghlRepos">';
htmlTemplate      +=    '<a href="{{repo}}">{{repo}}</a>'
htmlTemplate      +=  '</p>';
