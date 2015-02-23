// register the controller in the module (see ng-app in index.html)
angular
  .module("demo5App")
  .controller("PlayerDetailController", PlayerDetailController);

// Dependency injections, routeParams give us the /:id
PlayerDetailController.$inject = ['$routeParams', 'PlayerService'];

function PlayerDetailController($routeParams, playerService) {

  
  // Set the ViewModel
  var vm = this;
  
  // Calling our service - we get an promise back whitch will be resolved/rejected when the async phase is ready
  var thePlayerPromise = playerService.getPlayer($routeParams.id);
  thePlayerPromise.then(function(data){
    // everything is good!
    // Update the ViewModel
    vm.name = data.name;
    vm.age = data.age;
  }).catch(function(error){
    // Something went wrong!
    vm.message = error;
    console.log("Error: " +error);
  })

  

}
