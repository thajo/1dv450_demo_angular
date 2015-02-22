// This should hold a list with all players
angular
  .module("demo5App")
  .factory('PlayerService', PlayerService); // register the recipe for teh service


  PlayerService.$inject = ['PlayerResource', 'localStorageService', 'LocalStorageConstants', '$q'];

  // Here is the definition of teh service
  function PlayerService(playerAPI, localStorage, LS, $q) {


  
  
    return {
      get:function() {
        // check if we have it in localstorage
        var items = localStorage.get(LS.playersKey);

        // Add a promise
        var deferred = $q.defer();

        // If we dont have stuff in localstorage we get it
        if(!items) {

          // make the call to the api
          playerAPI.getAll().success(function(data){

            console.log(data.players);
            // set the data in LS
            localStorage.set(LS.playersKey, data.players);
            localStorage.set(LS.playersKey +"nr", data.nrOfPlayers)

            // resolve the data to the caller
            deferred.resolve(data.players);

          });

        }
        else {
          console.log("from cache");
          var deferred = $q.defer();
          deferred.resolve(items);
          //return deferred.promise;
        }

        // return the promise to the caller
        return deferred.promise;




      },
      
      getPlayer:function(id) {

        // get the specific player in sessionStorage
        var items = localStorage.get(LS.playersKey);

        var item = false;

        // check if we have the one with the id in web storage
        if(items) {
          items.forEach(function(obj, index){

            if(obj.id.toString() === id) {
              item = obj;
              return true;
            }
          });
        }



        // Add a promise
        var deferred = $q.defer();

        // If we dont have stuff in localstorage we get it

        var promise;
        if(item) {

          // make the call to the api with the item -> will use the url in the object
          promise = playerAPI.getSingle(item);

        }
        else {
          // we trying to get a player but dont have the url - maybe bookmarked in a browser?
          // ignore HATEOAS...it may work if the api is persistant
          promise = playerAPI.getSingle(id);
          //var deferred = $q.defer();
          //deferred.reject("Sorry, could not get that cause we dont have the link");

        }


        // When the call has been made
        promise.success(function(data){

          console.log(data);
          // set the data in LS
          var localStorageKey = LS.playersKey +"." +data.id
          localStorage.set(localStorageKey, data);

          // resolve the data to the caller
          deferred.resolve(data);

        }).catch(function(){
          deferred.reject("Something went wrong with the call");
        });

        // return the promise to the caller
        return deferred.promise;
      }
    
    };
  }