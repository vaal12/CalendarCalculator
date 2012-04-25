SUPPOSED_SINGLE_CALENDAR_WIDTH = 200;

function initEverything() {
	//console.log("initEverything starts");
	//$("#start_cal_holder_div").hide();
	// Datepicker

	//alert("Window width="+$(window).width()+"  height:"+$(window).height());
	var k = $(window).width();
	if($(window).width() == 0) {
		//alert("Win is 0");
		var winWidth = setTimeout("initEverything()", 500);
		return;
		//alert("New width:"+winWidth);
	};
	startCalendarNumberOfCols = Math.floor($(window).width() / SUPPOSED_SINGLE_CALENDAR_WIDTH);
	if(startCalendarNumberOfCols < 1)
		startCalendarNumberOfCols = 1;

	$('#start_cal_holder_div').DatePicker({
		flat : true,
		date : ['2008-07-28', '2008-07-31'],
		current : '2008-07-31',
		calendars : 3,
		mode : 'range',
		starts : 1,
		onChange: newDatesSelected,
	});

	/**
	 * 
	 $('#start_cal_holder_div').datepicker({
		inline : true,
		numberOfMonths : [startCalendarNumberOfRows, startCalendarNumberOfCols],
		changeYear : true,
		changeMonth : true,
		yearRange : '1971:2020',
		//showButtonPanel: true,
		firstDay : 1,
		showWeek : true,
		onSelect : startDateSelected
	});
	//$('#start_cal_holder_div').datepicker({
	*/
	startDateCurrent = new Date($('#start_cal_holder_div').datepicker("getDate"));

    /**
	$('#end_cal_holder_div').datepicker({
		inline : true,
		numberOfMonths : [endCalendarNumberOfRows, startCalendarNumberOfCols],
		changeYear : true,
		changeMonth : true,
		yearRange : '1971:2020',
		//showButtonPanel: true,
		firstDay : 1,
		showWeek : true,
		onSelect : endDateSelected
	});
	//$('#end_cal_holder_div').datepicker({
	*/

	$("#start_year_back").click(function() {
		$('#start_cal_holder_div').datepicker("setDate", "02/14/1978");
	});
	//$("#start_year_back").click(function(){

	$("#end_cal_holder_div").click(function() {
	});
	//#("#end_cal_holder_div").click(function(){

	// Dialog
	$('#dialog').dialog({
		autoOpen : false,
		title : "Start date history",
		width : 300
	});
	//$('#dialog').dialog({

	// Dialog Link
	$('#dialog_link').click(function(eventObj) {
		$('#dialog').dialog("option", "position", [eventObj.clientX, eventObj.clientY - 30]);
		$('#dialog').dialog('open');
		return false;
	});
	//Start calendar expansion controls
	$("#addRowStartCalendar").button({
		icons : {
			primary : "ui-icon-plusthick"
		},
	});
	$("#removeRowStartCalendar").button({
		icons : {
			primary : "ui-icon-minusthick"
		},
	});
	$("#addRowStartCalendar").click(addStartCalendarRow);
	$("#removeRowStartCalendar").click(removeStartCalendarRow);
	/**
	 $("#addColStartCalendar").button({
	 icons: {primary: "ui-icon-plusthick"},
	 });
	 $("#removeColStartCalendar").button({
	 icons: {primary: "ui-icon-minusthick"},
	 });

	 $("#addColStartCalendar").click(addStartCalCol);
	 $("#removeColStartCalendar").click(removeStartCalCol);
	 */

	//End calendar expansion controls
	$("#addRowEndCalendar").button({
		icons : {
			primary : "ui-icon-plusthick"
		},
	});
	$("#removeRowEndCalendar").button({
		icons : {
			primary : "ui-icon-minusthick"
		},
	});
	$("#addRowEndCalendar").click(addEndCalendarRow);
	$("#removeRowEndCalendar").click(removeEndCalendarRow);
	/**
	 $("#addColEndCalendar").button({
	 icons: {primary: "ui-icon-plusthick"},
	 });
	 $("#removeColEndCalendar").button({
	 icons: {primary: "ui-icon-minusthick"},
	 });

	 $("#addColEndCalendar").click(addEndCalCol);
	 $("#removeColEndCalendar").click(removeEndCalCol);
	 */

	$("#removeColumnImage").click(removeStartCalCol);
	$("#addColumnImage").click(addStartCalCol);

	//showStartCalendarExpansionControls
	$("#showStartCalendarExpansionControls").button({
		icons : {
			primary : "ui-icon-carat-1-s"
		},
		text : false
	});
	$("#showStartCalendarExpansionControls").css('height', '15px').css('width', '15px').css('margin', '0px');
	$("#showStartCalendarExpansionControls").click(hideShowStartCalendarExpansionControls);

	//showEndCalendarExpansionControls
	$("#showEndCalendarExpansionControls").button({
		icons : {
			primary : "ui-icon-carat-1-n"
		},
		text : false
	});
	$("#showEndCalendarExpansionControls").css('height', '15px').css('width', '15px').css('margin', '0px');
	$("#showEndCalendarExpansionControls").click(hideShowEndCalendarExpansionControls);

	//Good infom on jquery and checkboxes
	//http://www.electrictoolbox.com/check-uncheck-checkbox-jquery/
	$('#startDateIncludeCheckbox').attr('checked', true);
	$('#endDateIncludeCheckbox').attr('checked', true);

	$("#startDateIncludeCheckbox").change(onStartOrStopDateIncludeChange);
	$("#endDateIncludeCheckbox").change(onStartOrStopDateIncludeChange);

	$("#startDateAfterDialog").dialog({
		buttons : {
			"Yes" : switchDatesYesSelected,
			"No" : switchDatesNoSelected
		}, //buttons : {
		autoOpen : false,
		modal : true,
		resizable : false,
		show : "slide",
	});
	//$("#startDateAfterDialog").dialog({

	$("#startCalendarAddButtonsDiv").hide();
	$("#endCalendarAddButtonsDiv").hide();

	$("#calendarDaysForm").submit(calendarDaysSubmit);
	$("#weeksForm").submit(calendarWeeksSubmit);
	$("#monthsForm").submit(calendarMonthsSubmit);
	$("#workDaysForm").submit(calendarWorkDaysSubmit);

	$("#calendarDaysInput").val("");
	$("#workDaysInput").val("");
	//$("#dayNumberField").val("");
	$("#calendarHoursInput").val("");
	$("#workHoursInput").val("");
	$("#weeksInput").val("");
	$("#monthsInput").val("");

	$("#testDialog").dialog({
		autoOpen : false,
		modal : true,
		width : 400,
		height : 400,
		dialogClass : 'no-close',
		close : function(event, ui) {
			$('html').unbind();
		}
	});

};//function initEverythin(){