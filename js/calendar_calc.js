//Version of this file are before (and including) commit fdc0744d46cd6229ab6f9d3c66d659257b313cdd
// Path then was calendar_calc_jquery.js in the root directory

startDatesHistory = new Array();

startDateCurrent = -1;
endDateCurrent = -1;

startCalendarNumberOfRows = 1;
startCalendarNumberOfCols = 3;

endCalendarNumberOfRows = 1;
endCalendarNumberOfCols = 3;

disableCalculations = false;

startCalendarExpansionControlsShown = false;
endCalendarExpansionControlsShown = false;


$(document).ready(function(){
	//console.log("Hello //console");
	//$("#start_cal_holder_div").text("Hello I am calendar");
	initEverything();
	
});//$(document).ready(function(){

function onStartDateHistoryClick(eventObj) {
	//console.log("Start history date clicked:"+eventObj.target);
	//console.log("Start history date clicked:"+eventObj.currentTarget.id);
	
	dateStr = eventObj.currentTarget.id.replace("_", "/");
	dateStr = dateStr.replace("_", "/");
	//console.log("We have string:"+dateStr);
	//dateObj = new Date(dateStr);
	////console.log(dateObj.toLocaleString());
	$('#start_cal_holder_div').datepicker("setDate", dateStr);
	
	$('#dialog').dialog('close');
}

function checkStartDateIsBefore(){
	if(startDateCurrent==-1 || endDateCurrent == -1) return true;
	if(startDateCurrent.getTime()> endDateCurrent.getTime()) {
		$("#startDateAfterDialog").dialog("open");
		//console.log("After dialog creation");
		disableCalculations = true;
		return false;
	}
	else {
		disableCalculations = false;	
		return true;//Everything is fine
	}
}

function switchDatesYesSelected() {
	console.log("Yes selected");
	$('#start_cal_holder_div').datepicker("setDate", endDateCurrent);
	console.log("StartdateCurrent "+startDateCurrent.toLocaleString());
	$('#end_cal_holder_div').datepicker("setDate", startDateCurrent);
	console.log("After setting new date");
	$("#startDateAfterDialog").dialog("close");
	startDateCurrent = new Date($('#start_cal_holder_div').datepicker("getDate"));
	endDateCurrent = new Date($('#end_cal_holder_div').datepicker("getDate"));
	disableCalculations = false;
	startDateSelected($('#start_cal_holder_div').datepicker("getDate"), 
			$('#start_cal_holder_div'));
}

function switchDatesNoSelected() {
	console.log("No selected");
	$("#startDateAfterDialog").dialog("close");
	resetDateDifferences();
	
}

function resetDateDifferences() {
	$("#calendarDaysInput").val("");
	$("#workDaysInput").val("");
	$("#weeksInput").val("");
	$("#monthsInput").val("");
}



function startDateSelected(dateStr, instance){
	console.log("startDateSelected:"+dateStr);
	dateObj = new Date(dateStr);
	startDateCurrent = dateObj;
	$("#startDateLabel").text(dateObj.toLocaleDateString());
	if(endDateCurrent!=-1) $("#endDateLabel").text(endDateCurrent.toLocaleDateString());
	if((!checkStartDateIsBefore()) || disableCalculations) {
		console.log("disableCalculations"+disableCalculations);
		return;
	}
	startDatesHistory.push(dateStr);
	
	//console.log("We have date object:"+dateObj.toLocaleString());
	idString = (dateObj.getMonth()+1)+"_"+dateObj.getDate()+"_"+dateObj.getFullYear();
	newLinkStr = "<a href='#' id='"+idString+"'>"+dateObj.toLocaleString()+"</a>";
	$("#startDateHistoryContent").html(
			$("#startDateHistoryContent").html()+"<br>"+newLinkStr
			);
	i=0;
	while(i<startDatesHistory.length){
		dateStr = startDatesHistory[i];
		//console.log("Setting event for date:"+dateStr);
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
		console.log("disableCalculations"+disableCalculations);
		return;
	}
	updateDateDifferences();
};

function isWorkDay(dateObj){
	weekDay = dateObj.getDay();
	if((weekDay>0) && (weekDay<6)) return true;
	else return false;
}

