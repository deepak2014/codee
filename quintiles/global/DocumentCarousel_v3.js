var documentCarousel = {};

(function() {
    this.init = function() {
        //console.log('inside Document Carousel JS');
    }

    this.createDocumentCarousel = function() {

        var carousel = $("#carousel").waterwheelCarousel({
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
		//debugger;
		// if(this.id)
		// {
			
		// }
            documentCarousel.openEnlargeImage(this.id);
        });

        $('[data-toggle="tooltip"]').tooltip();
		
		  (function() {
          var $section = $('.modal-body');
          $section.find('.panzoom').panzoom({
            $zoomIn: $section.find(".zoom-in"),
            $zoomOut: $section.find(".zoom-out"),
           // $zoomRange: $section.find(".zoom-range"),
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
		//debugger;
		// console.log('clicked image id : '+imaged);
		var tempString = imaged.substr(0, 2);
		if(tempString === 'i-'){
			imaged = imaged.substring(2);
		}
		
		$('.header-shadow').hide();	
		$('.header-shadow2').hide();
		$('.header-shadow1').hide();
		$('.header-shadow4').hide();
		
		var classImage = "",
			classImageBg = "";
			
		$('#imageText').html($('#'+imaged).attr('image-text'));
		
		switch (imaged) {
			case "item-1":
				classImage 	= ".header-shadow";
				break;
			case "item-2":
				classImage 	= ".header-shadow2";
				break;
			case "item-3":
				classImage 	= ".header-shadow1";
				 break;
			 case "item-4":
				classImage 	= ".header-shadow4";
				 break;
		 }
		 
		$('.imagepreview').addClass('thumbpopup');
		$('.imagepreview').css('background-image', 'url(assets/images/local/' +$('#'+imaged).attr('enlarge-image')+')');
        $('#imagemodal').modal({
            backdrop: 'static',
            keyboard: false
        });
        
		
		$(classImage).show();
		$(classImage).css({"background-image": classImageBg});
		$(classImage).css('transform','matrix(1, 0, 0, 1, 0, 0)'); 
		
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

}).apply(documentCarousel);