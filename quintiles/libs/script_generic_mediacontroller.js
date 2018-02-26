/*jslint browser: true*/
/*global $, jQuery, console*/
/*jslint indent: 4, maxerr: 50, vars: true, regexp: true, sloppy: true */
var mediaPlayer = '';
var tempMediaPlayer = '';
jQuery(document).ready(function($) {

    /*'use strict';*/

	// Patch to hide the volume button on clicking outside in the universe.
	/*$(document).click(function(e) {
		// console.log('testttttttttt :: '+e.target.id);
        if (e.target.id === 'volumeInc_btn' || e.target.id === 'sliderContainer') {
           //  alert('Div Clicked !!');
        } else {
			// console.log('test 11 ');
            $('#sliderContainer').hide();
        }
	});*/
	
	

    /***************************************/
    /***          INIT VARIABLES         ***/
    /***************************************/

    // GET MEDIA PLAYER ELEMENTS
    	mediaPlayer = document.getElementById('videoPlayer'),
        videoHolder = document.getElementById('videoPlayer'),
        playBtn = document.getElementById('play_btn'),
        stopBtn = document.getElementById('stop_btn'),
        volumeInc_btn = document.getElementById('volumeInc_btn'),
        progressBar = document.getElementById('progressContainer'),
        replay_btn = document.getElementById('replay_btn');
		sliderContainer = document.getElementById('sliderContainer');
		tempMediaPlayer = mediaPlayer;

    $('#progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);
    $('#currentTime').html('00:00');
	// $('.btn').attr('style','btn glyphicon glyphicon-play'); // play_btn
	$('#play_btn').attr('style','btn glyphicon glyphicon-play');
	
	if(utils.detectDevice.any() ) { // 
        setTimeout(function(){ 
                    $("#volumeInc_btn").hide(); // volumeInc_btn
                    $('#play_btn').addClass('glyphicon-play');
                    $('#play_btn').removeClass('glyphicon-pause');
        }, 100);
        
        if ($('#pageContainer').attr('data-templateid') == 'cra_splash_v1') {
            $("#pageDataBlocker").hide();
        }

		
	}
	

    // DISABLE VIDEO DEFAULT CONTROLS
    mediaPlayer.controls = false;

    // should pause media
    mediaPlayer.pauseMedia = true;

    // INITIALIZE VOLUME TO 50%
    mediaPlayer.volume = 0.5;
	
	 // console.log('1111111 : '+isMuted +',,,,,, volumeValue : '+volumeValue+',,,,,,,, mediaPlayer.volume : '+mediaPlayer.volume);
	if(volumeValue === 0 || isMuted){
		setTimeout(function(){
		$('.ui-slider-handle').css('bottom',0*100+'%'); // ui-slider-range
		$('.ui-slider-range').css('height',0*100+'%');		
			if(volumeValue === 0){
				// mediaPlayer.volume = 0;
				$("#videoPlayer").prop('muted', true);
			} else {
				$("#videoPlayer").prop('muted', true);
				mediaPlayer.volume = volumeValue;
			}
		}, 100);

		 //console.log('1111111');
	} else {
		
		setTimeout(function(){
			$('.ui-slider-handle').css('bottom',volumeValue*100+'%'); // ui-slider-range
			$('.ui-slider-range').css('height',volumeValue*100+'%');
			mediaPlayer.volume = volumeValue;			
		}, 100);
		
	}

    //console.log('inside media : ' + mediaPlayer);

    /***************************************/
    /***            FUNCTIONS            ***/
    /***************************************/

    // CHANGE BUTTON LABEL
    function changeButtonType(btn, remove, add) {
        $(btn).removeClass(remove);
        $(btn).addClass(add);
    }

    $('.custom-popup-closebtn').on('click', function(e) {
        var closeBlockId = $(this).attr('name');
        $('#' + closeBlockId).hide();
    });

    // PLAY/PAUSE ON BUTTON CLICK
    mediaPlayer.togglePlay = function() {
		$('.customAnimationTemplate #videoPlayer').trigger("mediaTogglePlay");
		$('.customAnimationTemplate audio').trigger("mediaTogglePlay");
		
        $('#sliderContainer').hide();

        var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
		
		// custom code for page 11 etmf m1_02_06.html
		if( percentage == 0 && $('#branchPageContainer').is(":visible")&& $('#play_btn').hasClass('glyphicon-play') ){
			// console.log($('#play_btn').hasClass('glyphicon-play'));
			mediaController.timeArrayCounter = 0;
			$('.partOfAnimation').hide();
		}
		
        /* if ($('#pageContainer').attr('data-pagename') === 'cra_animationplayer_v1.html' 
		|| $('#pageContainer').attr('data-pagename') === 'cra_animationplayer_v2.html' ) { */
            if (percentage === 100) {
				//console.log('hiii 1000000');
				// patch for IE.. to solve below problem.
				mediaPlayer.pause();
				/*
				 MP4 Page: When the mp4 gets completed, Play\Pause button needs to click twice in case of IE while in Chrome and Firefox mp4 is played with one click.
				 as in ie we get mediaPlayer.paused === false 
				*/
				
                mediaController.timeArrayCounter = 0;
				
				$('.partOfAnimation').hide();
            }
        // }

        // CHECK IF VIDEO IS RUNNING 
		
        if (mediaPlayer.paused === true) {
			//console.log('hiii 33');
            // Modifing the pauseMediaVariable 
            mediaPlayer.pauseMedia = true;
            mediaPlayer.play();
			
            changeButtonType(playBtn, 'glyphicon-play', 'glyphicon-pause');

        } else {
			
            mediaPlayer.pause();
            changeButtonType(playBtn, 'glyphicon-pause', 'glyphicon-play');

        }

    }


    // STOP MEDIA ON BUTTON CLICK
    function stopMedia() {
        //console.log('stopMedia');

        if ($('#pageContainer').attr('data-templateid') === 'cra_animationplayer_v1') {
            timeArrayCounter = 0;
        }
        mediaPlayer.pause();
        mediaPlayer.currentTime = 0;
        // reset play button
        changeButtonType(playBtn, 'glyphicon-pause', 'glyphicon-play');

    }


    // UPDATE PROGRESS BAR
    function updateProgressBar() {
		$('.customAnimationTemplate #videoPlayer').trigger("updateProgress");
		$('.customAnimationTemplate audio').trigger("updateProgress");

        var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
		//console.log(mediaPlayer.currentTime);
		// var percentage = (100 / mediaPlayer.duration) * mediaPlayer.currentTime;
		/*console.log(percentage);
		var widthValue = $('#progress-bar').css('width');
		widthValue = widthValue.substring(0, 3);
		widthValue = parseInt(widthValue);
		var pixelValue = (percentage/100)*widthValue;*/
		$('.player-drag-circle').css('left',percentage+'%');
		// $('#progress-bar').show().animate({width: percentage+'%' }, 1000);
		
        $('#progress-bar').css('width', percentage + '%').attr('aria-valuenow', percentage);

    }

    function setProgressWidth() {

        // GET THE WIDTH OF EACH ELEMENT IN THE MEDIA CONTROL SECTION (INCLUDING THE 45PX OF SPACE INBETWEEN)
        // AND SUBSTRACT THEM FROM TOTAL WIDTH TO CALCULATE THE SPACE LEFT AVAILABLE FOR THE PROGRESS BAR
        /*var widthAvailable = $('.media-controls').width() - $('#playControls').width() -
            $('#timeContainer').width() - $('#volumeControls').width() - 38 + "px";*/
			
			var widthAvailable = $('.media-controls').width() - $('#playControls').width() -
            $('#timeContainer').width() - $('#volumeControls').width() - 86 + "px";
			
        $('#progressContainer').css("width", widthAvailable);

    }



    // UPDATE PROGRESS BAR ON CLICK
    function updateProgressWidthOnClick(event) {

        $('#sliderContainer').hide();
        mediaController.timeArrayCounter = 0;

        var curserX = event.clientX;
		
		var widthAudioPlayer = $('#audio_player').width();
		
        var clickedPoint = curserX - ($('body').width() - widthAudioPlayer) / 2 - $('#playControls').width() - widthAudioPlayer*0.047  + "px";
		
	
        var clickedPoint = clickedPoint.slice(0, -2);
		

        var progressContainerLength = $('#progressContainer').width();
        var currentTime = (mediaPlayer.duration / progressContainerLength) * clickedPoint;
		
        currentTime = parseFloat(currentTime.toFixed(4));

        /////////////////////////////////////////////
        /////////////////////////////////////////////
        /////////////Need to remove /////////////////
        /////////////this custom code////////////////	
        /////////////////////////////////////////////
        /////////////////////////////////////////////
        // this is a custom block need to remove this
        if ($('#page').hasClass('customAnimationTemplate')) {
			mediaController.closeUnseenPopUps(currentTime);
        }
		// currentTime = parseInt(currentTime);
		
		currentTime = parseInt(currentTime);

        // update media time
		// document.getElementById('videoPlayer').load();
        document.getElementById('videoPlayer').currentTime = currentTime; // videoPlayer


        // update progress bar
        var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
        $('#progress-bar').css('width', percentage + '%').attr('aria-valuenow', percentage);

        // update current time display
    };



    // UPDATE CURRENT VIDEO TIME
    function updateTime() {

        var currentTime = document.getElementById('currentTime'),
            time;

        if (mediaPlayer.duration < 3600) {
            time = new Date(mediaPlayer.currentTime * 1000).toUTCString().replace(/.*(\d{2}:\d{2}).*/, "$1");
        } else {
            time = new Date(mediaPlayer.currentTime * 1000).toUTCString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
        }

        try {
            mediaController.toggleMediaForCustomEvent(mediaPlayer);
        } catch (e) {
            //console.log(e);
        }

		$('.customAnimationTemplate #videoPlayer').trigger("updateTime", [mediaPlayer]);
		$('.customAnimationTemplate audio').trigger("updateTime", [mediaPlayer]);
    }


    // SHOW OR HIDE SLIDER ON CLICK
    function showSlider() {
		
		//console.log('muted/ not : '+$("#videoPlayer").prop('muted'));
		
		if (isMuted) { // glyphicon-volume-up glyphicon-list-alt
			$("#videoPlayer").prop('muted', false);
			isMuted = false;
			$("#volumeInc_btn").removeClass('glyphicon-volume-mute');
			$("#volumeInc_btn").addClass('glyphicon-volume-up');
			//console.log('mediaPlayer.volume : '+mediaPlayer.volume);
			$('.ui-slider-handle').css('bottom',mediaPlayer.volume*100+'%'); // ui-slider-range
			$('.ui-slider-range').css('height',mediaPlayer.volume*100+'%');
			volumeValue = mediaPlayer.volume;
		} else {
			$("#videoPlayer").prop('muted', true);
			isMuted = true;
			$("#volumeInc_btn").removeClass('glyphicon-volume-up');
			$("#volumeInc_btn").addClass('glyphicon-volume-mute');
			//console.log('mediaPlayer.volume : '+mediaPlayer.volume);
			$('.ui-slider-handle').css('bottom','0%'); // ui-slider-range
			$('.ui-slider-range').css('height','0%');
			volumeValue = 0;
		}

    }
	
	
	// SHOW ON Hover
    function showSliderOnHover() {
        //console.log('Inside showSliderOnHover!!');
		$('#sliderContainer').fadeIn('slow');
	}
	
	// HIDE ON MOUSE OUT
    function hideSlider() {
		$('#sliderContainer').fadeOut('slow');
	}	
	

    // CHANGE VOLUME
    function changeVolume(volumeLevel) {

		$("#videoPlayer").prop('muted', false);
		isMuted = false;
        if (volumeLevel <= 0) {
            mediaPlayer.volume = 0;
			$("#videoPlayer").prop('muted', true);
			isMuted = true;
			$("#volumeInc_btn").removeClass('glyphicon-volume-up');
			$("#volumeInc_btn").addClass('glyphicon-volume-mute');
        } else {
            mediaPlayer.volume = volumeLevel;
			$("#videoPlayer").prop('muted', false);
			isMuted = false;
			$("#volumeInc_btn").removeClass('glyphicon-volume-mute');
			$("#volumeInc_btn").addClass('glyphicon-volume-up');
			
        }
		volumeValue = mediaPlayer.volume;
    }


    // MUTE VOLUME
    
    /*function muteVolume() {

        if (mediaPlayer.muted) {
            changeButtonType(this, 'Mute');
            mediaPlayer.muted = false;
        } else {
            changeButtonType(this, 'Unmute');
            mediaPlayer.muted = true;
        }

    }*/
    


    // REPLAY MEDIA
    function replayMedia() {
		$('.customAnimationTemplate #videoPlayer').trigger("mediaReplay");
		$('.customAnimationTemplate audio').trigger("mediaReplay");
		//
        if ($('#page').hasClass('customAnimationTemplate') ) {
			// console.log('before');
		   $('.partOfAnimation').hide();
			// console.log('after');
            mediaController.timeArrayCounter = 0;
        }
        mediaPlayer.currentTime = 0;
        mediaPlayer.play();
		if ($('#pageContainer').attr('data-templateid') == 'q1_cra_mp4player_v2') {
			$('#images').hide();
			$('.sub_popup').hide();

		}

        changeButtonType(playBtn, 'glyphicon-play', 'glyphicon-pause');

    }




    /***************************************/
    /***          SET LISTENERS         ***/
    /***************************************/

    // SET PROGRESS BAR WIDTH DYNAMICALL ON LOAD AND RESIZE!
    $(window).resize(setProgressWidth);
    setProgressWidth();

    // BINDING LISTENERS
    // commented for eTMF Courses
	if (disableProgressBar != 1){
		progressBar.onclick = updateProgressWidthOnClick;
	}
	videoHolder.onclick = mediaPlayer.togglePlay; //toggle play pause by clicking anywhere on video
    playBtn.onclick = mediaPlayer.togglePlay;
    stopBtn.onclick = stopMedia;
    mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
    mediaPlayer.addEventListener('timeupdate', updateTime, false);
    mediaPlayer.addEventListener("ended", function() {
        changeButtonType(playBtn, 'glyphicon-pause', 'glyphicon-play');
		// patch for IE
		mediaPlayer.pause();		
		// console.log('before js');
		// $('#progress-bar').css('width', '100%');
		$('#progress-bar').attr('aria-valuenow', 100);
		 setTimeout(function(){ 
			$('#progress-bar').attr('style', 'width: 100%');
        }, 50);
		
		if ($('#pageContainer').attr('data-templateid') == 'm1_01_04') {
			// shell.moveToPage(31);
			}
		$('.customAnimationTemplate #videoPlayer').trigger("mediaEnded");
		$('.customAnimationTemplate audio').trigger("mediaEnded");
    }, true);
    volumeInc_btn.onclick = showSlider;
	// volumeInc_btn.onmouseover = showSliderOnHover;
	//sliderContainer.onmouseout = hideSliderOnMouseOut;
	
    replay_btn.onclick = replayMedia;

/*	var audio_clock;
 
$(mediaPlayer).bind('timeupdate', updateProgressBar); // runSeekBar
$(mediaPlayer).bind('play', function(){
		audio_clock = setInterval(function(){
				updateProgressBar();
			}, 10);
	});
$(mediaPlayer).bind("pause", function(){
		clearInterval(audio_clock);
	});*/




    /*****************************************/
    /***        jQuery UI Slider          ***/
    /****************************************/

    $(function() {

        // CREATE AN INSTANCE ON THE SLIDE OBJECT
        var slider = $('#slider');

        slider.slider({
            range: "min",
            min: 0,
            max: 100,
            orientation: "vertical",
            value: 50,

            // EVENT WHEN SLIDER IS IN USE
            slide: function() {

                // GET THE VALUE OF THE SLIDER
                var value = slider.slider('value');

                // CALL PARENT FUNCTION TO CHANGE VOLUME
                changeVolume((value / 100).toFixed(1));

                // CHANGE BUTTON ICON ACCORDING TO VOLUME LEVEL
                if ((value / 100).toFixed(1) <= 0.0) {
                    $('#volumeInc_btn').removeClass('icon-volume-up icon-volume-down').addClass('icon-volume-off');
                } else if ((value / 100).toFixed(1) <= 0.4) {
                    $('#volumeInc_btn').removeClass('icon-volume-off icon-volume-up').addClass('icon-volume-down');
                } else if ((value / 100).toFixed(1) <= 0.8) {
                    $('#volumeInc_btn').removeClass('icon-volume-off icon-volume-down').addClass('icon-volume-up');
                }

            }

        });

    });

});
