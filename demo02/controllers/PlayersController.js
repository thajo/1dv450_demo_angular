// angular is a global namespace declared by angularJS
angular
  .module("demo2App") // must match ng-app in HTML (this is the module - probobly same for whole application)
  .controller("PlayersController", PlayersController); // register our controller with name and "constructor" function

//PlayersController.$inject = ['$scope']; // inject the scope (no need if using controllerAs)



function PlayersController() {
  // Using controllerAs so $scope is in this (save a ref in variable)
  var vm = this;
  var playerList = [
    {id: 1, name: "Harry Kane", age: 21, selfurl: "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/1"},
    {id: 2, name: "Lotta Schelin", age: 28, selfurl: "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/2"},
    {id: 3, name: "Hugo Loris", age: 27, selfurl:"http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/3" }
  ];
  
  // We can update the ViewModel (model in view)
  vm.currentPlayer = "";
  vm.idvalue = 1;
  
  // Also declare function
  vm.getPlayer = function() {
      
      var result = playerList.filter(function(p) {
         return p.id.toString() === vm.idvalue.toString(); // filter out appropriate one, beware of type conversions with ===
      })[0]; // get result and access first property (should only be one....)
      
      vm.currentPlayer = result; 
  }
}
