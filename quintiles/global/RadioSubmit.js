var radioSubmit = {};

(function() {
	var correctAnswer = [2,3];
	var correctFeedback = "That's Correct.";
	var inCorrectFeedback = "That's Incorrect.";
	var feedbackType = "1";
	var maxattempts = 2;
	var attempts = 0;
	var items = [];
	var countForSubmit = 0;

	this.isCorrect = true;

    this.init = function() {
        ////console.log('inside RadioSubmit JS');
		(function() {
          var $section = $('.radio-panzoom');
          $section.find('.panzoom').panzoom({
            $zoomIn: $section.find(".zoom-in"),
            $zoomOut: $section.find(".zoom-out"),
            $zoomRange: $section.find(".zoom-range"),
            $reset: $section.find(".reset"),
            startTransform: 'scale(1)',
            increment: 0.05,
            minScale: 1,
			maxScale: 1.6,
            contain: 'invert'
          }).panzoom('zoom');
        })();
		
		
	$("input:radio").click(function() {
        var value = $(this).val();
		
        var nameValue = $(this).attr('name');
		var lastChar = nameValue[nameValue.length -1];
        ////console.log('lastChar1 : '+lastChar);
		lastChar = 'radio'+lastChar;
		////console.log('lastChar2 : '+lastChar);
		
		if( $('#'+lastChar).attr('ischecked') === 'false' ){
			$('#'+lastChar).attr('ischecked','true');
			countForSubmit++;
		}
		
		$('#'+lastChar).attr('value',value);
		
		if(countForSubmit == 9){
			$('.submit').addClass('submit-hover');
		}
		
    });
	
		
	$(document).on('click', '.submit-hover', function(){
		attempts++;
		// what you want to happen when mouseover and mouseout 
		// occurs on elements that match '.dosomething'
		radioSubmit.isCorrect = true;
		for(var tempCounter=1; tempCounter <= 9; tempCounter++){
			var keyObject = $('#radio'+tempCounter).attr('key');
            var valueObject = $('#radio'+tempCounter).attr('value');
			var valueObjectNew = $('#radio'+tempCounter).attr('value-object');
			if(valueObject != valueObjectNew){
				radioSubmit.isCorrect = false;
				break;
			}
			items[tempCounter] = valueObject;
		}
		
		if(!radioSubmit.isCorrect){
			if (attempts < radioSubmit.getAttempts()){
				feedback.setFeedback(radioSubmit.getIncorrectFeedback());
				feedback.showTryAgainFeedback(radioSubmit.getFeedbackType());
			}else if (attempts == radioSubmit.getAttempts()){
				radioSubmit.showAnswerOfradioSubmit();
			}
		} else {
			radioSubmit.disableRadioButtons();
			feedback.setFeedback(radioSubmit.getCorrectFeedback());
			feedback.showCorrectFeedback(radioSubmit.getFeedbackType());
		}
	});
    }
	this.disableRadioButtons = function(){
		$("input[type=radio]").attr('disabled', true);
		
		$('.submit').removeClass('submit-hover');
	}
	this.showAnswerOfradioSubmit = function(){
		$("#inlineRadio2").prop("checked", true);
		$("#inlineRadio4").prop("checked", true);
		$("#inlineRadio5").prop("checked", true);
		$("#inlineRadio7").prop("checked", true);
		$("#inlineRadio9").prop("checked", true);
		$("#inlineRadio12").prop("checked", true);
		$("#inlineRadio14").prop("checked", true);
		$("#inlineRadio16").prop("checked", true);
		$("#inlineRadio18").prop("checked", true);
		//
		radioSubmit.disableRadioButtons();
	}


		this.setCorrectAnswer = function(val){
			correctAnswer = val;
		}
		this.getCorrectAnswer = function(){
			return correctAnswer;
		}
		this.setCorrectFeedback = function(val){
			correctFeedback = val;
		}
		this.getCorrectFeedback = function(){
			return correctFeedback;
		}
		this.setIncorrectFeedback = function(val){
			inCorrectFeedback = val;
		}
		this.getIncorrectFeedback = function(){
			return inCorrectFeedback;
		}
		this.setFeedbackType = function(val){
			feedbackType = val;	
		}
		this.getFeedbackType = function(){
			return feedbackType;	
		}
		this.setAttempts = function(val){
			maxattempts = val;	
		}
		this.getAttempts = function(){
			return maxattempts;	
		}
		this.setInstructionText = function(val){
			$('#instructionText').html(val);
		}
		this.setImage = function(val){
			$('#zoomImage').attr('src', imagePath+val);
		}
}).apply(radioSubmit);
