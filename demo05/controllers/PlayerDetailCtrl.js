// register the controller in the module (see ng-app in index.html)
angular
  .module("demo5App")
  .controller("PlayerDetailController", PlayerDetailController);

// Dependency injections, routeParams give us the /:id
PlayerDetailController.$inject = ['$routeParams', 'PlayerService'];

function PlayerDetailController($routeParams, playerService) {

  
  // Set the ViewModel
  var vm = this;
  
  // Calling our service
  var thePlayer = playerService.getPlayer($routeParams.id);
  thePlayer.then(function(data){

    // Update the ViewModel
    vm.name = data.name;
    vm.age = data.age;
  }).catch(function(error){
    vm.message = error;
    console.log("Error: " +error);
  })

  

}
