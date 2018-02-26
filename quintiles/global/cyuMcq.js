// JavaScript Document

var mcq_cyu = [];

	(function(){
		var questionText = "";
		var instructionText = "";
		var optionArr = [];
		var feedbackArr = [];
		var maxAttempt = 1;
		var currentAttempt;
		var $targetHolder;
		
		this.init = function(){
			currentAttempt = null;
		}
		this.setAttempt = function(val){
			maxAttempt = val;
		}
		this.getAttempt = function(){
			return maxAttempt;
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
		
		this.selectOption = function(e){
		if(!$(".options .option .radio").hasClass("disabled")){
					$(e.target).closest(".option").not(".disabled").toggleClass("selected");
					
					$(".options .option").removeClass("selected");
					
					$(e.target).closest(".option").addClass("selected");
					
					if($(e.target).closest(".option").hasClass("selected")){
						var input_id=$(this).find("input").attr("id");
						$('#'+input_id).prop('checked', true);
					}

					if($(".options .option.selected:not(.disabled)").length > 0){
						$(".submitBtn").removeClass("disabled");
						$(".submitBtn").off('click').on('click',mcq_cyu.submitAnswer);

					}else{
							$(".submitBtn").addClass("disabled");
							$(".submitBtn").off('click');
						}
		}
		}
		this.submitAnswer = function() {
				currentAttempt++;
				$("#submitBtn").hide();
				$(".submitBtn").off('click');
				var selectedOptions = [];
				var correctAnswers = [];
				var feedback1 = mcq_cyu.getGlobalFeedbackText();
				maxAttempt = mcq_cyu.getAttempt();
				
				$(".options .option .radio").addClass("disabled");
				$(".options .option").each(function(){
					$targetHolder = $('#'+$(this).attr("id") + ' .radio');
					if($(this).hasClass("selected")|| $(this).hasClass("disabled")){
						selectedOptions.push($(this).attr("id"));
						
						if($(this).attr("iscorrect")== "1"){
							$targetHolder.prepend('<img id="symbol_tick" class="symbol_tick_correct" src="assets/images/global/Icon_Right.png" alt="correct">');
						}
						else{
							$targetHolder.prepend('<img id="symbol_tick" class="symbol_tick_wrong" src="assets/images/global/Icon_Wrong.png" alt="wrong">');
						}
					}	
					if($(this).attr("iscorrect")== 1){

						correctAnswers.push($(this).attr("id"));

						
					}


				});

				selectedOptions.sort();
				correctAnswers.sort();
				if(maxAttempt != currentAttempt){
						if(selectedOptions.join(",") != correctAnswers.join(",")){
								$('#tryagainBtn').show();
								$("input[type=radio]").attr('disabled', true);
								$("#rowfeedback").addClass('display_change');
								$('#feedback').addClass('incorrectFeedback');
								$("#tryagainBtn").on('click',mcq_cyu.resetMCQ);
								$('#feedback').html(feedback1[1].insText);
								$('#detailText').html(feedback1[1].detailText);
			
						}
						else{
							$("#pageDataBlocker").addClass('display_change');
							$("#rowfeedback").addClass('display_change');
							$('#feedback').addClass('correctFeedback');
							$('#feedback').html(feedback1[0].insText);
							$('#detailText').html(feedback1[0].detailText);
							shell.enableNextButton();
						}
					}
				else{
						shell.enableNextButton();
						if(selectedOptions.join(",") != correctAnswers.join(",")){

								for(i=0;i<correctAnswers.length;i++)
								{
									 var id_value = correctAnswers[i] + ' .radio';
								
									 $('#'+id_value).prepend('<img id="symbol_tick" class="symbol_tick_correct" src="assets/images/global/Icon_Right.png" alt="correct">');
								}
								
								$("#pageDataBlocker").addClass('display_change');
								$("#rowfeedback").addClass('display_change');
							$('#feedback').addClass('incorrectFeedback');
							$('#feedback').html(feedback1[2].insText);
								$('#detailText').html(feedback1[2].detailText);
			
						}
						else{
							$("#pageDataBlocker").addClass('display_change');
							$("#rowfeedback").addClass('display_change');
							$('#feedback').addClass('correctFeedback');
							$('#feedback').html(feedback1[0].insText);
							$('#detailText').html(feedback1[0].detailText);
						}
					
					}
			}
			this.resetMCQ = function() {

					$(".options .option .radio").removeClass("disabled");
					$('input[type=radio]').prop('checked', false);
					$('#rowfeedback').removeClass('display_change');
					$("input[type=radio]").attr('disabled', false);
					$('#symbol_tick').hide();
					$('#feedback').removeClass('incorrectFeedback');
					$('#tryagainBtn').hide();
					$("#submitBtn").show();
					$("#submitBtn").addClass("disabled");
					$("#submitBtn").off('click');
			}
	}).apply(mcq_cyu);