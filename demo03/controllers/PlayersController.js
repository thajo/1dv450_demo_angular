// angular is a global namespace declared by angularJS
angular
  .module("demo3App") // must match ng-app in HTML (this is the module - probobly same for whole application)
  .controller("PlayersController", PlayersController); // register our controller with name and "constructor" function

PlayersController.$inject = ['PlayerService']; // inject the service to the Controller


function PlayersController(PlayerService) {
  // Using controllerAs so $scope is in this (save a ref in variable)
  var vm = this;
    
  // We can update the ViewModel (model in view)
  vm.currentPlayer = "";
  vm.idvalue = 1;
  
  // Also declare function
  vm.getPlayer = function() {
       vm.currentPlayer = PlayerService.getPlayer(vm.idvalue); // here we call the service
  };
}
