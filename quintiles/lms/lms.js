// JavaScript Document

var lms = {};

(function(){
	var startTimeStamp = null;
	var visitedPages = [];
	var assessmentPages = [];
	var scoData;
	var splitId = '^';
	var assessSplitId = "+";
	//
	var setCommit = function(){
		scoData.commit();
	}
	var setStatus = function (status){
		try{
			scoData.setValue("lessonStatus", status);
			setCommit();
		}catch(e){}
	}
	var getStatus = function (status){
		try{
			return scoData.getValue("lessonStatus");
		}catch(e){}
	}
	this.setBookmark = function (pgid){
		try{
			if (pgid != undefined ){
				scoData.setValue("lessonLocation", pgid);
			}else{
				scoData.setValue("lessonLocation", shell.getCurrentPage());
			}
			setCommit();
		}catch(e){}
	}
	this.setScore = function(score){
		try{
			scoData.setValue("score", score);
			setCommit();
		}catch(e){}
	}
	this.getScore = function(score){
		try{
			return scoData.getValue("score");
		}catch(e){}
	}
	var setSuspendData = function(suspendstring){
		try{
			scoData.setValue("suspendData", suspendstring);
			setCommit();
		}catch(e){}
	}
	var getSuspendData = function(){
		return scoData.getValue("suspendData");
	}
	var makeSuspendData = function (){
		//
		var suspendstring = '';
		var totalVisitedPages = visitedPages.length;
		for(var i = 0; i < totalVisitedPages;i++){
			if(i == totalVisitedPages - 1){
				suspendstring = suspendstring + visitedPages[i];
			} else {
				suspendstring = suspendstring + visitedPages[i] + splitId;
			}
		}
		if (totalVisitedPages <= 0){
			suspendstring = ' ';
		}
		/*
		var totalAssessmentPages = assessmentPages.length;
		if (totalAssessmentPages > 0){
			suspendstring = suspendstring + assessSplitId;
			for(var i = 0; i < totalAssessmentPages;i++){
				if(i == totalAssessmentPages - 1){
					suspendstring = suspendstring + assessmentPages[i];
				} else {
					suspendstring = suspendstring + assessmentPages[i] + splitId;
				}
			}
		}*/
		try{
			setSuspendData(suspendstring);
		}catch(e){
		}
	}
	this.setInteraction = function(id, questionText, objectiveId, questionType, learnerResponse, correctAnswer, wasCorrect){
		try{
			//question id must be the first item set
			scoData.setInteractionData(id, questionText, objectiveId, questionType, learnerResponse, correctAnswer, wasCorrect);
			setCommit();
		}catch(e){}
	}
	this.getInteraction = function(assessmentID){
		try{
			return scoData.getInteractionData(assessmentID - 1);
		}catch(e){}
	}
	//
	this.init = function(){
		try{
			startTimeStamp = new Date();
			//
			scoData = new SCOData();
			scoData.initialize();
			var suspendstring = getSuspendData();
			if(suspendstring != '' && suspendstring != ' '){
				var arr1 = suspendstring.split(splitId);
				visitedPages = [];
				for(var i=0; i < arr1.length; i++){
					visitedPages.push(arr1[i]);
					//updateVisitedMenu(visitedPages[i]);
				}
				/*assessmentPages = [];
				arr1 = suspendstring.split(assessSplitId)[1];
				var arr2 = arr1.split(splitId);
				for(var i=0; i < arr2.length; i++){
					if (arr2[i] != ''){
						assessmentPages.push(arr2[i]);
					}
					//updateVisitedMenu(visitedPages[i]);
				}*/
			}
			//
			if(getStatus() != "completed"){
				setStatus("incomplete");
			}
		}catch(e){}
	}
	this.markComplete = function(){
		setStatus("completed");
	}
	this.setVisitedArr = function(arr){
		visitedPages = arr;	
	}
	this.getVisitedArr = function(){
		/*if (visitedPages.length > 0 && assessmentPages.length > 0){
			return visitedPages.concat(assessmentPages);
		}else if (visitedPages.length >  0){
			return visitedPages;
		}*/
		if (visitedPages.length >  0){
			return visitedPages;
		}
		return false;
	}
	this.setVisitedPages = function(pageNo, val, type){
		/*if (type == "assessment"){
			assessmentPages[pageNo] = 1;
		}else{
			visitedPages[pageNo] = 1;
		}*/
		visitedPages[pageNo] = val;
		makeSuspendData();
	}
	this.getBookmark = function(){
		try{
			var bookmark = scoData.getValue("lessonLocation");
			if (bookmark != null && bookmark.length > 0 ) {utils.debug('return bookmark '+bookmark)
				return parseInt(bookmark);
			}else{
				return -1;
			}
		}catch(e){}
	}
	this.unloadCourse = function(){
		shell.unloadCourse();
		//record the session time
		var endTimeStamp = new Date();
		var totalseconds = ((endTimeStamp.getTime() - startTimeStamp.getTime()) / 1000);
		try{
		}catch(e){}
		
		setCommit();
		//scoData.finish();
	}
}).apply(lms);