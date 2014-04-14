var PApp = angular.module('PApp', [
  'ngRoute'
]);

PApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
		templateUrl: '/main.html',
		controller: 'MainCntl',
		resolve: { /* returning the promise and then resolving the promise as the data */
			calendarList: function($http){
				$http.get('/api/calendarList').success(function(data) {
				    //$scope.calendarList = data;
				    console.log(data);
				    return data;
				});
			}
		}
  }).
  otherwise({
    redirectTo: '/'
  });
}]);
