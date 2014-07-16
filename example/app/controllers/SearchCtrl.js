define([
  'angular',
  'app'
], function (angular, app) {

  // define our controller and register it with our app
  app.controller("SearchCtrl", function($scope, $state, $stateParams){
    $scope.query = $stateParams.q;
    $scope.search = function(){
      $state.go('search', {
        q: $scope.query,
        page: 1
      });
    };
  });

});