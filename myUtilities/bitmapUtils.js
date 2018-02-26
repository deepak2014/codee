/*
###  jQuery bitmapUtils Plugin v1.0 - 2017-09-21  ###
This is a jQuery plugin to process bitmap data
*/
(function(){
	$.fn.bitmapUtils = function(options){
		//Internal variable declaration
		//this.initVarIfAny;

		//Defaults
		var defaults = {
            quality: 1      //0-1
		}

		//Overriding default variables
		this.settings = $.extend( {}, defaults, options );

		this.getBitmap = function(bitmapData, dimensions){
            var defaultDimensions   = {
                x: 0
                , y: 0
                , width: bitmapData.naturalWidth
                , height: bitmapData.naturalHeight
            }
            var $placeholderCanvas  = $('<canvas />').attr({
                                                                width: bitmapData.naturalWidth
                                                                , height: bitmapData.naturalHeight
                                                            });
            var placeholderCanvas   = $placeholderCanvas[0];
            var canvasContext       = placeholderCanvas.getContext("2d")
            canvasContext.drawImage(bitmapData
                                    , defaultDimensions.x
                                    , defaultDimensions.y
                                    , defaultDimensions.width
                                    , defaultDimensions.height
                                    );

			pixelData = canvasContext.getImageData(
                                                            dimensions.x
                                                            , dimensions.y
                                                            , dimensions.width
                                                            , dimensions.height
                                                            );
            $placeholderCanvas
                                .attr({
                                        width: dimensions.width
                                        , height: dimensions.height
                                    });
            placeholderCanvas   = $placeholderCanvas[0];
            canvasContext       = placeholderCanvas.getContext("2d")
            canvasContext.putImageData(pixelData, 0, 0)
            return placeholderCanvas.toDataURL();
		}
		return this;
	}
})(jQuery)
