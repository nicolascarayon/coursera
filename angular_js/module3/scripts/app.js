(function(){

'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('SiteBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService, $scope){
	var ctrl = this;
	ctrl.searchTerm = '';
	
	ctrl.getMatchedMenuItems = function(searchTerm){
		if (searchTerm === '') {
			ctrl.found = [];
			return;
		}
		MenuSearchService.getMatchedMenuItems(searchTerm)
		.then(function (items) {
			ctrl.found = items;
		});
	};

	ctrl.removeItem = function(index){
		ctrl.found.splice(index, 1);
	};

}

MenuSearchService.$inject = ['$http', 'SiteBasePath'];
function MenuSearchService($http, SiteBasePath){
	var service = this;
	
	service.getMatchedMenuItems = function(searchTerm) {

		// responsible for reaching out to the server to retrieve the list of all the menu items
		return $http(
			{
				method: "GET",
	      		url: (SiteBasePath  + "/menu_items.json")
    		})
			.then(function (result) {
			    // process result
			    var items = result.data.menu_items;
			    var itemsKept = [];
			    // only keep items that match
			    for (var i = 0; i < items.length; i++){
			    	if (items[i].description.search(searchTerm) !== -1) itemsKept.push(items[i]);
				} 
			    // return processed items
			    return itemsKept;
			});

	};
}

function FoundItemsDirective() {
  var ddo = {
  	restrict: 'E',
    templateUrl: 'directives/found-items-template.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
    var list = this;

    list.removeItem = function (index) {
      list.onRemove({index: index});
    };

    list.nothingFound = function () {
      return list.foundItems && (list.foundItems.length === 0);
    };
  }

})();