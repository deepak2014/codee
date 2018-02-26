/*
###  jQuery cssInjector Plugin v1.0 - 2017-05-04  ###
This is a simple jQuery plugin to inject css inside iframe.
*/
(function(){
	$.fn.cssInjector = function(options){
		//Internal variable declaration
		//this.initVarIfAny;

		//Defaults
		var defaults = {
		}

		//Overriding default variables
		this.settings = $.extend( {}, defaults, options );

		//Creating load method to load the content to the server
		this.inject = function(cssPath){
			if(cssPath != null){
                var $head = this.contents().find("head");
                    $head.append($("<link/>"
                                   , {
                                        rel: "stylesheet"
                                        , href: cssPath
                                        , type: "text/css" }));
			}
			return this;
		}
		return this;
	}
})(jQuery)
