require([
  'angular',
  'app'
], function (angular, app) {

  function getResults($http, $stateParams){
    var perpage = 100;
    var start = ($stateParams.page === '1') ? 1 : ($stateParams.page * perpage) + 1 - perpage;
    return $http.get('http://www.arcgis.com/sharing/rest/search', {
      params: {
        q: $stateParams.q + ' AND (type: Feature Service)',
        sortField: 'numViews',
        sortOrder: 'desc',
        num: perpage,
        f: 'json',
        type: 'Feature Service',
        start: start
      }
    });
  }

  app.config(function ($stateProvider) {
    $stateProvider
    .state('index', {
      url: '',
      views: {
        'search': {
          templateUrl: 'app/templates/search.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('search', {
      url: '/search/:q/:page',
      resolve: {
        results: getResults
      },
      views: {
        'search': {
          templateUrl: 'app/templates/search.html',
          controller: 'SearchCtrl'
        },
        'list': {
          templateUrl: 'app/templates/list.html',
          controller: 'ListCtrl'
        }
      }
    })
    .state('search.item', {
      url: '/:id',
      resolve: {
        item: function($http, $stateParams){
          return $http.get('http://www.arcgis.com/sharing/rest/content/items/' + $stateParams.id, {
            params: {
              f: 'json'
            }
          });
        }
      },
      views: {
        'content': {
          templateUrl: 'app/templates/content.html',
          controller: 'ContentCtrl'
        },
        'search': {
          templateUrl: 'app/templates/search.html',
          controller: 'SearchCtrl'
        },
        'list': {
          templateUrl: 'app/templates/list.html',
          controller: 'ListCtrl'
        }
      }
    });
  });
});