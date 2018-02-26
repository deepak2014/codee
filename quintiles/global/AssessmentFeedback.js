

var assessmentFeedback  = {};

(function() {
	
	// code for mcq start
	this.storeResultMcq = [];
	
	this.storeSelectedAnswerMcq = function(elementObject){
		// console.log(elementObject);
		tetObjectValue= [];
		tetObjectValue = elementObject;
		for(var tempCount=0; tempCount < elementObject[0].classList.length; tempCount++){
			if(elementObject[0].classList[tempCount] == 'selected'){
			
				var selectedElement = [];
				
				// console.log('selected found : '+elementObject[0].attributes[1].nodeValue);
				selectedElement['selectedElementId'] = elementObject[0].attributes[1].value;
				
				// console.log('isCorrect : '+elementObject[0].attributes[2].nodeValue);
				if(elementObject[0].attributes[2].value == 1){
					selectedElement['isCorrect'] = 1;
				} else{
					selectedElement['isCorrect'] = 0;
				}
				
				// console.log('data page name : '+$('pageContainer').attr('data-pagename'));
				assessmentFeedback.storeResultMcq[$('#pageContainer').attr('data-pagename')] = [];
				assessmentFeedback.storeResultMcq[$('#pageContainer').attr('data-pagename')] = selectedElement;
			}
		}
		
		
	}
	
	this.showAnswerMcq = function(keyValue){
		
		
		var attributeValue = '';
		var isCorrect = 0;
		try{
			var interactionData = assessment.getInteraction();
			//alert(interactionData.result+" == "+interactionData.studentResponse);
			if (parseInt(interactionData.result) >= 0){
				//if (assessment.getAssessment() == 2  ){
					attributeValue = interactionData.studentResponse
					$('#'+attributeValue).addClass("selected");
					isCorrect = interactionData.result;	
				//}
			}else{
				attributeValue = assessmentFeedback.storeResultMcq[keyValue].selectedElementId;
				isCorrect = assessmentFeedback.storeResultMcq[keyValue].isCorrect;
			}
		} catch(err){
		
		}
		
		mcq.setCurrentAttempt(mcq.getMaxAttempt()-1);
		
		$("#"+$('#'+attributeValue).find('input').attr('id')).trigger("click");
		$('#submitBtn').trigger("click");
		
		if(isCorrect == 0){
			$('#red_patch_wrong').show();
		} else {
			$('#green_patch_wrong').show();
		}
		
		
	}
	// code for mcq Ends
	
	// code for mmcq start
	this.storeResultMMcq = [];
	this.mmcqCheckList = function(selectedMMcqIdList){
		assessmentFeedback.storeResultMMcq[$('#pageContainer').attr('data-pagename')] = [];
		assessmentFeedback.storeResultMMcq[$('#pageContainer').attr('data-pagename')] = selectedMMcqIdList;
	}
	
	this.showAnswerMMcq = function(pageId){
		var interactionData = assessment.getInteraction();//alert(interactionData.studentResponse);
		if (parseInt(interactionData.result) >= 0){
			var selectedArray = interactionData.studentResponse.split("|");
		}else{
			var selectedArray = assessmentFeedback.storeResultMMcq[pageId];
		}
		//alert(selectedArray);
		for(var counter=0; counter < selectedArray.length; counter++){
			$('#checkBoxDiv_'+selectedArray[counter]).trigger("click");
		}
		mmcqV1.maxAttemptPossibleCount = mmcqV1.attemptCount + 1;
		$('#submitBtn').trigger("click");
	}
	
	// code for mmcq ends
	
	
	// code for drag & drop start
	this.storeResultDragDrop = [];
	this.dragDropList = function(modifiedDragDrop){
		assessmentFeedback.storeResultDragDrop[$('#pageContainer').attr('data-pagename')] = [];
		assessmentFeedback.storeResultDragDrop[$('#pageContainer').attr('data-pagename')] = modifiedDragDrop;
	}
	
	this.modifyDragDropHtmlAndEnableSubmit = function(pageId){
		var interactionData = assessment.getInteraction();//alert(interactionData.studentResponse);
		if (parseInt(interactionData.result) >= 0){
			var objectArray = [];
			var studentResponse = interactionData.studentResponse.split("|");
			//console.log("studentResponse "+studentResponse)
			var len = studentResponse.length;
			for (var i = 0; i < len; i++){
				var elementIdAndText = [];
				var elementVal = studentResponse[i].split("*");
				var liId = elementVal[0];
				var liText = elementVal[1];
				elementIdAndText["liId"] = liId;
				elementIdAndText["liText"] = liText;
				elementIdAndText["isPositionChnaged"] = elementVal[2];
				objectArray[i] = elementIdAndText;
				
			}
			//console.log("objectArray "+objectArray)
			var arrayValueDragDrop = objectArray;
		}else{
			var arrayValueDragDrop = assessmentFeedback.storeResultDragDrop[pageId];
		}
		try{
			dragDrop.buildInitialArray();
		} catch(err) {
			// document.getElementById("demo").innerHTML = err.message;
		}
		
		
		$( "#sortable li" ).each(function( index ) {
			var oldId = $( this ).attr('id');
			var newId = arrayValueDragDrop[index].liId;
			// $('#'+oldId).attr('id',arrayValueDragDrop[index].liId);
			$('#'+oldId).find('span').html(arrayValueDragDrop[index].liText.trim());
			$('#'+oldId).attr('ispositionchnaged',arrayValueDragDrop[index].isPositionChnaged.trim());
			$('#no_checkBoxDiv_'+oldId).attr('tempid','no_checkBoxDiv_'+newId)
			$('#yes_checkBoxDiv_'+oldId).attr('tempid','yes_checkBoxDiv_'+newId)
			dragDrop.finalArray[index] = arrayValueDragDrop[index].liId;
			$('#'+oldId).attr('tempid',newId);
		});
		$( "#sortable li" ).each(function( index ) {
			
			
			$('#'+$( this ).attr('id')).find('div.oh-yeah').attr('id',$('#'+$( this ).attr('id')).find('div.oh-yeah').attr('tempid'));
			$('#'+$( this ).attr('id')).find('div.oh-no').attr('id',$('#'+$( this ).attr('id')).find('div.oh-no').attr('tempid'));
			
			// $( this ).attr('id',$( this ).attr('tempid'));
			
			
		});
		
		setTimeout(function(){ 
			$( this ).attr('id',$( this ).attr('tempid'));
		}, 50);
		
		// $('#submitButton').removeAttr('disabled');
		setTimeout(function(){ 
			dragDrop.compareResultArrayWithFinalArray();
		}, 100);
		setTimeout(function(){ 
			dragDrop.showHideFeedBackSign();
		}, 150);
		
		$(".myClass").sortable( "disable" );
		
	}
	// code for drag & drop start
	
	
}).apply(assessmentFeedback);