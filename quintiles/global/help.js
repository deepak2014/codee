// JavaScript Document

var help = {};

(function(){

	

	this.closePopup = function(){
		//alert("closePopup");
		$('#helpBtn').removeClass('open');
		shell.closePopup();
	}
	this.showfirst = function(){
		//alert("inshowsecond");
		$('#first_help_block').show();
		$('#second_help_block').hide();
		$('#third_help_block').hide();
	}
	this.showsecond = function(){
		//alert("inshowsecond");
		$('#first_help_block').hide();
		$('#second_help_block').show();
		$('#third_help_block').hide();
	}
	
	this.showthird = function(){
		//alert("inshowthird");
		$('#first_help_block').hide();
		$('#second_help_block').hide();
		$('#third_help_block').show();
		//$("#third_click_block").fadeIn(3000);
	}
	this.showfourth = function(){
		//alert("inshowfourth");
		$('#third_help_block').hide();
		$('#fourth_help_block').show();
		//$("#fourth_click_block").fadeIn(3000);
	}	
	this.showglossary = function(){
		//alert("inshowfourth");
		$('#click_resourse_block').hide();
		$('#click_exit_block').hide();
		$('#click_close_block').hide();
		$('#click_glossary_block').show();
	}
	this.showresourse = function(){
		$('#click_glossary_block').hide();
		$('#click_exit_block').hide();
		$('#click_close_block').hide();
		$('#click_resourse_block').show();
	}
	this.showexit = function(){
		//alert("inshowfourth");
		$('#click_glossary_block').hide();
		$('#click_resourse_block').hide();
		$('#click_close_block').hide();
		$('#click_exit_block').show();
	}
	this.showclose = function(){
		//alert("inshowfourth");
		$('#click_glossary_block').hide();
		$('#click_resourse_block').hide();
		$('#click_exit_block').hide();
		$('#click_close_block').show();
	}
	this.showplay_pause = function(){
		//alert("inshowfourth");
		$('#volume_block').hide();
		$('#transcript_block').hide();
		$('#replay_block').hide();
		$('#play_pause_block').show();
	}	
	this.showvolume = function(){
		//alert("inshowfourth");
		$('#transcript_block').hide();
		$('#replay_block').hide();
		$('#play_pause_block').hide();
		$('#volume_block').show();
	}	
	this.showtranscript = function(){
		//alert("inshowfourth");
		$('#volume_block').hide();
		$('#replay_block').hide();
		$('#play_pause_block').hide();
		$('#transcript_block').show();
	}	
	this.showreplay = function(){
		//alert("inshowfourth");
		$('#volume_block').hide();
		$('#transcript_block').hide();
		$('#play_pause_block').hide();
		$('#replay_block').show();
	}
	
	
}).apply(help);