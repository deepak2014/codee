// JavaScript Document
(function() {
	//
	this.init = function(){
		$('#zoomIn').on("click touchstart", zoombox.zoomIn);

		$('#zoomOut').on("click touchstart", zoombox.zoomOut);

		$('#zoomReset').on("click touchstart", zoombox.reset);
	}
	this.zoomIn = function(){
		$('#zoomOut').removeClass('disabled-zoom');
		$('#zoomReset').removeClass('disabled-zoom');
						
		if($('.panzoom').css('transform') == 'matrix(1.6, 0, 0, 1.6, 0, 0)' && !$('#zoomIn').hasClass('disabled-zoom')){
			$('#zoomIn').addClass('disabled-zoom');
		}
	}
	this.zoomOut = function(){
		$('#zoomIn').removeClass('disabled-zoom');
		
		if($('.panzoom').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)' && !$('#zoomOut').hasClass('disabled-zoom')){
			$('#zoomOut').addClass('disabled-zoom');
			$('#zoomReset').addClass('disabled-zoom');
		}
	}
	
	this.reset = function(){
		if(!$('#zoomReset').hasClass('disabled-zoom')){
			$('#zoomReset').addClass('disabled-zoom');
			$('#zoomOut').addClass('disabled-zoom');
		}
		$('#zoomIn').removeClass('disabled-zoom');
	}
}).apply(zoombox);