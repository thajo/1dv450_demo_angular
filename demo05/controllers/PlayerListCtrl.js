// register the controller to the module
angular
  .module("demo5App")
  .controller("PlayerListController", PlayerListController); // registrera med namn, funktion

// inject the service
PlayerListController.$inject = ['PlayerService'];

function PlayerListController(playerService) {
 
  var vm = this;

  // call the service get a promise back
  var promise = playerService.get();

  // then is called when the function delivers
  promise
      .then(function(data){
        vm.playerList = data;
      });

  
}
