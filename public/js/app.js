var PApp = angular.module('PApp', [
  'ngRoute'
]);

PApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
		templateUrl: '/main.html',
		controller: MainCntl,
		resolve: { 
			calendar: function($http){
				var calData;
				$http.get('/api/calendarList').success(function(data) {
				    console.log(data);
				    calData = data;
				    return data;
				});
				return calData;
			}
		}
  }).
  otherwise({
    redirectTo: '/'
  });
}]);
