var choiceSelection = {};

var textArray = ["<p>FirstFirst  FirstFirst FirstFirst FirstFirst </p><p> dfd fds fds dsfd fd fsdfs dfd f fs df dsf dssd ds d</p>","<p>SecondSecond SecondSecondSecondSecondSecond SecondSecondSecon dSecondSecondSecondSecond SecondSecond</p>","ThirdThirdThird ThirdThird ThirdThirdThird ThirdThirdThirdThird ThirdThirdThird"];	
var global_blockvalue=0; 

function setContentIntextblock(){
calledFromPopUp(global_blockvalue);

//console.log(textArray[global_blockvalue]);
}

function choiceClicked(){
			
			try{
				if(tempMediaPlayer.paused === false){
					tempMediaPlayer.togglePlay();
				}				
			} catch(e){}
			//
			//console.log(choiceClicked);
			global_blockvalue = ($(this).attr('id').split('_')[1]);
			popupId  = global_blockvalue;
			
			$('#popup').addClass('halfPopup');
			shell.loadPopupPage("cra_choicescreen_popup.html");
			//setTimeout("setContentIntextblock();",1000);
		}

(function() {
    this.init = function() {

    }


		this.closechoiceSelectionPopUp = function(){
			shell.closePopup();
		}
		/*
		*	Function remove the auto 
		*	play functionality of audio/video tag.	
		*/
		this.stopAutoPlay = function(mediaType){
			if('audio' === mediaType){
				$('audio').removeAttr("autoplay");
			} else if('video' === mediaType){
				$('video').removeAttr("autoplay");
			} else{
				//console.log('Lost in universe');
			}
		}
		/*
		*	Function set the src attribute for 
		*	video or audio tag
		*/
		this.setSrcAttribute = function(mediaType, srcAttribute){
			if('audio' === mediaType){
				$('audio source').attr('src',srcAttribute);
				
			} else if('video' === mediaType){
				$('video source').attr('src',srcAttribute);
			} else{
				//console.log('Lost in universe');
			}
			
		}
		
		/*
		* function toggle the document between 
		* selected and normal state.
		*/
		
		/*
		* function create object with elementId 
		* and document name of clicked documents
		*/
		
		
		
		this.closePopUp = function(){

			$('#popup').removeClass('halfPopup');
			shell.closePopup();
		}
		
		
}).apply(choiceSelection);


