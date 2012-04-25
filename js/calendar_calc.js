//Version of this file are before (and including) commit fdc0744d46cd6229ab6f9d3c66d659257b313cdd
// Path then was calendar_calc_jquery.js in the root directory

//New calendar documentation: http://www.eyecon.ro/datepicker/#implement

startDatesHistory = new Array();

startDateCurrent = -1;
endDateCurrent = -1;

startCalendarNumberOfRows = 1;
startCalendarNumberOfCols = 3;

endCalendarNumberOfRows = 1;
//endCalendarNumberOfCols = 3;

disableCalculations = false;

startCalendarExpansionControlsShown = false;
endCalendarExpansionControlsShown = false;

MinCalendarDate = new Date("01/01/1970");
MaxCalendarDate = new Date("12/31/2020");


$(document).ready(function(){
	initEverything();
});//$(document).ready(function(){

function onStartDateHistoryClick(eventObj) {
	dateStr = eventObj.currentTarget.id.replace("_", "default.htm");
	dateStr = dateStr.replace("_", "default.htm");
	$('#start_cal_holder_div').datepicker("setDate", dateStr);
	$('#dialog').dialog('close');
}

function checkStartDateIsBefore(){
	if(startDateCurrent==-1 || endDateCurrent == -1) return true;
	if(startDateCurrent.getTime()> endDateCurrent.getTime()) {
		$("#startDateAfterDialog").dialog("open");
		disableCalculations = true;
		return false;
	}
	else {
		disableCalculations = false;	
		return true;//Everything is fine
	}
}

function switchDatesYesSelected() {
	$('#start_cal_holder_div').datepicker("setDate", endDateCurrent);
	
	$('#end_cal_holder_div').datepicker("setDate", startDateCurrent);
	
	$("#startDateAfterDialog").dialog("close");
	startDateCurrent = new Date($('#start_cal_holder_div').datepicker("getDate"));
	endDateCurrent = new Date($('#end_cal_holder_div').datepicker("getDate"));
	disableCalculations = false;
	startDateSelected($('#start_cal_holder_div').datepicker("getDate"), 
			$('#start_cal_holder_div'));
}

function switchDatesNoSelected() {
	
	$("#startDateAfterDialog").dialog("close");
	resetDateDifferences();
	
}

function resetDateDifferences() {
	$("#calendarDaysInput").val("");
	$("#workDaysInput").val("");
	$("#weeksInput").val("");
	$("#monthsInput").val("");
}

function newDatesSelected(dateStr){
	console.log("new Dates:"+dateStr)
}

function startDateSelected(dateStr, instance){
	dateObj = new Date(dateStr);
	startDateCurrent = dateObj;
	$("#startDateLabel").text(dateObj.toLocaleDateString());
	if(endDateCurrent!=-1) $("#endDateLabel").text(endDateCurrent.toLocaleDateString());
	if((!checkStartDateIsBefore()) || disableCalculations) {
		return;
	}
	startDatesHistory.push(dateStr);
	
	idString = (dateObj.getMonth()+1)+"_"+dateObj.getDate()+"_"+dateObj.getFullYear();
	newLinkStr = "<a href='#' id='"+idString+"'>"+dateObj.toLocaleString()+"</a>";
	$("#startDateHistoryContent").html(
			$("#startDateHistoryContent").html()+"<br>"+newLinkStr
			);
	i=0;
	while(i<startDatesHistory.length){
		dateStr = startDatesHistory[i];
		dateObj = new Date(dateStr);
		idString = (dateObj.getMonth()+1)+"_"+dateObj.getDate()+"_"+dateObj.getFullYear();
		$("#"+idString).click(onStartDateHistoryClick);
		i+=1;
	};
	updateDateDifferences();
};

function endDateSelected(dateStr, instance){
	dateObj = new Date(dateStr);
	endDateCurrent = dateObj;
	$("#endDateLabel").text(dateObj.toLocaleDateString());
	if((!checkStartDateIsBefore()) || disableCalculations) {
		return;
	}
	updateDateDifferences();
};

function isWorkDay(dateObj){
	var weekDay = dateObj.getDay();
	if((weekDay>0) && (weekDay<6)) return true;
	else return false;
}

function getWorkDaysToDate(endDate) {
	var startDateChecked = $("#startDateIncludeCheckbox").is(':checked');
	var endDateChecked = $("#endDateIncludeCheckbox").is(":checked");
	var workDays = endDate.diff(startDateCurrent, "businessdays", "complete");
	//console.log("Workdays returned:"+workDays);
	if ((startDateCurrent.getTime() == endDate.getTime()) 
		&&
		isWorkDay(startDateCurrent)) 
		workDays=1;
	else {
		/**
		 * Compensation for workdays is no longer necessary will be removed in next commit 
		 if((startDateChecked) 
			&& 
			 (isWorkDay(startDateCurrent))) { workDays +=1; }
		*/
		if(endDateChecked && isWorkDay(endDate)) workDays+=1;
	}//else if (startDateCurrent == endDateCurrent) workDays=0;
	return workDays
}

