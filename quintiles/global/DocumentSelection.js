
(function() {
	var correctAnswer = [2,3];
	var correctFeedback = "That's Correct.";
	var inCorrectFeedback = "That's Incorrect.";
	var feedbackType = "1";
	var maxattempts = 2;
	var attempts = 0;
	//
	this.init = function() {
        ////console.log('inside Document Selection V1 JS');
    }

		this.selectedDocsFromMenu = [];
		
		this.maxDocCount = 0;
		this.idDocPair = [];
		
		/*
		* Function called when 
		* we have to open the 
		* document selection popup.
		*/
		this.noClicked = function(){
		// console.log('testttt');

			try{
				if(tempMediaPlayer.paused === false){
					tempMediaPlayer.togglePlay();
				}				
			} catch(e){}
			//
			$('#popup').addClass('halfPopup');
			shell.loadPopupPage("cra_document_popup.html");
			//console.log('before timeout');
			setTimeout(documentSelection.markSelectedFromObjectArray, 100);
			
			$('.documentPopUpToolKit').find('img').attr('src','assets/images/global/toolkit_icon.png');
			
			documentSelection.idDocPair = [];
			// console.log('inside list!!');
			//documentSelection.rebuildList();
			setTimeout(documentSelection.rebuildList, 50);
			
		}
		
		//this.buildNewList
		
		/*
		*	Function close the document selection popup.
		*/
		this.closeDocumentSelectionPopUp = function(){
			shell.closePopup();
		}
		/*
		*	Function remove the auto 
		*	play functionality of audio/video tag.	
		*/
		this.stopAutoPlay = function(mediaType){
			if('audio' === mediaType){
				$('audio').removeAttr("autoplay");
			} else if('video' === mediaType){
				$('video').removeAttr("autoplay");
			} else{
				//console.log('Lost in universe');
			}
		}
		/*
		*	Function set the src attribute for 
		*	video or audio tag
		*/
		this.setSrcAttribute = function(mediaType, srcAttribute){
			if('audio' === mediaType){
				$('audio source').attr('src',srcAttribute);
				
			} else if('video' === mediaType){
				$('video source').attr('src',srcAttribute);
			} else{
				//console.log('Lost in universe');
			}
			
		}
		/*
		* function toggle the document between 
		* selected and normal state.
		*/
		this.onDocumentClick = function(){
			//console.log($(this).attr('id'));
			var clickedComponentId = $(this).attr('id');
			if (!$('#'+clickedComponentId).hasClass('disableDocument')){			
				if($('#'+clickedComponentId).attr('clicked') != 'true'){
					$('#'+clickedComponentId).attr('clicked','true');
					$('#'+clickedComponentId+'-item').addClass('selected');
					// documentSelection.selectedDocsFromMenu.push($('div #'+clickedComponentId+' div.media-name p').text());
				} else{
					$('#'+clickedComponentId).attr('clicked','false');
					$('#'+clickedComponentId+'-item').removeClass('selected');
				}
				documentSelection.showToolData();
				$('#feedbackBox').html("");
			}
		}
		
		/*
		* function create object with elementId 
		* and document name of clicked documents
		*/
		this.buildSelectedDocList = function(){
			documentSelection.selectedDocsFromMenu = [];
			var docList = [];
			var selectedElementIdList = [];
			$('div.document-item[clicked="true"]').each(function() {
				var clickedComponentId = $(this).attr('id');
				selectedElementIdList.push(clickedComponentId);
				docList.push($('div #'+clickedComponentId+' div.media-name p').text());
				documentSelection.selectedDocsFromMenu[clickedComponentId] = $('div #'+clickedComponentId+' div.media-name p').text();
			});
			//alert(selectedElementIdList+" == "+docList)
			documentSelection.selectedDocsFromMenu['selectedDocIdArray'] = selectedElementIdList;
			documentSelection.selectedDocsFromMenu['selectedDocNameArray'] = docList;
		}

		/*
		*	function called on submit 
		*	press document selection popup
		*/
		this.showToolData = function(){
			documentSelection.maxDocCount = $('div .document-item').length;
			documentSelection.buildSelectedDocList();
			documentSelection.showHideCountPopUp();
		}
		this.onSubmitPopUp = function(){
			documentSelection.showToolData();
			documentSelection.closeDocumentSelectionPopUp();
		}

		this.showHideCountPopUp = function(){
			var tempArrayObject = documentSelection.selectedDocsFromMenu['selectedDocIdArray'];
			//
			if (typeof tempArrayObject === "undefined" || tempArrayObject.length == 0) {
				//console.log('undefined or empty');
				$('.btn-popUpCount').hide();
			}else{
				//console.log('Show the count popUp');
				$('.btn-popUpCount').show();
				//console.log(documentSelection.selectedDocsFromMenu['selectedDocNameArray'].length);
				$('.popUpCountValue').text(documentSelection.selectedDocsFromMenu['selectedDocNameArray'].length);
			}
			documentSelection.enableDisableSubmitBtn();
		}
		
		this.expandDocumentPopUpList = function(){
			if($('.popUpCountList').hasClass('open')){
				documentSelection.onHideScrollBar();
				//$('.popUpCountList').removeClass('passby');
				$('.popUpCountListHtml').html('');
				$('.documentPopUpToolKit img').attr('src','assets/images/global/toolkit_icon.png');
			} else{
				$('.popUpCountListHtml').html('');
				//$('.popUpCountList').addClass('passby');
				$('.documentPopUpToolKit img').attr('src','assets/images/global/toolkit_icon2.png');
				documentSelection.generateHtmlForPopUplist(); // popUpCountValue
			}
		}
		
		this.generateHtmlForPopUplist = function(){
			var tempArrayObject = documentSelection.selectedDocsFromMenu['selectedDocNameArray'];
			var tempArrayIdObject = documentSelection.selectedDocsFromMenu['selectedDocIdArray'];
			//console.log('Count of document to generate : '+tempArrayObject);
			var htmlToAppend = '';
			//
			//alert(tempArrayObject+" == "+documentSelection.idDocPair)
			for(var loopCounter=0; loopCounter < tempArrayObject.length; loopCounter++){
					var liString = '';
					var imageType = '';
					
					imageType = tempArrayObject[loopCounter].slice( -3 );
					
					if(imageType === 'pdf'){
						imageType = 'icon_1';
					} else{
						imageType = 'icon_2';
					}
					var downloadFileUrl = '';
					downloadFileUrl = doumentPath + documentSelection.idDocPair[tempArrayIdObject[loopCounter]];
					// onclick="documentSelection.minusClicked(this, event)"
					//alert(downloadFileUrl);
					// below condition is just to make it click able. 
					if(documentSelection.idDocPair[tempArrayIdObject[loopCounter]].trim() == ""){
						liString = '<li id="li-'+tempArrayIdObject[loopCounter]+'" ><span class="media-circle"><i id="i-'+tempArrayIdObject[loopCounter]+'" onclick="documentSelection.minusClicked(this, event)" style="cursor: pointer;"  class="fa fa-minus-circle" aria-hidden="true"></i></span><span class="media"><img src="assets/images/global/'+imageType+'.png" /></span><span class="media-name" >'+tempArrayObject[loopCounter]+'</span></li>';
					}else {
						liString = '<li id="li-'+tempArrayIdObject[loopCounter]+'" ><span class="media-circle"><i id="i-'+tempArrayIdObject[loopCounter]+'" onclick="documentSelection.minusClicked(this, event)" style="cursor: pointer;"  class="fa fa-minus-circle" aria-hidden="true"></i></span><span class="media"><img src="assets/images/global/'+imageType+'.png" /></span><span class="media-name" ><a href="'+downloadFileUrl+'" onclick="documentSelection.linkClicked(this, event)" target="_blank" >'+tempArrayObject[loopCounter]+'</a></span></li>';
					}
					
					
					htmlToAppend = htmlToAppend + ' ' + liString + ' ';
			}
			if (showAddMoreButton == 1){
				if(documentSelection.maxDocCount == tempArrayObject.length){
						htmlToAppend = htmlToAppend + ' <li class="text-center"><button class="add btn popUpCountList-addMore" onclick="documentSelection.addMoreDocuments()" >Modify</button></li>';
				} else {
						htmlToAppend = htmlToAppend + ' <li class="text-center"><button class="add btn popUpCountList-addMore" onclick="documentSelection.addMoreDocuments()" >Add more</button></li>';
				}
			}
			$('.popUpCountListHtml').html(htmlToAppend);
			documentSelection.onShowScrollBar();
		}
		
		this.addMoreDocuments = function(){
			documentSelection.onHideScrollBar();
			//console.log('Inside addMoreDocuments');
			$('.popUpCountListHtml').html('');
			//$('.documentPopUpToolKit').hide();
			documentSelection.noClicked();
		}
		
		/*
		*	function mark the selected  
		*	document as green
		*/		
		this.markSelectedFromObjectArray = function(){
			//console.log('inside markSelectedFromObjectArray');
			var selectedDocumentIdList = documentSelection.selectedDocsFromMenu['selectedDocIdArray'];
			//alert(selectedDocumentIdList);
			$.each(selectedDocumentIdList, function( index, value ) {
				
				$('#'+value).attr('clicked','true');
				$('#'+value+'-item').addClass('selected');
				
				// $('#'+value+'-item').addClass();
			});
			documentSelection.enableDisableSubmitBtn();
		}
		this.unmarkSelectedFromObjectArray = function(){
			var selectedDocumentIdList = documentSelection.selectedDocsFromMenu['selectedDocIdArray'];
			//alert(selectedDocumentIdList);
			$.each(selectedDocumentIdList, function( index, value ) {
				$('#'+value).attr('clicked','false');
				$('#'+value+'-item').removeClass('selected');
			});
			documentSelection.enableDisableSubmitBtn();
		}
		this.onHideScrollBar = function(){
			$("ul.popUpCountListHtml").mCustomScrollbar("destroy");
		}
		
		this.onShowScrollBar = function(){
			$("ul.popUpCountListHtml").mCustomScrollbar({
				theme:"minimal"
			});
		}
		
		
		this.minusClicked = function(attribute, e){
			
			if (!e) var e = window.event;
			e.stopPropagation();
			
			var newId = $(attribute).attr('id').slice(2);
			$('#li-'+newId).hide();
			 documentSelection.modififyJsObject(newId);
		}
		
		this.linkClicked = function(attribute, e){
			
			if (!e) var e = window.event;
			e.stopPropagation();
			
		}		
		
		this.modififyJsObject = function(elementId){
		
			var docName = documentSelection.selectedDocsFromMenu[elementId];
			delete documentSelection.selectedDocsFromMenu[elementId];
			
			$('#'+elementId).attr('clicked','false');
			$('#'+elementId+'-item').removeClass('selected');
			// name array modification
			var nameArray = [];
			nameArray = documentSelection.selectedDocsFromMenu['selectedDocNameArray']
			var index = nameArray.indexOf(docName);
			if (index > -1) {
				nameArray.splice(index, 1);
			}
			documentSelection.selectedDocsFromMenu['selectedDocNameArray'] = nameArray;
			
			// id array modification
			var idArray = [];
			idArray = documentSelection.selectedDocsFromMenu['selectedDocIdArray']
			var indexId = idArray.indexOf(elementId);
			if (indexId > -1) {
				idArray.splice(indexId, 1);
			}
			documentSelection.selectedDocsFromMenu['selectedDocIdArray'] = idArray;			
			// console.log('size : '+documentSelection.selectedDocsFromMenu['selectedDocIdArray'].length);
			$('.popUpCountValue').text(documentSelection.selectedDocsFromMenu['selectedDocNameArray'].length);
			
			$('.popUpCountList-addMore').html('Add more');
			
			if(documentSelection.selectedDocsFromMenu['selectedDocIdArray'].length == 0){
				$('#footerLbl').click();
				documentSelection.onHideScrollBar();
				documentSelection.showHideCountPopUp();
			}
			
			documentSelection.markSelectedFromObjectArray();
		}
		//
		this.rebuildList = function(){
			$('div .document-item').each(function() {
				documentSelection.idDocPair[$(this).attr('id')] = $(this).attr('file-name');
			})
		}
		//
		this.closePopUp = function(){
			$('#popup').removeClass('halfPopup');
			shell.closePopup();
		}
		
		/*
		*	This function remove the document from the list
		*	Clear the JS object and close the popup.
		*/
		this.cleanPopUpList = function(){
			documentSelection.selectedDocsFromMenu=[];
			//documentSelection.idDocPair = [];
			$('#footerLbl').click();
			documentSelection.onHideScrollBar();
			documentSelection.showHideCountPopUp();
		}
		/*
		*	This function enables or disables the Submit button basis document selection
		*	
		*/
		this.enableDisableSubmitBtn = function(){
			var selectedDocumentIdList = documentSelection.selectedDocsFromMenu['selectedDocIdArray'];
			//alert(selectedDocumentIdList.length);
			if (selectedDocumentIdList != undefined && selectedDocumentIdList != 'undefined'){
				if (selectedDocumentIdList.length > 0){
					$('#submitBtn').removeClass('submitDisabled');
				}else{
					$('#submitBtn').addClass('submitDisabled');
				}
			}
		}
		this.setCorrectAnswer = function(val){
			correctAnswer = val;
		}
		this.getCorrectAnswer = function(){
			return correctAnswer;
		}
		this.setCorrectFeedback = function(val){
			correctFeedback = val;
		}
		this.getCorrectFeedback = function(){
			return correctFeedback;
		}
		this.setIncorrectFeedback = function(val){
			inCorrectFeedback = val;
		}
		this.getIncorrectFeedback = function(){
			return inCorrectFeedback;
		}
		this.onSubmit = function(e){
			if (!$('#submitBtn').hasClass('submitDisabled')){
				attempts++;
				var selectedDocumentIdList = documentSelection.selectedDocsFromMenu['selectedDocIdArray'];
				var len = selectedDocumentIdList.length;
				var correctArr = documentSelection.getCorrectAnswer().split(',');
				var correctArrLen = correctArr.length; 
				//
				correctArr.sort();
				selectedDocumentIdList.sort();
				//
				var correct = 1;
				var allcorrect = 0;
				for (var i = 0; i < len; i++){
					var temp = selectedDocumentIdList[i].split('-')[1];
					for (var j = 0; j < correctArrLen; j++){
						if (parseInt(temp) == parseInt(correctArr[j])-1){
							correct = 0;	
							break;
						}
					}
					if (correct == 0){
						correct = 1;
						allcorrect++;
					}
				}
				//
				if (allcorrect == correctArrLen){
					feedback.setFeedback(documentSelection.getCorrectFeedback());
					feedback.showCorrectFeedback(documentSelection.getFeedbackType());
					documentSelection.disableItems();
				}else{
					documentSelection.unmarkSelectedFromObjectArray();
					documentSelection.cleanPopUpList();
					if (attempts < documentSelection.getAttempts()){
						feedback.setFeedback(documentSelection.getIncorrectFeedback());
						feedback.showTryAgainFeedback(documentSelection.getFeedbackType());
					}else if (attempts == documentSelection.getAttempts()){
						documentSelection.selectCorrectDocuments();
						documentSelection.disableItems();
					}
				}
				$('#submitBtn').addClass('submitDisabled');
			}
		}
		this.selectCorrectDocuments = function(){
			var correctArr = documentSelection.getCorrectAnswer().split(',');
			var correctArrLen = correctArr.length;
			//
			for (var j = 0; j < correctArrLen; j++){
				var id = parseInt(correctArr[j]) - 1;
				$('#element-'+id).attr('clicked','true');
				$('#element-'+id+'-item').removeClass('selected').addClass('selected');
			}
			documentSelection.showToolData();
		}
		this.setFeedbackType = function(val){
			feedbackType = val;	
		}
		this.getFeedbackType = function(){
			return feedbackType;	
		}
		this.setAttempts = function(val){
			maxattempts = val;	
		}
		this.getAttempts = function(){
			return maxattempts;	
		}
		this.disableItems = function(){
			$('div .document-item').each(function() {
				var id = $(this).attr('id');
				$('#' + id).addClass('disableDocument');
			})
		}
}).apply(documentSelection);