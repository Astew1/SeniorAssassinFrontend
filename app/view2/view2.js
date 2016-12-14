'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$rootScope', '$scope', function($rootScope, $scope) {
  //   $rootScope.currentTarget = "JB from rootScope";
  // $scope.getTarget = function(){
  //   return "JB from Scope";
  // };
  // $scope.tget = "JG from scope var";
  // $scope.targets = [
  //     {target:"Johnny Brod from array in Scope"}
  // ];
    $scope.target = "Tony Park ing";
    $scope.assassinate = function(){
      console.log("Assassinate!");
    };
    $scope.confirmDeath = function(){
      console.log("Kill Confirmed!");
    };
    
}]);