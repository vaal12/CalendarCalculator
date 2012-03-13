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
		
	$("#addRow").click(addRow);
	$("#removeRow").click(removeRow);
	
	$("#addCol").click(addCol);
	$("#removeCol").click(removeCol);
	
});//$(document).ready(function(){

function changeNumberOfRowsCols(){
	$('#calendarPlace').datepicker("option",
			"numberOfMonths", [startCalendarNumberOfRows, startCalendarNumberOfCols]);
	//$('#start_cal_holder_div').datepicker("setDate", startDateCurrent);
}

	
function removeRow(){
	if(startCalendarNumberOfRows>1) {
		startCalendarNumberOfRows -=1;
		changeNumberOfRowsCols();
	}
}

function addRow(){
	startCalendarNumberOfRows +=1;
	changeNumberOfRowsCols();
}

function removeCol(){
	if(startCalendarNumberOfCols>1){
		startCalendarNumberOfCols -=1;
		changeNumberOfRowsCols();
	}
}

function addCol(){
	startCalendarNumberOfCols +=1;
	changeNumberOfRowsCols();
}
