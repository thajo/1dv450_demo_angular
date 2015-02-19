// register the controller to the module
angular
  .module("demo4App")
  .controller("PlayerListController", PlayerListController); // registrera med namn, funktion

// inject the service
PlayerListController.$inject = ['PlayerService'];

function PlayerListController(playerService) {
 
  var vm = this;
  var thePlayers = playerService.get();
  vm.playerList = thePlayers;
  
}
