// register the controller to the module
angular
  .module("demo7App")
  .controller("TeamListController", TeamListController); // registrera med namn, funktion

// inject the service
TeamListController.$inject = ['TeamService'];

function TeamListController(teamService) {
  var vm = this;
  
  teamService.get().then(function(data) {
    console.log(data);
    vm.teamsList = data;
  });
}