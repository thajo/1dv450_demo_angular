// This should hold a list with all players
angular
  .module("demo4App")
  .factory('PlayerService', PlayerService); // register the recipe for teh service


  // Here is the definition of teh service
  function PlayerService() {
    
    // we pretend we get this from an API :)
    // like a private property
    var playerList = [
      {id: 1, name: "Harry Kane", age: 21, selfurl: "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/1"},
      {id: 2, name: "Lotta Schelin", age: 28, selfurl: "http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/2"},
      {id: 3, name: "Hugo Loris", age: 27, selfurl:"http://blue-white-harbor-95-185765.euw1-2.nitrousbox.com/demo02/players/3" }
    ];
  
  
    return {
      get:function() {
        return playerList;     
      },
      
      getPlayer:function(id) {
      
        // here we should ask the API for a specific player
        var result = playerList.filter(function(p) {
           return p.id.toString() === id.toString(); // filter out appropriate one
        })[0]; // get result and access the first (should be the only in this case) element

        return result;
      }
    
    };
  }