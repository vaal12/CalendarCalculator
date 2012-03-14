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
	console.log("Number of rows:"+startCalendarNumberOfRows);
	$('#start_cal_holder_div').datepicker("option",
		"numberOfMonths", [startCalendarNumberOfRows, startCalendarNumberOfCols]);
	$('#start_cal_holder_div').datepicker("setDate", startDateCurrent);
}

function initEverything(){
	//console.log("initEverything starts");
	//$("#start_cal_holder_div").hide();
	// Datepicker
	$('#start_cal_holder_div').datepicker({
		inline: true,
		numberOfMonths: [startCalendarNumberOfRows, startCalendarNumberOfCols],
		changeYear : true,
		changeMonth : true,
		yearRange: '1971:2020',
		showButtonPanel: true,
		showWeek : true,
		onSelect: startDateSelected
	});//$('#start_cal_holder_div').datepicker({
	startDateCurrent = new Date($('#start_cal_holder_div').datepicker("getDate"));
	
	$('#end_cal_holder_div').datepicker({
		inline: true,
		numberOfMonths: [endCalendarNumberOfRows, endCalendarNumberOfCols],
		changeYear : true,
		changeMonth : true,
		yearRange: '1971:2020',
		showButtonPanel: true,
		showWeek : true,
		onSelect: endDateSelected
	});//$('#end_cal_holder_div').datepicker({
	
	$("#start_year_back").click(function(){
		//console.log("Year back pressed");
		//console.log("Datepicker date:"+
				//$('#start_cal_holder_div').datepicker("getDate")
				//);
		$('#start_cal_holder_div').datepicker("setDate", "02/14/1978");
	});//$("#start_year_back").click(function(){
	
	$("#end_cal_holder_div").click(function(){
		//console.log("End cal holder click");
		//$("#start_cal_holder_div").show();
		//$("#start_cal_holder_div").addClass("color='red'");
	});//#("#end_cal_holder_div").click(function(){
	
	// Dialog			
	$('#dialog').dialog({
		autoOpen: false,
		title : "Start date history",
		width : 300 
	});//$('#dialog').dialog({
	
	// Dialog Link
	$('#dialog_link').click(function(eventObj){
		//console.log("We have mouse click. X="+
				//eventObj.clientX+
				//"Y="+eventObj.clientY 	);
		$('#dialog').dialog( "option", "position", [eventObj.clientX, eventObj.clientY-30] );
		$('#dialog').dialog('open');
		return false;
	});
	
	$("#addRowStartCalendar").click(addStartCalendarRow);
	$("#removeRowStartCalendar").click(removeStartCalendarRow);
	
	$("#addColStartCalendar").click(addStartCalCol);
	$("#removeColStartCalendar").click(removeStartCalCol);
	
	//Good infom on jquery and checkboxes
	//http://www.electrictoolbox.com/check-uncheck-checkbox-jquery/
	$('#startDateIncludeCheckbox').attr('checked', true);
	$('#endDateIncludeCheckbox').attr('checked', true);
	
	$("#startDateIncludeCheckbox").change(onStartOrStopDateIncludeChange);
	$("#endDateIncludeCheckbox").change(onStartOrStopDateIncludeChange);
	
	$("#startDateAfterDialog").dialog({
			buttons : {
				"Yes" : switchDatesYesSelected,
				"No"  : switchDatesNoSelected
			}, //buttons : {
			autoOpen : false,
			modal : true,
			resizable : false,
			show: "slide",
	});//$("#startDateAfterDialog").dialog({
	
};//function initEverythin(){
	
function onStartOrStopDateIncludeChange(eventData){
	//console.log("Data changed");
	updateDateDifferences();
}


function removeStartCalendarRow(){
	if(startCalendarNumberOfRows>1){
		startCalendarNumberOfRows -=1;
		console.log("Number of rows:"+startCalendarNumberOfRows);
		$('#start_cal_holder_div').datepicker("option",
			"numberOfMonths", [startCalendarNumberOfRows, startCalendarNumberOfCols]);
		$('#start_cal_holder_div').datepicker("setDate", startDateCurrent);
	}
};//function removeStartCalendarRow(){
	
function addStartCalCol(){
	startCalendarNumberOfCols +=1;
	console.log("Number of columns:"+startCalendarNumberOfCols);
	$('#start_cal_holder_div').datepicker("option",
			"numberOfMonths", [startCalendarNumberOfRows, startCalendarNumberOfCols]);
	$('#start_cal_holder_div').datepicker("setDate", startDateCurrent);
}//function addStartCalCol(){

function removeStartCalCol(){
	if(startCalendarNumberOfCols>1){
		startCalendarNumberOfCols -=1;
		console.log("Number of columns:"+startCalendarNumberOfCols);
		$('#start_cal_holder_div').datepicker("option",
			"numberOfMonths", [startCalendarNumberOfRows, startCalendarNumberOfCols]);
		$('#start_cal_holder_div').datepicker("setDate", startDateCurrent);
	}
}//function removeStartCalCol(){









