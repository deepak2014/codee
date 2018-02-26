
		  
function drawMenuPopUp(moduleCount, size){
	
	// console.log('inside drawMenuPopUp');
	
	var test = ''
	var activeClass = ''
	var activeTab = '';
	if(moduleCount === 0){
		test = 'active';
		//activeTab = 'active-border-top';
	} else{
		
		// activeTab = ' dactive-border ';
	}
	
	var lengthValueTemp = $(shell.getXML()).find('module').length;
	var lineHtml = '';
	if(moduleCount+1 < lengthValueTemp){
			lineHtml = '<div class="box-divider"></div>';
	}
	
	
	
	if(size === 1){
		activeClass = activeClass + ' col-md-12';
	} else if(size === 2){
		activeClass = activeClass + ' col-md-6';
	} else if(size === 3){
		activeClass = activeClass + ' col-md-4';
	} else {
		activeClass = activeClass + ' col-md-3';
	}
	
	var number = moduleCount+1;
		if ( number < 10 ) {
            number =  "0" + number;
        } else {
            number = number;
        }
	var clickId = 'active_'+moduleCount;
	var onClickValue = 'menu.markSelectedTab("'+clickId+'")';
	var menu = '<div class="item ' +test+'" id="'+moduleCount+'" >';
		menu = menu + ' <div id="active_'+moduleCount+'"  class=" switchstatus p-l-0 col-xs-12 col-sm-6 '+activeClass+'">';
		menu = menu + ' <div id="active_in_'+moduleCount+'" onclick="markSelectedTab(this)" class="p-t-b-35 '+activeTab+'"> <div class="active-border p-12"> <div class="row"> ';
		menu = menu + ' <div class="col-xs-6 col-sm-6"><span class="sub-h-1">'+number+'</span></div> ';
		menu = menu + ' <div class="col-xs-6 col-sm-6 p-t-5"><div id="circle_'+moduleCount+'"></div></div></div>  ';
		menu = menu + ' <p class="text-h-1" id="title_'+moduleCount+'"></p>';
		menu = menu + ' <p class="text-p-1 p-r-5" id="desc_'+moduleCount+'" ></p> </div>';
		menu = menu + ' <div class="p-10 text-right"><div class="" id="circle_color_'+moduleCount+'" ><i id="course_status_'+moduleCount+'" " class="fa" aria-hidden="true"></i></div></div><div id="header_bar_'+moduleCount+'" class="header-bar" style="display:none;"></div>'+lineHtml+'</div></div></div> <!-- Build one set -->';
		
		return menu;
	
}



function generateHtmlForDropDown(){
	// console.log('inside');
	var html = '';
	
	var lengthValue = $(shell.getXML()).find('module').length;
	
	if(menu.progressCount.length < lengthValue){
		// lengthValue = menu.progressCount.length;
	}
	
	for(var i=0; i< lengthValue; i++){
		// console.log('6666666666');
		html = html + ' ' +drawMenuPopUp(i, lengthValue) ;
	}
	
	$('#dynamic_html').html(html);
}


