(function() {

'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var listToBuy = this;
	listToBuy.items = ShoppingListCheckOffService.getItemsToBuy();
	
	listToBuy.moveItemFromBuyToBought = function(itemIndex, item) {
		ShoppingListCheckOffService.moveItemFromBuyToBought(itemIndex, item);
	}

	listToBuy.displayEmptyMessage = function() {
		return ShoppingListCheckOffService.displayEmptyMessage(this);
	}
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var listBought = this;
	listBought.items = ShoppingListCheckOffService.getItemsBought();
	
	listBought.displayEmptyMessage = function() {
		return ShoppingListCheckOffService.displayEmptyMessage(this);
	}
}

function ShoppingListCheckOffService() {
	var service = this;
	// No item bought at start
	var itemsBought = [];
	// list of items to buy when page loads
	var itemsToBuy = [
	{
		name: "Milk",
	    quantity: "2"
	},
	{
	    name: "Donuts",
	    quantity: "200"
	},
	{
	    name: "Cookies",
	    quantity: "300"
	},
	{
	    name: "Chocolate",
	    quantity: "5"
	}
	];

	// returns items to buy
	service.getItemsToBuy = function () {
    	return itemsToBuy;
  	};

	// returns empty message if list is empty
	service.displayEmptyMessage = function (list) {
		return (list.items.length === 0);
  	};

  	// returns items already bought
	service.getItemsBought = function() {
  		return itemsBought;
  	};

  	// remove item from list to buy to list already bought 
  	service.moveItemFromBuyToBought = function (itemIndex, item) {
    	itemsToBuy.splice(itemIndex, 1);
    	itemsBought.push(item);
    	itemsToBuy.emptyMessage = (itemsToBuy.length === 0);
    	itemsBought.emptyMessage = !itemsToBuy.emptyMessage;
  	};

 };

})();