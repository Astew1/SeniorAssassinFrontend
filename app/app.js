

'use strict';

angular.module('myApp', [
    'ngRoute',
    'ngWebSocket',
    'myApp.view1',
    'myApp.view2',
    'myApp.view3',
    'myApp.view4',
    'myApp.view5',
    'myApp.version'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
    // .factory('webskt', function($websocket) {
    //     // Open a WebSocket connection
    //
    //     var dataStream = Socket('ws://localhost:8081/websocket', {
    //         extractor: extractor,
    //         maxRetries: 0
    //     });
    //
    //     function extractor(data){
    //         return data.request;
    //     }
    //
    //
    //     var collection = [];
    //
    //     dataStream.onMessage(function(message) {
    //         collection.push(JSON.parse(message.data));
    //     });
    //
    //     dataStream.onopen = function(e){
    //         collection.push("CONNECTED");
    //         console.log("CONNECTED");
    //     };
    //
    //     dataStream.onclose = function(e){
    //         collection.push("DISCONNECTED");
    //         console.log("DISCONNECTED");
    //     };
    //
    //
    //     var methods = {
    //         collection: collection,
    //         get: function() {
    //             dataStream.send(JSON.stringify({ action: 'get' }));
    //         }
    //     };
    //
    //     return methods;
    // })
    // .controller('rootController', function ($scope, webskt) {
    //     $scope.webskt = webskt;
    //
    // });


