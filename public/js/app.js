var PApp = angular.module('PApp', [
  'ngRoute'
]);

PApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
		templateUrl: '/main.html',
		controller: 'MainCntl',
		resolve: { 
			calendarList: ['$http', function($http) {
		      return $http.get('/api/calendarList').then(function(response){
		         return response.data;
		      });
		    }]
		}
  }).
  otherwise({
    redirectTo: '/'
  });

}]);
