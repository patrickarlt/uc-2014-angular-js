define([
  'angular',
  'app',
  'esri/geometry/Extent',
  'esri/SpatialReference'
], function (angular, app, Extent, SpatialReference) {

  // define our controller and register it with our app
  app.controller("ContentCtrl", function($scope, item){
    $scope.itemId = item.data.id;
    $scope.title = item.data.title;
    $scope.description = item.data.description;
    $scope.url = item.data.url + '/0';
    $scope.extent = new Extent(item.data.extent[0][0], item.data.extent[0][1], item.data.extent[1][0], item.data.extent[1][1], new SpatialReference({ wkid:4326 }));
    $scope.click = function($event){
      $scope.currentFeature = $event.graphic;
    };
  });

});