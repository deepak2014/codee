// JavaScript Document
var mcq = [];

(function(){
	var questionText = "";
	var instructionText = "";
	var optionArr = [];
	var feedbackArr = [];
	var maxAttempt = 2;
	var currentAttempt = null;
	
	
	this.init = function(){
		if (assessment.getAssessment() == 1){
			maxAttempt = 1;
		}
	}
	this.setQuestionText = function(qtxt){
		questionText = qtxt;
	}
	this.getQuestionText = function(){
		return questionText;
	}
	this.setInstructionText = function(insttxt){
		instructionText = insttxt;
	}
	this.getInstructionText = function(){
		return instructionText;
	}
	this.setOptionText = function(optionArrD){
		optionArr = optionArrD;
	}
	this.getOptionText = function(){
		return optionArr;
	}
	this.setGlobalFeedbackText = function(feedbackArrT){
		feedbackArr = feedbackArrT;
	}	
	this.getGlobalFeedbackText = function(){
		 return feedbackArr;
	}
	
	this.setCurrentAttempt = function(currentFeedbackNumber){
		currentAttempt = currentFeedbackNumber;
	}
	
	this.getMaxAttempt = function(){
		return maxAttempt;
	}
	
	this.selectOption = function(e){

		$(e.target).closest(".option").not(".disabled").toggleClass("selected");
		
		$(".options .option").removeClass("selected");
		
		$(e.target).closest(".option").addClass("selected");
		
		if($(e.target).closest(".option").hasClass("selected")){
			var input_id=$(this).find("input").attr("id");
			$('#'+input_id).prop('checked', true);
		}

		
		if($(".options .option.selected:not(.disabled)").length > 0){
			$(".submitBtn").removeClass("disabled");
			$(".submitBtn").off('click').on('click',mcq.submitAnswer);
		}else{
			$(".submitBtn").addClass("disabled");
			$(".submitBtn").off('click');
		}
	}
	
	this.submitAnswer = function() {
			currentAttempt++;
			$("#submitBtn").css("display","none");
			$(".submitBtn").off('click');
			var selectedOptions = [];
			var correctAnswers = [];
			var $targetHolder;
			var feedback1 = mcq.getGlobalFeedbackText();
		//
			$(".options .option").each(function(){
				if($(this).hasClass("selected")|| $(this).hasClass("disabled")){
					selectedOptions.push($(this).attr("id"));
					$targetHolder = $('#'+$(this).attr("id") + ' .radio');
					if (assessment.getAssessment() == 1){

					} else if (assessment.getAssessment() == 2  ){
						//console.log("assessment.getAssessment() == 2123");
						$("#pageDataBlocker").css("display","block");
						$("input[type=radio]").attr('disabled', true);
						//console.log('value  222 : '+$(this).hasClass("selected"));
						if($(this).hasClass("selected")){
							if($(this).attr("iscorrect")== "1"){
								$targetHolder.prepend('<img id="symbol_tick" class="symbol_tick_correct" src="assets/images/global/Icon_Right.png" alt="correct">');
							}
							else{
								$targetHolder.prepend('<img id="symbol_tick" class="symbol_tick_wrong" src="assets/images/global/Icon_Wrong.png" alt="wrong">');
							}
						}
					} else {
						//console.log('value  else');
						if($(this).attr("iscorrect")== 1){
							$targetHolder.prepend('<img id="symbol_tick" class="symbol_tick_correct" src="assets/images/global/Icon_Right.png" alt="correct">');
						}
						else{
							$targetHolder.prepend('<img id="symbol_tick" class="symbol_tick_wrong" src="assets/images/global/Icon_Wrong.png" alt="wrong">');
						}
					}
				}	
				if($(this).attr("iscorrect")== 1){
					correctAnswers.push($(this).attr("id"));	
				}
				
				// store feedback result for mcq.
				assessmentFeedback.storeSelectedAnswerMcq($(this));				

			});

			selectedOptions.sort();
			correctAnswers.sort();
			if(maxAttempt != currentAttempt){
					if(selectedOptions.join(",") != correctAnswers.join(",")){
						if (assessment.getAssessment() != 1){
							$('#tryagainBtn').show();
							$("input[type=radio]").attr('disabled', true);
							$("#rowfeedback").css("display","block");
							$('#feedback').css("color","#b81233");
							$("#tryagainBtn").on('click',mcq.resetMCQ);
							$('#feedback').html(feedback1[1].insText);
							$('.radio_text').css("cursor","default");
							$('#detailText').html(feedback1[1].detailText);
						}else{
							assessment.setInteraction(questionText, "choice", selectedOptions.join(","), correctAnswers.join(","), false, selectedOptions.join("|"));
							shell.moveNext(1);
						}
					}
					else{
						if (assessment.getAssessment() != 1){
							$("#pageDataBlocker").css("display","block");
							$("#rowfeedback").css("display","block");
							$('#feedback').css("color","rgb(84,187, 92)");
							$('#feedback').html(feedback1[0].insText);
							$('#detailText').html(feedback1[0].detailText);
						}else{
							assessment.setScore();
							assessment.setInteraction(questionText, "choice", selectedOptions.join(","), correctAnswers.join(","), true, selectedOptions.join("|"));
							shell.moveNext(1);
						}
					}
				}
			else{
					if(selectedOptions.join(",") != correctAnswers.join(",")){
						if (assessment.getAssessment() != 1){
							for(i=0;i<correctAnswers.length;i++)
								{
									 id_value =  correctAnswers[i];
									if (assessment.getAssessment() != 2){
										 $targetHolder.prepend('<img id="symbol_tick" class="symbol_tick_correct" src="assets/images/global/Icon_Right.png" alt="correct">');
									}
									else{
										$("#pageDataBlocker").css("display","block");
									}
									
								}
							$("input[type=radio]").attr('disabled', true);
							$("#pageDataBlocker").css("display","block");
							$("#rowfeedback").css("display","block");
							$('#feedback').css("color","rgb(84,187, 92)");
							$('#feedback').html(feedback1[0].insText);
							$('#detailText').html(feedback1[0].detailText);
						}else{
							assessment.setInteraction(questionText, "choice", selectedOptions.join(","), correctAnswers.join(","), false, selectedOptions.join("|"));
							shell.moveNext(1);
						}
					}
					else{
						if (assessment.getAssessment() != 1){
							for(i=0;i<correctAnswers.length;i++)
								{
									 var id_value = correctAnswers[i] + ' .radio';
									if (assessment.getAssessment() != 2){
										 $('#'+id_value).prepend('<img id="symbol_tick" class="symbol_tick_correct" src="assets/images/global/Icon_Right.png" alt="correct">');
									}
									
									
								}
							$("#pageDataBlocker").css("display","block");
							$("#rowfeedback").css("display","block");
							$('#feedback').css("color","rgb(84,187, 92)");
							$('#feedback').html(feedback1[0].insText);
							$('#detailText').html(feedback1[0].detailText);
						}else{
							assessment.setScore();
							assessment.setInteraction(questionText, "choice", selectedOptions.join(","), correctAnswers.join(","), true, selectedOptions.join("|"));
							shell.moveNext(1);
						}
					}
				
				}
				
				// hide feedback in case of review
				if (assessment.getAssessment() == 2){
					$('#rowfeedback').hide();
				}
				
		}
		this.resetMCQ = function() {
			$('input[type=radio]').prop('checked', false);
			$('#rowfeedback').hide();
			$("input[type=radio]").attr('disabled', false);
			$('#symbol_tick').hide();
			$('#tryagainBtn').hide();
			$('#submitBtn').show();
			$('.radio_text').css("cursor","pointer");
			$("#submitBtn").addClass("disabled");
			$("#submitBtn").off('click');
		}
}).apply(mcq);
