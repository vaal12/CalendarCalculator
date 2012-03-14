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
	
	$("#addRowStartCalendar").button({
            icons: {primary: "ui-icon-plusthick"},
 	});
 	$("#removeRowStartCalendar").button({
            icons: {primary: "ui-icon-minusthick"},
 	});
 	$("#addColStartCalendar").button({
            icons: {primary: "ui-icon-plusthick"},
 	});
 	$("#removeColStartCalendar").button({
            icons: {primary: "ui-icon-minusthick"},
 	});
 	
	
	$("#addRowStartCalendar").click(addStartCalendarRow);
	$("#removeRowStartCalendar").click(removeStartCalendarRow);
	
	$("#addColStartCalendar").click(addStartCalCol);
	$("#removeColStartCalendar").click(removeStartCalCol);
	
	$("#showStartCalendarExpansionControls").button({
		icons: {primary: "ui-icon-carat-1-n"},
		text: false
	});
	$("#showStartCalendarExpansionControls").css('height','15px').css('width','15px').css('margin', '0px');

	$("#showStartCalendarExpansionControls").click(hideShowStartCalendarExpansionControls);
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
    
    $("#startCalendarAddButtonsDiv").hide();
	
};//function initEverythin(){