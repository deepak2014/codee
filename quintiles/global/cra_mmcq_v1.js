// JavaScript Document
var mmcqV1 = {};
//
(function(){
		
	this.correctFeedbackCount = 0;
	this.inCorrectFeedbackCount = 0;
	
	this.showFeedbackSign = true;
	this.maxAttemptPossibleCount = 2;
	this.attemptCount = 0;
	this.correctOptionCount = 0;
	this.inCorrectOptionCount = 0;
	this.totalQuestionCountFromHtml = 0;
	var selectedListArray = [];
	var correctAnswers = [];
	//
	this.enableSubmit = function(){
		$('#submitBtn').removeAttr('disabled');
	}
	
	this.disableSubmit = function(){
		$('#submitBtn').attr('disabled','true');
	}
	
	this.toggleCheckBoxIsChecked = function(divElementId){
		var clickedElementNumber = divElementId.split("_")[1];
		//console.log('Inside toggleCheckBox : '+clickedElementNumber);
		if($('#chkboxlabel_'+clickedElementNumber).attr('isChecked') === 'false'){
			$('#chkboxlabel_'+clickedElementNumber).attr('isChecked','true');
		} else if($('#chkboxlabel_'+clickedElementNumber).attr('isChecked') === 'true'){
			$('#chkboxlabel_'+clickedElementNumber).attr('isChecked','false');
		} else{
			//console.log('Something Wrong');
		}
		
		mmcqV1.isAnyCheckBoxChecked();
		
	}
	
	
	this.setShowFeedbackSign = function(updatedValue){
		if('true' === updatedValue){
			mmcqV1.showFeedbackSign = true;
		} else if('false' === updatedValue){
			mmcqV1.showFeedbackSign = false;
		} else{
			//console.log('value recived apart from universe');
		}
		
	}
	
	this.showModalFeedback = function(){ 
	// totalQuestionCountFromHtml inCorrectOptionCount correctOptionCount inCorrectFeedbackCount correctFeedbackCount
		
		var appendString = '';
		// correct incorrect partial
		//console.log('inside showModalFeedback mmcqV1.correctFeedbackCount : '+mmcqV1.correctFeedbackCount);
		//console.log('inside showModalFeedback mmcqV1.inCorrectFeedbackCount : '+mmcqV1.inCorrectFeedbackCount);
		//console.log('inside showModalFeedback mmcqV1.correctOptionCount : '+mmcqV1.correctOptionCount);
		// console.log('inside showModalFeedback mmcqV1.correctFeedbackCount : '+mmcqV1.correctFeedbackCount);
		if( mmcqV1.correctFeedbackCount == 0 && mmcqV1.inCorrectFeedbackCount >= 0){
			appendString = 'Incorrect';
			appendString = incorrectStr;
		} else if( mmcqV1.correctFeedbackCount > 0  &&  mmcqV1.inCorrectFeedbackCount > 0  ){
			appendString = 'Partial';
			appendString = partialStr;
		}else if(mmcqV1.correctFeedbackCount == mmcqV1.correctOptionCount && mmcqV1.inCorrectFeedbackCount == 0){
			appendString = 'Correct';
			appendString = correctStr;
		}else if(( mmcqV1.correctFeedbackCount > 0 && mmcqV1.correctFeedbackCount < mmcqV1.correctOptionCount) && mmcqV1.inCorrectFeedbackCount == 0){
			appendString = 'Partial';
			appendString = partialStr;
		}
		// console.log('appendString : '+appendString);
		$('#modal-feedback .modal-body-custom').html(appendString);
		$('#modal-feedback').show();
	
	
	}
	
	
	// function is called on click of submit
	this.generateFeedbackCount = function(){
		
		
		
		mmcqV1.correctFeedbackCount = 0;
		mmcqV1.inCorrectFeedbackCount = 0;
		mmcqV1.inCorrectFeedbackCount = 0;
		mmcqV1.correctOptionCount = 0;
		
		mmcqV1.attemptCount++;
		
		if(mmcqV1.attemptCount > mmcqV1.maxAttemptPossibleCount ){
			mmcqV1.disablePageEvents();
			//console.log('max count exceeded stop execution!!');
			return false;
		}
		
		
		var elementCount = $('div .checkBoxObject').length;
		mmcqV1.totalQuestionCountFromHtml = elementCount
		selectedListArray = [];
		correctAnswers = [];
		for(varCountValue=0; varCountValue<elementCount; varCountValue++ ){
			
			var htmlIsTrueMarked = $('#chkboxlabel_'+varCountValue).attr('istrue');
			var ischecked = $('#chkboxlabel_'+varCountValue).attr('isChecked');
			
			mmcqV1.findCorrectInCorrectOptionCount(htmlIsTrueMarked);
			
			if(ischecked === "true"){

				if( (htmlIsTrueMarked === "true") ) {
					mmcqV1.correctFeedbackCount++; // correct feedback count incremented by 1.
					correctAnswers.push(varCountValue);
					if(mmcqV1.showFeedbackSign === true){
						$('#yes_checkBoxDiv_'+varCountValue).show();
					}
				} else if( ( htmlIsTrueMarked === "false") ) {
					mmcqV1.inCorrectFeedbackCount++; // correct feedback count decremented by 1.
					if(mmcqV1.showFeedbackSign === true){
						$('#no_checkBoxDiv_'+varCountValue).show();
					}
				}else{
					// Nothing needs to be done!!				
				}
				selectedListArray.push(varCountValue);
			} else{
				// option not selected.
			}
		}
		assessmentFeedback.mmcqCheckList(selectedListArray);
		
		// show modal feedback only when its not assessment.
		if(assessment.getAssessment() != 1 && assessment.getAssessment() != 2){
			mmcqV1.showModalFeedback();
		} else if(assessment.getAssessment() == 2){
			// do nothing. case of review assessment.
			mmcqV1.showPatchForReviewFeedback();
		}else{
			
			if(assessment.getAssessment() == 1){
				var wasCorrect = false;
				if( mmcqV1.correctFeedbackCount == 0 && mmcqV1.inCorrectFeedbackCount >= 0){
					// $('#red_patch_wrong').show();
				} else if( mmcqV1.correctFeedbackCount > 0  &&  mmcqV1.inCorrectFeedbackCount > 0  ){
					// $('#red_patch_wrong').show();
				}else if(mmcqV1.correctFeedbackCount == mmcqV1.correctOptionCount && mmcqV1.inCorrectFeedbackCount == 0){
					// $('#green_patch_wrong').show();
					wasCorrect = true;
					assessment.setScore();
				}else if(( mmcqV1.correctFeedbackCount > 0 && mmcqV1.correctFeedbackCount < mmcqV1.correctOptionCount) && mmcqV1.inCorrectFeedbackCount == 0){
					// $('#red_patch_wrong').show();
				}
				assessment.setInteraction($('#questionText').text(), "choice", selectedListArray.join(","), correctAnswers.join(","), wasCorrect, selectedListArray.join("|"));
				// Moving to next page in case of assessment.
				shell.moveNext(1);
			}
			
		}
		
		if(mmcqV1.attemptCount >= mmcqV1.maxAttemptPossibleCount ){
			mmcqV1.disablePageEvents();
			
			// show feedback sign only when its not assessment.
			if(assessment.getAssessment() != 1){
				mmcqV1.showAnswer();
			}
			
			//console.log('Unbound event !!');
			return false;
		}
		
		//console.log('feedbackCount : '+mmcqV1.correctFeedbackCount+', total count : '+elementCount);
		
		// hide submit button and unbind check box event
		mmcqV1.showTryAgainButtonAndUnbindClick();
		
	}
	
	this.showTryAgainButtonAndUnbindClick = function(){		
		// toggle buttons
		$('#submitButton_toggle').hide();
		$('#tryAgainButton_toggle').show();
		$(".list-group-item").css('cursor','default');
		$("input[name='checkboxIcon']").attr("disabled", true);
		$( "div .checkBoxClickable").removeClass('checkBoxObject');		
	}
	
	// this function needs to 
	this.hideAllFeedbackSign = function(){
		$('div .signMark').hide();
	}
	
	this.tryAgainClicked = function(){
		mmcqV1.hideAllFeedbackSign();
		$( ".checkBoxClickable").addClass('checkBoxObject');	
		$(".list-group-item").removeAttr('style');
		// toggle buttons
		$('#submitButton_toggle').show();
		$('#tryAgainButton_toggle').hide();
		
		// resetting checkbox
		// $(":checkbox").on("click", false);
		$("input[name='checkboxIcon']").attr("disabled", false);
		$("input[name='checkboxIcon']").removeAttr('checked');
		$('.list-group-item').attr('ischecked', 'false');
		$('.checkBoxObject').attr('checked', false);
		mmcqV1.disableSubmit();
		mmcqV1.correctOptionCount = 0;
		mmcqV1.inCorrectOptionCount = 0;
	}
	
	this.disablePageEvents = function(){
		$('#tryAgainButton_toggle').hide();
		$('#submitButton_toggle').show();
		$('#submitBtn').attr("disabled", true);
		
		$(".list-group-item").css('cursor','default');
		$("input[name='checkboxIcon']").attr("disabled", true);
		$( ".checkBoxClickable").removeClass('checkBoxObject');
	}
	
	this.findCorrectInCorrectOptionCount = function(htmlIsTrueMarked){
		//console.log('htmlIsTrueMarked : '+htmlIsTrueMarked)
		if(htmlIsTrueMarked == 'true'){
			mmcqV1.correctOptionCount++;
		} else {
			mmcqV1.inCorrectOptionCount++;
		}
	}
	
	this.isAnyCheckBoxChecked = function(){
		mmcqV1.totalQuestionCountFromHtml = $('.list-group-item').length;
		var disableSubmit = true;
		for(var countObject = 0; countObject < mmcqV1.totalQuestionCountFromHtml; countObject++ ){
			if($('#chkboxlabel_'+countObject).attr('ischecked') == 'true'  && (mmcqV1.attemptCount < mmcqV1.maxAttemptPossibleCount) ){
				disableSubmit = false;
			}
		}
		
		if(disableSubmit){
			mmcqV1.disableSubmit();
		}
		
	}
	
	
	this.showAnswer = function(){
		
		$('div .signMark').hide();
		
		for(var countObject = 0; countObject < mmcqV1.totalQuestionCountFromHtml; countObject++ ){
		var ischecked = $('#chkboxlabel_'+countObject).attr('isChecked');	
			
			if(assessment.getAssessment() == 20){
				if(ischecked === "true"){
					if($('#chkboxlabel_'+countObject).attr('istrue') == 'true'){
						$('#yes_checkBoxDiv_'+countObject).show();
					}else if($('#chkboxlabel_'+countObject).attr('istrue') == 'false'){
						$('#no_checkBoxDiv_'+countObject).show();
					}
				}
			}else{
				if($('#chkboxlabel_'+countObject).attr('istrue') == 'true'){
					$('#yes_checkBoxDiv_'+countObject).show();
				}else if($('#chkboxlabel_'+countObject).attr('istrue') == 'false'){
					$('#no_checkBoxDiv_'+countObject).show();
				}
			}
			
		}
	}
	
	this.showPatchForReviewFeedback = function(){
		if( mmcqV1.correctFeedbackCount == 0 && mmcqV1.inCorrectFeedbackCount >= 0){
			$('#red_patch_wrong').show();
		} else if( mmcqV1.correctFeedbackCount > 0  &&  mmcqV1.inCorrectFeedbackCount > 0  ){
			$('#red_patch_wrong').show();
		}else if(mmcqV1.correctFeedbackCount == mmcqV1.correctOptionCount && mmcqV1.inCorrectFeedbackCount == 0){
			$('#green_patch_wrong').show();
		}else if(( mmcqV1.correctFeedbackCount > 0 && mmcqV1.correctFeedbackCount < mmcqV1.correctOptionCount) && mmcqV1.inCorrectFeedbackCount == 0){
			$('#red_patch_wrong').show();
		}
		
		
	}
		
}).apply(mmcqV1)