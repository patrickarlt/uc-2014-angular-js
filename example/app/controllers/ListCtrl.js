define([
  'angular',
  'app'
], function (angular, app) {

  // define our controller and register it with our app
  app.controller("ListCtrl", function($scope, $state, $stateParams, results){
    $scope.query = $stateParams.q;
    $scope.items = results.data.results;
    $scope.currentPage = $stateParams.page;
    $scope.totalItems = results.data.total;
    $scope.itemsPerPage = 100;

    $scope.goToPage =  function(page){
      $state.go('search', {
        q: $stateParams.q,
        page: page
      });
    };
  });

});