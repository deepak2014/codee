(function(){
	$.fn.modalBox = function(options){
		this.popup;
		var settings = $.extend({
			modelTitle:'Title',
			modelText:'sample text',
			holderSelector:'',
    		resizable: false,
			closeOnBackground: true,
			buttons:[{
						text:'OK',
						click:function(){
							$( this ).dialog( "close" ); 
						}
						}], //default only 1 'ok 'button will be displayed
			closeHandler:null,
			handlers:[null]
        }, options );
		
		this.init = function(){
			this.popup = $(this.selector);
			if(this.popup.length == 0){
				return;
			}
			this.popup.html(settings.modelText);
			var configurationOptions = {
				resizable: true,
				height: 'auto',
				width: 200,
				modal: true,
    			resizable: false,
				title: settings.modelTitle,
				buttons: settings.buttons, 
				close: settings.closeHandler
			}
			//create here
			this.popup.dialog(configurationOptions);
			this.closeOnBackgroundClicked();
			return this;
		}
		
		this.closeOnBackgroundClicked = function(){
			if(settings.closeOnBackground){
				$('.ui-widget-overlay').bind('click', function(){
					$('.ui-dialog-titlebar button').trigger('click');
				});
				
			}
		},
		/*
		this.show = function(){
			this.popup.show();
			return this;
		}
		this.hide = function(){
			this.popup.show();
			return this;
		}
		*/
		this.close = function(){
			$( this ).dialog( "close" );
			return this;
		}
		this.init();
		return this;
	}
}(jQuery));