function updateDateDifferences(){
	if((startDateCurrent != -1) && (endDateCurrent != -1)){
		startDateChecked = $("#startDateIncludeCheckbox").is(':checked');
		endDateChecked = $("#endDateIncludeCheckbox").is(":checked");
		//console.log(startDateChecked);
		calendarDays = endDateCurrent.diff(startDateCurrent, "days");
		if (startDateCurrent.getTime() == endDateCurrent.getTime()) calendarDays=1;
		else {
			if(endDateChecked) calendarDays+=1;
			if(!startDateChecked) calendarDays-=1;
		}
		
		workDays = endDateCurrent.diff(startDateCurrent, "businessdays");
		/**
		 *  This is odd, for some reason calendar days are calculated by diff as 
		 * including the first day, while working days are calculated as strict number
		 * of days BETWEEN dates with noted exception of when dates are the same.
		 * So in case if both dates =16.Apr-2012 (Monday) difference is 1,
		 * while if date1 - 16Apr2012 and date2 - 17Apr2012 difference is 0
		 * if date 1-16Apr2012 and date2 - 18Apr2012 difference is 1
		 * To check the library code for that. 
		 */
		if (startDateCurrent.getTime() == endDateCurrent.getTime()) workDays=1;
		else {
			if(  (startDateChecked) 
				&& 
				 (isWorkDay(startDateCurrent))) { workDays +=1; }
			if(endDateChecked && isWorkDay(endDateCurrent)) workDays+=1;
		}//else if (startDateCurrent == endDateCurrent) workDays=0;
		
		weeks = endDateCurrent.diff(startDateCurrent, "weeks");
		months = endDateCurrent.diff(startDateCurrent, "months");
		$("#calendarDaysInput").val(calendarDays);
		$("#workDaysInput").val(workDays);
		$("#weeksInput").val(weeks);
		$("#monthsInput").val(months);
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
		"numberOfMonths", [endCalendarNumberOfRows, endCalendarNumberOfCols]);
	$('#end_cal_holder_div').datepicker("setDate", endDateCurrent);
};

function removeEndCalendarRow(){
	if(endCalendarNumberOfRows>1){
		endCalendarNumberOfRows -=1;
		console.log("Number of rows:"+startCalendarNumberOfRows);
		$('#end_cal_holder_div').datepicker("option",
			"numberOfMonths", [endCalendarNumberOfRows, endCalendarNumberOfCols]);
		$('#end_cal_holder_div').datepicker("setDate", endDateCurrent);
	}
};//function removeEndCalendarRow(){

	
function hideShowStartCalendarExpansionControls(evt) {
	if(startCalendarExpansionControlsShown) {
		$( "#startCalendarAddButtonsDiv" ).hide( "blind", {}, 1000);
		$("#showStartCalendarExpansionControls").button("option", "icons", 
				{primary:'ui-icon-carat-1-n'} );
		startCalendarExpansionControlsShown = false;
	}
	else {
		$("#startCalendarAddButtonsDiv" ).show( "blind", {}, 1000);
		$("#showStartCalendarExpansionControls").button("option", "icons", 
				{primary:'ui-icon-carat-1-s'} );
		
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
	//console.log("Data changed");
	updateDateDifferences();
}

	
function addStartCalCol(){
	startCalendarNumberOfCols +=1;
	$('#start_cal_holder_div').datepicker("option",
			"numberOfMonths", [startCalendarNumberOfRows, startCalendarNumberOfCols]);
	$('#start_cal_holder_div').datepicker("setDate", startDateCurrent);
}//function addStartCalCol(){

function removeStartCalCol(){
	if(startCalendarNumberOfCols>1){
		startCalendarNumberOfCols -=1;
		$('#start_cal_holder_div').datepicker("option",
			"numberOfMonths", [startCalendarNumberOfRows, startCalendarNumberOfCols]);
		$('#start_cal_holder_div').datepicker("setDate", startDateCurrent);
	}
}//function removeStartCalCol(){


	
function addEndCalCol(){
	endCalendarNumberOfCols +=1;
	$('#end_cal_holder_div').datepicker("option",
			"numberOfMonths", [endCalendarNumberOfRows, endCalendarNumberOfCols]);
	$('#end_cal_holder_div').datepicker("setDate", endDateCurrent);
}//function addStartCalCol(){

function removeEndCalCol(){
	if(endCalendarNumberOfCols>1){
		endCalendarNumberOfCols -=1;
		$('#end_cal_holder_div').datepicker("option",
			"numberOfMonths", [endCalendarNumberOfRows, endCalendarNumberOfCols]);
		$('#end_cal_holder_div').datepicker("setDate", endDateCurrent);
	}
}//function removeStartCalCol(){









