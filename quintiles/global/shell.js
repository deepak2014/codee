// JavaScript Document
$(window).on('beforeunload', function(e) {
	return "Make sure you have completed the course.";
});
$(window).on('load', function(e) {
    shell.init();
	$(document).on("contextmenu", utils.disableRightClick);
	$(document).on("select", utils.lockoutmouseevents);

});

var shell = {};

(function(){
	var objXML;
	var topics = [];
	var globalDetails = new Object();
	globalDetails.totalPages = 0;
	globalDetails.currentPage = 0;
	globalDetails.pagePath = "pages/";
	globalDetails.pages = [];
	globalDetails.inactiveNavFeature = 1;
	globalDetails.resumeCourse = 0;
	globalDetails.assessmentStart = 0;
	globalDetails.assessmentStartPage = 0;
	globalDetails.isAssessment = 0;
	globalDetails.visitedArr = [];
	//
	var pageDetails = new Object();

	var loadXML = function (filePath){
		utils.showHideLoader(true);
		$.ajax({
			type: "GET",
			url: filePath,
			dataType: "xml",
			success: parseXML
		});
	}
	var parseXML = function(xml){
		objXML = xml;
		var myXML = objXML;
		//
		//menu.init(objXML);
		//
		lms.init();
		//
		initiateActions();
		//
		/********* Code to open popUp on help button ends **********/
		$(xml).find('module').each(function(i) {
			var startPage = $(this)[0].attributes.startpage.value;
			var endPage = parseInt($(this)[0].attributes.startpage.value) + parseInt($(this)[0].attributes.tPage.value);
			topics[i] = [startPage, endPage];
		})
		//
		globalDetails.menuPage = $(objXML).find('pages').attr('menu');
		globalDetails.courseTitle = $(objXML).find('toc').attr('courseTitle');
		//
		globalDetails.visitedArr = [];
		globalDetails.visitedArr = lms.getVisitedArr();//console.log(visitedArr);
		//
		var pageXML = $(objXML).find('pages').find('page');
		globalDetails.totalPages = $(objXML).find('pages').find('page').length;
		//
		var exist = 0;
		var score = [];
		var c = 0;
		var finalsc = 0;//alert("globalDetails.visitedArr "+globalDetails.visitedArr)
		for (var i = 0; i < globalDetails.totalPages; i++){
			if (globalDetails.visitedArr[i] != "undefined" && globalDetails.visitedArr[i] != undefined){
				//lms.setVisitedPages(parseInt(shell.getCurrentPage()), "1~"+assessmentCount+"~"+cor+"~"+assessment.getScore(), "assessment");	
				var temp = globalDetails.visitedArr[i].split("~");
				if (temp.length > 3){					
					finalsc = parseInt(temp[3]);//alert("finalsc "+finalsc)
				}
				if (temp.length > 2){
					if (c == 0){
						c = 1;
						globalDetails.isAssessment = parseInt(temp[2]); 	
					}
				}
				//
				if (parseInt(temp[0]) == 1){
					exist = 1;
					globalDetails.pages[i] = 1;
				}
			}
			if (exist == 0){
				globalDetails.pages[i] = -1;
			}
			exist = 0;
			//
			if (pageXML.eq(i).attr('type').toLowerCase() == "assessment"){
				if (globalDetails.assessmentStartPage == 0){
					globalDetails.assessmentStartPage = i;
				}
				score.push(1);
			}
			//
		}
		if (score.length > 0){
			score.pop();
			score.pop();
			assessment.setQuestionScore(score);
			assessment.setTotalQuestions(score.length);
		}
		if(finalsc >= 0){
			assessment.setScore(finalsc);
		}
		//console.log(globalDetails.pages+" =score= "+score);
		//
		if (lms.getBookmark() >= 0){
			globalDetails.currentPage = lms.getBookmark();
			globalDetails.bookmarkNo = globalDetails.currentPage;
			showExitBlock();
		}else{
			globalDetails.currentPage = 0;
			loadPage();
		}
	}
	var showExitBlock = function(){
		showHideExitPopup(true);
		$('#exitHeader').html('Resume');
		$('#exitText').html('Would you like resume where you left off?');
		utils.showHideLoader(false);
	}
	var loadPage = function(){
		//
		if (globalDetails.currentPage > 0){
			shell.showNextButton();
			shell.showBackButton();
			shell.showFooter();
		}
		shell.resetGlowButton();
		shell.hideVideoBlocker();
		shell.disableNextButton();
		shell.disableBackButton();	
		//
		$('#red_patch_wrong').hide();
		$('#green_patch_wrong').hide();
		//
		pageDetails.page = $(objXML).find('pages').find('page').eq(globalDetails.currentPage).find('path').text();
		pageDetails.pageType = $(objXML).find('pages').find('page').eq(globalDetails.currentPage).attr('type').toLowerCase();
		pageDetails.pageTemplateID = $(objXML).find('pages').find('page').eq(globalDetails.currentPage).attr('templateid');
		pageDetails.pageTitle = $(objXML).find('pages').find('page').eq(globalDetails.currentPage).find('title').text();
		pageDetails.pageEnableNext = $(objXML).find('pages').find('page').eq(globalDetails.currentPage).attr('enableNext');
		pageDetails.pageEnableBack = $(objXML).find('pages').find('page').eq(globalDetails.currentPage).attr('enableBack');
		pageDetails.branchMenu = $(objXML).find('pages').find('page').eq(globalDetails.currentPage).attr('branchMenu');
		pageDetails.branchNext = $(objXML).find('pages').find('page').eq(globalDetails.currentPage).attr('branchNext');
		pageDetails.branchBack = $(objXML).find('pages').find('page').eq(globalDetails.currentPage).attr('branchBack');
		//pageDetails.includePrevious = $(objXML).find('pages').find('page').eq(globalDetails.currentPage).attr('includePrevious');
		pageDetails.showTranscript = $(objXML).find('pages').find('page').eq(globalDetails.currentPage).attr('showTranscript');
		//
		if  ((pageDetails.pageType).toLowerCase() == "assessment"){
			pageDetails.passscore = parseInt($(objXML).find('pages').find('page').eq(globalDetails.currentPage).attr('passscore'));
			if (pageDetails.passscore != "undefined" && pageDetails.passscore != undefined){
				assessment.setPassScore(pageDetails.passscore);
			}else{
				assessment.setPassScore(80);
			}
			if (globalDetails.bookmarkNo >= 0){
				assessment.setAssessment(globalDetails.isAssessment);
				var temp = globalDetails.visitedArr[globalDetails.currentPage - 1].split("~");
				if (globalDetails.currentPage != globalDetails.assessmentStartPage){
					assessment.setAssessmentCount(parseInt(temp[1])+1);
					assessment.createProgressDots();
					assessment.highlightDots();
				}
			}
		}
		//
		if (pageDetails.pageEnableNext == "0"){
			shell.disableNextButton();
		}else{
			shell.enableNextButton();	
		}
		if (pageDetails.pageEnableBack == "0"){
			shell.disableBackButton();	
		}else{
			shell.enableBackButton()	
		}
		if  ((pageDetails.pageType).toLowerCase() == "undefined" || (pageDetails.pageType) == undefined){
			(pageDetails.pageType).toLowerCase() = "content";
		}
		//branchPageContainer
		updatePageProgressFooter();
		
		$('#pageTitle').html(pageDetails.pageTitle);
		//
		if (globalDetails.currentPage > 0){
			$('#menuBtn').show();
			$('#shellHeader').show();
			$('#shellHeaderBG').show();
			$('#shellFooter').show();
			shell.showGlobalControls();
		}
		if  ((pageDetails.pageType).toLowerCase() == "assessment"){
			shell.hideFooter();
		}
		//
		if ((pageDetails.pageType).toLowerCase() == "mp4"){
			if (globalDetails.currentPage > 0){
				shell.showVideoBlocker();
			}
		}
		$('#pageContainer').html('');
		if (pageDetails.branchMenu == "1"){
			$('#pageContainer').hide();
			if ($('#branchPageContainer').attr('data-loaded') == "1"){
				$('#branchPageContainer').show();
				branchPageComplete();
			}else{
				$('#branchPageContainer').show();
				$('#branchPageContainer').attr('data-loaded', "1");
				$('#branchPageContainer').attr('data-currentpage', globalDetails.currentPage);
				$('#branchPageContainer').attr('data-pagename', pageDetails.page);
				$('#branchPageContainer').attr('data-templateid', pageDetails.pageTemplateID);
				$('#branchPageContainer').load(pagePath + pageDetails.page, pageLoadComplete);	
			}
		}else{
			//
			$('#branchPageContainer').hide();
			$('#pageContainer').show();
			$('#pageContainer').attr('data-pagename', pageDetails.page);
			$('#pageContainer').attr('data-templateid', pageDetails.pageTemplateID);
			$('#pageContainer').load(pagePath + pageDetails.page, pageLoadComplete);	
		}
		globalDetails.bookmarkNo = -1;
	}
	var branchPageComplete = function(){
		pageDetails.showBranch = "1";
		//
		
		branchPage.init();
		if  ((pageDetails.pageType).toLowerCase() == "mp4" || (pageDetails.pageType).toLowerCase() == "mp3"){
			mediaController.reloadJsMediaComponent();
			setTimeout(loadAnimationDataAgain, 100);
		}
		shell.enableBackButton();	
		//
		shell.hideVideoBlocker();
		$('#pageTitle').html(pageDetails.pageTitle);
		updatePageProgressFooter();
		utils.showHideLoader(false);
	}
	var pageLoadComplete = function(){
		//
		$('#videoPlayer').hide();
		//
		if (globalDetails.currentPage <= 1){
			shell.disableBackButton();
		}else{
			if (pageDetails.pageEnableBack == "1"){
				shell.enableBackButton();	
			}
		}
		if (globalDetails.currentPage >= (globalDetails.totalPages - 1)){
			shell.disableNextButton();
		}else{
			if (pageDetails.pageEnableNext == "1"){
				shell.enableNextButton();
			}
		}
		//
		if (shell.getPageVisitedState(globalDetails.currentPage) == 1 && (pageDetails.pageType).toLowerCase() != "assessment"){
			//console.log("shell.getPageVisitedState(globalDetails.currentPage) :: shell.js "+shell.getPageVisitedState(globalDetails.currentPage));
			if (pageDetails.branchNext != "1"){
				shell.enableNextButton();
			}
		}
		//
		if (pageDetails.branchMenu == "1"){
			branchPage.init();
			utils.showHideLoader(false);
		}else{
			pageDetails.showBranch = "0";
			page.init();
		}
		if (pageDetails.pageType == "assessment"){
			//alert(assessment.getAssessment()+" == "+pageDetails.currentPage+" == "+(globalDetails.assessmentStartPage + 1))
			if (assessment.getAssessment() == 2){
				lms.setBookmark(globalDetails.assessmentStartPage);
				if (globalDetails.currentPage == (globalDetails.assessmentStartPage + 1)){
					shell.disableBackButton();
					shell.enableNextButton();
				}else if (globalDetails.currentPage > (globalDetails.assessmentStartPage + 1)){
					if (assessment.getResultPage() != 1){
						shell.enableBackButton();
						shell.enableNextButton();
					}
				}
			}else{
				lms.setBookmark();
				if (globalDetails.currentPage == (globalDetails.assessmentStartPage + 1)){
					shell.disableNextButton();
					shell.disableBackButton();
				}
			}
			if (assessment.getResultPage() == 1){
				shell.disableNextButton();
				shell.disableBackButton();
			}
		}else{
			lms.setBookmark();
		}
		//
		if  ((pageDetails.pageType).toLowerCase() == "mp4" || (pageDetails.pageType).toLowerCase() == "mp3"){
			if (globalDetails.currentPage > 0){
				$('#video_controls').show();
			}
			if  ((pageDetails.pageType).toLowerCase() == "mp3"){
				$('audio').load();
	   	  		mediaController.init();
			}else{
				$('#videoPlayer').load();
			}
		}else{
			$('#video_controls').hide();
			//
			utils.showHideLoader(false);
		}
		//
		globalDetails.inactiveNavFeature = 1;
	}
	var showHideExitPopup = function(isShow){
		if (isShow){
			$('#exitBlock').show();	
		}else{
			$('#exitBlock').hide();	
		}
	}
	var resumeCourse = function(){
		utils.showHideLoader(true);
		loadPage();
		showHideExitPopup(false);
	}
	var exitNo = function(){
		globalDetails.resumeCourse = 0;
		globalDetails.currentPage = 0;
		resumeCourse();
	}
	var exitYes = function(){
		globalDetails.resumeCourse = 1;
		resumeCourse();
	}
	var initiateActions = function(e){
		//
		shell.hideNextButton();
		shell.hideBackButton();
		shell.hideFooter();
		feedback.init();
		//
		$('#exitYes').on('click', exitYes);
		$('#exitNo').on('click', exitNo);
        
		$('#helpBtn').on('click', function(){
			if (!$(this).hasClass('disableHeaderButtons')){
				if ($('#helpBtn').hasClass('open')){
					$('#helpBtn').removeClass('open');
					//$('#helpBtn').html('<div id="help_img" class="help_img"></div>');
					shell.closePopup();
					//$('#menuBtn').removeClass('disableHeaderButtons');
				}else{
					try{
						if(tempMediaPlayer.paused === false){
							tempMediaPlayer.togglePlay();
						}				
					} catch(e){
						
					}
					shell.loadPopupPage("help.html");
					//$('#menuBtn').addClass('disableHeaderButtons');
					$('#helpBtn').addClass('open');
					//$('#popup').addClass('menuPopup');
					$('#popup').attr('data-pagename', page);
				}
			}
		});    
        
		$('#menuBtn').on('click', function(){
			if (!$(this).hasClass('disableHeaderButtons')){
				if ($('#menuBtn').hasClass('open')){
					shell.closeMenu();
					$('#glossary-page').remove();                    
                    $('#popup').hide(); 
					$('#helpBtn').removeClass('disableHeaderButtons');
				}else{
					utils.showHideLoader(true);
					try{
						if(tempMediaPlayer.paused === false){
							tempMediaPlayer.togglePlay();
						}				
					} catch(e){
						
					}
					if ($('#menuOverlay').attr('data-loaded') == "1"){
						openMenu();
					}else{
						var page = "menu.html";
						$('#menuOverlay').addClass('menuPopup');
						$('#menuOverlay').attr('data-pagename', page);
						$('#menuOverlay').load(pagePath + page, menuPageLoadComplete);	
					}
					$('#helpBtn').addClass('disableHeaderButtons');
					
					shell.closeReferBlock();
				}
				shell.toggleMenu();
			}
		});
		$('#comingup_btn').on('click',function(){
			if($('#transcriptContent').attr('data-show') == "1"){
				var isOpenValue = $('#transcript-body-div').attr('isopen');
				$('#transcript-body-div').attr('isopen','none');
				if(isOpenValue == 'false'){
					mediaController.showTranscriptDiv();
				} else if(isOpenValue == 'true'){
					mediaController.hideTranscriptDiv();
				} else{
					// console.log('none setted before everything.!!')
				}
			}
		});
		 
		$('#closeBtnTranscript').on('click',function(){
			mediaController.hideTranscriptDiv();
		});
		$('#closeBtnTranscript_IE9').on('click',function(){
			mediaController.hideTranscriptDiv();
		});
		
		$('#shellBack').on('click', function(){
			movePrevious();
				
		});
		$('#shellNext').on('click', function(){
			moveForward();
			
		});
		//
		$('#mainContainer').on("mouseenter", shell.showGlobalControls);
		$('#mainContainer').on("mouseleave", shell.hideGlobalControls);
	}
	var menuPageLoadComplete = function(){
		openMenu();
	}     
       
	var openMenu = function(){        
		$('#menuOverlay').show('blind', 200, function(){
			$('#menuOverlay').attr('data-loaded', "1");
			$('#pageTitle').html(globalDetails.courseTitle);
			menupopup.init();
			utils.showHideLoader(false);
		});
	}
	this.closeMenu = function(){
		$( "#menuOverlay" ).effect( 'blind', 100, function(){
			$('#pageTitle').html(pageDetails.pageTitle);
			$('#menuOverlay').hide();
		} );
	}
	this.exitCourse = function(){
		top.close();
	}
	this.getAssessmentStartPage = function(){
		return globalDetails.assessmentStartPage;
	}
	this.showGlobalControls = function(){
		if ($('#menuOverlay').css("display") == "none" && $('#popup').css("display") == "none" && ($('#feedbackPopup').css("display") == "none" || $('#feedbackPopup').css("display") == undefined) && globalDetails.currentPage > 0 && ($('#imagemodal').css("display") == "none" || $('#imagemodal').css("display") == undefined) ){
			$('#shellBack').animate({left: '0px'}, 'fast');
			$('#shellNext').animate({right: '0px'}, 'fast');
			if (pageDetails.pageType != undefined && pageDetails.pageType != "undefined"){
				if  ((pageDetails.pageType).toLowerCase() == "mp4" || (pageDetails.pageType).toLowerCase() == "mp3"){
					$('#video_controls').animate({bottom:'20px'}, 'fast');
				}
			}
		}
	}
	this.hideGlobalControls = function(){
		if (globalDetails.inactiveNavFeature == 1 && $('#menuOverlay').css("display") == "none" && $('#popup').css("display") == "none" && ($('#feedbackPopup').css("display") == "none" || $('#feedbackPopup').css("display") == undefined) && globalDetails.currentPage > 0 && ($('#imagemodal').css("display") == "none" || $('#imagemodal').css("display") == undefined) ){
			$('#shellBack').animate({left: '-40px'}, 'fast');
			$('#shellNext').animate({right: '-40px'}, 'fast');
			if (pageDetails.pageType != undefined && pageDetails.pageType != "undefined"){
				if  ((pageDetails.pageType).toLowerCase() == "mp4" || (pageDetails.pageType).toLowerCase() == "mp3"){
					$('#video_controls').animate({bottom:'-150px'}, 'fast');
				}
			}
		}
	}
	var closePopup = function(){
		$('#pageTitle').html(pageDetails.pageTitle);
		shell.closePopup();
	}
	var movePrevious = function(){
		if (globalDetails.currentPage > 1 && !$('#shellBack').hasClass('disableNavBtns')){
			utils.showHideLoader(true);	
			shell.disableBackButton();
			if (assessment.getAssessment() == 2){
				assessment.setAssessmentCountMinus();
				assessment.highlightDots();
			}
			//
			if (pageDetails.branchBack == "1"){
				pageDetails.branchBack = "0";
				globalDetails.currentPage = parseInt($('#branchPageContainer').attr('data-currentpage'));
				$('#pageContainer').html('');
				$('#pageContainer').hide();
				$('#branchPageContainer').show();
				branchPageComplete();
			}else{
				$('#branchPageContainer').hide();
				globalDetails.currentPage-- ;
				loadPage();
			}
			try {
				tempMediaPlayer.pause();
				tempMediaPlayer.currentTime = 0;
				var isOpenValue = $('#transcript-body-div').attr('isopen');
				if(isOpenValue == 'true'){
					mediaController.hideTranscriptDiv();
				}
			}
			catch(err) {}			
		}
	}
	var moveForward = function(val){
		if ((globalDetails.currentPage < (globalDetails.totalPages - 1) && !$('#shellNext').hasClass('disableNavBtns') ) || (val == 1) ){
			utils.showHideLoader(true);
			if (assessment.getAssessment() == 2){
				assessment.setAssessmentCount();
				assessment.highlightDots();
			}
			//
			shell.disableNextButton();
			// below conditions have been moved down to the conditional statement.
			/*if (pageDetails.includePrevious == "1"){
				globalDetails.pages[(globalDetails.currentPage - 1)] = 1;
			}*/
			shell.updatePageProgress();
			//
			//alert(pageDetails.branchNext+"  == "+ pageDetails.showBranch);
			if (pageDetails.branchNext == "1" && pageDetails.showBranch == "0"){
				pageDetails.branchNext = "0";
				$('#pageContainer').hide();
				$('#branchPageContainer').show();
				branchPageComplete();
			}else if (pageDetails.showBranch == "1"){
				globalDetails.currentPage = 15;
				loadPage();
			}else{
				globalDetails.currentPage++;
				loadPage();
			}
			//
			try {
				tempMediaPlayer.pause();
				tempMediaPlayer.currentTime = 0;
				var isOpenValue = $('#transcript-body-div').attr('isopen');
				if(isOpenValue == 'true'){
					mediaController.hideTranscriptDiv();
				}
			}
			catch(err) {}
		}
	}
	var updatePageProgressFooter = function(){
		$('#footerLbl').html(""+globalDetails.currentPage+" / "+(globalDetails.totalPages - 1));
	}
	
	var popupPageLoadComplete = function(){
		// this method is called when popup gets loaded
		$('#popup').show('blind', 200, function(){
			popuppage.init();
		});
		popupPageLoadCompleteCustom();
		
	}
	var getPagePath = function(){
		var page = ($(objXML).find('pages').find('page').eq(globalDetails.currentPage).find('path').text());
		
		return page;
	}
	var movePage = function(){
		loadPage();
	}
	
	this.init = function(){
		utils.showHideLoader(true);
		loadXML('data/toc.xml');
	}
	this.startCourse = function(){
		utils.showHideLoader(true);
		shell.updatePageProgress();
		globalDetails.currentPage++;
		loadPage();
	}
	this.hideVideoBlocker = function(){
		$('.videoBlocker').hide();
	}
	this.showVideoBlocker = function(){
		//alert(utils.detectDevice.any());
		//if(utils.detectDevice.any() != "iPad"){
			$('.videoBlocker').show();
		//}
	}
	this.getXML = function(){
		return objXML;
	}
	this.toggleMenu = function(){
		$('#menuBtn').toggleClass('open');
		if ($('#menuBtn').hasClass('open')){
			if (utils.detectBrowser() == "IE9"){
				$('#menuBtn').html('<div id="closePopupBtn_IE9_Menu" class="closePopupBtn_IE9_Menu" data-dismiss="modal"><div class="x_IE9" id="x_IE9">X</div><div class="close_IE9" id="close_IE9">CLOSE</div><span></span></div>');
			} else {
				$('#menuBtn span:last-child').addClass('closepopup');				
				$('#menuBtn span:last-child').text('CLOSE');
			}
		}else{
			if (utils.detectBrowser() == "IE9"){
				$('#menuBtn').html('<span></span><span></span><span></span><span></span><span>MENU</span>');
				$('#menuBtn span:last-child').removeClass('closepopup');  	
				$('#menuBtn span:last-child').text('MENU');
			
			} else{
				$('#menuBtn span:last-child').removeClass('closepopup');  	
				$('#menuBtn span:last-child').text('MENU');
			}
			 
		}
	}
	this.loadPopupPage = function(page){
		$('#popup').attr('data-pagename', page);

		$('#popup').load(pagePath + page, popupPageLoadComplete);	
	}
	this.getPagesArray = function(){
		return globalDetails.pages;
	}
	this.updatePageProgress = function(){
		var len = globalDetails.pages.length;
		if (globalDetails.currentPage < len){
			globalDetails.pages[globalDetails.currentPage] = 1;
			//
			var val = 1;
			if (pageDetails.pageType != "assessment"){
				shell.setVisitedPages(val, pageDetails.pageType);	
			}
		}
	}
	this.closePopup = function(){
		$('#popup').attr('data-pagename', "");
		    if ($('#pageContainer').attr('data-templateid') === 'cra_choicescreen_v4') {
				$('#popup').html('');
				$('#popup').hide();
            }
		else{
			$( "#popup" ).effect( 'blind', 200, function(){
				$('#popup').html('');
				$('#popup').hide();
			} );
		}
		try {
			// adddlert("Welcome guest!");
			documentSelection.showHideCountPopUp();
		}
		catch(err) {
			// document.getElementById("demo").innerHTML = err.message;
		}
		
	}
	this.moveToPage = function(pageno){
		/*if (pageDetails.includePrevious == "1"){
			globalDetails.pages[(globalDetails.currentPage - 1)] = 1;
		}*/
		//
		shell.updatePageProgress();
		globalDetails.currentPage = parseInt(pageno);
		movePage();
	}
	this.moveNext = function(val){
		assessment.setAssessmentCount();
		assessment.highlightDots();
		moveForward(val);
	}
	this.moveBack = function(){
		movePrevious();
	}
	this.getCurrentPage = function(){
		/*if (globalDetails.currentPage >= 16){
			return '16';
		}else{*/
			return globalDetails.currentPage.toString();
		//}
	}
	this.getCurrentPageName = function(){
		return pageDetails.page.split(".")[0];
	}
	this.getAllTopicPercentVisited = function(){
		var countVisitedPages = 0;
		var arr = shell.getPagesArray();
		var currentPage = parseInt(shell.getCurrentPage());
		var len = topics.length;
		for (var i = 0; i < len; i++){
			var firstPage = topics[i][0]; 
			var lastPage = topics[i][1]; 
			var totalPage = (parseInt(lastPage) - parseInt(firstPage));
			//console.log(arr+" == "+firstPage+" == "+lastPage+" == "+totalPage);
			for (var j = firstPage; j < lastPage; j++){
				if (arr[j] > 0){
					countVisitedPages++;	
				}
			} 
			var percent = parseInt((countVisitedPages * 100) / totalPage);
			topics[i][2] = percent;
			//console.log(countVisitedPages+" == "+percent);
			countVisitedPages = 0;
		}
		return topics;
	}
	this.getTopicPercentVisited = function(topicID){
		var countVisitedPages = 0;
		var arr = shell.getPagesArray();
		var currentPage = parseInt(shell.getCurrentPage());
		if (topicID == undefined || topicID == "undefined"){
			var topic = shell.getTopic();
		}else{
			var topic = topicID;
		}
		var firstPage = topics[topic][0]; 
		var lastPage = topics[topic][1]; 
		var totalPage = (parseInt(lastPage) - parseInt(firstPage));
		//console.log(topic+" == "+firstPage+" == "+lastPage)
		for (var j = firstPage; j < lastPage; j++){
			if (arr[j] > 0){
				countVisitedPages++;	
			}
		} 
		var percent = parseInt((countVisitedPages * 100) / totalPage);
		return percent;
	}
	this.getTopic = function(){
		var len = topics.length;
		var currentPage = parseInt(shell.getCurrentPage());
		var topic = -1;
		for (var i = 0; i < len; i++){
			if (currentPage >= topics[i][0]){
				if (currentPage < topics[i][1]){
					topic =  i;
					break;
				}
			}
		}
		if (topic < 0){
			topic = 0;
		}
		return topic;
	}
	this.hideNextButton = function(){
		$('#shellNext').hide();	
	}
	this.showNextButton = function(){
		$('#shellNext').show();	
	}
	this.hideBackButton = function(){
		$('#shellBack').hide();	
	}
	this.showBackButton = function(){
		$('#shellBack').show();	
	}
	this.enableBackButton = function(){
		$('#shellBack').removeClass('disableNavBtns');
	}
	this.disableBackButton = function(){
		$('#shellBack').addClass('disableNavBtns');	
	}
	this.showFooter = function(){
		$('#shellFooter').show();	
	}
	this.hideFooter = function(){
		$('#shellFooter').hide();	
	}
	this.enableNextButton = function(){
		$('#shellNext').removeClass('disableNavBtns');
	}
	this.disableNextButton = function(){
		$('#shellNext').addClass('disableNavBtns');	
	}
	this.getPageVisitedState = function(pageno){
		return globalDetails.pages[pageno];
	}
	this.showBranchPage = function(){
		$('#pageContainer').hide();
		$('#branchPageContainer').show();
		branchPageComplete();
	}
	this.mediaLoaded = function(){
		$('#videoPlayer').show();
		//
		utils.showHideLoader(false);
	}
	this.mediaPlayed = function(){
		if($('#play_btn').hasClass('glyphicon-play')){
			$('#play_btn').addClass('glyphicon-pause');
			$('#play_btn').removeClass('glyphicon-play');
		}		
	}
	this.mediaPaused = function(){
		
	}
	this.mediaEnded = function(){
		if ((globalDetails.currentPage < (globalDetails.totalPages - 1))){
			globalDetails.inactiveNavFeature = 0;
			shell.showGlobalControls();
			shell.setGlowButton();
		}
	}
	this.setGlowButton = function(){
		if ($('#branchPageContainer').css("display") == "none"){
			if (pageDetails.branchNext != "1"){
				shell.enableNextButton();
				$('#shellNext polyline').addClass('buttonGlowing');
			}
		}
	}
	this.resetGlowButton = function(){
		$('#shellNext polyline').removeClass('buttonGlowing');
	}
	this.mediaPlay = function(){
		shell.resetGlowButton();
		globalDetails.inactiveNavFeature = 1;
	}
	this.mediaReplay = function(){
		shell.resetGlowButton();
		globalDetails.inactiveNavFeature = 1;
	}
	this.hideBranchPage = function(){
		$('#pageContainer').show();
		$('#branchPageContainer').hide();
		branchPageComplete();
	}
	//Code for Reference Block Starts
	this.openReferBlock = function(){
		$('#referBlock').show();
		$('#menuOverlay').removeClass('menuPopup');
		//console.log("inopenReferBlock");
	}	
	this.closeReferBlock = function(){
		$('#referBlock').hide();
		$('#menuOverlay').addClass('menuPopup');
		//console.log("inopenReferBlock");
	}
	this.setVisitedPages = function(val, type){
		lms.setVisitedPages(parseInt(shell.getCurrentPage()), val, type);	
		globalDetails.visitedArr = [];
		globalDetails.visitedArr = lms.getVisitedArr();
	}
	this.resetAssessmentVisitedPages = function(){
		var temp = globalDetails.visitedArr;
		var temp1 = temp.toString().split("^+");
		var temp2 = [];
		for (var i = 0;  i < temp1.length; i++){
			temp2.push(temp1[i]);
		}
		globalDetails.visitedArr = temp2;
		lms.setVisitedArr(globalDetails.visitedArr);
	}
	this.unloadCourse = function(){
		if (assessment.getPassed() == 1){
			shell.resetAssessmentVisitedPages();
		}
	}
	this.getInteraction = function(val){
		//lms.setVisitedPages(parseInt(shell.getCurrentPage()), "1~"+assessmentCount+"~"+cor+"~"+assessment.getScore()+"~"+learnerResponse, "assessment");
		var temp = globalDetails.visitedArr[shell.getCurrentPage()].split("~");
		//alert(temp+" == "+temp[4]+" == "+temp[2])
		return ({studentResponse:temp[4], result:temp[2]});
	}
	//Code for Reference Block Ends Here
	
}).apply(shell);
//
var assessment = {};
(function(){
	var isAssessment = 0; 
	var assessmentCount = 0;
	var totalScore = 0;
	var passScorePercent = 80;
	var passScore = 0;
	var totalQuestions = 5;
	var questionScore = [1,1,1,1,1];
	var isStartAssessment = 0;
	var isResultPage = 0;
	var isStartPage = 0;
	var isPassed = 0;
	//
	this.init = function(){
		
	}
	this.setAssessmentCount = function(val){
		if (val != "undefined" && val != undefined){
			assessmentCount = val;
		}else{
			assessmentCount++;
		}
	}
	this.setAssessmentCountMinus = function(val){
		if (val != "undefined" && val != undefined){
			assessmentCount = val;
		}else{
			assessmentCount--;
		}
	}
	this.getAssessmentCount = function(){
		return assessmentCount;
	}
	this.setStartAssessment = function(val){
		isStartAssessment = val;
	}
	this.getStartAssessment = function(){
		return isStartAssessment;
	}
	this.setAssessment = function(val){
		isAssessment = val;
	}
	this.getAssessment = function(){
		return isAssessment;
	}
	this.setQuestionScore = function(val){
		questionScore = val;
	}
	this.getQuestionScore = function(){
		return questionScore;
	}
	this.setTotalQuestions = function(val){
		totalQuestions = val;
	}
	this.getTotalQuestions = function(){
		return totalQuestions;
	}
	this.setScore = function(val){
		if (val != "undefined" && val != undefined){
			totalScore = val;
		}else{
			totalScore += 1;	
		}
		//alert(totalScore);
	}
	this.startAssessment = function(){
		assessment.setStartPage(0);
		shell.setVisitedPages("+1~"+assessmentCount+"~"+assessment.getAssessment(), "assessment");	
		//
		shell.moveNext(1);   
		shell.disableNextButton();
		shell.disableBackButton();
		assessment.createProgressDots();
		assessment.highlightDots();
	}
	this.setInteraction = function(qtxt, questionType, learnerResponse, correctAnswer, wasCorrect, learnerResponseData){
		if (assessment.getAssessment() != 2){
			if (wasCorrect == true){
				var cor = "1";
			}else{
				var cor = "0";
			}
			//
			shell.setVisitedPages("1~"+assessmentCount+"~"+cor+"~"+assessment.getScore()+"~"+learnerResponseData, "assessment");	
			lms.setInteraction(shell.getCurrentPage(), qtxt, assessmentCount, questionType, learnerResponse.toString(), correctAnswer.toString(), wasCorrect);
		}
	}
	this.getInteraction = function(){//alert(assessmentCount);
		//lms.setVisitedPages(parseInt(shell.getCurrentPage()), "1~"+assessmentCount+"~"+cor+"~"+assessment.getScore()+"~"+learnerResponse, "assessment");	
		return shell.getInteraction(assessmentCount);
	}
	this.highlightDots = function(){
		assessment.highlightVisitedDot(assessmentCount-1);
		assessment.highlightCurrentDot(assessmentCount);
	}
	this.highlightVisitedDot = function(val){
		assessment.resetDots();
		for (var i = 1; i <= val; i++){
			$('#assessmentProgressDot_'+i).removeClass("assessmentProgressDotCurrent").removeClass("assessmentProgressDotVisited").addClass('assessmentProgressDotVisited');
		}
	}
	this.resetDots = function(){
		for (var i = 1; i <= totalQuestions; i++){
			$('#assessmentProgressDot_'+i).removeClass('assessmentProgressDotCurrent');
			$('#assessmentProgressDot_'+i).removeClass('assessmentProgressDotVisited');
		}
	}
	this.highlightCurrentDot = function(val){
		$('#assessmentProgressDot_'+val).addClass('assessmentProgressDotCurrent');
	}
	this.getScore = function(){
		return totalScore;
	}
	this.getScorePercent = function(){
		//
		passScore = 0;
		for (var i = 0; i < totalQuestions; i++){
			passScore += parseInt(questionScore[i]);
		}
		var per = (parseInt(assessment.getScore()) * 100) / passScore;
		//console.log(totalScore+" == "+passScore+" == "+per+" == "+totalQuestions+" == "+questionScore);
		/*if (per < 10){
			per = '0'+per;
		}*/
		//alert(lms.getScore()+" == "+totalQuestions+" == "+per+" == "+isNaN(per));
		if (totalQuestions <= 0 || isNaN(per)){
			var per = lms.getScore();
		}
		shell.setVisitedPages("1~"+per, "assessment");	
		lms.setScore(per);
		if (per >= 80){
			assessment.setPassed(1);
			lms.markComplete();
		}else{
			assessment.setPassed(0);
		}
		//lms.setBookmark();
		return per + "%";
	}
	this.setPassed = function(val){
		isPassed = val;
	}
	this.getPassed = function(val){
		return isPassed;
	}
	this.resetScore = function(){
		totalScore = 0;	
	}
	this.setPassScore = function(val){
		passScorePercent == val;
	}
	this.hideProgress = function(){
		$('#assessmentProgressBar').hide();
	}
	this.showProgress = function(){
		$('#assessmentProgressBar').show();
	}
	this.removeProgress = function(){
		$('#assessmentProgressDots').empty();
		$('#assessmentProgressDots').attr('data-created', "0");
	}
	this.resetProgress = function(){
		assessmentCount = 0;
		for (var i = 1; i <= totalQuestions; i++){
			$('#assessmentProgressDot_'+i).removeClass('assessmentProgressDotCurrent');
			$('#assessmentProgressDot_'+i).removeClass('assessmentProgressDotVisited');
		}
	}
	this.getPassScore = function(){
		return passScorePercent;
	}
	this.createProgressDots = function(val){
		if ($('#assessmentProgressDots').attr("data-created") == "0"){
			assessment.showProgress();
			$('#assessmentProgressDots').attr('data-created', "1");
			for (var i = 1; i <= totalQuestions; i++){
				$('#assessmentProgressDots').append("<div id='assessmentProgressDot_"+i+"' class='assessmentProgressDot'></div>");
			}
		}
		//}, 10);
	}
	this.reAttempt = function(){
		assessment.setResultPage(0);
		shell.moveToPage(shell.getAssessmentStartPage());
		shell.disableNextButton();
		assessment.removeProgress();
		assessment.setPassed(0);
		shell.resetAssessmentVisitedPages();
	}
	this.review = function(){
		assessment.setResultPage(0);
		shell.moveToPage((shell.getAssessmentStartPage() + 1));
		assessment.setAssessmentCount(1);
		shell.enableNextButton();
		shell.disableBackButton();
		assessment.showProgress();
		assessment.highlightDots();
	}
	this.start = function(){
		assessment.setStartPage(1);
		shell.disableNextButton();
	}
	this.result = function(){
		assessment.setResultPage(1);
		assessment.hideProgress();
		assessment.resetProgress();
		shell.disableBackButton();
		shell.disableNextButton();
	}
	this.setStartPage = function(val){
		isStartPage = val;
	}
	this.getStartPage = function(){
		return isStartPage;
	}
	this.setResultPage = function(val){
		isResultPage = val;
	}
	this.getResultPage = function(){
		return isResultPage;
	}
}).apply(assessment);
///
var shellpopup = {};
(function(){
	this.init = function(){
	}
	this.openPopup = function(){
		utils.showHideLoader(true);
		var popupFileName = shell.getCurrentPageName()+"_popup";
		shellpopup.loadPopupPage(popupFileName);
	}
	this.loadPopupPage = function(page){
		$('#popup').show();
		$('#popup').addClass('pagepopup');
		$('#popup').attr('data-pagename', page);
		//	
		$('#popup').load(pagePath + page + ".html", shellpopup.popupPageLoadComplete);	
	}
	this.popupPageLoadComplete = function(){
		popuppage.init();
		//
		utils.showHideLoader(false);
	}
	this.closePopup = function(){
		$('#popup').attr('data-pagename', '');
		$('#popup').html('');
		$('#popup').removeClass('pagepopup');
		$('#popup').hide();
	}
}).apply(shellpopup);

var popupId=-1;

function popupPageLoadCompleteCustom(){
	if(popupId!=-1) {
		setTimeout("setContentIntextblock();",300);
	}

}
