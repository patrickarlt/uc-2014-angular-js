define([
  'app'
], function (app) {

  // define our controller and register it with our app
  app.controller("AppCtrl", function($scope){
    $scope.title = "Hello World";
  });

});