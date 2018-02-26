xmlArray = [];
xmlArrayList = [];
var menu = {};

(function() {
	
	this.progressCount =  new Array($(shell.getXML()).find('module').length);
    this.forcedvalue = 0;
	this.init = function() {
		if(menu.progressCount.length <=0){
			for(var i = 0; i < $(shell.getXML()).find('module').length; i++) {
				menu.progressCount.push(0);
			}
		}
		
	}
    // this variable is being used many a times.
    // var progressCount = [100,20,0,10,30,40,50,60];
    // this.progressCount = [100, 20, 0, 30];
	

	this.selectedTabNumber = 0;
    xmlArray = [];
    xmlArrayList = [];

    this.loadXml = function(xml) {
		
		    this.count = 0;
		
                var i = 0;
				menu.forcedvalue = $(xml).find('modules').attr("forced"); 
				
                $(xml).find('module').each(function() {
				
					xmlArray = [];
                    var title = $(this).find('title').text();
                    var description = $(this).find('Description').text();
                    var topics = $(this).find('topics').text();
                    $('#title_' + i).html(title);
                    $('#desc_' + i).html(description)
					//
                    xmlArray[0] = $(this)[0].attributes.startpage.value; // 0 = startpage
                    xmlArray[1] = $(this)[0].attributes.tPage.value; // 1 = tPage
                    xmlArray[2] = $(this)[0].attributes.type.value; // 2 = type

						//console.log('inside this fn.');
                    xmlArray[3] = title; // 3 = title
                    xmlArray[4] = description; // 4 = description
                    xmlArray[5] = topics; // 5 = topics
                    xmlArrayList.push(xmlArray);
                    // function call to draw progress bar
					
					try {
						menu.progressCount[i];
					}
					catch(err) {
						menu.progressCount[i] = 0;
					}
					
					// CODE TO INCRESE THE MODULE COVERED PERCENTAGE START 
					var arr = shell.getPagesArray();
					var countVisitedPages = 0;
					var firstPage = xmlArray[0]; 
					var lastPage = (parseInt(xmlArray[0]) + parseInt(xmlArray[1]));
					for (var j = firstPage; j < lastPage; j++){
						if (arr[j] > 0){
							countVisitedPages++;	
						}
					} 
					//
					var percent = parseInt((countVisitedPages * 100) / xmlArray[1]);
					menu.progressCount[i] = percent;
					// CODE TO INCRESE THE MODULE COVERED PERCENTAGE ENDS 
					
                    menu.drawProgressBarDynamic(i);
					menu.updateProjectStatus();

                    i++;
                });
                $('.carousel-showmanymoveone .item').each(function() {
                    var itemToClone = $(this);
                    // console.log(itemToClone);
                    var tempSize = menu.progressCount.length;

					var tempSizeFromXml = $(shell.getXML()).find('module').length;
					if(tempSizeFromXml <= 4){
							$('.centerAlignImg').hide();
							// console.log
					}

					if(tempSizeFromXml < tempSize){
						tempSize = tempSizeFromXml;
						// $('.carousel-control').hide();
					}

                    if (tempSize > 4) {
                        tempSize = 4;
                    }

                    for (var i = 1; i < tempSize; i++) {
                        itemToClone = itemToClone.next();

                        // wrap around if at end of item collection
                        if (!itemToClone.length) {
                            itemToClone = $(this).siblings(':first');
                        }
                        // grab item, clone, add marker class, add to collection
                        itemToClone.children(':first-child').clone().addClass("cloneditem-" + (i)).appendTo($(this));
                    }
                });
				
				
				
				menu.toggleNextBack();
	       
    }
    this.disableNext = function() {
        $(".right").removeClass('custom-color'); //custom-color-light
        $(".right").addClass('custom-color-light');
    }

    this.enableNext = function() {
        $(".right").addClass('custom-color');
        $(".right").removeClass('custom-color-light');
    }

    this.disableBack = function() {
        $(".left").removeClass('custom-color'); //custom-color-light
        $(".left").addClass('custom-color-light');
    }

    this.enableBack = function() {
        $(".left").addClass('custom-color');
        $(".left").removeClass('custom-color-light');
    }

    this.toggleNextBack = function() {

        if (menu.progressCount.length <= 4) {
            menu.disableNext();
            menu.disableBack();
            //console.log('1');
        } else if (menu.progressCount.length > 0 && menu.progressCount.length > 4) {
            //console.log('3');
            menu.enableBack();
            menu.enableNext();
        } else {
            //console.log('Do nothing');
        }

    }

    /*
     * function to return the value of the attribute 
     * by passing counter of the module and the attribute name 
     * like('startpage','tPage','type','title','description','topics') 
     * Function to be exposed
     */
    this.returnAttrForModule = function(count, attr) {

        if (attr === 'startpage') {
            return xmlArrayList[count][0];
        }

        if (attr === 'tPage') {
            return xmlArrayList[count][1];
        }

        if (attr === 'type') {
            return xmlArrayList[count][2];
        }

        if (attr === 'title') {
            return xmlArrayList[count][3];
        }

        if (attr === 'description') {
            return xmlArrayList[count][4];
        }

        if (attr === 'topics') {
            return xmlArrayList[count][5];
        }

    }

    /*
     * Function to draw the progress circle.
     */
    this.drawProgressBarDynamic = function(inputCount) {

        $('#circle_' + inputCount).progressCircle({
            nPercent: menu.progressCount[inputCount],
            showPercentText: true,
            thickness: 3,
            circleSize: 100
        });
    }

    /*
     * function to be exposed
	 * to the client to draw progress bar dynamic.
	 * this functioon do not update the array just draw progress bar
	 * with new value.
     */
    this.drawProgressBarPerCircle = function(inputCount, percentageValue) {
		
		menu.progressCount[inputCount] = percentageValue;
		
        $('div#circle_' + inputCount).progressCircle({
            nPercent: percentageValue,
            showPercentText: true,
            thickness: 3,
            circleSize: 100
        });
    }

    /*
    * Function draw the checked unlock and locked icon on the project.
    */
    this.updateProjectStatus = function() {

        for (var i = 0; i < menu.progressCount.length; i++) {
            if (menu.progressCount[i] === 0) {
				$('i#course_status_' + i).removeClass('fa-check');
				$('i#course_status_' + i).removeClass('fa-unlock-alt');
				$('div#circle_color_' + i).removeClass('green-circle'); 
			
				$('i#course_status_' + i).addClass('fa-lock');
                $('div#circle_color_' + i).addClass('gray-circle'); // green-circle gray-circle

            } else if (menu.progressCount[i] > 0 && menu.progressCount[i] < 100) {
				$('i#course_status_' + i).removeClass('fa-check');
				$('i#course_status_' + i).removeClass('fa-lock');
				$('div#circle_color_' + i).removeClass('gray-circle');                
				
				$('div#circle_color_' + i).addClass('green-circle');
                $('i#course_status_' + i).addClass('fa-unlock-alt');
            } else {
				$('i#course_status_' + i).removeClass('fa-unlock-alt');
				$('i#course_status_' + i).removeClass('fa-lock');
				$('div#circle_color_' + i).removeClass('gray-circle');
				
                $('div#circle_color_' + i).addClass('green-circle');
                $('i#course_status_' + i).addClass('fa-check');
            }
        }

    }

   /*
    * Function draw the checked unlock and locked icon on the project.
    * Function to be exposed
    */
    this.updateProjectStatusForEachModule = function(inputCount, percentageValue) {
		menu.progressCount[inputCount] = percentageValue;
		menu.updateProjectStatus(); 	
    }
	
    generateHtmlForDropDown();
    // Draw project status
    menu.updateProjectStatus();
	
	/*
	* Function to be exposed.
	* highlight the selected tab.
	*/
	this.markSelectedTabByItemCount =  function(tabCounter) {
		menu.selectedTabNumber = tabCounter;
		$('div.header-bar').hide();
		$('div#header_bar_'+tabCounter).show();
	}
	
	this.makeMenuEnableDisable = function(){
		if(menu.forcedvalue == 0){
			// console.log('forced : '+menu.forcedvalue);
			// menu.greyOutMenuBlock();
			setTimeout(function(){menu.greyOutMenuBlock()}, 50);
		} else{
			// console.log('forced : '+menu.forcedvalue);
		}
	}
	
	this.greyOutMenuBlock = function(){
		$('div#active_0').addClass('activeObj');
		for(var countNumber=1; countNumber < menu.progressCount.length; countNumber++){
			// console.log('menu.progressCount[countNumber-1] : '+menu.progressCount[countNumber-1]);
			if (menu.progressCount[countNumber-1] < 100){
				$('div#active_'+(countNumber)).removeClass('activeObj');
				$('div#active_'+(countNumber)).addClass('inactiveObj');
			}else{
				$('div#active_'+(countNumber)).removeClass('inactiveObj');
				$('div#active_'+(countNumber)).addClass('activeObj');
			}
		}
	}

}).apply(menu);

function markSelectedTab(e) {
	var tempMyString = $(e).attr('id');
	var tempId = tempMyString[tempMyString.length -1];
	
	if (!$('#active_'+tempId).hasClass('inactiveObj')){
		var startPage = menu.returnAttrForModule(tempId, 'startpage');
		menu.selectedTabNumber = parseInt(tempId);
		$('div.header-bar').hide();
		$('div#header_bar_'+tempId).show();
		//
		// assessment.setAssessment(0);
		shell.moveToPage(startPage);
		shell.closePopup();
		shell.toggleMenu();
	}
}
