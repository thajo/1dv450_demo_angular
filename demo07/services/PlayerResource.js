/**
This is responsible of the calls to the API
*/

angular
    .module("demo5App")
    .factory('PlayerResource', PlayerResource); // register the recipe for the service


// We inject the http (for AJAX-handling) and the API
PlayerResource.$inject = ['$http', 'API'];


function PlayerResource($http, API) {
    var o = {};
    // Get all players from the API
    o.getAll = function() {
        var req = {
            method: 'GET',
            url: API.url +"/players", // this is the entry point in my example
            headers: {
                'Accept': 'application/json',
                'X-APIKEY': API.key
            },
            params: {
                'limit': '500'
            }
        };
        // This returns a promise which will be fullfilled when the response is back
        return $http(req);
    };

    // Get a instance resource (take an object,if we have it, as parameter. Otherwise item is an id (Breaking HATEOAS))
    o.getSingle = function(item) {

        var url;

        // are we using the url provided by the call
        if(typeof item === 'object') {
            url = item.ref.href;
        }
        else { // or we using a fall back (item => is an id)
            url = API.url +"players/" +item
        }

        var req = {
            method: 'GET',
            url: url,
            headers: {
                'Accept': 'application/json',
                'X-APIKEY': API.key
            },
            params: {
                'limit': '500'
            }
        };

        return $http(req);
    };

    o.create = function(params) {
        // to be
    };

    return o;

}