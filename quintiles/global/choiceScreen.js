// JavaScript Document
var choiceScreen = {};
//
(function(){
	
	this.changeColorOfBox = function(boxNumber, colorHashCode){
		$('#DocMenu'+boxNumber).css('background','#'+colorHashCode);
	}
	
	this.clickedBox = function(clickedboxId){
		//console.log('id of the clicked box : '+clickedboxId);
	}
	
}).apply(choiceScreen)
