define([
  'app',
  'esri/map'
], function (app, Map) {

  // register a new directive called esriMap with our app
  app.directive('esriMap', function(){
    // this object will tell angular how our directive behaves
    return {
      // only allow esriMap to be used as an element (<esri-map>)
      restrict: 'E',

      // this directive shares $scope with its parent (this is the default)
      scope: false,

      // define how our template is compiled this gets the $element our directive is on as well as its attributes ($attrs)
      compile: function($element, $attrs){
        // remove the id attribute from the main element
        $element.removeAttr("id");

        // append a new div inside this element, this is where we will create our map
        $element.append("<div id=" + $attrs.id + "></div>");

        // since we are using compile we need to return our linker function
        // the 'link' function handles how our directive responds to changes in $scope
        return function (scope, element, attrs, controller){};
      },

      // even though $scope is shared we can declare a controller for manipulating this directive
      // this is great for when you need to expose an API for manipulaiting your directive
      // this is also the best place to setup our map
      controller: function($scope, $element, $attrs){
        // setup our map options based on the attributes and scope
        var mapOptions = {};

        if($attrs.extent){
          mapOptions.extent = $scope[$attrs.extent];
        }

        if($attrs.center){
          mapOptions.center = $attrs.center.split(",");
        }

        if($attrs.zoom){
          mapOptions.zoom = $attrs.zoom;
        }

        if($attrs.basemap){
          mapOptions.basemap = $attrs.basemap;
        }

        // declare our map
        var map = new Map($attrs.id, mapOptions);

        // start exposing an API by setting properties on "this" which is our controller
        // lets expose the "addLayer" method so child directives can add themselves to the map
        this.addLayer = function(layer){
          return map.addLayer(layer);
        };
      }
    };
  });
});