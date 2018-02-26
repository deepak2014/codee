/*
###  jQuery Content loader Plugin v1.0 - 2014-09-30  ###
###  updated v1.1 - 2017-03-29  ###
This is a simple jQuery plugin to load the content to the server.
*/
(function(){
	$.fn.contentLoader = function(options){
		//Internal variable declaration
		//this.initVarIfAny;

		//Defaults
		var defaults = {
			method: "GET",
			path: null,
			data: '',
			dataType: 'xml', 				//xml, json, jsonp, text, script, or html
			processData: true, 
			contentType: false,
			successHandler: function(){},
			failureHandler: function(){}
		}

		//Overriding default variables
		this.settings = $.extend( {}, defaults, options );

		//Creating load method to load the content to the server
		this.load = function(){
			if(this.settings.path == null){
				if(this.settings.failureHandler != null){
					this.settings.failureHandler();
				}
			}else{
				var successHandler = this.settings.successHandler;
				var failureHandler = this.settings.failureHandler;
				$.ajax({
					type : this.settings.method,
					url : this.settings.path,
					data : this.settings.data,
					datatype : this.settings.dataType,

					cache: false,
					contentType: this.settings.contentType,	//application/x-www-form-urlencoded, multipart/form-data, application/json; charset=utf-8 or text/plain 
					processData: this.settings.processData,

					success:function(data){
						successHandler(data);
					},
					error: function(xhr){
						failureHandler(xhr);
					}
				});
			}
			return this;
		}
		return this;
	}
})(jQuery)
