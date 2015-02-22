angular
    .module("demo5App")
    .factory('PlayerResource', PlayerResource); // register the recipe for the service



PlayerResource.$inject = ['$http', 'API'];


function PlayerResource($http, API) {

    var o = {};

    o.getAll = function() {
        var req = {
            method: 'GET',
            url: API.url +"/players",
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

    o.getSingle = function(item) {

        var url;

        // are we using the url provided by the call
        if(typeof item === 'object') {
            url = item.ref.href;
        }
        else { // or we using a fall back (item => is an id)
            url = API.url +"players/" +item
        }

        console.log("I should call: " +url);

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

    };

    return o;

}