/**
 * Created by Alex on 12/7/16.
 */
import {Socket} from 'wsevent.js'

'use strict';

var endpoints = {
    websocket: "ws://localhost:8081/websocket/",
    api: "http://localhost:8081"
};

angular.module('myApp', ['ngRoute'])


    .factory('ws', Websocket);


function Websocket($rootScope, $q) {
    var connected = false;
    var reconnecting = false;
    var socket = null;

    socket = new Socket(endpoints.websocket, {
        extractor: extractor,
        maxRetries: 0
    });


    socket.onopen = (e) => {
      connected = true;
      $rootScope.$emit('socket-opened');
    };

    socket.onclose = () => {
        connected = false;

        $rootScope.$emit('socket-closed');
    };

    var queuedMessages = Object.create(null);
    var registeredHandlers = Object.create(null);

    socket.onmessage = (name, data) => {
        console.log(JSON.stringify(data, null, 4));
        if (!registeredHandlers[name]) {
            if (!queuedMessages[name]) {
                queuedMessages[name] = [];
            }
            queuedMessages[name].push(data);
        }
    };

    var factory = {};

    factory.onJSON = (name, callback) => {
        callback = callback || angular.noop();

        function dispatchQueuedMessages() {
            queuedMessages[name].forEach(function (data) {
                $log.log('Received: ' + name, data);
                callback(data);
            });
        }

        registeredHandlers[name] = true;
        if (queuedMessages[name]) {
            dispatchQueuedMessages();
        }

        socket.On(name, function (data) {
            callback(data);
        });
    };
    factory.on = factory.onJSON.bind(factory);

    factory.emitJSON = (name, data, callback) => {
        var deferred = $q.defer();
        callback = callback || angular.noop;

        if (angular.isUndefined(data)) {
            data = {};
        }

        if (connected) {
            emitJSONImpl();
        } else {
            var deregister = $rootScope.$on('socket-opened', () => {
                emitJSONImpl();
                deregister();
            });
        }

        return deferred.promise;

        function emitJSONImpl() {
            $log.log('Sending ' + name, data);
            data.request = name;

            socket.Emit(data, (jsonIn) => {
                var dataIn = angular.fromJson(jsonIn);

                if (console && console.timeStamp) {
                    console.timeStamp('WS'+name);
                }

                $log.log('Response to ' + name, dataIn);
                if (!dataIn.success) {
                    Notifications.toast({
                        message: dataIn.message,
                        error: true,
                        hideDelay: 5000,
                    });
                }

                if (dataIn.success) {
                    deferred.resolve(dataIn.data);
                } else {
                    deferred.reject(dataIn.data);
                }

                callback(dataIn);
            });
        }
    };

    return factory;
}

//
//
//
//
//     var dataStream = Socket(endpoints.websocket, {
//         extractor: extractor,
//         maxRetries: 0
//     });
//
//     function extractor(data) {
//         return data.request;
//     }
//
//     var collection = [];
//
//     dataStream.onMessage(function (message) {
//         collection.push(JSON.parse(message.data));
//     });
//     var methods = {
//         collection: collection,
//         get: function () {
//             dataStream.send(JSON.stringify({action: 'get'}));
//         }
//     };
//
//     return methods;
// }
// )
// .
// controller('WsController', function ($scope, MyData) {
//     $scope.myData = myData;
//
// });