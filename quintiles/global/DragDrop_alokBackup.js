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
		this.draggableCount = 5;
		// function build the initial array of sorting order
		this.buildInitialArray= function(){
			var liCount = $('ul > .ui-state-default').length;
			dragDrop.draggableCount = liCount;
			dragDrop.resultArray= [];
			for(var icount=0; icount< liCount; icount++){
				
				try {
					dragDrop.initialArray[icount] = $('.ui-state-default')[icount].id;
					dragDrop.finalArray[icount] = $('.ui-state-default')[icount].id;
					dragDrop.resultArray[icount] = icount; 
					dragDrop.showhideArray[icount] = false;
				}
				catch(err) {
					// document.getElementById("demo").innerHTML = err.message;
				}

			}
			//alert(liCount+" == "+dragDrop.resultArray+" == "+dragDrop.finalArray)
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
		
			var objectArray = [];
			var learnerResponse = [];	
			$( "#sortable li" ).each(function( index ) {
				var elementIdAndText = [];
				var liId = $( this ).attr('id');
				var liText = $( this ).find("span").text();
				elementIdAndText["liId"] = liId;
				elementIdAndText["liText"] = liText;
				elementIdAndText["isPositionChnaged"] = $( this ).attr('isPositionChnaged');
				learnerResponse[index] = liId+"*"+liText.trim()+"*"+$( this ).attr('isPositionChnaged');
				objectArray[index] = elementIdAndText;
			});
			assessmentFeedback.dragDropList(objectArray);
			
			$('#sortable').addClass('disable-move');
			
			$('#submitButton').attr('disabled','true')
			
			$(".myClass").sortable( "disable" );
			
			// patch for Ipad next back button on drag & drop page.
			if(isMobile.any()) {
				// $("#volumeInc_btn").hide();
				$('#shellBack').animate({left: '0px'}, 'fast');
				$('#shellNext').animate({right: '0px'}, 'fast');
			}
			
			// increse counter
			dragDrop.attemptMaidForDD++;
			dragDrop.compareResultArrayWithFinalArray(learnerResponse);
			dragDrop.showHideFeedBackSign();
			
			
			
		}
		
		// this function compare the final array with the result array
		// and build another array with show hide attribute for right/ wrong sign.
		this.compareResultArrayWithFinalArray = function(learnerResponse){
			var correctCount = 0;
			// the length of the result array and 
			// the final array should be same
			for(var counterObject = 0; counterObject<dragDrop.resultArray.length; counterObject++){
				
				//console.log('counter : '+counterObject+', resultArray[indexValue] : '+dragDrop.resultArray[counterObject]+' finalArray[index value] : '+dragDrop.finalArray[counterObject]);
				
				if(dragDrop.resultArray[counterObject] == dragDrop.finalArray[counterObject]){
					//console.log('set true : '+counterObject);
					correctCount += 1;
					dragDrop.showhideArray[counterObject] = true;
				} else {
					dragDrop.showhideArray[counterObject] = false;
				}
			}
			
			// code to move next during assessment start
			if (assessment.getAssessment() != 1){
				if (correctCount == dragDrop.finalArray.length){
				}
			}else{
				var wasCorrect = false;
				// console.log(correctCount+" == "+dragDrop.finalArray.length+" == "+dragDrop.resultArray+" == "+dragDrop.finalArray)
				if (correctCount == $('#sortable li').length){ // $('#sortable li').length dragDrop.finalArray.length
					// console.log('set score called');
					wasCorrect = true;
					assessment.setScore();
					assessment.setInteraction($('#dndQuestionText').text(), "sequencing", dragDrop.resultArray.join(","), dragDrop.finalArray.join(","), wasCorrect, learnerResponse.join("|"));
					shell.moveNext(1);
				}else{
					assessment.setInteraction($('#dndQuestionText').text(), "sequencing", dragDrop.resultArray.join(","), dragDrop.finalArray.join(","), wasCorrect, learnerResponse.join("|"));
					shell.moveNext(1);
				}
			}
			// code to move next during assessment ends
		}
		
		
		this.showHideFeedBackSign = function(){
			if (assessment.getAssessment() != 1){
				var isWrong = false; // $('#sortable li').length dragDrop.showhideArray.length
				for(var counterObject = 0; counterObject<$('#sortable li').length; counterObject++){
				// console.log(counterObject+', inside for :: '+dragDrop.showhideArray[counterObject]);
					//console.log('counter : '+counterObject+', isPositionChanged : '+$('#'+counterObject).attr('isPositionChnaged')+' showHideArray value : '+dragDrop.showhideArray[counterObject]);
					
						if(dragDrop.showhideArray[counterObject] == true){
							$('#yes_checkBoxDiv_'+counterObject).show();
						} else if(dragDrop.showhideArray[counterObject] == false){
							$('#no_checkBoxDiv_'+counterObject).show();
							isWrong = true;
						}
					
					/*if($('#'+counterObject).attr('isPositionChnaged') === 'true'){
						if(dragDrop.showhideArray[counterObject] === true){
							$('#yes_checkBoxDiv_'+counterObject).show();
						} else if(dragDrop.showhideArray[counterObject] === false){
							$('#no_checkBoxDiv_'+counterObject).show();
						}
					} else{
						// object position not midified
					}*/
				}
				
				if (assessment.getAssessment() == 2){
					$('#sortable').addClass('disable-move');
					if(isWrong == true){
						$('#red_patch_wrong').show();
					} else{
						// console.log('here');
						$('#green_patch_wrong').show();
					}
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
