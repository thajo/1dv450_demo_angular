// This should hold a list with all players
angular
  .module("demo7App")
  .factory('PlayerService', PlayerService); // register the recipe for teh service

  // We need PlayerResource for calling the API
  // localStorageService is an third part service for handling web storage
  // LocalStorageConstants is some constants defined in app.js
  // $q is an angular module for handling promises
  PlayerService.$inject = ['ResourceService', 'localStorageService', 'LocalStorageConstants', '$q'];

  // Here is the definition of teh service
  function PlayerService(resourceService, localStorage, LS, $q) {
        
    // Here we create the Object from the ResourceService
    var Player = resourceService('players');
    return {
      get:function() {
        // check if we have it in localstorage - Pretty clumpsy handling but just for example
        var items = localStorage.get(LS.playersKey);

        // Define a promise...this will be used later
        var deferred = $q.defer();

        // If we dont have stuff in localstorage we get it from the API (should maybe have som timestamp for stale problems)
        if(!items) {
          
          // make the call to the api - Get all returns a promise and success will be called if $http succeed
          Player.getCollection().then(function(data){

            
            // set the data in LS
            localStorage.set(LS.playersKey, data);
           

            // resolve the data to the caller - They have a promise and now we deliver the response
            deferred.resolve(data);

          });

        }
        else {
          console.log("Getting all the players from the cache");
         // var deferred = $q.defer();
          deferred.resolve(items);
          //return deferred.promise;
        }

        // return the promise to the caller
        return deferred.promise;
      },
      
      // This gets an single player
      getPlayer:function(id) {

        // get the specific player in sessionStorage (we have save all in a bigg array)
        var items = localStorage.get(LS.playersKey);

        var item = false;

        // check if we have the one with the id in web storage
        if(items) {
          items.forEach(function(obj, index){

            if(obj.id.toString() === id) {
              item = obj; // update item and return
              return true;
            }
          });
        }

        // Create a promise
        var deferred = $q.defer();
        // If we dont have stuff in localstorage we get it
        var promise;
        // We have the item and kan use the HATEOAS, namely the url in the item-object (the players direct url)
        if(item) {
          console.log(item);
          // make the call to the api with the item -> will use the url in the object
          promise = Player.getSingle({'url' : item.ref.href});
        }
        else {
          // we trying to get a player but dont have the url - maybe bookmarked in a browser?
          // ignore HATEOAS...it may work if the api is persistant with the url /players/:id
          var obj = {'instanceName' : 'players', 'id' : id};
          promise = Player.getSingle('players', obj);
        }
        // When the call has been made and everything is good (indepentet from how we call the API)
        promise.success(function(data){

          // set the single player in the LS (could have a lot more information than the representation in the list) 
          var localStorageKey = LS.playersKey +"." +data.id
          localStorage.set(localStorageKey, data);

          // resolve the data to the caller
          deferred.resolve(data);

        }).catch(function(){
          // If something went wrong we have to reject the promise (the caller will catch an error)
          deferred.reject("Something went wrong with the call");
        });

        // return the promise to the caller (this is returned before we got data - async)
        return deferred.promise;
      },
      savePlayer:function(data) {
        
        data = { "player":
                {
                    "name": "From AngularJS",
                    "age": 12,
                    "team_id" : 1
                }
              }
        var promise = Player.save('players', data).then(function(data) {
          console.log(data);
        });
        return promise;
      }
    
    };
  }