function updateDateDifferences(){
	if((startDateCurrent != -1) && (endDateCurrent != -1)){
		var startDateChecked = $("#startDateIncludeCheckbox").is(':checked');
		var endDateChecked = $("#endDateIncludeCheckbox").is(":checked");
		calendarDays = endDateCurrent.diff(startDateCurrent, "days");
		if (startDateCurrent.getTime() == endDateCurrent.getTime()) calendarDays=1;
		else {
			if(endDateChecked) calendarDays+=1;
			if(!startDateChecked) calendarDays-=1;
		}
		
		var workDays = getWorkDaysToDate(endDateCurrent);
		
		weeksDateInFuture = new Date(endDateCurrent);
		if(startDateChecked && endDateChecked) { weeksDateInFuture.advance({day:1}); }
		if(!startDateChecked && !endDateChecked) { weeksDateInFuture.rewind({day:1}); }
		
		weeks = weeksDateInFuture.diff(startDateCurrent, "weeks");
		
		monthsDateInFuture = new Date(endDateCurrent);
		if(startDateChecked && endDateChecked) {
			monthsDateInFuture.advance({day:2});
		}
		if(!startDateChecked && endDateChecked) monthsDateInFuture.advance({day:1});
		months = monthsDateInFuture.diff(startDateCurrent, "months");
		if(startDateCurrent.getTime() == endDateCurrent.getTime()) months =0;
		
		
		$("#calendarDaysInput").val(calendarDays);
		$("#workDaysInput").val(workDays);
		$("#weeksInput").val(weeks);
		$("#monthsInput").val(months);
		$("#calendarHoursInput").val(calendarDays*24);
		$("#workHoursInput").val(workDays*8);
	};
}

function addStartCalendarRow(){
	startCalendarNumberOfRows +=1;
	$('#start_cal_holder_div').datepicker("option",
		"numberOfMonths", [startCalendarNumberOfRows, startCalendarNumberOfCols]);
	$('#start_cal_holder_div').datepicker("setDate", startDateCurrent);
};

function removeStartCalendarRow(){
	if(startCalendarNumberOfRows>1){
		startCalendarNumberOfRows -=1;
		$('#start_cal_holder_div').datepicker("option",
			"numberOfMonths", [startCalendarNumberOfRows, startCalendarNumberOfCols]);
		$('#start_cal_holder_div').datepicker("setDate", startDateCurrent);
		
		
	}
};//function removeStartCalendarRow(){
	
function addEndCalendarRow(){
	endCalendarNumberOfRows +=1;
	$('#end_cal_holder_div').datepicker("option",
		"numberOfMonths", [endCalendarNumberOfRows, startCalendarNumberOfCols]);
	$('#end_cal_holder_div').datepicker("setDate", endDateCurrent);
};

function removeEndCalendarRow(){
	if(endCalendarNumberOfRows>1){
		endCalendarNumberOfRows -=1;
		$('#end_cal_holder_div').datepicker("option",
			"numberOfMonths", [endCalendarNumberOfRows, startCalendarNumberOfCols]);
		$('#end_cal_holder_div').datepicker("setDate", endDateCurrent);
	}
};//function removeEndCalendarRow(){

	
function hideShowStartCalendarExpansionControls(evt) {
	//Test
	
	/**
	$('#testDialog').dialog("open");
 	$('#testDialog').click(function(event){
     event.stopPropagation();
 	});
 	timeoutID = window.setTimeout(function (){
 		$('html').click(function() {
 		$("#testDialog").dialog("close");
 		});	
 	}, 200); 
 	
	*/
	//Test end
	if(startCalendarExpansionControlsShown) {
		$( "#startCalendarAddButtonsDiv" ).hide( "blind", {}, 1000);
		$("#showStartCalendarExpansionControls").button("option", "icons", 
				{primary:'ui-icon-carat-1-s'} );
		startCalendarExpansionControlsShown = false;
	}
	else {
		$("#startCalendarAddButtonsDiv" ).show( "blind", {}, 1000);
		$("#showStartCalendarExpansionControls").button("option", "icons", 
				{primary:'ui-icon-carat-1-n'} );
		
		startCalendarExpansionControlsShown = true;
	}
}

