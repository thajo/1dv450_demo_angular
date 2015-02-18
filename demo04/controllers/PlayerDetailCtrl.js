// register the controller in the module (see ng-app in index.html)
angular
  .module("demo4App")
  .controller("PlayerDetailController", PlayerDetailController);

// Dependency injections, routeParams give us the /:id
PlayerDetailController.$inject = ['$routeParams', 'PlayerService'];

function PlayerDetailController($routeParams, playerService) {
  console.log("inside PlayerDetailController");
  
  // Set the ViewModel
  var vm = this;
  
  // Calling our service
  var thePlayer = playerService.getPlayer($routeParams.id);
  
  // Update the ViewModel
  vm.name = thePlayer.name;
  vm.age = thePlayer.age;
}
