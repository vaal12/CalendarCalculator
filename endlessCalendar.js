startCalendarNumberOfRows = 1;
startCalendarNumberOfCols = 3;

endCalendarNumberOfRows = 1;
endCalendarNumberOfCols = 3;

startDate = null;
endDate = null;

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
		showButtonPanel: true,
		onSelect: dateSelected
	});//$('#start_cal_holder_div').datepicker({
		
	$("#addRow").click(addRow);
	$("#removeRow").click(removeRow);
	
	$("#addCol").click(addCol);
	$("#removeCol").click(removeCol);
});//$(document).ready(function(){

function log2Console(logStr){
	console.log(logStr);
}

function dateSelected(dateStr, instance){
	log2Console(dateStr);
	selectedDate = new Date(dateStr+" 00:01 PM");
	log2Console("Date parsed:"+selectedDate.toDateString()); 
	if(startDate==null){//This is start date
		$("#startDateText").text("Start date: "+selectedDate.toDateString());
		startDate = selectedDate;
		return
	}
	if(selectedDate < startDate){
		log2Console("Selected date is < startDate");
		startDate = selectedDate;
		$("#startDateText").text("Start date: "+selectedDate.toDateString());
		return
	}
	endDate = selectedDate;
	$("#endDateText").text("End date: "+selectedDate.toDateString());
	
	diffDays = endDate.diff(startDate, "days");
	log2Console("Startdate:"+startDate.toDateString()+" EndDate:"+endDate.toDateString());
	log2Console("Startdate:"+startDate.toLocaleString()+" EndDate:"+endDate.toLocaleString());
	directDateDiff = endDate.getTime()-startDate.getTime();
	startDateTime = startDate.getTime();
	
	log2Console("Difference between dates:"+diffDays);
	$("#betweenDays").text("Calendar days between:"+diffDays);
	
	
}


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
