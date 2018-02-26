var dragDrop = {};

(function() {
    
		this.attemptMaidForDD = 0;
		this.initialArray = [];
		this.finalArray = [];
		
		this.showhideArray = [];
		
		/*
			size of result array should be same as final array
			and result array and the final array contain the id of the li elements.
		*/
		this.resultArray = [0,1,2,3,4]; 
		
		// function build the initial array of sorting order
		this.buildInitialArray= function(){
			var liCount = $('.ui-state-default').length;
			for(var icount=0; icount< liCount; icount++){
				dragDrop.initialArray[icount] = $('.ui-state-default')[icount].id;
				dragDrop.finalArray[icount] = $('.ui-state-default')[icount].id;
				dragDrop.showhideArray[icount] = false;
			}
			// dragDrop.finalArray = dragDrop.initialArray;
		}
		
		
		this.updateOnChangeOfPosition = function(liElementId, oldIndex, newIndex){
			// enabling submit.
			dragDrop.enableSubmitAndMarkAsChanged(liElementId);
			
			dragDrop.swapArrayElement(oldIndex, newIndex);
		}
		
		this.swapArrayElement = function(oldIndex, newIndex){
			//console.log('finalArray : '+dragDrop.finalArray);
			
			dragDrop.finalArray.move(oldIndex, newIndex);
			
			//console.log('finalArray : '+dragDrop.finalArray);
			//console.log('initialArray : '+dragDrop.initialArray);
		}
		
		this.enableSubmitAndMarkAsChanged = function(liElementId){
			// submit button enabled.
			$('#submitButton').removeAttr('disabled');
			
			// setting isPositionChnaged as true
			$('#'+liElementId).attr('isPositionChnaged','true');
		}
		
		this.submitClicked = function(){
			// increse counter
			dragDrop.attemptMaidForDD++;
			
			dragDrop.compareResultArrayWithFinalArray();
			
			dragDrop.showHideFeedBackSign();
			
			$('#submitButton').attr('disabled','true')
			
			$(".myClass").sortable( "disable" );
			
			// patch for Ipad next back button on drag & drop page.
			if(isMobile.any()) {
				// $("#volumeInc_btn").hide();
				$('#shellBack').animate({left: '0px'}, 'fast');
				$('#shellNext').animate({right: '0px'}, 'fast');
			}
			
		}
		
		// this function compare the final array with the result array
		// and build another array with show hide attribute for right/ wrong sign.
		this.compareResultArrayWithFinalArray = function(){
			// the length of the result array and 
			// the final array should be same
			for(var counterObject = 0; counterObject<dragDrop.resultArray.length; counterObject++){
				
				//console.log('counter : '+counterObject+', resultArray[indexValue] : '+dragDrop.resultArray[counterObject]+' finalArray[index value] : '+dragDrop.finalArray[counterObject]);
				
				if(dragDrop.resultArray[counterObject] == dragDrop.finalArray[counterObject]){
					//console.log('set true : '+counterObject);
					dragDrop.showhideArray[counterObject] = true;
				} else {
					dragDrop.showhideArray[counterObject] = false;
				}
			}
			
		}
		
		this.showHideFeedBackSign = function(){
			for(var counterObject = 0; counterObject<dragDrop.showhideArray.length; counterObject++){
				//console.log('counter : '+counterObject+', isPositionChanged : '+$('#'+counterObject).attr('isPositionChnaged')+' showHideArray value : '+dragDrop.showhideArray[counterObject]);
				if($('#'+counterObject).attr('isPositionChnaged') === 'true'){
					if(dragDrop.showhideArray[counterObject] === true){
						$('#yes_checkBoxDiv_'+counterObject).show();
					} else if(dragDrop.showhideArray[counterObject] === false){
						$('#no_checkBoxDiv_'+counterObject).show();
					}
				} else{
					// object position not midified
				}
			}
		}
		
	
}).apply(dragDrop);


// function shift the array elements
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};



var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
