(function () {
	'use strict';	
	angular.module('LunchCheck', []).controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope){
		$scope.updateMessage = function () {			
			if (typeof $scope.inputText == 'undefined') {
				$scope.message = "Please enter data first";
			} else {
				var items = $scope.inputText.split(",");
				function notEmptyString(item){
					return item.trim().length > 0;
				};
				(items.filter(notEmptyString).length < 4) ? ($scope.message = "Enjoy!") : ($scope.message = "Too much!");			
			} 
		};

	};

})();