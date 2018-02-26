//
xmlArray = [];
xmlArrayList = [];

(function() {
	
	this.progressCount;
    this.forcedvalue = 0;
	this.init = function() {
		var xml = shell.getXML();
		menu.progressCount =  new Array($(xml).find('module').length);
		menu.forcedvalue = $(xml).find('modules').attr("forced"); 
		//
		var len = menu.progressCount.length;
		if(len >=0){
			for(var i = 0; i < len; i++) {
				menu.progressCount[i] = (0);
                //$('#active_'+i).on('click', markSelectedTab);
			}
		}
		generateHtmlForDropDown();
		// Draw project status
		menu.updateProjectStatus();
		
	}
    // this variable is being used many a times.
    // var progressCount = [100,20,0,10,30,40,50,60];
    // this.progressCount = [100, 20, 0, 30];
	this.selectedTabNumber = 0;
    xmlArray = [];
    xmlArrayList = [];
	//
    this.loadXml = function(xml) {
		
		    this.count = 0;
		
                var i = 0;
				
				var percent = shell.getAllTopicPercentVisited();;
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
					
					//menu.progressCount[i] = 0;
					//alert(i+" == "+percent);
					// CODE TO INCRESE THE MODULE COVERED PERCENTAGE START 
					// CODE TO INCRESE THE MODULE COVERED PERCENTAGE ENDS 
					menu.progressCount[i] = percent[i][2];//console.log(i+" == "+menu.progressCount[i]);
					menu.drawProgressBarDynamic(i);

                    i++;
                });
				menu.updateProjectStatus();
				var tab = shell.getTopic();
				if (tab < 0){
					tab = 0;
				}
				menu.markSelectedTabByItemCount(tab);
                $('.carousel-showmanymoveone .item').each(function() {
                    var itemToClone = $(this);
                    var tempSize = menu.progressCount.length;

					var tempSizeFromXml = $(shell.getXML()).find('module').length;
					if(tempSizeFromXml <= 4){
							$('.centerAlignImg').hide();
							//console.log
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
				
				
				menu.makeMenuEnableDisable();
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
		var len = menu.progressCount.length;
		//console.log(len)
        for (var i = 0; i < len; i++) {
		//console.log(menu.progressCount[i])
            if (menu.progressCount[i] == 0) {
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
			
		} else{
			// console.log('forced : '+menu.forcedvalue);
			setTimeout(function(){menu.greyOutMenuBlock()}, 50);
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
		if ($('#menuBtn').hasClass('open')){
			shell.toggleMenu();
		}
		shell.closeMenu();
		var startPage = menu.returnAttrForModule(tempId, 'startpage');
		menu.selectedTabNumber = parseInt(tempId);
		$('div.header-bar').hide();
		$('div#header_bar_'+tempId).show();
		$('#helpBtn').removeClass('disableHeaderButtons');
		//
		assessment.setAssessment(0);
		shell.moveToPage(startPage);
	}
}
