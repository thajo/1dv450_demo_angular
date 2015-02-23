// register the controller to the module
angular
  .module("demo7App")
  .controller("PlayerListController", PlayerListController); // registrera med namn, funktion

// inject the service
PlayerListController.$inject = ['PlayerService'];

function PlayerListController(playerService) {
 
  var vm = this;

 // playerService.savePlayer({});
  
  
  // call the service get a promise back
  var playerPromise = playerService.get();

  // then is called when the function delivers
  playerPromise
      .then(function(data){
        // put the data om the viewModel - binding it to the view
        vm.playerList = data;
      })
      .catch(function(error) {
        console.log("ERROR");
      });

  
}
