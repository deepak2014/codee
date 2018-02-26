// JavaScript Document

(function() {
	var feedbackLabel = "Looks like you missed one or more critical aspects.";	
	
	this.init = function(){
	}
	this.setFeedback = function(val){
		feedbackLabel = val;	
	}
	this.getFeedback = function(){
		return feedbackLabel;	
	}
	this.createFeedback = function(type){
		//var feedbackPopup = "<div id='feedbackPopup' class='feedbackPopup'><div id='feedbackHeader' class='feedbackHeader'></div><div id='feedbackBody' class='feedbackBody'></div><div class='feedbackBG'><div id='feedbackTryAgainSymbol' class='feedbackTryAgainSymbol'></div><span class='feedbackOops'>Oops!</span><div id='feedbackLabel' class='feedbackLabel'></div><div id='feedbackTryAgain' class='feedbackTryAgain'></div></div></div>";
		var feedbackPopup = "<div id='feedbackPopup' class='feedbackPopup'><div id='feedbackHeader' class='feedbackHeader'></div><div id='feedbackBody' class='feedbackBody'></div><div class='feedbackBG'><div id='feedbackTryAgainSymbol' class='feedbackTryAgainSymbol'></div><div id='feedbackLabel' class='feedbackLabel'></div><div id='feedbackTryAgain' class='feedbackTryAgain'></div></div></div>";
		//
		$('#mainContainer').append(feedbackPopup);
		$('#mainContainer #feedbackPopup').show();
		$('#mainContainer #feedbackTryAgain').off().on('click', onTryAgain);	
	}
	this.showTryAgainFeedback = function(type){
		feedback.createFeedback(type);
		//
		$('#mainContainer #feedbackTryAgain').html(tryAgainLabel);
		$('#mainContainer #feedbackLabel').html(feedback.getFeedback());
	}
	this.showCorrectFeedback = function(type){
		feedback.createFeedback(type);
		$('#mainContainer #feedbackTryAgain').html(closeLabel);
		$('#mainContainer #feedbackTryAgainSymbol').addClass("feedbackTryAgainSymbol_correct");
		//
		$('#mainContainer #feedbackLabel').html(feedback.getFeedback());
	}
	var onTryAgain = function(){
		$('#mainContainer #feedbackPopup').hide();
		$('#mainContainer #feedbackPopup').remove();
	}
}).apply(feedback);