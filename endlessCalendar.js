startCalendarNumberOfRows = 1;
startCalendarNumberOfCols = 3;

$(document).ready(function(){
	//console.log("Hello //console");
	//$("#start_cal_holder_div").text("Hello I am calendar");
	//initEverything();
	//alert("hello");
	$('#calendarPlace').datepicker({
		inline: true,
		numberOfMonths: [startCalendarNumberOfRows, startCalendarNumberOfCols],
		changeYear : true,
		changeMonth : true,
		yearRange: '1971:2020',
		showButtonPanel: true
	});//$('#start_cal_holder_div').datepicker({
	
});//$(document).ready(function(){