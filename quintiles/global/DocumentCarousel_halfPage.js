var documentCarousel_halfPage = {};

(function() {
    this.init = function() {
        //console.log('inside Document Carousel JS');
    }

    this.createDocumentCarousel = function() {

        var carousel = $("#carousel1").waterwheelCarousel({
            flankingItems: 3,
            movingToCenter: function($item) {
                $('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
            },
            movedToCenter: function($item) {
                $('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
            },
            movingFromCenter: function($item) {
                $('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
            },
            movedFromCenter: function($item) {
                $('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
            },
            clickedCenter: function($item) {
                $('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
            }
        });

        $('#prev').bind('click', function() {
            carousel.prev();
            return false
        });

        $('#next').bind('click', function() {
            carousel.next();
            return false;
        });

        $('#reload').bind('click', function() {
            newOptions = eval("(" + $('#newoptions').val() + ")");
            carousel.reload(newOptions);
            return false;
        });

        $('body').on('click', '.carousel-center', function() {
            documentCarousel_halfPage.openEnlargeImage(this.id);
        });

        $('[data-toggle="tooltip"]').tooltip();
		
		  (function() {
          var $section = $('.modal-body');
          $section.find('.panzoom').panzoom({
            $zoomIn: $section.find(".zoom-in"),
            $zoomOut: $section.find(".zoom-out"),
            $zoomRange: $section.find(".zoom-range"),
            $reset: $section.find(".reset"),
            startTransform: 'scale(1.0)',
            increment: 0.05,
            minScale: 1.0,
			maxScale: 1.6,
            contain: 'automatic'
          }).panzoom('zoom');
        })();

    }

    this.openEnlargeImage = function(imaged) {

		// console.log('clicked image id : '+imaged);
		var tempString = imaged.substr(0, 2);
		
		if(tempString === 'i-'){
			imaged = imaged.substring(2);
		}
		
		$('#imageText').html($('#'+imaged).attr('image-text'));
		
        $('.imagepreview').attr('src', 'assets/images/doc_carousel/' +$('#'+imaged).attr('enlarge-image'));
        $('#imagemodal').modal({
            backdrop: 'static',
            keyboard: false
        });
		
		$('.imagepreview').css('transform','matrix(1, 0, 0, 1, 0, 0)'); 
		
    }

    // function set the Tooltip for the image in html
    this.setImageToolTipInHtml = function(objectLength) {		
		
		for(var iCount = 0; iCount<objectLength; iCount++){
			var temp = 'item-' + (iCount+1);		
			var tempObj = dataObject[temp];
			var secondObj = 'tooltip';
			$('#'+temp).attr('data-original-title', tempObj[secondObj]);
		}
    }
	
	// function set the Thumbnail Image for the image in html
    this.setThumbnailImageInHtml = function(objectLength) {
		
		for(var iCount = 0; iCount<objectLength; iCount++){
			var temp = 'item-' + (iCount+1);
			var tempObj = dataObject[temp];
			var secondObj = 'thumbnailImage';
			$('#'+temp).attr('src', 'assets/images/doc_carousel/'+tempObj[secondObj]);
		}
		
    }
	
    // function set the Desc for the image in html
    this.setImageDescInHtml = function(objectLength) {

	for(var iCount = 0; iCount<objectLength; iCount++){
			var temp = 'item-' + (iCount+1);
			var tempObj = dataObject[temp];
			var secondObj = 'description';
			$('#'+temp).attr('desc', tempObj[secondObj]);
		}
		
    }

    // function set the Enlarged for the image in html
    this.setEnlargedImageInHtml = function(objectLength) {
		
		for(var iCount = 0; iCount<objectLength; iCount++){
			var temp = 'item-' + (iCount+1);
			var tempObj = dataObject[temp];
			var secondObj = 'largeImage';
			$('#'+temp).attr('enlarge-image', tempObj[secondObj]);
		}
    }

    // function set the title for the image in html
    this.setImageTitleInHtml = function(objectLength) {
		
		for(var iCount = 0; iCount<objectLength; iCount++){
			var temp = 'item-' + (iCount+1);
			var tempObj = dataObject[temp];
			var secondObj = 'title';
			$('#'+temp).attr('title', tempObj[secondObj]);
		}
    }

	this.radioButtonClicked = function(clickedRadioButtonId){
		$('#div-'+clickedRadioButtonId).attr('ismodified','true');
		
		$('.submit').removeAttr('disabled');
	}
	
	this.submitClicked = function(clickedRadioButtonId){
		// console.log('sumit Clicked');
		documentCarousel_halfPage.disbleOnSubmit();
		documentCarousel_halfPage.showFeedbackSign();
	}
	
	this.disbleOnSubmit = function(){
		$('.submit').attr('disabled','true');
		$('#halfStaticPage').css('cursor','default');
		$("input[type=radio]").attr('disabled', true);
		$('div .radio-primary').removeClass('checkBoxActive');
		$("input[name='radioInline1']").attr('onclick','return false');
	}
	
	this.showFeedbackSign = function(){
		for(var countObject=0; countObject<$("input[name='radioInline1']").length; countObject++){
			// console.log('inside for counter : '+countObject);
			/*if($('#div-inlineRadio'+countObject).attr('ismodified') == 'true'){
				console.log('inside 1st true');
				console.log('checked : '+$('#inlineRadio'+countObject).prop('checked'));
				console.log('istrue : '+$('#div-inlineRadio'+countObject).attr('istrue'));
				
				if($('#inlineRadio'+countObject).prop('checked') && $('#div-inlineRadio'+countObject).attr('istrue') == 'true'){
					console.log('log 1');
					$('#yes_checkBoxDiv_'+countObject).show();
				}else if( !$('#inlineRadio'+countObject).prop('checked') && $('#div-inlineRadio'+countObject).attr('istrue') == 'false'){
					console.log('log 2');
					$('#no_checkBoxDiv_'+countObject).show();
				}else if( $('#inlineRadio'+countObject).prop('checked') && $('#div-inlineRadio'+countObject).attr('istrue') == 'false'){
					console.log('log 2');
					$('#no_checkBoxDiv_'+countObject).show();
				}
			}else {
				// do nothing
			}*/
			
			if($('#inlineRadio'+countObject).prop('checked')){
				//console.log('inside 1st true');
				//console.log('checked : '+$('#inlineRadio'+countObject).prop('checked'));
				//console.log('istrue : '+$('#div-inlineRadio'+countObject).attr('istrue'));
				
				if($('#div-inlineRadio'+countObject).attr('istrue') == 'true'){
					//console.log('log 1');
					$('#yes_checkBoxDiv_'+countObject).show();
				}else if($('#div-inlineRadio'+countObject).attr('istrue') == 'false'){
					//console.log('log 2');
					$('#no_checkBoxDiv_'+countObject).show();
				}
			}else {
				// do nothing
			}
			
		}
	}
	
}).apply(documentCarousel_halfPage);