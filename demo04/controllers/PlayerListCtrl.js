// register the controller to the module
angular
  .module("demo4App")
  .controller("PlayerListController", PlayerListController); // registrera med namn, funktion

// inject the service - no need if we use the registered name as the funtion parameters eg. PlayerService
 //PlayerListController.$inject = ['PlayerService'];

function PlayerListController(PlayerService) {
  var vm = this;
  var thePlayers = PlayerService.get();
  vm.playerList = thePlayers;
}
