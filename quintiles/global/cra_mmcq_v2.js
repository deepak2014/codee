// JavaScript Document
var mmcqV2 = {};
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
		
		mmcqV2.isAnyCheckBoxChecked();
		
	}
	
	
	this.setShowFeedbackSign = function(updatedValue){
		if('true' === updatedValue){
			mmcqV2.showFeedbackSign = true;
		} else if('false' === updatedValue){
			mmcqV2.showFeedbackSign = false;
		} else{
			//console.log('value recived apart from universe');
		}
		
	}
	
	this.showModalFeedback = function(){ 
	// totalQuestionCountFromHtml inCorrectOptionCount correctOptionCount inCorrectFeedbackCount correctFeedbackCount
		
		var appendString = '';
		// correct incorrect partial
		//console.log('inside showModalFeedback mmcqV2.correctFeedbackCount : '+mmcqV2.correctFeedbackCount);
		//console.log('inside showModalFeedback mmcqV2.inCorrectFeedbackCount : '+mmcqV2.inCorrectFeedbackCount);
		//console.log('inside showModalFeedback mmcqV2.correctOptionCount : '+mmcqV2.correctOptionCount);
		// console.log('inside showModalFeedback mmcqV2.correctFeedbackCount : '+mmcqV2.correctFeedbackCount);
		if( mmcqV2.correctFeedbackCount == 0 && mmcqV2.inCorrectFeedbackCount >= 0){
			appendString = 'Incorrect';
			appendString = incorrectStr;
		} else if( mmcqV2.correctFeedbackCount > 0  &&  mmcqV2.inCorrectFeedbackCount > 0  ){
			appendString = 'Partial';
			appendString = partialStr;
		}else if(mmcqV2.correctFeedbackCount == mmcqV2.correctOptionCount && mmcqV2.inCorrectFeedbackCount == 0){
			appendString = 'Correct';
			appendString = correctStr;
			mmcqV2.attemptCount = 1000;
		}else if(( mmcqV2.correctFeedbackCount > 0 && mmcqV2.correctFeedbackCount < mmcqV2.correctOptionCount) && mmcqV2.inCorrectFeedbackCount == 0){
			appendString = 'Partial';
			appendString = partialStr;
		}
		
		$('#modal-feedback .modal-body-custom').html(appendString);
		$('#modal-feedback').show();
	}
	
	
	// function is called on click of submit
	this.generateFeedbackCount = function(){
		
		
		
		mmcqV2.correctFeedbackCount = 0;
		mmcqV2.inCorrectFeedbackCount = 0;
		mmcqV2.correctOptionCount = 0;
		mmcqV2.inCorrectOptionCount = 0;
		
		mmcqV2.attemptCount++;
		
		if(mmcqV2.attemptCount > mmcqV2.maxAttemptPossibleCount ){
			mmcqV2.disablePageEvents();
			// console.log('max count exceeded stop execution!!');
			return false;
		}
		
		
		var elementCount = $('div .checkBoxObject').length;
		mmcqV2.totalQuestionCountFromHtml = elementCount
		for(varCountValue=0; varCountValue<elementCount; varCountValue++ ){
			
			var htmlIsTrueMarked = $('#chkboxlabel_'+varCountValue).attr('istrue');
			var ischecked = $('#chkboxlabel_'+varCountValue).attr('isChecked');
			
			mmcqV2.findCorrectInCorrectOptionCount(htmlIsTrueMarked);
			
			if(ischecked === "true"){
				if( (htmlIsTrueMarked === "true") ) {
					mmcqV2.correctFeedbackCount++; // correct feedback count incremented by 1.
					if(mmcqV2.showFeedbackSign === true){
						$('#yes_checkBoxDiv_'+varCountValue).show();
					}
				} else if( ( htmlIsTrueMarked === "false") ) {
					mmcqV2.inCorrectFeedbackCount++; // correct feedback count decremented by 1.
					if(mmcqV2.showFeedbackSign === true){
						$('#no_checkBoxDiv_'+varCountValue).show();
					}
				}else{
					// Nothing needs to be done!!				
				}
			} else{
				// option not selected.
			}
		}
		
		mmcqV2.showModalFeedback();
		
		if(mmcqV2.attemptCount >= mmcqV2.maxAttemptPossibleCount ){
			mmcqV2.disablePageEvents();
			mmcqV2.showAnswer();
			// console.log('Unbound event !!');
			return false;
		}
		
		// console.log('feedbackCount : '+mmcqV2.correctFeedbackCount+', total count : '+elementCount);
		
		// hide submit button and unbind check box event
		mmcqV2.showTryAgainButtonAndUnbindClick();
		
	}
	
	this.showTryAgainButtonAndUnbindClick = function(){		
		// toggle buttons
		$('#submitButton_toggle').hide();
		$('#tryAgainButton_toggle').show();
		$(".list-group-item").css('cursor','default');
		$("input[name='checkboxIcon']").removeAttr('disabled');
		$("input[name='checkboxIcon']").attr("disabled", true);
		$( "div .checkBoxClickable").removeClass('checkBoxObject');		
	}
	
	// this function needs to 
	this.hideAllFeedbackSign = function(){
		$('div .signMark').hide();
	}
	
	this.tryAgainClicked = function(){
		mmcqV2.hideAllFeedbackSign();
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
		mmcqV2.disableSubmit();
		mmcqV2.correctOptionCount = 0;
		mmcqV2.inCorrectOptionCount = 0;
	}
	
	this.disablePageEvents = function(){
		$('#tryAgainButton_toggle').hide();
		$('#submitButton_toggle').show();
		// $('#StopButton_toggle').show();
		$('#submitBtn').attr("disabled", true);
		
		$(".list-group-item").css('cursor','default');
		$("input[name='checkboxIcon']").attr("disabled", true);
		$( ".checkBoxClickable").removeClass('checkBoxObject');		
	}
	
	this.findCorrectInCorrectOptionCount = function(htmlIsTrueMarked){
		// console.log('htmlIsTrueMarked : '+htmlIsTrueMarked)
		if(htmlIsTrueMarked == 'true'){
			mmcqV2.correctOptionCount++;
		} else {
			mmcqV2.inCorrectOptionCount++;
		}
	}
	
	this.isAnyCheckBoxChecked = function(){
		mmcqV2.totalQuestionCountFromHtml = $('.list-group-item').length;
		var disableSubmit = true;
		for(var countObject = 0; countObject < mmcqV2.totalQuestionCountFromHtml; countObject++ ){
			if($('#chkboxlabel_'+countObject).attr('ischecked') == 'true' && (mmcqV2.attemptCount < mmcqV2.maxAttemptPossibleCount) ){
				disableSubmit = false;
			}
		}
		
		if(disableSubmit){
			mmcqV2.disableSubmit();
		}
		
	}
	
	
	this.showAnswer = function(){
		
		$('div .signMark').hide();
		
		for(var countObject = 0; countObject < mmcqV2.totalQuestionCountFromHtml; countObject++ ){
			if($('#chkboxlabel_'+countObject).attr('istrue') == 'true'){
				$('#yes_checkBoxDiv_'+countObject).show();
			}else if($('#chkboxlabel_'+countObject).attr('istrue') == 'false'){
				$('#no_checkBoxDiv_'+countObject).show();
			}
		}
	}
	
		
}).apply(mmcqV2)