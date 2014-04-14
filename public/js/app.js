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
		    }],
		    userProfile: ['$http', function($http) {
		      return $http.get('/api/userProfile').then(function(response){
		         return response.data;
		      });
		    }],
		    eventList: ['$http', function($http) {
		      return $http.get('/api/eventList').then(function(response){
		      	console.log(response);
		         return response.data;
		      });
		    }]
		}
  }).
  otherwise({
    redirectTo: '/'
  });

}]);
