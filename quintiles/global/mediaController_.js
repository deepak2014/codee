// JavaScript Document
var mediaController = {};

(function() {
    this.init = function() {//console.log('ini');
		$('.customAnimationTemplate #videoPlayer').trigger("load");
		//$('audio').trigger("load");
		$('.customAnimationTemplate #videoPlayer').on("loadeddata", function(){
			if(utils.detectDevice.any() == "iPad"){
				shell.mediaLoaded();
			}
		});
		$('.customAnimationTemplate #videoPlayer').on("playing", function(){
			shell.mediaLoaded();
		});
		$('.customAnimationTemplate #videoPlayer').on("play", function(){//console.log('aload');
			shell.mediaPlayed();
			$('.customAnimationTemplate #videoPlayer').trigger("play");
		});
		$('.customAnimationTemplate audio').on("play", function(){//console.log('aload');
			shell.mediaPlayed();
			$('.customAnimationTemplate audio').trigger("play");
		});
		$('.customAnimationTemplate #videoPlayer').on("pause", function(){//console.log('aload');
			shell.mediaPaused();
			$('.customAnimationTemplate #videoPlayer').trigger("paused");
		});
		$('.customAnimationTemplate audio').on("pause", function(){//console.log('aload');
			shell.mediaPaused();
			$('.customAnimationTemplate audio').trigger("paused");
		});
		$('.customAnimationTemplate #videoPlayer').on("playing", function(){//console.log('aload');
			shell.mediaLoaded();
		});
		$('.customAnimationTemplate audio').on("playing", function(){//console.log('aload');
			shell.mediaLoaded();
		});
		$('.customAnimationTemplate #videoPlayer').on("mediaEnded", function(){
			shell.mediaEnded();
		});
		$('.customAnimationTemplate audio').on("mediaEnded", function(){
			shell.mediaEnded();
		});
		$('.customAnimationTemplate #videoPlayer').on("mediaTogglePlay", function(){
			shell.mediaPlay();
		});
		$('.customAnimationTemplate audio').on("mediaTogglePlay", function(){
			shell.mediaPlay();
		});
		$('.customAnimationTemplate #videoPlayer').on("mediaReplay", function(){
			shell.mediaReplay();
		});
		$('.customAnimationTemplate audio').on("mediaReplay", function(){
			shell.mediaReplay();
		});
    }

    //GLOBAL VARIABLE DEC. START
    this.time2dArray = [];
    this.timeArrayCounter = 0;

    // Array is the list of time stamp when a custom event will be fired.!
    // this.inputTimeArray=[5,10,15,20];
    // this.inputTimeArray = [];

    

    // {"time":17,"isShown":true,"attribute_type":"action", "attribute_name":"first_action"}
    // inputTimeArray & customAnimationArray are linked with each other with index.
    // on 2 which is inputTimeArray[0] {"attribute_type":"image", "attribute_value":"dependency/img/poster.jpg"} will be picked from
    // customAnimationArray which is customAnimationArray[0]
    // So at 2 sec we will fire an image event with image as dependency/img/poster.jpg

    // CHANGE BUTTON LABEL
    this.toggleMediaForCustomEvent = function(mediaPlayer) {
        if (mediaController.time2dArray.length <= 0 || mediaController.time2dArray.length <= mediaController.timeArrayCounter) {
            //console.log('Array found empty or overflow case do nothing.!');
        } else {
            if ((mediaPlayer.currentTime > mediaController.time2dArray[mediaController.timeArrayCounter][1] && mediaPlayer.currentTime < (mediaController.time2dArray[mediaController.timeArrayCounter][1] + 0.9)) && mediaController.time2dArray[mediaController.timeArrayCounter][0]) {
                // mediaPlayer.togglePlay();
                mediaController.showCustomAnimation(mediaPlayer);
                mediaController.timeArrayCounter++;
            }
        }

    }

    /*
     *	Function receive 1D array of time
     *	and convert it into 2D array of [isconsumed, time]
     */
    this.generate2dFromTime = function(inputTimeArrayObject) {
		len = inputTimeArrayObject.length;
		// console.log('got the value!!! : '+inputTimeArrayObject);
        for (var i = 0; i < len; i++) {
            mediaController.time2dArray.push([true, inputTimeArrayObject[i]]);
        }

    }

    /*
     *	This function implement the logic of showing the
     * 	popup on event and their content
     */
    this.showCustomAnimation = function(mediaPlayer) {
		//
        var attributeType = customAnimationArray[mediaController.timeArrayCounter].attribute_type;
		//
        if (attributeType === 'image') {
            // show image popup
            showImagePopUp();
        } else if (attributeType === 'text') {
            // show text popup
            showTextPopUp();
        } else if (attributeType === 'action') {
			if (customAnimationArray[mediaController.timeArrayCounter].time == inputTimeArray[mediaController.timeArrayCounter]) {
				//console.log(customAnimationArray[mediaController.timeArrayCounter].hide)
				try {
					var tempArrayLineId = customAnimationArray[mediaController.timeArrayCounter].hide.split(',');
					for(var counter = 0; counter < tempArrayLineId.length; counter++ ){
						$('#'+tempArrayLineId[counter]).hide();
					}
				}
				catch(err) {
					// document.getElementById("demo").innerHTML = err.message;
				}
				$('#'+customAnimationArray[mediaController.timeArrayCounter].show1).show();
				$('#'+customAnimationArray[mediaController.timeArrayCounter].show2).show();
                $('#'+customAnimationArray[mediaController.timeArrayCounter].show3).show();
				//console.log(customAnimationArray[mediaController.timeArrayCounter].show1+" == "+customAnimationArray[mediaController.timeArrayCounter].animation1);
				//alert($('#'+customAnimationArray[mediaController.timeArrayCounter].animation2)+" == "+$('#'+customAnimationArray[mediaController.timeArrayCounter].animation1));
				$('#'+customAnimationArray[mediaController.timeArrayCounter].show1).velocity(customAnimationArray[mediaController.timeArrayCounter].animation1);
				$('#'+customAnimationArray[mediaController.timeArrayCounter].show2).velocity(customAnimationArray[mediaController.timeArrayCounter].animation2);
                $('#'+customAnimationArray[mediaController.timeArrayCounter].show3).velocity(customAnimationArray[mediaController.timeArrayCounter].animation3);
				
            }
			
        } else{
			var y = '#'+customAnimationArray[mediaController.timeArrayCounter].show1;
			var x =attributeType;
			animation.animateNow(x, y);
        }
    }

    /*
     * This function show the image popup on custom event
     */
    this.showImagePopUp = function() {
        var attributeValue = customAnimationArray[mediaController.timeArrayCounter].attribute_value;
        var attributeName = customAnimationArray[mediaController.timeArrayCounter].attribute_name;
        $('#haltDiv_image_tag').attr('src', attributeValue);
        $('#haltDiv_image').attr('name', attributeName);
        $('#haltDiv_image').show();
    }

    /*
     * This function show the image popup on custom event
     */
    this.showTextPopUp = function() {
        // console.log('inside');
        var attributeValue = customAnimationArray[mediaController.timeArrayCounter].attribute_value;
        var attributeName = customAnimationArray[mediaController.timeArrayCounter].attribute_name;
        $('#haltDiv_text').attr('name', attributeName);
        $('#haltDiv_text').attr('style', 'display:none;left: 50px;');
        $('#haltDiv_text_span').text(customAnimationArray[mediaController.timeArrayCounter].attribute_value);
        $('#haltDiv_text').show();
    }

    /*
     * This function close the popup and call toggle play.
     */
    this.closePopUpAndTogglePlay = function(elementId, mediaPlayer) { // close_overlay

        // console.log('inside closePopUpAndTogglePlay');
        elementId = elementId.replace('close_overlay', '');
        // console.log('elementId : '+elementId);
        $('#haltDiv' + elementId).hide();
        // mediaPlayer.togglePlay();
    }

    /*
     * Not in use currently
     */
    this.setPlayerDimensions = function(pHeight, pWidth) {

        $('#video_player').css('height', pHeight);
        $('#video_player').css('width', pWidth);
        $('#progressContainer').css('width', pWidth / 2);

    }

    this.closeUnseenPopUps = function(currentTime) {
        var newCurrent = Math.ceil(currentTime);
        for (var i = 0; i < customAnimationArray.length; i++) {
            if (newCurrent <= customAnimationArray[i].time) { // Closing the future popups
				if ($('#page').hasClass('customAnimationTemplate') ) {
					mediaController.caseOfFirstAnimationHide(customAnimationArray[i]);
				}
            } else {
				//console.log('Inside if 3');
				if ($('#page').hasClass('customAnimationTemplate') ) {
					//console.log('Inside if 4');
					mediaController.caseOfFirstAnimationShow(customAnimationArray[i]);
				}
				
                // incrementing the time counter
                mediaController.timeArrayCounter++;

            }
        }

    }

    this.animateText1 = function() {

        $("#haltDiv_text_1").animate({
            opacity: 1.0,
            top: "-=400"
        }, 5000, function() {
            // Animation complete.

        });

    }

    this.animateText2 = function() {

        $("#haltDiv_text_2").animate({
            opacity: 1.0,
            top: "-=300"
        }, 5000, function() {
            // Animation complete.

        });

    }

    this.animateText3 = function() {

        $("#haltDiv_text_3").animate({
            opacity: 1.0,
            top: "-=200"
        }, 5000, function() {
            // Animation complete.

        });

    }

    this.animateText4 = function() {

        $("#haltDiv_text_4").animate({
            opacity: 1.0,
            top: "-=100"
        }, 5000, function() {
            // Animation complete.

        });

    }

	// Function hide the popup which are related to future.
	this.caseOfFirstAnimationHide = function(inputAnimationObject){
	
		try {		
				var tempArrayLineId = inputAnimationObject.hide.split(',');
				for(var counter = 0; counter < tempArrayLineId.length; counter++ ){
					$('#'+tempArrayLineId[counter]).hide();
				}
			}
			catch(err) {
				// document.getElementById("demo").innerHTML = err.message;
			}
			
		$('#'+inputAnimationObject.show1).hide();
		$('#'+inputAnimationObject.show2).hide();
		$('#'+inputAnimationObject.show3).hide();
	}
	
		// Function hide the popup which are related to future.
	this.caseOfFirstAnimationShow = function(inputAnimationObject){
		try {		

					var tempArrayLineId = inputAnimationObject.hide.split(',');
					for(var counter = 0; counter < tempArrayLineId.length; counter++ ){
						$('#'+tempArrayLineId[counter]).hide();
					}
			}
			catch(err) {
				// document.getElementById("demo").innerHTML = err.message;
			}
			
		$('#'+inputAnimationObject.show1).show();
		$('#'+inputAnimationObject.show2).show();
		$('#'+inputAnimationObject.show3).show();
	}
	
	this.showTranscriptDiv = function(){
		// console.log('showTranscriptDiv called !!');
	
		$("#transcript-body-div").css('z-index', 1).animate({
            
            height: "100px",
			bottom: "+=50px",
			opacity: "+=1"
			
		},400,function(){
			$("#transcript-body-div").attr('isopen','true');
			$("#transcript-body-div").css('bottom','50px');
			$("#transcript-body-div").css('opacity','1');
		});
	}
	
	this.hideTranscriptDiv = function(){
		// console.log('hideTranscriptDiv called !!');
		
		$("#transcript-body-div").css('z-index', 0).animate({
           
            height: "-=60px",
			bottom: "-=50px",
			opacity: "-=1"
			
		},400,function(){
			$("#transcript-body-div").attr('isopen','false');
			$("#transcript-body-div").css('bottom','-10px');
			$("#transcript-body-div").css('opacity','0');
			//$('#transcriptContent').attr('data-show', "0");
			//$('#comingup_btn').removeClass('enableTranscript').addClass('disableTranscript');
		});
	}
	this.setTranscript = function(val){
		$('#transcriptContent').attr('data-show', "1");
		$('#comingup_btn').addClass('enableTranscript').removeClass('disableTranscript');
		$(".transcript-content").mCustomScrollbar("destroy");
		$('#transcriptContent').html(val);
		$(".transcript-content").mCustomScrollbar({ });
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
	
	this.reloadJsMediaComponent = function(){
		
		var head= document.getElementsByTagName('head')[0];
		var script= document.createElement('script');
		script.type= 'text/javascript';
		script.src= 'scripts/libs/script_generic_mediacontroller.js';
		head.appendChild(script);
	  
	  
		var head= document.getElementsByTagName('head')[0];
		var script= document.createElement('script');
		script.type= 'text/javascript';
		script.src= 'scripts/global/mediaController.js';
		head.appendChild(script);
	  
	}
	this.playMedia = function(){
		mediaPlayer.togglePlay();
	}
}).apply(mediaController);

