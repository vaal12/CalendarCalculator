

startDatesHistory = new Array();



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

function startDateSelected(dateStr, instance){
	//console.log("startDateSelected:"+dateStr);
	startDatesHistory.push(dateStr);
	dateObj = new Date(dateStr);
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
	
};

function initEverything(){
	//console.log("initEverything starts");
	//$("#start_cal_holder_div").hide();
	// Datepicker
	$('#start_cal_holder_div').datepicker({
		inline: true,
		numberOfMonths: [1, 3],
		changeYear : true,
		changeMonth : true,
		yearRange: '1971:2020',
		showButtonPanel: true,
		onSelect: startDateSelected
	});//$('#start_cal_holder_div').datepicker({
	
	$('#end_cal_holder_div').datepicker({
		inline: true,
		numberOfMonths: [1, 3]
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
	
};//function initEverythin(){