function hideShowEndCalendarExpansionControls(){
	if(endCalendarExpansionControlsShown) {
		$( "#endCalendarAddButtonsDiv" ).hide( "blind", {}, 1000);
		$("#showEndCalendarExpansionControls").button("option", "icons", 
				{primary:'ui-icon-carat-1-n'} );
		endCalendarExpansionControlsShown = false;
	}
	else {
		$("#endCalendarAddButtonsDiv" ).show( "blind", {}, 1000);
		$("#showEndCalendarExpansionControls").button("option", "icons", 
				{primary:'ui-icon-carat-1-s'} );
		endCalendarExpansionControlsShown = true;
	}
};
	
function onStartOrStopDateIncludeChange(eventData){
	updateDateDifferences();
}

	
function addStartCalCol(){
	startCalendarNumberOfCols +=1;
	$('#start_cal_holder_div').datepicker("option",
			"numberOfMonths", [startCalendarNumberOfRows, startCalendarNumberOfCols]);
	$('#start_cal_holder_div').datepicker("setDate", startDateCurrent);
	
	$('#end_cal_holder_div').datepicker("option",
			"numberOfMonths", [endCalendarNumberOfRows, startCalendarNumberOfCols]);
	$('#end_cal_holder_div').datepicker("setDate", endDateCurrent);
}//function addStartCalCol(){

function removeStartCalCol(){
	if(startCalendarNumberOfCols>1){
		startCalendarNumberOfCols -=1;
		$('#start_cal_holder_div').datepicker("option",
			"numberOfMonths", [startCalendarNumberOfRows, startCalendarNumberOfCols]);
		$('#start_cal_holder_div').datepicker("setDate", startDateCurrent);
		
		$('#end_cal_holder_div').datepicker("option",
			"numberOfMonths", [endCalendarNumberOfRows, startCalendarNumberOfCols]);
		$('#end_cal_holder_div').datepicker("setDate", endDateCurrent);
	}
	console.log("Cols"+startCalendarNumberOfCols);
	console.log("rows"+startCalendarNumberOfRows);
}//function removeStartCalCol(){



	




function IsNumeric(sText) {
   var ValidChars = "0123456789";
   var IsNumber=true;
   var Char;
   for (i = 0; i < sText.length && IsNumber == true; i++) { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) IsNumber = false;
   }
   return IsNumber;
}//function IsNumeric(sText)


function setEndDateInAdvance(daysNum){
	if(startDateCurrent != -1) {
		startDateChecked = $("#startDateIncludeCheckbox").is(':checked');
		endDateChecked = $("#endDateIncludeCheckbox").is(":checked");
		if(!startDateChecked && !endDateChecked) daysNum +=1;
		if(endDateChecked && startDateChecked) daysNum -=1;
			
		advancedDate = new Date(startDateCurrent);
		advancedDate.advance({day:daysNum });
		if(advancedDate.getTime() > MaxCalendarDate.getTime()) {
			alert("Sorry the date is too far in the future");
			return;
		}
			 
		$('#end_cal_holder_div').datepicker("setDate", advancedDate);
		//endDateSelected(advancedDate.toLocaleString());
		endDateSelected(advancedDate);
	}//if(startDateCurrent != -1) {
}

function calendarDaysSubmit(){
	//	$("#calendarDaysInput").val());
	value = $("#calendarDaysInput").val();

	if(IsNumeric(value)) {
		numVal = value-0;
		setEndDateInAdvance(numVal);
	}
	return false;
}

function calendarWeeksSubmit() {
	value = $("#weeksInput").val();
	if(IsNumeric(value)) {
		numVal = value-0;
		daysInWeeks = numVal*7;
		setEndDateInAdvance(daysInWeeks);
	}//if(IsNumeric(value)) {
	return false;
}

function calendarMonthsSubmit(){
	value = $("#monthsInput").val();
	if(IsNumeric(value)) {
		numVal = value-0;
		advancedDate = new Date(startDateCurrent);
		advancedDate.advance({month:numVal});
		diffDays = advancedDate.diff(startDateCurrent, "days");
		setEndDateInAdvance(diffDays);
	};
	return false;
}

function calendarWorkDaysSubmit(){
	var value = $("#workDaysInput").val();
	if(IsNumeric(value)) {
		var numVal = value-0;
		var advancedDate = new Date(startDateCurrent);
		var numCalDays = 0;
		while(getWorkDaysToDate(advancedDate)<numVal) {
			advancedDate.advance({day:1});
			numCalDays +=1;
		}
		var startDateChecked = $("#startDateIncludeCheckbox").is(':checked');
		var endDateChecked = $("#endDateIncludeCheckbox").is(":checked");
		if(startDateChecked && endDateChecked) numCalDays+=1;
		if(!startDateChecked && !endDateChecked) numCalDays-=1;
		setEndDateInAdvance(numCalDays);
	}//if(IsNumeric(value)) {	
	return false;
}
