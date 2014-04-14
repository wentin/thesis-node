// function MainCntl($scope, $http, $location, calendarList) {


// 	$scope.calendarList = calendarList;
// 	console.log(calendarList);
// 	// $scope.domain = window.location.origin;
// 	if ($scope.domain == 'http://quizwidget-petri.dotcloud.com'){
// 		$scope.domain = 'http://quiz.huffingtonpost.com';
// 	}

// 	// $scope.user = null;

// 	// $http.get('/').success(function(data) {
// 	//     $scope.calendarList = data;
// 	//     console.log(data);
// 	// });

// 	// var init = function() {
// 	// 	console.log('MainCntl', calendarList)
// 	// }
// 	// init();

// }

function MainCntl($scope, $http, calendarList) {
	console.log(calendarList);
	$scope.calendarList = calendarList;
}
