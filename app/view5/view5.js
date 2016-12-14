'use strict';

angular.module('myApp.view5', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view5', {
            templateUrl: 'view5/view5.html',
            controller: 'View5Ctrl'
        });
    }]).controller('View5Ctrl', View5Ctrl);

function View5Ctrl($rootScope){

    var sendData = function() {
        Websocket.emitJSON('playerSettingsSet',
            //Backend only accepts strings!
            {key: key.toString(), value: newValue.toString()},
            function (response) {
                if (response.success) {
                    deferred.resolve(response);
                } else {
                        settings[key] = oldValue;
                        $rootScope.$emit('settings-updated');


                    deferred.reject(response);
                }
                callback(response);
            });

        return deferred.promise;
    }

}